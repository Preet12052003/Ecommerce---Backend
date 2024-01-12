const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
    items: {
        type: [Schema.Types.Mixed],
        required: true
    },
    totalAmount: { type: Number },
    totalItems: {type: Number},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMethod: {type: String, required: true},
    status: {type: String, default: 'pending', required: true},
    selectedAddress: {type: Schema.Types.Mixed, required: true}
})

// creating a vurtual column with same values as that of _id (default col of mongo)
const virtual = orderSchema.virtual('id')
virtual.get(function(){
    return this._id
})
orderSchema.set('toJSON' , {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){ delete ret._id }
})
module.exports.Order = mongoose.model('Order' , orderSchema)