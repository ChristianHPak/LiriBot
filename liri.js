require("dotenv").config();

// variables
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios")
var file_name = "./log.txt";

// varriables user commands
var user_command = process.argv[2];
var second_command = process.argv.splice(3).join(" ");


function concert_this() { //works
    // Run a request with axios to the queryUrl
    var queryUrl = "https://rest.bandsintown.com/artists/" + second_command + "/events?app_id=codingbootcamp"
    console.log(queryUrl)
    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)

        console.log(response)
    })
}

// spotify this song command
function spotify_this() { //doesnt work
    var spotify = new Spotify(keys.spotify);
    console.log(spotify)
    spotify
        .search({
            type: 'track',
            query: 'All the Small Things'
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movie_this() { //works
    // Run a request with axios to the OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + second_command + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl)

    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)

        console.log(response)
    })
}

function do_what() {

    fs.readFile("./random.txt", "utf8", function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)

        console.log(response)
    });
}

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