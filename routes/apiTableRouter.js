//apiTable 라우터
var express = require('express');
var router = express.Router();
const path = require('path');
var ApiData = require('../models/data');
var CategoryData = require('../models/dataCategory');
var SelectedData = require('../models/dataSelected');


//category 저장
 router.post('/category',function(req,res){
   var categorydata = new CategoryData();
   categorydata.category = req.body.category;

   categorydata.save(function(err){

    if(err){
       console.error(err);
       res.json({result:0});
       return;
    }
   
    res.json({result:1});
   });

});


//category 조회
router.get('/category',function(req,res){
   console.log("get category data");

   CategoryData.find(function(err, categorydata){
      if(err) return res.status(500).json({error: 'database failure'});      
      res.json(categorydata);
   }).sort({'createDateTime':-1});

 });


 


 //선택했던 category 상태 조회
router.get('/selected/category',function(req,res){
   console.log("get selected category data");

   SelectedData.find({key : "apiSpecDoc"},function(err, selecteddata){
      if(err) return res.status(500).json({error: 'database failure'});      
      res.json(selecteddata);
   });

 });






 //category 현재 클릭한 것 상태 저장
 /*
 router.post('/selected/category',function(req,res){
   var selecteddata = new SelectedData();
   console.log(req.body);

   selecteddata.key = "apiSpecDoc";
   selecteddata.id = req.body.id;
   selecteddata.category = req.body.category;

   selecteddata.save(function(err){

      if(err){
          console.error(err);
          res.json({result:"error"});
          return;
       }
      
       res.json({result:"saved category"});
   });
});*/

router.post('/selected/category',function(req,res){
   console.log("save and update selected category");

   SelectedData.findOneAndUpdate({key : "apiSpecDoc"}, {id : req.body.id , category :req.body.category },{upsert: true, new: true} ,function(err,data){

      if(req.body.id == "" || req.body.id == undefined ||req.body.id =="undefined"){
         return res.json({result:"check selected category id"});
      }
   
      
      if(req.body.category == "" || req.body.category == undefined ||req.body.category =="undefined"){
         return res.json({result:"check selected category"});
      }

      if(err){
          console.error(err);
          res.json({result:"error"});
          return;
       }
       console.log(data);
       res.json({result:"saved category"});
   });
});










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


 

//카테고리를 키워드로 한 조회
router.get('/methods/list/:category',function(req,res){

   var getParam =req.params.category
   console.log('-get list with category-');
   console.log("getParam : " + getParam);

   if(getParam == "ALL"){

      ApiData.find(function(err, apidata){
         if(err) return res.status(500).json({error: 'database failure'});
         if(!apidata) return res.status(404).json({error:'not found!!'});
         res.json(apidata);
       }).sort({'createDateTime':-1});

   }
   else{

      ApiData.find({category:getParam}, function(err, apidata){
         if(err) return res.status(500).json({error: 'database failure'});
         if(!apidata) return res.status(404).json({error:'not found!!'});
         res.json(apidata);
       }).sort({'createDateTime':-1});
   }


 });






//검색태그조회
router.get('/methods/search/:tags',function(req,res){

   var getTag = req.params.tags

   var searchTag = new RegExp(getTag,'gim');
   console.log('-search tag-');
   console.log("getTag : " + getTag);

    ApiData.find({tags:getTag}, function(err, apidata){

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


 router.post('/update/category',function(req,res){
   console.log("update");
   console.log(req.body);

   var paramUserKey = req.body.category;
   
   if(( paramUserKey !="" )||( paramUserKey !="undefined" )){
            
      ApiData.updateMany({category : "APISYS"}, {$set : {category : "smartfarm"}}, function(err, updatedata){
            if(err) return res.status(500).json({error: 'database failure'});


               var apidata = new ApiData();   
               apidata.category = req.body.category;

           
               apidata.save(function(err){
                   
                   if(err){
                       console.error(err);
                       res.json({result:"failed to save"});
                       return;
                   }
                   
                   res.json({result:"saved"});
                   
               });

            });

   }
});











module.exports = router;