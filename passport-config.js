const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('./models/User')
const { sanitizeUser } = require('./services/common');

const SECRET_KEY = 'SECRET_KEY'
const token = jwt.sign({ foo: 'bar' } , SECRET_KEY)

// JWT options
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_KEY

function initializePassport(passport){
    const authenticateUserLocal = async (email, password, done) => {
        console.log(email, password);
        // if(err) done(err, false);
        try {
            const newuser = await User.findOne({ email: email })

            const salt = crypto.randomBytes(16)
            crypto.pbkdf2(password , newuser.salt , 310000 , 32 , 'sha256' , async function(err , hashedPassword){
                if(!crypto.timingSafeEqual(newuser.password , hashedPassword)){
                    return done(null, false , {message: 'Invalid credentials'}) 
                }else{
                    const token = jwt.sign(sanitizeUser(newuser) , SECRET_KEY)
                    // edited this line 11-01-24
                    return done(null, token); // This line calls the serializer
                }
            })
        } catch (err) {
            return done(err, false)
        }
    }
    const authenticateUserJWT = async (jwt_payload, done) => {
        console.log("jwt payload :" , jwt_payload);
        try {
            const user = await User.findOne({id: jwt_payload.sub})
            if (user) {
                return done(null, sanitizeUser(user));
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (error) {
            return done(err , false)
        }
    }

    // Local strategy
    passport.use('local' , new LocalStrategy({usernameField: 'email'} , authenticateUserLocal))

    // JWT strategy
    passport.use("jwt" , new JwtStrategy(opts, authenticateUserJWT));

    passport.serializeUser((user , done) => {
        console.log('serializeUser :' , user);
        return done(null , sanitizeUser(user))
    })

    passport.deserializeUser(async (user, cb) => {
        console.log('deserializeUser :' , user);
        try {
            // console.log(id);
            const foundUser = await User.findById(user.id);
            return cb(null, foundUser);
        } catch (err) {
            return cb(err);
        }
    });
}

module.exports = initializePassport