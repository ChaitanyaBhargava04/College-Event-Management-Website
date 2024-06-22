var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var event = new Schema(
    {
        eventname: String,
        date: Date,
        // time:Date ,
        location: String,
        description: String,
           
    }
);
module.exports=mongoose.model('Event' , event);