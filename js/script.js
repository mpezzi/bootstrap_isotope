$(function(){

  var $posts = $('#posts');

  // Pull a list of posts from reddit
  $.reddit({ subreddit: '', limit: 20 }, function(data){

    // Append data to posts using the #post template.
    $('#post').tmpl(data).appendTo($posts);

    // Isotopize the posts.
    $posts.isotope({
      itemSelector : '.item'
    });

    // Append images to posts.
    setTimeout(function(){
      $.each(data, function(i, post){
        if ( typeof post.url !== 'undefined' && post.url.indexOf('imgur.com') != -1 && post.url.indexOf('.jpg') != -1 ) {
          $('<img class="imgur">').attr('src', post.url).load(function(){
            $(this).appendTo('#' + post.id + ' p.description').slideDown(function(){
              $posts.isotope('reLayout');
            });
          });
        }
      });
    }, 2500);

  });

  // Fire events on specific media query layout changes.
  mql('all and (max-width: 480px)', reLayout);
  mql('all and (max-width: 768px)', reLayout);
  mql('all and (min-width: 980px)', reLayout);
  mql('all and (min-width: 1200px)', reLayout);

  function reLayout(mql) {
    $posts.isotope('reLayout');
  }

});
