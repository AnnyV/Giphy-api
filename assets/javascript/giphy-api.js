var actions = ["Breaking up", "cooking", "fighting", "dancing", "falling"]

function createButton() {

  $("#buttons-view").empty();
  for (var i = 0; i < actions.length; i++) {


    var button = $("<button>")
    button.addClass("action btn-start btn-info btn-lg");

    button.attr("data-name", actions[i]);

    button.text(actions[i]);

    $("#buttons-view").append(button);
  }
}
createButton();
$("#add-action").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var newaction = $("#action-input").val().trim();

  // The action from the textbox is then added to our array
  actions.push(newaction);

  createButton();

});

$(document).on("click", ".action", function() {

  $("#actions-view").empty();

  var action = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creates AJAX call for the specific action button being clicked

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var actionImage = $("<img>");
        actionImage.attr("src", results[i].images.fixed_height_still.url)
          .attr("data-state", "still")
          .attr("data-still", results[i].images.fixed_height_still.url)
          .attr("data-animate", results[i].images.fixed_height.url)
          .addClass("gif");

        gifDiv.append(p);
        gifDiv.append(actionImage);

        $("#actions-view").prepend(gifDiv);
      }
    });

});

$(document).on("click", ".gif", function() {

  var state = $(this).data("state");

  if (state === "still") {
    $(this).data("state", "animate").attr("src", $(this).data("animate"))
  } else {
    $(this).data("state", "still").attr("src", $(this).data("still"))
  }


});
