var mongoose= require('mongoose') // when we work with mongoose then we need to create schema.
var newSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports=mongoose.model('users', newSchema) //('collection name' , Variable Schema);