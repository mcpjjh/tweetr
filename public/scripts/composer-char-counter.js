$(document).ready(function() {
  $('textarea').on('input', function(event) {
    let len = $(this).val().length;
    let $counter = $(this).siblings('.counter')
  characterCounter($counter, len);
  })
});

function characterCounter($counter, len) {
  let characRemaining = 140 - len;
    $counter.text(characRemaining);
    $counter.css("color", "black");
    if (characRemaining <= 0) {
      $counter.css("color", "red");
    }
}