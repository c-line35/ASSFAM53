const mongoose = require('mongoose');

const eventSchema=mongoose.Schema({
    title:{type: String, required:true},
    content:{type:[String]},
    date:{type: Date, required: true},
    place:{type: String}

})
module.exports = mongoose.model('Event', eventSchema);