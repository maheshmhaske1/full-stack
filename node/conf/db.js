const mongoose = require('mongoose');
require('dotenv').config({ path: 'conf/.env' });

exports.dbConnection = async () => {
    try {
        const dbUri = process.env.DATABASE;
        console.log(dbUri);
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected with MongoDB...');
    } catch (error) {
        console.error('Error while connecting...', error);
    }
};
