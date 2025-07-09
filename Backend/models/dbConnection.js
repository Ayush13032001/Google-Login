const mongoose = require('mongoose');
const MONGO_CONN = process.env.MONGO_CONN;

mongoose.connect(MONGO_CONN)    
.then(() => {
    console.log('MongoDB connected successfully.');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
