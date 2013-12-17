$(function () {
  $(".scroll-panel").jScrollPane();
  $("#news-articles").slidesjs({pagination: {active: false}, navigation: {active: false}});
  $("#news-articles .slidesjs-container").css({'height':'300px','margin-bottom':'7px'});
  $(".prod-show a").colorbox();
  $('#header .links a').smoothScroll();

  $("#province-sel").selectbox({classHolder:"sbHolder province-sel"});
  $("#store-sel").selectbox();

  $(".scroll-prods div").on('mouseover',function(){
    $(this).find(".image-overlay").hide();
  });
  $(".scroll-prods div").on('mouseout',function(){
    $(this).find(".image-overlay").show();
  });

  function adjHomeTextPos(){
    var left = $("#logo").offset().left;
    $("#new-prod-text,#new-prod-desc").css("left",left);
    $("#home-girl").css("left",left+350);
  }
  //resize
  $(window).resize(adjHomeTextPos);
  adjHomeTextPos();


});


//parallary
$(function(){
  $('#landing-1').parallax(0, 0.5,true);
  $('#landing-2').parallax(0, 0.5,true);

  $('#cookie-1').parallax(0, 0.5,true);
  $('#cookie-2').parallax(0, 0.5,true);
  $('#cookie-3').parallax(0, 0.5,true);
});






// loading progress

$(function(){
  var timer = setInterval(progress,100);
  var val = 0,progressEl = $(".greyscale"),progressTextEl = $(".progress-text");


  function progress(){
    val++;
    progressEl.css({height:(100-val)});
    progressTextEl.text(val+"%");
    if(val==100){
      clearInterval(timer);
    }
  }
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
      $('.scroll-prods div:last').clone(true,true).prependTo('.scroll-prods');
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
        $('.scroll-prods div:first').clone(true,true).appendTo('.scroll-prods');
        $('.scroll-prods div:first').remove();
        nextAllow = true;
      })
    }
  });
})