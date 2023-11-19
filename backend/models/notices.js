const mongoose = require('mongoose');

const noticeSchema=mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    bookId:{type:String, required: true},
    content:{type:String, required: true},
    date:{type: Date, required: true},
    level: {type: Number, required: true}
})
module.exports = mongoose.model('Notice', noticeSchema);