require("dotenv").config();

// variables
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios")

// varriables user commands
var user_command = process.argv[2];
var second_command = process.argv.splice(2).join(" ");

// spotify this song command
function spotify_this(song_name) {
    if (second_command === undefined) {
        second_command === "Tommorow (feat. Jason Lancaster)"
    }
    spotify.search({
        type: 'track',
        query: second_command
    }, function (err, data) {
        if (err) return console.log('Error occurred: ' + err);

        console.log(data);
    })
}

function movie_this() {
    // Run a request with axios to the OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + second_command + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl)

    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)
    })
    console.log(response)
}

function concert_this(){
    // Run a request with axios to the queryUrl
    var queryUrl = "https://rest.bandsintown.com/artists/" + second_command + "/events?app_id=codingbootcamp"

    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)
    })
    console.log(response)
}

function do_what(){
    
    fs.readFile("./random.txt", "utf8", function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)

        console.log(response)
    });
}