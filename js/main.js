$(function () {
  $(".scroll-panel").jScrollPane();
  $("#news-articles").slidesjs({pagination: {active: false}, navigation: {active: false}});
  $("#news-articles .slidesjs-container").css({'height':'300px','margin-bottom':'7px'});
  $(".prod-show a").colorbox();

  $(".scroll-prods div").on('mouseover',function(){
    $(this).find(".image-overlay").hide();
  });
  $(".scroll-prods div").on('mouseout',function(){
    $(this).find(".image-overlay").show();
  });

});




//product scroll
$(function(){
  var scrollUlWidth = $(window).width()/4,
    scrollUlLeft = 0,
    prevAllow = true,
    nextAllow = true;
  scrollUlWidth = 330;
  $("#prod-prev").click(function() {
    if (prevAllow) {
      prevAllow = false;
      scrollUlLeft = scrollUlLeft - scrollUlWidth;
      $('.scroll-prods').css('left', scrollUlLeft);
      $('.scroll-prods div:last').clone().prependTo('.scroll-prods');
      $('.scroll-prods div:last').remove();
      $('.scroll-prods').animate({
        left : scrollUlLeft + scrollUlWidth
      }, 300, 'swing',function() {
        scrollUlLeft = parseInt($('.scroll-prods').css('left'), 10);
        prevAllow = true;
      })
    }
  });


  $('#prod-next').click(function() {
    if (nextAllow) {
      nextAllow = false;
      $('.scroll-prods').animate({
        left : scrollUlLeft - scrollUlWidth
      }, 300,'swing', function() {
        scrollUlLeft = parseInt($('.scroll-prods').css('left'), 10);
        scrollUlLeft = scrollUlLeft + scrollUlWidth;
        $('.scroll-prods').css('left', scrollUlLeft);
        $('.scroll-prods div:first').clone().appendTo('.scroll-prods');
        $('.scroll-prods div:first').remove();
        nextAllow = true;
      })
    }
  });

})