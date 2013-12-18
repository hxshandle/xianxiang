$(function () {
  $(".scroll-panel").jScrollPane();
  $("#about-summary").jScrollPane({verticalDragMaxHeight: 47});
  $(".prod-show a").colorbox();
  $('#header .links a').smoothScroll();

  $("#province-sel").selectbox({classHolder: "sbHolder province-sel"});
  $("#store-sel").selectbox();

  $(".scroll-prods div").on('mouseover', function () {
    $(this).find(".image-overlay").hide();
  });
  $(".scroll-prods div").on('mouseout', function () {
    $(this).find(".image-overlay").show();
  });

  function adjPos() {
    var left = $("#logo").offset().left;
    $("#new-prod-text,#new-prod-desc").css("left", left);
    $("#home-girl").css("left", left + 450);
    $("#about-girl").css("left", left);
    $("#about-cookie-4").css("left", left + 450);
    $(".about-summary-outer").css("left", left + 650);
  }

  //resize
  $(window).resize(adjPos);
  adjPos();

});


$(function () {
  $("#news-articles").slidesjs({pagination: {active: false}, navigation: {active: false}});
  $("#news-articles .slidesjs-container").css({'height': '300px', 'margin-bottom': '7px'});
  window.newsTitles=[];
  $("#news-articles .article").each(function(){
    newsTitles.push($(this).data("title"));
  });

  function updateNewsTitle(curIdx,offset){
    $("#article-title").text(newsTitles[curIdx]);
    if(curIdx+1 == newsTitles.length){
      $("#next-news").text(newsTitles[0]);
    }else{
      $("#next-news").text("NEXT:"+newsTitles[curIdx+1]);
    }
  }

  $("#news-nav-bar a.slidesjs-navigation").click(function () {
    var sliderObj = $("#news-articles").data().plugin_slidesjs.data;
    var offset = $(this).hasClass("slidesjs-next") ? 1 : -1;
    var curSliderNum = (sliderObj.current + offset) % sliderObj.total;
    updateNewsTitle(curSliderNum,offset);
  });
  updateNewsTitle(0);
});


//parallary
$(function () {
  $('#landing-1').parallax(0, 0.1, 800);
  $('#landing-2').parallax(0, 0.2, 1000);

  $('#cookie-1').parallax(0, 0.4, 800);
  $('#cookie-2').parallax(0, 0.4, 500);
  $('#cookie-3').parallax(0, 0.4, 300);
  $('#about-cookie-1').parallax(0, 0.4, 800);
  $('#about-cookie-2').parallax(0, 0.4, 500);
  $('#about-cookie-3').parallax(0, 0.4, 300);
});


// loading progress

$(function () {
  var timer = setInterval(progress, 100);
  var val = 0, progressEl = $(".greyscale"), progressTextEl = $(".progress-text");


  function progress() {
    val++;
    progressEl.css({height: (100 - val)});
    progressTextEl.text(val + "%");
    if (val == 100) {
      clearInterval(timer);
    }
  }
});


//product scroll
$(function () {
  var scrollUlWidth = $(window).width() / 4,
    scrollUlLeft = 0,
    prevAllow = true,
    nextAllow = true;
  scrollUlWidth = 330;
  $("#prod-prev").click(function () {
    if (prevAllow) {
      prevAllow = false;
      scrollUlLeft = scrollUlLeft - scrollUlWidth;
      $('.scroll-prods').css('left', scrollUlLeft);
      $('.scroll-prods div:last').clone(true, true).prependTo('.scroll-prods');
      $('.scroll-prods div:last').remove();
      $('.scroll-prods').animate({
        left: scrollUlLeft + scrollUlWidth
      }, 300, 'swing', function () {
        scrollUlLeft = parseInt($('.scroll-prods').css('left'), 10);
        prevAllow = true;
      })
    }
  });


  $('#prod-next').click(function () {
    if (nextAllow) {
      nextAllow = false;
      $('.scroll-prods').animate({
        left: scrollUlLeft - scrollUlWidth
      }, 300, 'swing', function () {
        scrollUlLeft = parseInt($('.scroll-prods').css('left'), 10);
        scrollUlLeft = scrollUlLeft + scrollUlWidth;
        $('.scroll-prods').css('left', scrollUlLeft);
        $('.scroll-prods div:first').clone(true, true).appendTo('.scroll-prods');
        $('.scroll-prods div:first').remove();
        nextAllow = true;
      })
    }
  });
})