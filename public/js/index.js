function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
function showHide() {
  $("#grant").hide();
  $("#granted").show();
}
var params = getHashParams();
var access_token = params.access_token,
  refresh_token = params.refresh_token,
  error = params.error;
var hostId;
if (error) {
  alert("There was an error during the authentication");
} else {
  if (access_token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token
      }
    }).then(function(response) {
      hostId = response.id;
      console.log("this is host's Id" + hostId);
      $.ajax("/api/token", {
        type: "POST",
        data: {
          access_token: access_token,
          refresh_token: refresh_token,
          spotify_user_id: hostId
        }
      }).then(function(response) {
        showHide();
        console.log("this is the your list");
        console.log(response);
        playlistCreate(response);
      });
    });
  } else {
    // render initial screen
    $("#grant").show();
    $("#granted").hide();
  }
}

//  Testing Tri

var playlistClick = function() {
  $.ajax("/api/tracks", {
    type: "POST",
    data: { playlistid: $(this).data("playlistid") }
  }).then(function(response) {
    console.log(response);
  });

};

var playlistCreate = function(res) {

for (var i = 0; i < res.items.length; i++) {

  var playlist = $("<button type = 'button' class = 'btn btn-light chosenPlaylist' data-playlistid =" + res.items[i].id + ">" + res.items[i].name + "</button>");

  $(".granted").append(playlist);

}
}

$(document).on("click", ".chosenPlaylist", playlistClick);

//kamakshi's**********************************
function addToPlayList() {
  alert("Please 1");
  // var params = getHashParams();
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);

  }
};
