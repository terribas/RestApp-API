import {Schema, model} from 'mongoose';

const categorySchema = new Schema({
    name: String,
}, {
    toJSON: {
        virtuals: true      // 'id' field will be included, instead of '_id'
    },
    versionKey: false,
});


export default model('Category', categorySchema);