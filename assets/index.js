var playlistClick = function() {

    $.ajax("/api/tracks", {
        type: "POST",
        data: { playlistid: $(this).data("playlistid") }
      }).then(function(response) {
        console.log(response);
      });

      // songShow();
  }
}

var playlistCreate = function(res) {

  for (var i = 0; i < res.items.length; i++) {

    var playlist = $("<button type = 'button' class = 'btn btn-secondary chosenPlaylist' data-playlistid =" + res.items[i].id + ">" + res.items[i].name + "</button>");

    $(".granted").append(playlist);

  }
}

$(document).on("click", ".chosenPlaylist", playlistClick);

//  var songShow = function() {

//   // $(".granted").empty();

//   for (var i = 0; i < db.Playlist.length; i++) {

//     // var playlist = $("<button>" + db.Playlist[i].name + "</button>");

//     // $(".granted").append(playlist);

//     console.log(db.Playlist.name[i]);

//   };

//  }