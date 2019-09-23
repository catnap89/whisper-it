$(document).ready(function() {
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
    deletePost: function(postDelete) {
      return $.ajax({
        url: "api/posts/" + postDelete.id + "/" + postDelete.pin,
        type: "DELETE"
      });
    }
  };

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

  $(document).on("click", ".delete-post-modal-btn", function() {
    var postId = $(this).attr("data-id");
    $(".modal-body #delete-post-id").val(postId);
  });

  // handleDeleteBtnClick is called when an post's delete button is clicked
  // Remove the post from the db and refresh the list
  var handleDeletePostBtnClick = function(event) {
    event.preventDefault();

    var modalBody = $(this).parents(".modal-body");
    var pin = modalBody.find("#post-pin-delete").val();
    var id = modalBody.find("#delete-post-id").val();
    console.log("Pinny", pin);
    console.log("id", id);

    var postDelete = {
      pin: pin,
      id: id
    };

    if (postDelete.pin && postDelete.id) {
      postAPI.deletePost(postDelete).then(function() {
        window.location.href = "/";
      });
    }
  };

  $(document).on("click", ".delete-post-btn", handleDeletePostBtnClick);
});
