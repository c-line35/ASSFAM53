const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    lastName:{type: String,required: true},
    firstName:{type: String,required: true},
    phoneNumber:{type: Number, required: true},
    adress:{type: String},
    post:{type: Number},
    city:{type: String},
    role:{type: String, required: true},
    end: { type: [Number], default: undefined, require: true},
    level: {type: Number, required: true},
    adminRights: {type: [String]}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);