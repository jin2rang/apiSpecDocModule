var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selectedSchema = new Schema({
    _id : false,
    key : {type: String, default: "apiSpecDoc"},
    id :  {type: String, trim:true ,required : true},
    category :  {type: String, trim:true}
});

module.exports = mongoose.model('selectedData',selectedSchema);