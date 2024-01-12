/* TODO : 
1. DO WATCH THE EXTRA REACT VIDEO 
2. AFTER THE VIDEO DO SOME MINOR CHANGES IN PRODUCTDETAILS COMPONENT (8:36:20)
3. // if Problem occurs while merging fRTend and backend vid. timestamps : 8:02:27 =>> PRODUCTCONTROLLER FILE
4. IMPLEMENT THE ADMIN PANNEL
5. WORK ON FILTERING BY CATEGORY AND BRANDS
*/

require('dotenv').config()
const express = require('express')
const flash = require('connect-flash');
const app = express()
const cors = require('cors')
const {connectDB} = require('./config/dbConnection')
const passport = require('passport')
const session = require('express-session')
const initializePassport = require('./passport-config')
const productsRouter = require('./routers/productsRoute')
const brandsRouter = require('./routers/brandsRoute')
const categoriesRouter = require('./routers/categoryRoute')
const userRouter = require('./routers/userRoute')
const authRouter = require('./routers/authRoute')
const cartRouter = require('./routers/cartRoute')
const orderRouter = require('./routers/orderRoute')
const {isAuth} = require('./services/common')


connectDB().catch((err) => console.log(err))

initializePassport(passport)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    exposeHeaders: ['X-Total-Count']
}))
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Strategy definition
// passport.use('local' , new LocalStrategy(
//     async function verify(username, password, done){
//         console.log(email, password);
//         // if(err) done(err, false);
//         try {
//             const newuser = await User.findOne({ email: username })
//             console.log(newuser);
//             if(!newuser){
//                 done(null, false, { message: 'Invalid Credentials' }) // Unautorized
//             }
//             if(password === newuser.password){
//                 done(null, newuser)
//             }else{
//                 done(null, false, { message: 'invalid credentials' })
//             }
//         } catch (err) {
//             done(err, false)
//         }
//     }
// ))

// // passport.use('local' , new LocalStrategy(
// //     function(username, password, done) {
// //       User.findOne({ username: username }, function (err, user) {
// //         if (err) { return done(err); }
// //         if (!user) { return done(null, false); }
// //         if (!user.verifyPassword(password)) { return done(null, false); }
// //         return done(null, user);
// //       });
// //     }
// // ));

// // This creates session variable req.user on being called from callbacks
// passport.serializeUser(function(newuser, cb) {
//     process.nextTick(function() {
//         return cb(null, {id: newuser.id, role: newuser.role});
//     });
// });

// // This changes/updates session variable req.user when called from the authorized request
// passport.deserializeUser(function(id, cb) {
//     process.nextTick(async function() {
//         try {
//             console.log(id);
//             const foundUser = await User.findById(id);
//             return cb(null, foundUser);
//         } catch (err) {
//             return cb(err);
//         }
//     });
// });

// Routes as Middlewares
app.use('/auth', authRouter.router)
app.use('/products' , isAuth() , productsRouter.router)
app.use('/categories' , isAuth() , categoriesRouter.router)
app.use('/brands' , isAuth() , brandsRouter.router)
app.use('/users' , isAuth() , userRouter.router)
app.use('/cart' , isAuth() , cartRouter.router)
app.use('/order' , isAuth() , orderRouter.router)



app.listen(8080 , () => {
    console.log('Server running on port 8080...');
})