$(document).ready(function() {
    // determine appearance/disapearance of scroll up button on window scroll
    $(window).scroll(function() {

      if ($(window).scrollTop() > 100) {
        $('.scroll-up').show();
        $('.scroll-up').click(function() {
          $(document).scrollTop(0);
        });
      }
      if ($(window).scrollTop() <= 100) {
        $('.scroll-up').hide();
      }
    });
})
