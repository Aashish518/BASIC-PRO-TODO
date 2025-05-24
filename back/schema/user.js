const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    count: {
        type: Number,
        default:0
    }
})

module.exports = mongoose.model('users', user);
