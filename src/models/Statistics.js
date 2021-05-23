import {Schema, Types, model} from 'mongoose';

const staticsSchema = new Schema({
    clientEmail: {
        type: String
    },
    name: String,
    price: {
        type: Types.Decimal128,
        get: getFloat
    },
    image_url: String,
    category: Object,
    zone: Number,
    amount: Number,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,      // Creation date not saved
    toJSON: {
        getters: true       // Float output handling and id fields
    }
});

function getFloat(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
}

export default model('Statics', staticsSchema);