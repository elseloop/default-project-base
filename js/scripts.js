(function($){

  $( '.teaser--img' ).hover( function(){
      $(this).addClass('expand');
    },
    function() {
      $(this).removeClass('expand');
    }
  );

})(jQuery);