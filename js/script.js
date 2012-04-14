$(function(){

  // Fire events on specific media query layout changes.
  mql('all and (max-width: 480px)', reLayout);
  mql('all and (max-width: 768px)', reLayout);
  mql('all and (min-width: 980px)', reLayout);
  mql('all and (min-width: 1200px)', reLayout);

  var $subreddits = $('#subreddits li a'),
      $posts = $('#posts');

  $(window).hashchange(function(){
    load(location.hash.replace('#', ''), 50);
  });

  function load(subreddit, limit) {
    clear();

    $('#subreddits li').removeClass('active');
    $('#subreddits li a[href="#' + subreddit.toLowerCase() + '"]')
      .parent().addClass('active');

    $('#subreddit span.subreddit').text(subreddit);

    $.reddit({ subreddit: subreddit, limit: limit }, function(data){

      // Append data to posts using the #post template.
      $('#post').tmpl(data).appendTo($posts);

      // Isotopize the posts.
      $posts.isotope({
        itemSelector : '.item'
      });

      // Look for images and append to posts after isotope has initiated
      setTimeout(function(){
        $.each(data, function(i, post){
          if ( typeof post.url !== 'undefined' && post.url.indexOf('.jpg') != -1 ) {
            $('<img class="image">').attr('src', post.url).wrap('<div class="image">').load(function(){
              $(this).appendTo('#' + post.id + ' div.well').slideDown(function(){
                $posts.isotope('reLayout');
              });
            });
          }
        });
      }, 2500);

    });
  }

  function clear() {
    $posts.isotope('destroy').empty();
  }

  function reLayout(mql) {
    $posts.isotope('reLayout');
  }

  // Load front page of reddit on load.
  load(location.hash.replace('#', ''), 50);

});
