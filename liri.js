require("dotenv").config();

// variables
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios")
var moment = require("moment")

// varriables user commands
var user_command = process.argv[2];
var second_command = process.argv.splice(3).join("+");

function concert_this() { //works

    // Run a request with axios to the queryUrl
    var queryUrl = "https://rest.bandsintown.com/artists/" + second_command + "/events?app_id=codingbootcamp"

    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (response) {
        console.log("=============================");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("City: " + response.data[0].venue.city);
        console.log("Date of the event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("=============================");
    })
}

// spotify this song command
function spotify_this(second_command) { //works
    var spotify = new Spotify(keys.spotify);

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
            console.log("=============================");
            //artist
            console.log("Artist: " + songData.artists[0].name);
            //song name
            console.log("Song: " + songData.name);
            //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
            //album name
            console.log("Album: " + songData.album.name);
            console.log("=============================");
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}

function movie_this() { // works
    // Run a request with axios to the OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + second_command + "&y=&plot=short&apikey=trilogy";

    // Then create a response with axios to the queryUrl
    axios.get(queryUrl).then(function (response) {

        if (second_command === "Mr.Nobody" || second_command === "Mr.+Nobody") {
            console.log("=============================");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
            console.log("=============================");
        } else {
            console.log("=============================");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("=============================");
        }

    })

}

function do_what() { //works

    fs.readFile("./random.txt", "utf8", function (err, response) {
        if (err) return console.log("An Error Occurred: ", err)
        var song = response.split(',')
        console.log(song[1])

        spotify_this(song[1])
    });
}

// Choose a user_Command
switch (user_command) {

    case "concert-this":
        concert_this();
        break;

    case "spotify-this-song":
        if (second_command) {
            spotify_this(second_command);
        } else {
            spotify_this("I want it that way");
        }
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