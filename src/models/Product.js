import {Schema, Types, model} from 'mongoose';

const productSchema = new Schema({
    name: String,
    description: String,
    price: {
        type: Types.Decimal128,
        get: getFloat
    },
    image_url: {
        type: String,
        get: getImagePath
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    zone: {
        type: Number,
        default: 2
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

function getImagePath(value) {
    return 'http://localhost:3000/public/uploads/' + value;
}

export default model('Product', productSchema);