const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const User= new mongoose.Schema({
    name:{type:String, required:true},
      username:{type:String, required:true , unique:true},
      password:{type:String, required:true},
      quote:{type:String}
}, {collection:'users'});
const model = mongoose.model('UserData', User );
module.exports = model;