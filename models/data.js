var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responseCaseSchema = new Schema({
    resTitle : String,
    resCode : {type: String, trim:true},
    resType : String,
    resOption : {type:String, trim:true},
    resBody : String,
});

var apiSchema = new Schema({
    category : String,
    title : String,
    url : String,
    methodType : String,
    requestType : String,
    tags :  {type:String, trim:true},
    note : String,
    createDateTime :  {type: Date, default: Date.now},
    lastUpdateTime :  {type: Date, default: Date.now},
    inputParam : String,
    outputParam : String,
    responseCaseIndex : {type:Number, trim:true},
    responseCases : [ responseCaseSchema ]
});

module.exports = mongoose.model('apiData',apiSchema);