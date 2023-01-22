const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const staffSchema=mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true, unique:true},
    imageUrl:{type: String, default: './assets/images/profil-homme.jpg'},
    grade: {type: String, required:true},
    mission: {type: [String]},
    ca:{type: Boolean, default:false},
    coordonnees:{type:[String]}
    
});
staffSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Staff', staffSchema);