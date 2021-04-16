var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    category : {type: String, trim:true}
});

module.exports = mongoose.model('categoryData',categorySchema);