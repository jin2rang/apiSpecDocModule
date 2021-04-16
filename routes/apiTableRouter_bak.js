//apiTable 라우터
var express = require('express');
var router = express.Router();
var ApiData = require('../models/data');




//메소드목록(전체 가져오기)
router.get('/methods',function(req,res){
   console.log("get data");
   // var returnData =[];

   // ApiData.count({},function(err,count){
   //    console.log("count::"+count);
   //    var totalCount = {"totalCount":count};
   //    returnData.push(totalCount);
   // });

   ApiData.find(function(err, apidata){
      if(err) return res.status(500).json({error: 'database failure'});
      // returnData.push(apidata);
      // res.json(returnData);
      
      res.json(apidata);
   }).sort({'createDateTime':-1});

 });





//검색태그조회
router.get('/methods/search/:tags',function(req,res){

   var getTag = req.params

   var searchTag = new RegExp(req.params,'gim');


   console.log('searchchchch');
   console.log(getTag);
    ApiData.find({tags:searchTag}, function(err, apidata){

      if(err) return res.status(500).json({error: 'database failure'});
      if(!apidata) return res.status(404).json({error:'not found!!'});

      res.json(apidata);

    });
 });







 //메소드 목록 클릭시 모달에 보여지는 데이터 조회(detail modal)
router.get('/methods/:_id',function(req,res){
   console.log("get data with parameter");
   console.log(req.params);
   var getId = req.params;

    ApiData.findById(getId, function(err, apidata){
       if(err) return res.status(500).json({error:err});
       if(!apidata) return res.status(404).json({error:'not found!!'});
       res.json(apidata);
    });

 });


 
 //메소드에서 입력/출력 매개변수 저장했을 때 갱신하도록 데이터조회
router.get('/methods/inoutput/:_id',function(req,res){
   console.log("get data In, Output parameter ");
   console.log("id ::: "+req.params);
   var getId = req.params;

    ApiData.findById(getId, function(err, apidata){
       if(err) return res.status(500).json({error:err});
       if(!apidata) return res.status(404).json({error:'not found!!'});
       res.json(apidata);
    });

 });



 //모달 저장
 router.post('/methods',function(req,res){
        var apidata = new ApiData();
        apidata.category = req.body.category;
        apidata.title =req.body.title;
        apidata.url = req.body.url;
        apidata.methodType = req.body.methodType;
        apidata.requestType = req.body.requestType;
        apidata.tags = req.body.tags;
        apidata.note =req.body.note;

        var nowDate = getCurrentDate();
        apidata.createDateTime =  nowDate;
        apidata.lastUpdateTime = nowDate;
        apidata.inputParam = req.body.inputParam;
        apidata.outputParam = req.body.outputParam;
        apidata.responseCaseIndex = req.body.responseCaseIndex;
        apidata.responseCases = req.body.responseCases;

        apidata.save(function(err){

         if(err){
            console.error(err);
            res.json({result:0});
            return;
         }
        
         res.json({result:1});
        });

 });

//현재 한국시간으로 가져오는 함수
 function getCurrentDate(){
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth();
   var today = date.getDate();
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var seconds = date.getSeconds();
   var milliseconds = date.getMilliseconds();
   return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}


 //모달 수정
 router.put('/methods/:_id',function(req,res){
   console.log("update data with parameter");
   console.log(req.params);
   var getId = req.params;

   ApiData.findById(getId, function(err, apidata){
      if(err) return res.status(500).json({error:err});
      if(!apidata) return res.status(404).json({error:'not found!!'});

      apidata.category = req.body.category;
      apidata.title =req.body.title;
      apidata.url = req.body.url;
      apidata.methodType = req.body.methodType;
      apidata.requestType = req.body.requestType;
      apidata.tags = req.body.tags;
      apidata.note =req.body.note;
     // apidata.createDateTime  = getCurrentDate();
   
     var nowDate = getCurrentDate();
      apidata.lastUpdateTime = nowDate;
      apidata.inputParam = req.body.inputParam;
      apidata.outputParam = req.body.outputParam;
      apidata.responseCaseIndex = req.body.responseCaseIndex;
      apidata.responseCases = req.body.responseCases;

      apidata.save(function(err){

      if(err) res.status(500).json({error: 'failed to update'});
       res.json({result:'updated'});

      });

   });

 });

 
  //모달 json 수정
  router.put('/methods/input/:_id',function(req,res){
   console.log("json data with parameter");
   console.log(req.params);

   var getId = req.params;

   ApiData.findById(getId, function(err, apidata){
      if(err) return res.status(500).json({error:err});
      if(!apidata) return res.status(404).json({error:'not found!!'});

      if(req.body.type=='input'){
         apidata.inputParam = req.body.inputParam;
      }
      else{
         apidata.outputParam = req.body.outputParam;
      }      
      
      apidata.save(function(err){

      if(err) res.status(500).json({error: 'failed to save json data'});
       res.json({result:'saved'});

      });

   });

 });

 
 
 



 //모달 삭제
 router.delete('/methods/:_id',function(req,res){
   var getId = req.params;
   console.log(getId);
   ApiData.remove({ _id:getId }, function(err, apidata){
      if(err) return res.status(500).json({ error: "database failure" });

      //( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
      if(!apidata) return res.status(404).json({error:'not found!!'});
      res.json({ message: "api deleted" });
      res.status(204).end();
      
   })



 });

module.exports = router;