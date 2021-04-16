//proxy responser  라우터
var express = require('express');
var router = express.Router();
var ApiData = require('../models/data');


//url과 methodType으로 검색하여 해당하는 응답기본메세지를 반환하는 함수
router.get('/methods',function(req,res){
   console.log("--proxy -- get all data\n");
   console.log("url ::   "+req.query.url);
   console.log("method ::   "+req.query.method);

   var url = req.query.url;
   var method = req.query.method;


   //parameter queryString으로 넘어옴
   ApiData.findOne({'url':url,'methodType':method},function(err, apidata){
      if(err) return res.status(500).send({error: 'database failure'});
      if(!apidata) return res.status(404).send({error:'not found!!'});

      var defaultMsgIndex = apidata.responseCaseIndex;
      var statusCode = apidata.responseCases[defaultMsgIndex].resCode;
      var responseType = apidata.responseCases[defaultMsgIndex].resType;
      var responseBody = apidata.responseCases[defaultMsgIndex].resBody;
      console.log(apidata.responseCases[defaultMsgIndex]);

      res.status(statusCode).set('Content-Type',responseType).send(responseBody);

   });

 });


//url과 methodType으로 검색하여 해당하는 응답기본메세지를 반환하는 함수
router.post('/methods',function(req,res){
   console.log("--proxy -- get all data\n");
   console.log("url ::   "+req.query.url);
   console.log("method ::   "+req.query.method);

   var url = req.query.url;
   var method = req.query.method;


   //parameter queryString으로 넘어옴
   ApiData.findOne({'url':url,'methodType':method},function(err, apidata){
      if(err) return res.status(500).send({error: 'database failure'});
      if(!apidata) return res.status(404).send({error:'not found!!'});

      var defaultMsgIndex = apidata.responseCaseIndex;
      var statusCode = apidata.responseCases[defaultMsgIndex].resCode;
      var responseType = apidata.responseCases[defaultMsgIndex].resType;
      var responseBody = apidata.responseCases[defaultMsgIndex].resBody;
      console.log(apidata.responseCases[defaultMsgIndex]);

      res.status(statusCode).set('Content-Type',responseType).send(responseBody);

   });

 });

module.exports = router;