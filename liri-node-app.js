require("dotenv").config();
var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys")
var spotify = new Spotify(keys.spotify);
var artist = "";
var movie = "";
var song = "";

// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
// var queryURL2 = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=93424ac20331d7347e167872ae35997f";

inquirer.prompt([
    // Prompting the user to know what he/she is looking for.
    {
        type: "input",
        message: "Hi, what would you like me to call you?",
        name: "username"
      },
    //We ask about concerts
    {
      type: "input",
      message: "Great. Now, what concert are you looking for?",
      name: "artist"
    },
    // We ask about songs
    {
      type: "input",
      message: "Which songs is your favorite?",
      name: "song"
    },
    // We ask about movies.
    {
      type: "input",
      message: "How about a movie?",
      name: "movie"
    },
    {
        type: "input",
        message: "There's always Do-What-It-Says",
        name: "dowhatitsays"
      },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Doublecheking, are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.artist) {
        console.log("\nWelcome " + inquirerResponse.username);
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=93424ac20331d7347e167872ae35997f").then(
            function(response) {
              var date = moment(response.data[1].datetime).format("MM/DD/YYYY");
              console.log("Artist: " + response.artist.Title);
              console.log("Venue: " + response.data[1].venue.name);
              console.log("City: " + response.data[1].venue.city);
              console.log("Country: " + response.data[1].venue.country);
              console.log("Date: " + date);
            }
          );
      }

    if(inquirerResponse.song) {
        console.log("Here's your answer: " +inquirerResponse.song + "\n");
        if(inquirerResponse.song !== song){
            console.log("Here's your answer: "+ "The Sign" + "\n");
        }
      }
    
    if (inquirerResponse.movie) {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
              console.log("Title: " + response.movie.Title)
              console.log("Year: " + response.movie.Year)
              console.log("Rating: " + response.movie.imdbRating);
              console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2]);
              console.log("Country of Production: " + response.data.Country);
              console.log("Language: " + response.data.Language);
              console.log("Plot: " + response.data.Plot);
              console.log("Actors: " + response.data.Actors)
            }
          );
        if (inquirerResponse !== movie){
            axios.get("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy").then(
            function(response) {
            console.log("Here's an option: " + response + "\n");
            });
        }
      }


    if (inquirerResponse.confirm) {

      console.log("Here's your answer: " +inquirerResponse.dowhatitsays + "\n");
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    }
  });


// function Omdb(key){
//     this.key = key;

//     this.movie = search(title, callback){
//         axios.get("http://www.omdbapi.com/?apikey="+this.key + "&s=" + title).then(response => {
//             callback(response.data);
//         });

//     };
// // note &t= is adding the t property that omdb has to look for title specifically

//     this.concert = get(title){
//         axios.get(": https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0/?apikey="+this.key + "&t=" + title).then(response => {
//             callback(response.data);
//         });
//     }
// } 

// function Spotify(key){
//     this.key = key;

    // this.song = search(title, callback){
    //     axios.get("http://www.omdbapi.com/?apikey="+this.key + "&s=" + title).then(response => {
    //         callback(response.data);
    //     });
    //console.log("spotify " + song + "song");

    // };
// note &t= is adding the t property that omdb has to look for title specifically
//}

// divide by steps.start testing inquires first, then connect api to each inquiry via axios or function, and then have a result pushed with an if default for each, then a fs write to write to log, and fs read to read from random.

//inquire parts first

//application needs to take in the commands concert this and pull from the bandswith api the concert the name of the venue, location and date of the event, 

//then from the spotify this song  artist, songs name, preview lnk of the song from spotify, th ealbum that the song is from, and default else the sign by ace of base.

// then movie this command and grab from ombdb and give the movie, and retrieve title, year, imdb rating, rotten tomatoes rating, country where it was produced, language, plot, and actors. if user doesnt type a title the program will default to Mr. Nobody.

//then do what it says and (?). After add an fs package to read the text inside of random.txt 

// bonus is to add fs write to to logg data to terminal bash window via log.txt

