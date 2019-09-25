$(document).ready(function() {
  // Get references to page elements
  var $username = $("#username");
  var $commentPin = $("#comment-pin");
  var $commentContent = $("#comment-content");
  var $postID = $("#post-id");
  var $commentPostID = $("#delete-comment-post-id"); // same thing as postID for comment modal

  var $submitCommentBtn = $("#submit-comment");

  var nameInput = $("#username");
  var randomNum = Math.floor(Math.random() * 1000);
  var randomName = new Chance(randomNum);
  nameInput.val(randomName.name());

  // The API object contains methods for each kind of request we'll make
  var commentAPI = {
    saveComment: function(comment) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "../api/posts/" + $postID.val().trim() + "/comments",
        data: JSON.stringify(comment)
      });
    },
    getComments: function() {
      return $.ajax({
        url: "../api/posts/" + $postID.val().trim() + "/comments",
        type: "GET"
      });
    },
    deleteComment: function(commentDelete) {
      return $.ajax({
        url:
          "../api/posts/" +
          $commentPostID.val().trim() +
          "/comments/" +
          commentDelete.id +
          "/" +
          commentDelete.pin,
        type: "DELETE"
      });
    }
  };

  // handleCommentFormSubmit is called whenever we submit a new post
  // Save the new post to the db and refresh the list
  var handleCommentFormSubmit = function(event) {
    event.preventDefault();

    var comment = {
      username: $username.val().trim(),
      pin: $commentPin.val().trim(),
      body: $commentContent.val().trim(),
      PostId: parseInt($postID.val().trim())
    };

    if (!(comment.username && comment.body)) {
      alert("You must enter a username and content!");
      return;
    }

    commentAPI.saveComment(comment).then(function() {
      window.location.reload();
    });

    $username.val("");
    $commentPin.val("");
    $commentContent.val("");
  };

  $submitCommentBtn.on("click", handleCommentFormSubmit);

  // Comment Delete Functionality
  $(document).on("click", ".delete-comment-modal-btn", function() {
    var commentId = $(this).attr("data-id");
    $(".modal-body #delete-comment-id").val(commentId);
  });

  // handleDeleteBtnClick is called when an post's delete button is clicked
  // Remove the post from the db and refresh the list
  var handleDeleteCommentBtnClick = function(event) {
    event.preventDefault();

    var modalBody = $(this).parents(".modal-body");
    var pin = modalBody.find("#comment-pin-delete").val();
    var id = modalBody.find("#delete-comment-id").val();
    console.log("Pinny", pin);
    console.log("id", id);

    var commentDelete = {
      pin: pin,
      id: id
    };

    if (commentDelete.pin && commentDelete.id) {
      commentAPI.deleteComment(commentDelete).then(function() {
        window.location.reload();
      });
    }
  };

  $(document).on("click", ".delete-comment-btn", handleDeleteCommentBtnClick);
});
