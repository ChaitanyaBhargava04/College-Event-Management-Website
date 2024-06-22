var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var admin = new Schema(
    {
        firstName:String ,
        lastName:String ,
        password:String ,
        email:String ,
 
        
    }
);

module.exports=mongoose.model('Admin' , admin);