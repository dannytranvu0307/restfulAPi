const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vudeptrai_dev');
        console.log('connect success ');
    } catch (error) {
        console.log('connect error');
    }
}
module.exports = { connect };
