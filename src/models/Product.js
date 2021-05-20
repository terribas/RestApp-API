import {Schema, Types, model} from 'mongoose';

const productSchema = new Schema({
    name: String,
    price: {
        type: Types.Decimal128,
        get: getFloat
    },
    image_url: String,
    category: {
        type: Types.ObjectId,
        ref: 'Category'
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

export default model('Product', productSchema);