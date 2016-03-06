/*This will contain logic to get comments from DB */
/*The caller will pass dbconnection object */
var Comment = function(id, author, text){
   this.id = id;
   this.author = author ;
   this.text = text ;
};

/*This function returns a promise.
 * When the promise if fulfilled then the comments will be sent*/
var getAllCommentsFromDB = function(dbConn){
   var promiseToReturn = new Promise(function(resolve, reject){
      if( (dbConn.state==='connected'   || dbConn.state==='authenticated' ) ){

      }else{

         dbConn.connect() ;
      }
      dbConn.query('SELECT ID, AUTHOR, TEXT FROM comment', function(err, rows,fields){

         if(err){
            reject(err) ;
         }

         var comments = rows.map( function(row){
            var comment = new Comment(row.ID, row.AUTHOR, row.TEXT) ;
            return comment;
         } ) ;

         resolve(comments) ;

      }) ;

   }) ;

   return promiseToReturn ;
};

module.exports = {
   getAllComments: getAllCommentsFromDB,

   /*comment object with dbConn will be passed */
   saveComment: function(dbConn, comment){
      console.log(comment) ;
      var aPromise = new Promise(function(resolve, reject){
         if( (dbConn.state==='connected'   || dbConn.state==='authenticated' ) ){

         }else{
            dbConn.connect() ;
         }
         var commentToInsert = {
            text: comment.text,
            author: comment.author
         };
         /*save the given comment to DB and return the ID*/
         dbConn.query('INSERT INTO comment SET ?', commentToInsert, function(err, result){
            if(err){
               reject(err);
            }

            resolve(result.insertId) ;
         });



      });

      return aPromise;
   }
};
