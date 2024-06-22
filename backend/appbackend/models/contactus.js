var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contactus = new Schema(
    {
        name: String,
        email: String,
        message: String,  
    }
);
module.exports=mongoose.model('contactus' , contactus);