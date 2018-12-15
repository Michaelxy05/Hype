var db = require("./models");
var request = require("request");
var fetch = require("node-fetch");




//This function will handle comparing down vote counts in our database to our delete count allowed
//==========================triggerDelete=========================================================
//
function triggerDelete(databaseID) {    
    //Set trigger delete once downVote 3
    var deleteCount = 3;
    db.Playlist.findOne({
        where: {id: databaseID}
    })

    .then(function (dbPlaylist) {
        console.log("sajhdkasjhfkjsdhfkjsd" + dbPlaylist);
        var theChosenOne = dbPlaylist.get({ plain: true });

        if (deleteCount > theChosenOne.downcount) {
            return
        } else {
            handleDeleteDB(databaseID);
            console.log("I am here , triggerDelete")
        }
    });
};

//This function will deleted/remove song from our database.Playlist
//==========handleDeleteDB=========================================

function handleDeleteDB(canBeAnything) {
    
    db.Playlist.destroy({
        where: {
            id: canBeAnything
        }
    }).then(function () {
        //res.json(dbPlaylist);
        console.log("I delete something")
    
    });

    handleDeleteSpotify(canBeAnything);
};
//This function will delete/remove song from Spotify API
//============handleDeleteSpotify=======================

function handleDeleteSpotify(spotifyID) {
    let trackURI
    db.Playlist.findOne({
        where: {
            id: spotifyID
    
        }
    }).then(function(data) {
        trackURI = "{ tracks: [{ uri:" + data.uri + "}]}";
            //{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" }]}
        console.log("This is the 0000000000000000000000000000000000000000" + trackURI);
        //const spotify = this.authorizeSpotify(Token);
        db.Token.findOne({
            where: {
                id: 1
            }
        }).then(function(anotherNameForWholeLine) {
            let at = anotherNameForWholeLine.accessToken;
            let p_id = anotherNameForWholeLine.playlistID;
            console.log(at);
            console.log("XXXXXX000000000XXXXXXXXXXXXXXX000000000" + p_id);
            //Fetch
            fetch(
                `https://api.spotify.com/v1/playlists/${p_id}/tracks`,
                {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${at}`
                  },
                  body:trackURI
                  //.uri call from DB???????????????????
                }
              )
                .then(response => response.json())
                .then(function(data) {
                  console.log("Deleted the track ********* " + data);
                  //  res.json(data.items);
                });
        })
        
    })

};




// removeTracksFromPlaylist: function(token, username, playlistId, tracks) {
//     const spotify = db.Token;
//     return new Promise((resolve, reject) => {
//       tracks = tracks.map(track => {
//         return { 'uri': track };
//       });
//       spotify.delete(spotifyID)
//       .then(data => resolve(data.snapshot_id))
//       .catch(err => reject(err));
//     });
// };
  


module.exports = triggerDelete;