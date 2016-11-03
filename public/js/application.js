$('.jl-like-button').on('click', function() {
  $.post('/like', function(data) {
    $('.jl-like-button').text('LIKES: ' + data.likeCount);
    console.log(data.likeCount);
    console.log('like finsihed');

  });
});
