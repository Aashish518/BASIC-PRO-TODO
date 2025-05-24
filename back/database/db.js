const mongoose = require('mongoose');

const mongoosea = () => {
// mongoose.connect('mongodb://localhost:27017/test')
    mongoose.connect('mongodb+srv://jadavaashish9:An%40211518@cluster0.gtxxzpc.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected!'))
    .catch((e) => console.log(e));
}

module.exports = mongoosea;