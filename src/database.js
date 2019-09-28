// Database connection
const mongoose = require('mongoose');

const DB_URL = 'mongodb://app_user:password@localhost:27017/demo';

mongoose.connect(
    DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    console.log('Database connection successfully')
);
