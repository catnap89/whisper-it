// Get references to page elements
var $username = $("#username");
var $category = $("#post-category");
var $pin = $("#pin");
var $content = $("#post-content");
var $title = $("#post-title");

// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $postsList = $("#posts-list");

// The API object contains methods for each kind of request we'll make
var postAPI = {
  savePost: function(post) {
    debugger;
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
    username: $username.val().trim(),
    // category will have to change later because it will be selected from a drop down menu
    category: $category.val().trim(),
    pin: $pin.val().trim(),
    body: $content.val().trim(),
    title: $title.val().trim()
  };

  if (!(post.username && post.category && post.body && post.title)) {
    alert("You must enter a username, category and content!");
    return;
  }

  postAPI.savePost(post).then(function() {
    window.location.reload();
  });

  $username.val("");
  $category.val("");
  $pin.val("");
  $content.val("");
  $title.val("");
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
$submitBtn.on("click", handleFormSubmit);
// $postsList.on("click", ".delete", handleDeleteBtnClick);
