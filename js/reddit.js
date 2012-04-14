(function($){

  $.reddit = function(options, cb) {
    var posts = [], o = $.extend({}, $.reddit.defaults, options);

    $.getJSON(o.api + '/' + o.subreddit + '.json?jsonp=?&limit=' + o.limit, function(result){
      $.each(result.data.children, function(i, post){
        // Create an absolute permalink containing the api url.
        post.data.permalink_absolute = o.api + post.data.permalink;

        // Append to posts array.
        posts.push(post.data);

        // Fire callback when finished parsing through posts.
        if ( i + 1 == result.data.children.length ) {
          cb.call(self, posts);
        }
      });
    });
  };

  $.reddit.defaults = {
    api: 'http://reddit.com',
    subreddit: '',
    limit: 20
  };

})(jQuery);