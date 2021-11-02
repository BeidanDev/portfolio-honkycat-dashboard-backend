const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/paintDB' , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Online database');
    } catch (error) {
        console.log(error);

        throw new Error('Failed to start the database');
    }
}

module.exports = {
    dbConnection
}