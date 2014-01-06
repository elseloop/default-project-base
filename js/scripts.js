(function($){

  // expand the phone image on :hover
  $( '.teaser--img' ).hover( function(){
      $(this).addClass('expand');
    },
    function() {
      $(this).removeClass('expand');
    }
  );

  // add a click event to expand the phone image, since the icon's there...
  $( '.expando' ).on( 'click', function(){
    // $(this).css('top', '12px');
    $(this).closest('.teaser-block').find('.teaser--img').toggleClass('expand');
  });

  // accordions
  $('.accordion-trigger').on( 'click', function(e) {
    e.preventDefault();

    $(this).toggleClass('open');
    $(this).next( '.accordion' ).toggleClass( 'open' );

  });

})(jQuery);