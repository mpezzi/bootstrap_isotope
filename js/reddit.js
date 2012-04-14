(function($){

  $.fn.reddit = function(options) {
    var self = $(this), o = $.extend({}, $.fn.reddit.defaults, options), posts = [];

    $.getJSON(o.feed + '?jsonp=?', function(result){
      $.each(result.data.children, function(i, post){
        posts.push(post.data);

        if ( i + 1 == result.data.children.length ) {
          $('#reddit-post').tmpl(posts).appendTo(self);

          o.complete.call(self);
        }
      });
    });
  };

  $.fn.reddit.defaults = {
    feed: 'http://reddit.com/.json',
    complete: function() { }
  };

})(jQuery);