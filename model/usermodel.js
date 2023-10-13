var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    text:{
        type: String
    },
    OTP:{
        type:Number
    }



});



module.exports = mongoose.model('mail', userSchema);