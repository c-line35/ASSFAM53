const mongoose = require('mongoose');

const bookSchema=mongoose.Schema({
    code:{type: String, required:true},
    title:{type: String, required:true},
    author:{type: String, required: true},
    resume:{type:String},
    cat:{type:String},
    theme:{type:[String]},
    imageUrl:{type: String},
    likes:{type:[String]},
    notice:{type: [mongoose.Schema.Types.ObjectId], ref:"Notice"}
})
module.exports = mongoose.model('Book', bookSchema);