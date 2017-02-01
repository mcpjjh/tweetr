"use strict";

// NOTE: generally, if you're not using a variable/object/module,
//       then you don't need it
// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = (db) => {
  const saveTweet = function(newTweet, callback) {
    // NOTE: instead of invoking the callback immediatly
    //       do it when the insert is done
    db.collection("tweets").insertOne(newTweet, callback);
    // NOTE: remove below
    // callback(null, true);
  };

  const getTweets = function(callback) {
  // NOTE: indentation
  db.collection("tweets").find({}).toArray(callback);
  };

  return {
    // Saves a tweet to `db`
    saveTweet: saveTweet,

    // NOTE: leave comment below, for reference
    // Get all tweets in `db`, sorted by newest first
    // getTweets: function(callback) {
    //   simulateDelay(() => {
    //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    //     callback(null, db.tweets.sort(sortNewestFirst));
    //   });

    getTweets: getTweets
  };
}


//only code that actually deals with the database
