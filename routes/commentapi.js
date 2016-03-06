var express = require('express');
var dbConn = require('../dbConn') ;
var dbUtil = require('../helpers/dbUtils_comment.js') ;

var router = express.Router();

/*RESTful API code dealing with comments*/
router.get('/', function(req,res,next){
   dbUtil.getAllComments(dbConn).then(
      function(comments){
         res.send(comments) ;
      }
   );

});

router.post('/', function(req,res,next){
   console.log(req.body);
   dbUtil.saveComment(dbConn, req.body.comment).then(
      function(resultId){
         res.send({
            "id": resultId
         }) ;
      }
   );

}) ;


module.exports = router ;


