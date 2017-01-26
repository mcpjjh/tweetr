/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(data) {
  data.forEach(function(tweetData) {
    let $tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend($tweet);
  })
}

function createTweetElement(tweetData) {
  let name = tweetData.user.name
  let avatar = tweetData.user.avatars.small
  let handle = tweetData.user.handle
  let content = tweetData.content.text
  let created_at = tweetData.created_at
  let html = `<article class="tweet-article">
                <header>
                  <img src=${avatar}>
                  <h2>${name}</h2>
                  <h4>${handle}</h4>
                </header>
                <p>${content}</p>
                <footer>
                 <div class="timestamp">
                   <h5>${created_at}</h5>
                 </div>
                  <div class="controls">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </div>
                </footer>
              </article>`
return html;
}

function loadTweets() {
  $.ajax( {
    url: '/tweets',
    method: 'GET'
  })
  .then((tweets) => {
    $('#tweets-container').empty();
    renderTweets(tweets)
  })
};

$(function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      if (document.getElementById("textInput").value == "") {
        alert("You have nothing entered!");
      } else if (document.getElementById("textInput").value.length > 140) {
        alert("You have exceeded the character limit!");
      } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()
      })
      .then(function() {
        loadTweets()
      })
      .fail((error) => {
        console.error(error)
      })
    }
  })
  loadTweets()
});

