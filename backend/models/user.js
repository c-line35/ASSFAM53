const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String},
    lastName:{type: String,required: true},
    firstName:{type: String,required: true},
    phoneNumber:{type: Number, required: true},
    role:{type: String, required: true},
    end: {type: String},
    form: {type: Boolean},
    level: {type: Number, required: true}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);