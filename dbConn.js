var mysql = require('mysql') ;
var connection = mysql.createConnection({

   host: "localhost",
   user: 'root',
   password: 'acer4720',
   database: 'react_comment_db'
}) ;

module.exports = connection ;
