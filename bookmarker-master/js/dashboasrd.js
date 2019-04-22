document.getElementById('myForm').addEventListener('submit',savePosts);



//save POSTS
function savePosts(e){
  var postName = document.getElementById('postName').value;
  var array = [];
  array = getHashTags(postName);


var post ={
  key : array,
  name : postName// mthis my message
}



// localStorage.setItem('test','hello world');
// console.log(localStorage.getItem('test'));
// localStorage.removeItem('test','hello world');
// console.log(localStorage.getItem('test'));

if(localStorage.getItem('posts')===null){
  // init array
  var posts = [];
  posts.push(post);

localStorage.setItem('posts',JSON.stringify(posts));

}  else {
 var posts = JSON.parse(localStorage.getItem('posts'));

//add post to array
posts.push(post);
//re-set back to local storage
localStorage.setItem('posts',JSON.stringify(posts));

}
fetchPost();
e.preventDefault();


}

function getHashTags(postName) { 
var tags=[]; 
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
   tags =postName.match(regex);
   console.log(tags);
 return tags;
}

//delete posts
function deleteBookmark(name) {
// get post from LS
 var posts = JSON.parse(localStorage.getItem('posts'));
 // loop through post
 for(var i = 0; i < posts.length;i++){
  if(posts[i].name == name){
    //remove posts
    posts.splice(i,1);
  }
 }

// reset the LS
localStorage.setItem('posts',JSON.stringify(posts));
//Re-fetching posts
fetchPost();
}





// fetch posts
function fetchPost(){
 // get posts from localstorage
var posts=[];
  posts = JSON.parse(localStorage.getItem('posts'));
 console.log(posts);
// get output by id

var postResults = document.getElementById('postResults');

//build output
postResults.innerHTML = '';
if(posts!=null){
  for(var i = 0; i <posts.length ;i++){
var name = posts[i].name;
 var key=posts[i].key;
postResults.innerHTML +=  '<div class="well">'+
                            '<h6>'+key+'</h6>'+
                            '<h4>'+name+

                            ' <a onclick="deleteBookmark(\''+name+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                            '</h4>'+
                            '</div>';


}
} 


}


