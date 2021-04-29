import mongoose from 'mongoose';

const dbUrl = 'mongodb+srv://piUser:piPassword@cluster0.wmz1v.mongodb.net/restobar?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('Database is connected'))
.catch(error => console.log(error));