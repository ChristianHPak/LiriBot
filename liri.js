require("dotenv").config();

// variables
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios")
var moment = require("moment")
var file_name = "./log.txt";

// varriables user commands
var user_command = process.argv[2];



function concert_this() { //works
    var second_command = process.argv.splice(3).join("");
    // Run a request with axios to the queryUrl
    var queryUrl = "https://rest.bandsintown.com/artists/" + second_command + "/events?app_id=codingbootcamp"
    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (response) {
        console.log("Venue: " + response.data[0].venue.name);
        console.log("City: " + response.data[0].venue.city);
        console.log("Date of the event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    })

}

// spotify this song command
function spotify_this() { //works
    var spotify = new Spotify(keys.spotify);
    var second_command = process.argv.splice(3).join("+");
    var queryUrl = 'https://api.spotify.com/v1/search?type=track&limit=1&q=' + second_command;

    //     spotify
    //   .search({ type: 'track', query: second_command })
    //   .then(function(response) {
    //     console.log(JSON.stringify(response, null, 4));
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    spotify
        .request(queryUrl)
        .then(function (response) {
            var songData = response.tracks.items[0];
            console.log(songData)
            //artist
            console.log("Artist: " + songData.artists[0].name);
            //song name
            console.log("Song: " + songData.name);
            //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
            //album name
            console.log("Album: " + songData.album.name);
            console.log("-----------------------");

            // //adds text to log.txt
            // fs.appendFile('./log.txt', songData.artists[0].name);
            // fs.appendFile('./log.txt', songData.name);
            // fs.appendFile('./log.txt', songData.preview_url);
            // fs.appendFile('./log.txt', songData.album.name);
            // fs.appendFile('./log.txt', "-----------------------"); 
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}

function movie_this() { // works
    // Run a request with axios to the OMDB API
    var second_command = process.argv.splice(3).join("");
    var queryUrl = "http://www.omdbapi.com/?t=" + second_command + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl)

    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (response) {

        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("Rated: " + response.data.imdbRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
    })
}

// function do_what() {

//     fs.readFile("./random.txt", "utf8", function (err, response) {
//         if (err) return console.log("An Error Occurred: ", err)
//         console.log(response)
//         var txt = response.split(',').pop("")
//         console.log(txt[1])

//         spotify_this("I Want it That Way")
//     });
// }

// Choose a user_Command
switch (user_command) {

    case "concert-this":
        concert_this();
        break;

    case "spotify-this-song":
        spotify_this();
        break;

    case "movie-this":
        movie_this();
        break;

    case "do-what-it-says":
        do_what();
        break;

    default:
        return console.log("Uh-oh something went wrong")
}