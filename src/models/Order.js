import { Schema, Types, model } from 'mongoose';

const orderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    table: {
        type: Types.ObjectId,
        ref: 'Table'
    },
    kitchen_delivered: {
        type: Boolean,
        default: false
    },
    bar_delivered: {
        type: Boolean,
        default: false
    },
    total: {
        type: Types.Decimal128,
        get: getFloat
    },
    date: {
        type: Date,
        default: Date.now
    },
    //insert products, amount field by product and clientEmail
    products: []
}, {
    versionKey: false,
    toJSON: {
        virtuals: true,
        getters: true       // Float output handling and id fields
    }
});

//convert float to correct format
function getFloat(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
}

export default model('Order', orderSchema);