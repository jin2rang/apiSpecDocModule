// html 화면
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('apiTable.html');
    console.log("   open website   ");
 });

 module.exports = router;

