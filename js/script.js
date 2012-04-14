$(function(){

  var $reddit = $('#reddit');

  $reddit.reddit({
    complete: function() {
      $reddit.isotope({
        itemSelector : '.item'
      });
    }
  });

  $(window).resize(function(){
    $reddit.isotope('reLayout');
  });

});