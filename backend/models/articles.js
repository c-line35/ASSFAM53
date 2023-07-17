const mongoose = require('mongoose');

const articleSchema=mongoose.Schema({
    title:{type: String, required:true},
    imageUrl:{type: String},
    content:{type:[String]},
    document:{type: String},
    lien:{type: String},
    position:{type: Number}

})
module.exports = mongoose.model('Article', articleSchema);