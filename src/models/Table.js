import {Schema, model} from 'mongoose';

const tableSchema = new Schema({
    table_number: Number,
    need_waiter: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
});

export default model('Table', tableSchema);