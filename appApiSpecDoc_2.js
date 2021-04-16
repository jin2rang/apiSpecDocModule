// ---load packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var url = require('url');

// ---connect to mongodb server
var db = mongoose.connection;
db.on('error',console.error);
db.once('open', function(){
        console.log("\n\n***** Connected to mongoDB server *****");
});
mongoose.connect('mongodb+srv://test:test@cluster0-s87wx.mongodb.net/<dbname>?retryWrites=true&w=majority');



// ---configure app to use
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//app.use(cors());
//var corsOpt = function(req, callback) {
//    console.log("corsOpt");
//    callback(null, {origin: true});
//};
//app.options('*',cors(corsOpt));

// ---화면
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));


// ---configure server port
var port = process.env.PORT || 8090;

// ---configure router
var viewRouter = require('./routes');
var apiRouter = require('./routes/apiTableRouter');
app.use('/',viewRouter);
app.use('/data',apiRouter);


/*
app.use(function(req, res, next) {
    console.log("----originalUrl");
    console.log(req.originalUrl);
    
    console.log("----host");
    console.log(req.get('host'));
    
    console.log("----protocal");
    console.log(req.protocol);
    
    req.getUrl = function() {
        return req.protocol + "://" + req.get('host') + req.originalUrl;
      }
      return next();
});*/

var server = app.listen(port,function(){
    console.log("\n\n***** Express server has started on port :: " + port +" *****")
});