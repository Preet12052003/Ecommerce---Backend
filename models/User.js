const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchhema = new Schema({
    email: {type: String , required: true, unique: true},
    password: {type: Buffer, required: true, unique: true},
    role: { type: [String], required: true, default: 'user' },
    addresses: { type: [Schema.Types.Mixed] },
    name: {type: String},
    orders: {type: [Schema.Types.Mixed]},
    salt: Buffer
})

const virtual = userSchhema.virtual('id')
virtual.get(function(){
    return this._id
})
userSchhema.set('toJSON' , {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){ delete ret._id }
})

module.exports.User = mongoose.model('User' , userSchhema)