$('.jl-like-button').on('click', function() {
  $.post('/like', function(data) {
    console.log('like finsihed');
  });
});
