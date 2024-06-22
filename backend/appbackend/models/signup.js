var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var signup = new Schema(
    {
        firstName:String ,
        lastName:String ,
        password:String ,
        email:String ,
        
    }
);

module.exports=mongoose.model('Signup' , signup);