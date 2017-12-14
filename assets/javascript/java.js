$(document).ready(function() {
	var actions = ["Falling", "Laughing", "Running", "Eating", "Crying", "Drinking", "Sleeping", "Flying"];
function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var index = 0; index < actions.length; index++) {
		var gifButton = $("<button>");
		gifButton.addClass("action")
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", actions[index]);
		gifButton.text(actions[index]);
		$("#gifButtonsView").append(gifButton);
	}
}
function addNewButton() {
	$("#addGif").on("click", function(event) {
		event.preventDefault();
		var action = $("#action-input").val().trim();
		if (action == "") {
			return false;
		}
		actions.push(action);
		displayGifButtons();
		return false;
	});
}
function removedLastButton() {
	$("#removeGif").on("click", function(event) {
		event.preventDefault();
		actions.pop();
		displayGifButtons();
		return false;
	});
}
function displayGifs(action) {
	console.log(action);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
	console.log(response.data);
	$("#gifsView").empty();
	var results = response.data;
	if (results =="") {
		alert("no Gif's exist for this Sorry!!");
	}
	for (var index = 0; index < results.length; index++) {

		var gifDiv = $("<div>");
		gifDiv.addClass("gifDiv");
		var gifRating = $("<p>").text("Rating: " + results[index].rating);
		gifDiv.append(gifRating);
		var gifImage = $("<img>");
		gifImage.attr("src", results[index].images.fixed_height_small_still.url);
		gifImage.attr("data-still", results[index].images.fixed_height_small_still.url);
		gifImage.attr("data-animate", results[index].images.fixed_height_small.url);
		gifImage.attr("data-state", "still");
		gifImage.addClass("image");
		gifDiv.append(gifImage);
		console.log(gifImage);
		$("#gifView").prepend(gifDiv);
	} 
	});
}
displayGifButtons();
addNewButton();
removedLastButton();
$(document).on("click", ".action", function() {

	
	displayGifs($(this).attr("data-name"));
});
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if ( state === 'still'){
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
});

});