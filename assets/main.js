$(document).ready(function () {
    var topics = [];

    function displaygenreitem() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Q0bSSsSAfAS96zSJryo9PgaUuaNWrnef&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var itemDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var itemImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                itemImage.attr("src", staticSrc);
                itemImage.addClass("genreGiphy");
                itemImage.attr("data-state", "still");
                itemImage.attr("data-still", staticSrc);
                itemImage.attr("data-animate", defaultAnimatedSrc);
                itemDiv.append(p);
                itemDiv.append(itemImage);
                $("#gifArea").prepend(itemDiv);

            }
        });
    }

    $("#additem").on("click", function (event) {
        event.preventDefault();
        var newitem = $("#genreInput").val().trim();
        topics.push(newitem);
        console.log(topics);
        $("#genreInput").val('');
        displayButtons();
    });

    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "item");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    $(document).on("click", "#item", displaygenreitem);

    $(document).on("click", ".genreGiphy", pausePlayGifs);

    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});