// Get references to page elements
var $postUsername = $("#username");
var $postCategory = $("#post-category");
var $postPin = $("#pin");
var $postContent = $("#post-content");
var $postTitle = $("#post-title");

var $submitPostBtn = $("#submit-post");

// The API object contains methods for each kind of request we'll make
var postAPI = {
  savePost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },
  getPosts: function() {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  },
  deletePost: function(id) {
    return $.ajax({
      url: "api/posts/" + id,
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

  var post = {
    // later will have to implement a random name generator
    username: $postUsername.val().trim(),
    // category will have to change later because it will be selected from a drop down menu
    category: $postCategory.val().trim(),
    pin: $postPin.val().trim(),
    body: $postContent.val().trim(),
    title: $postTitle.val().trim()
  };

  if (
    !(post.username && post.category && post.body && post.title && post.pin)
  ) {
    alert("You must enter a username, category, title, pin and content!");
    return;
  }

  postAPI.savePost(post).then(function() {
    // window.location.reload();
    window.location.href = "/";
    // window.location.replace("/");
  });

  $username.val("");
  $category.val("");
  $pin.val("");
  $content.val("");
  $title.val("");
};

// Add event listeners to the submit and delete buttons
$submitPostBtn.on("click", handleFormSubmit);

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
// $postsList.on("click", ".delete", handleDeleteBtnClick);
