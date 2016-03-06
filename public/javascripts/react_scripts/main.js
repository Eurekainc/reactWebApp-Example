var React = require('react');
var ReactDOM = require('react-dom');

var request = require('superagent');
var superagentPromisePlugin = require('superagent-promise-plugin');


var Comment = React.createClass(
   {
      render: function() {
         return (
            <div className="comment">
            <h2 className="commentAuthor">
            {this.props.author}
            </h2>
            {this.props.children}
            </div>
         );
      }
   }
);


var CommentList = React.createClass(
   {
      render: function(){
         var commentNodes = this.props.data.map(
            function(comment){
               return (
                  <Comment author={comment.author} key={comment.id}>
                  {comment.text}
                  </Comment>

               );
            }
         );

         return (
            <div className="commentList">
            {commentNodes}
            </div>

         );

      }
   }
);


var CommentForm = React.createClass(
   {
      getInitialState: function(){
         return {author: '', text: ''} ;
      },
      handleAuthorChange: function(e){
         this.setState({author: e.target.value}) ;
      },
      handleTextChange: function(e){
         this.setState({text: e.target.value}) ;
      },
      handleSubmit: function(e){
         e.preventDefault();
         var author = this.state.author.trim();
         var text = this.state.text.trim();
         if(!text || !author) {
            return;
         }
         this.props.onCommentSubmit({author: author, text: text}) ;
         this.setState({author:'', text:''}) ;
      },
      render: function(){
         return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
            type="text"
            placeholder="Your Name"
            value={this.state.author}
            onChange={this.handleAuthorChange}
            />

            <input
            type="text"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange}
            />
            <input type="submit" value="Post"/>
            </form>

         );

      }
   }

);

var CommentBox = React.createClass({
   loadCommentsFromServer: function(){
      var req = request.get('/api/comment')  ;
      req
      .use(superagentPromisePlugin)
      .end()
      .then(function(res){
         this.setState({data: res.body}) ;
      }.bind(this))
      .catch(function(err){
         console.log("An error occurred while calling the API ") ;
         console.log(this.props.url);
         console.log(err.toString());
      }.bind(this));
   },

   handleCommentSubmit: function(comment){
      var req = request.post('/api/comment') ;
      req
      .use(superagentPromisePlugin)
      .send({comment: comment})
      .end()
      .then(function(res){
         console.log(res.body) ;
      })
      .catch(function(err){
         console.log("An error occured while POSTINg the comment") ;
         console.log(err.toString()) ;
      }) ;
   },

   getInitialState: function(){
      return {data:[]};
   },

   componentDidMount: function(){
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval) ;
   },
   render: function(){
      return(
         <div className="commentBox" >
         <CommentList  data={this.state.data} />
         <CommentForm onCommentSubmit={this.handleCommentSubmit} />
         </div>

      );
   }
}) ;



var data = [
   {
      id: 1,
      author: "Pete Hunt",
      text: "This is one comment"
   },
   {
      id: 2,
      author: "Jordan Walke",
      text: "This is another comment"
   }

];


ReactDOM.render(
   <CommentBox url="/api/comment" pollInterval={2000}/> ,
      document.getElementById('container')
)
