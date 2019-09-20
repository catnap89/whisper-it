// Get references to page elements
var $username = $("#username");
var $pin = $("#comment-pin");
var $content = $("#comment-content");
var $postID = $("#post-id");

var $submitCommentBtn = $("#submit-comment");

// The API object contains methods for each kind of request we'll make
var commentAPI = {
  saveComment: function(comment) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts/" + $postID.val().trim() + "/comments",
      data: JSON.stringify(comment)
    });
  },
  getComments: function() {
    return $.ajax({
      url: "api/posts/" + $postID.val().trim() + "/comments",
      type: "GET"
    });
  },
  deleteComment: function(id) {
    return $.ajax({
      url: "api/posts/" + $postID.val().trim() + "/comments" + id,
      type: "DELETE"
    });
  }
};

// refreshPosts gets new posts from the db and repopulates the list
// var refreshPosts = function() {
//   postAPI.getPosts().then(function(data) {
//     var $posts = data.map(function(post) {
//       var $a = $("<a>")
//         .text(post.title)
//         .attr("href", "/post/" + post.id);

//       var $pID = $("<p>").text(post.id);
//       var $pUsername = $("<p>").text(post.username);
//       var $pCategory = $("<p>").text(post.category);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": post.id
//         })
//         .append($a)
//         .append($pID)
//         .append($pUsername)
//         .append($pCategory);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $postsList.empty();
//     $postsList.append($posts);
//   });
// };

// handleFormSubmit is called whenever we submit a new post
// Save the new post to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var comment = {
    // later will have to implement a random name generator
    username: $username.val().trim(),
    pin: $pin.val().trim(),
    body: $content.val().trim(),
    postId: $postID.val().trim()
  };

  if (!(comment.username && comment.body)) {
    alert("You must enter a username and content!");
    return;
  }

  commentAPI.saveComment(comment).then(function() {
    window.location.reload();
  });

  $username.val("");
  $pin.val("");
  $content.val("");
};

// handleDeleteBtnClick is called when an post's delete button is clicked
// Remove the post from the db and refresh the list
// COMMENTED OUT FOR NOW
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");
//   // if PIN exists,
//   var postPin = prompt("Please enter the pin# you created for this post!");
//   if (postPin === PIN NUMBER IN DATABASE) {
//     postAPI.deleteExample(idToDelete).then(function() {
//       refreshPosts();
//     });
//   }

// };

// Add event listeners to the submit and delete buttons
$submitCommentBtn.on("click", handleFormSubmit);
// $postsList.on("click", ".delete", handleDeleteBtnClick);
