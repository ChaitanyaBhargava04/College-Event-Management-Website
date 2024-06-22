var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var feedback = new Schema(
    {
        name:String ,
        email:String ,
        subject:String ,
        message:String ,
        
    }
);
module.exports=mongoose.model('Feedback' , feedback);