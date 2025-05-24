const mongoose = require('mongoose');

const mongoosea = () => {
    mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('Connected!'))
    .catch((e) => console.log(e));
}

module.exports = mongoosea;