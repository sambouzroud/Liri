var keys = require("./keys.js");
var twitter = keys.twitterKeys;


var command = process.argv[2];
var query = process.argv[3];



var myTweets = function() {
	
	var Twitter = require('twitter');

	
	var client = new Twitter({
		consumer_key: twitter.consumer_key,
		consumer_secret: twitter.consumer_secret,
		access_token_key: twitter.access_token_key,
		access_token_secret: twitter.access_token_secret
	});

	
	var params = {
		screen_name: 'sam bouzroud',
		count: 4
	};

	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) {
			console.log('Error occurred: ' + error);
		} else { 
	  	console.log("My 20 Most Recent Tweets");
	  	console.log("");

	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i].created_at);
	  		console.log("");
	  	}
	  }
	});
}

var spotifyThisSong = function(trackQuery) {
	
	var spotify = require('node-spotify-api');

	
	if(trackQuery === undefined) {
		trackQuery = "nothing else matter";
	}

	
	spotify.search({ type: 'track', query: trackQuery }, function(error, data) {
	    if(error) { 
	        console.log('Error occurred: ' + error);
	    } else { 
				for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
					if(i === 0) {
						console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
					} else {
						console.log("              " + data.tracks.items[0].artists[i].name);
					}
				}
				console.log("Song:         " + data.tracks.items[0].name);
				console.log("Preview Link: " + data.tracks.items[0].preview_url);
				console.log("Album:        " + data.tracks.items[0].album.name);
	    }
	 
	 		
	});
}

var movieThis = function(movieQuery) {
	
	var request = require("request");

	
	if(movieQuery === undefined) {
		movieQuery = "mr nobody";
	}

	
	request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json", function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    console.log("* Title of the movie:         " + JSON.parse(body).Title);
	    console.log("* Year the movie came out:    " + JSON.parse(body).Year);
	    console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
	    console.log("* Country produced:           " + JSON.parse(body).Country);
	    console.log("* Language of the movie:      " + JSON.parse(body).Language);
	    console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
	    console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

	    
	    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
	    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
	    		if(JSON.parse(body).Ratings[i].Website !== undefined) {
	    			console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
	    		}
	    	}
	    }
	  }
	});
}


if(command === "my-tweets") {
	myTweets();
} else if(command === "spotify-this-song") {
	spotifyThisSong(query);
} else if(command === "movie-this") {
	movieThis(query);
} else if(command === "do-what-it-says") {
	
	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(error, data) {
		var command;
		var query;

		
		if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			command = dataArr[0];
			query = dataArr[1];
		} else {
			command = data;
		}

		
		if(command === "my-tweets") {
			myTweets();
		} else if(command === "spotify-this-song") {
			spotifyThisSong(query);
		} else if(command === "movie-this") {
			movieThis(query);
		} else { 
			console.log("Command from file is not a valid command! Please try again.")
		}
	});
} else if(command === undefined) { 
	console.log("Please enter a command to run LIRI.")
} else { 
	console.log("Command not recognized! Please try again.")
}