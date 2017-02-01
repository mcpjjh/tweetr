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

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetData) {
  let name = tweetData.user.name
  let avatar = tweetData.user.avatars.small
  let handle = tweetData.user.handle
  let content = tweetData.content.text
  let created_at = $.timeago(tweetData.created_at)
  let html = `<article class="tweet-article">
                <header>
                  <img src="${escape(avatar)}">
                  <h2>${escape(name)}</h2>
                  <h4>${escape(handle)}</h4>
                </header>
                <p>${escape(content)}</p>
                <footer>
                 <div class="timestamp">
                   <h5>${escape(created_at)}</h5>
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
      if (document.getElementById("textInput").value == "" || document.getElementById("textInput").value == " ") {
        alert("You have nothing entered!");
      } else if (document.getElementById("textInput").value.length > 140) {
        alert("You have exceeded the character limit!");
      } else {
        $.ajax('/tweets', {
          method: 'POST',
          data: $(this).serialize()
        })
        .done(function(new_tweet) {
          $('#textInput').val('');
          $('.counter').text(140);
          // NOTE: reminder about preprending only a single tweet
          //       instead of reseting the entire tweets list
          // loadTweets();
          renderTweets([new_tweet]);
        })
        .fail((error) => {
          console.error(error)
        })
      }
  })

  loadTweets()
  $('#nav-bar .compose').on("click", function() {
    $('.new-tweet').slideToggle('300');
    $('.new-tweet textarea').focus()
  })

  // NOTE: no need to load tweets twice on page load, only once @ line #84 is good
  // loadTweets()

  // NOTE: to remove
  // $('#nav-bar .compose2').on("click", function() {
  //   $('.new-tweet').slideToggle('300');
  //   $('.new-tweet textarea').focus()
  // })
});
