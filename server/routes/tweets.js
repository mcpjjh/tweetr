"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // NOTE: add comments before routes, 1 sentence is good
  // ex: Loads all tweets within the database
  tweetsRoutes.get("/", (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      return res.status(400).json({
        error: 'invalid request: no data in POST body'
      });
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err, response) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(response.ops[0]);
      }
    });
  });

  return tweetsRoutes;

}
