$(function () {
  var selTop, viewHeight, viewWidth;
  viewHeight = $(window).height();
  viewWidth = $(window).width();
  // for contact us toggleTop;
  var toggleTop = viewHeight + 6 * 880;
  var toggleEl = $("#contact-us-content");
  toggleEl.data("hasDisplay", false);

  // for tween view for contact us
  var scrollOffSet = 0;
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
    scrollOffSet = -500;
    $(".scroll-down").css("padding-top", "20px");
  }
  var scrollController = $.superscrollorama();
  scrollController.addTween("#contact-us-content", TweenMax.from($("#contact-us-content"), 1, {
    css: {
      opacity: "0",
      top: "50px"
    }
  }), 0, scrollOffSet);

  scrollController.addTween(".about-summary-outer", TweenMax.from($(".about-summary-outer"), 1, {
    css: {
      opacity: "0",
      top: "180px"
    }
  }));
  scrollController.addTween("#about-cookie-4", TweenMax.from($("#about-cookie-4"), 1, {
    css: {
      opacity: "0",
      top: "100px"
    }
  }), 0, 150);
  scrollController.addTween("#news-center .content-outer", TweenMax.from($("#news-center .content-outer"), 2, {
    css: {
      opacity: "0",
      top: "250px"
    }
  }));
  scrollController.addTween(".prod-outer", TweenMax.from($(".prod-outer"), 2, {
    css: {
      opacity: "0",
      top: "250px"
    }
  }));
  scrollController.addTween(".store-gallery", TweenMax.from($(".store-gallery"), 2, {
    css: {
      opacity: "0",
    }
  }), 0, 300);
  scrollController.addTween(".login", TweenMax.from($(".login"), 2, {
    css: {
      opacity: "0",
      top: "250px"
    }
  }));

  $(".scroll-panel").jScrollPane();
  $("#about-summary").jScrollPane({
    verticalDragMaxHeight: 47
  });
  $(".prod-show a").colorbox({
    rel: ".prod-show a"
  });
  $(".collocation-show a").colorbox({
    rel: ".collocation-show a"
  });
  $('#header .links a,.scroll-down a').smoothScroll();

  $("#province-sel").selectbox({
    classHolder: "sbHolder province-sel"
  });
  $("#store-sel").selectbox();

  var currentShowProd = null;
  var lastShowProd = null;

  $(".prod-show,.collocation-show,.video-show").on('mouseover', function () {
    var $this = $(this);
    if (null !== currentShowProd && currentShowProd.attr("id") != $this.attr("id")) {
      lastShowProd = currentShowProd;
      lastShowProd.find(".image-overlay").fadeIn(500);
      lastShowProd.find(".zoom,.video-pause").hide();
    }
    currentShowProd = $this;
    $this.find(".image-overlay").stop().fadeOut(500);
    $this.find(".zoom,.video-pause").show();
  });


  function adjPos() {
    //var left = $("#logo").offset().left;
    var left = viewWidth > 1000 ? (viewWidth - 1000) / 2 : 0;
    $("#new-prod-text,#new-prod-desc").css("left", left);
    $("#home-girl").css("left", left + 450);
    $("#about-cookie-4").css("left", left);
    $(".about-summary-outer").css("left", left + 700);
    selTop = viewHeight / 2 - 70;
    $("#select-menu").css("top", selTop + "px");
    var _vw = viewWidth;
    if (_vw < 1000) {
      _vw = 1000;
    }
    var titlePos = Math.ceil(_vw / 2 - 140);
    $(".container .title").css("left", titlePos + "px");

    if (viewHeight < 247) {
      $(".landing-outer").css("padding-top", "0px");
    } else {
      var _pt = viewHeight / 2 - 124;
      $(".landing-outer").css("padding-top", _pt + "px");
    }

  }

  function adjViewSize() {
    viewHeight = $(window).height();
    viewWidth = $(window).width();
    viewHeight = viewHeight < 550 ? 550 : viewHeight;
    toggleTop = viewHeight + 6 * 880 - 200;
    $("#landing .container").css("height", viewHeight + "px");
    $(".fly-header").css("top", viewHeight + "px");
    adjPos();

  }

  function toggleContactUs(scrollTop) {
    var toggleEl = $("#contact-us-content");
    var hasDisplay = toggleEl.data("hasDisplay");
    if (!hasDisplay && scrollTop > toggleTop) {
      toggleEl.data("hasDisplay", true);
      toggleEl.slideDown();
    }

    if (hasDisplay && scrollTop < toggleTop) {
      toggleEl.data("hasDisplay", false);
      toggleEl.hide();
    }

  }

  function adjScrollPos() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > viewHeight - 60) {
      $(".fly-header").css("top", scrollTop + "px");
      $(".fly-header").fadeIn(1000);
    } else {
      $(".fly-header").fadeOut(1000);
    }
    // select menu
    if (scrollTop - viewHeight / 2 > selTop && scrollTop - viewHeight / 2 < 700) {
      //$('#selcet-menu').stop().animate({top:(selTop+scrollTop-viewHeight)},1000);
      var newTop = selTop + scrollTop - viewHeight;
      $('#select-menu').stop().animate({
          "top": (newTop + "px")
        },
        1000);
      //$("#select-menu").css("top",(selTop+scrollTop-viewHeight)+"px");
    }
    //contact us
    //toggleContactUs(scrollTop);
  }

  //resize
  $(window).bind("scroll", adjScrollPos).resize(adjViewSize);
  $(window).bind("orientationchange", adjViewSize());

  adjViewSize();

});

$(function () {
  $("#news-articles").slidesjs({
    pagination: {
      active: false
    },
    navigation: {
      active: false
    }
  });

  $(".stores").slidesjs({
    pagination: {
      active: false
    },
    navigation: {
      active: false
    },
    height: 600
  });
  $("#news-articles .slidesjs-container").css({
    'height': '300px',
    'margin-bottom': '7px'
  });
  window.newsTitles = [];
  window.newsImages = [];
  $("#news-articles .article").each(function () {
    newsTitles.push($(this).data("title"));
    newsImages.push($(this).data("img"));
  });

  function updateNews(curIdx, offset) {
    $("#article-title").text(newsTitles[curIdx]);
    var imgUrl = newsImages[curIdx];
    $newsImg = $("#news-image");
    $newsImg.stop().fadeOut(500, function () {
      $newsImg.attr("src", imgUrl);
      $newsImg.fadeIn(500);
    });

    if (curIdx + 1 == newsTitles.length) {
      $("#next-news").text(newsTitles[0]);
    } else {
      $("#next-news").text("NEXT:" + newsTitles[curIdx + 1]);
    }
  }

  $("#news-nav-bar a.slidesjs-navigation").click(function () {
    var sliderObj = $("#news-articles").data().plugin_slidesjs.data;
    var offset = $(this).hasClass("slidesjs-next") ? 1 : -1;
    var curSliderNum = (sliderObj.current + offset) % sliderObj.total;
    updateNews(curSliderNum, offset);
  });
  updateNews(0);
});

//parallary
$(function () {
  $('#landing-1').parallax(0, 0.1, 1800);
  $('#landing-2').parallax(0, 0.2, 3000);

  $('#home-girl').parallax(0, 0.1, 1800);
  $('#cookie-1').parallax(0, 0.3, 1800);
  $('#cookie-2').parallax(0, 0.2, 2500, true);
  $('#cookie-3').parallax(0, 0.4, 1300);
  $('#about-cookie-1').parallax(0, 0.2, 1800);
  $('#about-cookie-2').parallax(0, 0.4, 2500);
  $('#about-cookie-3').parallax(0, 0.4, 1300);

  $('#news-center-cookie-1').parallax(0, 0.1, 2000, true);
  $('#news-center-cookie-2').parallax(0, 0.2, 800);
  $('#news-center-cookie-3').parallax(0, 0.4, 1500);
  $('#news-center-cookie-4').parallax(0, 0.2, 2800, true);
  $('#news-center-cookie-5').parallax(0, 0.4, 2000);
  $('#news-center-cookie-6').parallax(0, 0.4, 1300);

  $('#product-cookie-1').parallax(0, 0.3, 800);
  $('#product-cookie-2').parallax(0, 0.1, 500, true);
  $('#product-cookie-3').parallax(0, 0.2, 800);

  $('#store-cookie-1').parallax(0, 0.3, 300);
  $('#store-cookie-2').parallax(0, 0.3, 300);
  $('#store-cookie-3').parallax(0, 0.2, 700, true);
  $('#store-cookie-4').parallax(0, 0.1, 400, true);

  $('#login-cookie-1').parallax(0, 0.3, 2800);
  $('#login-cookie-2').parallax(0, 0.1, 2500, true);
  $('#login-cookie-3').parallax(0, 0.2, 1800);

});

// loading progress
$(function () {
  var timer = setInterval(progress, 100);
  var val = 0,
    progressEl = $(".greyscale"),
    progressTextEl = $(".progress-text");

  function progress() {
    val++;
    progressEl.css({
      height: (100 - val)
    });
    progressTextEl.text(val + "%");
    if (val == 100) {
      clearInterval(timer);
    }
  }
});

//product scroll
$(function () {

  // product switcher

  $(".prod-switcher").click(function () {
    var $this = $(this);
    if ($this.hasClass("active")) {
      return;
    }
    var lastSlider = $(".prod-switcher").filter(".active").data("slider-name");
    var sliderName = $this.data("slider-name");
    $(".prod-switcher").filter(".active").removeClass("active");
    $this.addClass("active");
    $("." + lastSlider).stop().fadeOut(400, function () {
      $("." + sliderName).fadeIn();
    });
  });


  // prod video
  /*
   $('video').mediaelementplayer({
   videoWidth: 713,
   videoHeight: 530,
   success: function (media, node, player) {
   console.log(node);
   console.log(player);
   var $media = $(media);
   $media.on("play", function () {
   _onVideoPlay(media, player);
   });
   }
   });
   */


  var videoOptions = {
    videoWidth: 713,
    videoHeight: 530,
    enableAutosize: true
  };


  // on video click
  $(".video-play").click(function () {
    var $this = $(this);
    var videoSrc = $this.data("source");
    var poster = $this.data("poster");
    var videoTemplate = '<video id = "video-player" width="713" height="530" poster="' + poster + '" controls="controls" preload="none">';
    videoTemplate += '<source type="video/mp4" src="' + videoSrc + '"/>';
    videoTemplate += '<object width="713" height="530" type="application/x-shockwave-flash" data="/sites/xianxiang/player/flashmediaelement.swf">';
    videoTemplate += '<param name="movie" value="/sites/xianxiang/player/flashmediaelement.swf"/>';
    videoTemplate += '<param name="flashvars" value="controls=true&file=http://repo.maomaomikt.com/sites/xianxiang/' + videoSrc + '"/>';
    videoTemplate += '<img src="' + poster + '" width="713" height="530" title="No video playback capabilities"/>';
    videoTemplate += '</object>';
    videoTemplate += '</video>';
    $.colorbox({html: videoTemplate, onComplete: function () {
      var player = new MediaElementPlayer('#video-player', videoOptions);
      //player.pause();
      //player.play();
    }});

  });

  function changeVideoBg() {
    var $this = $(this);
    var bgImg = $this.data("poster");
    var bg = "url(" + bgImg + ") no-repeat center center";
    $this.css("background", bg);
  }


  var scrollUlWidth = $(window).width() / 4,
    scrollUlLeft = 0,
    prevAllow = true,
    nextAllow = true;
  $(".scroll-nav-prev").click(function () {
    if (prevAllow) {
      prevAllow = false;
      var $this = $(this);
      var refClass = "." + $this.data("ref");
      var scrollUlWidth = parseInt($(refClass + " img").css("width"));
      scrollUlLeft = scrollUlLeft - scrollUlWidth;
      $(refClass).css('left', scrollUlLeft);
      $(refClass + ' div:last').clone(true, true).prependTo(refClass);
      $(refClass + ' div:last').remove();
      $(refClass).animate({
          left: scrollUlLeft + scrollUlWidth
        },
        300, 'swing', function () {
          scrollUlLeft = parseInt($(refClass).css('left'), 10);
          prevAllow = true;
        })
    }
  });

  $('.scroll-nav-next').click(function () {
    if (nextAllow) {
      var $this = $(this);
      var refClass = "." + $this.data("ref");
      var scrollUlWidth = parseInt($(refClass + " img").css("width"));
      nextAllow = false;
      $(refClass).animate({
          left: scrollUlLeft - scrollUlWidth
        },
        300, 'swing', function () {
          scrollUlLeft = parseInt($(refClass).css('left'), 10);
          scrollUlLeft = scrollUlLeft + scrollUlWidth;
          $(refClass).css('left', scrollUlLeft);
          $(refClass + ' div:first').clone(true, true).appendTo(refClass);
          $(refClass + ' div:first').remove();
          nextAllow = true;
        })
    }
  });
})

$(function () {
  var cur_page = 0;

  function changePicture(index) {
    $('.sel').removeClass('selc').filter('.sel:eq(' + index + ')').addClass('selc');
    cur_page = index;
    var url = "img/cookies/home-girl-" + index + ".png";
    var newImgWidth = 700;
    var tmpImg = new Image();
    tmpImg.src = url;
    tmpImg.onload = function () {
      newImgWidth = this.width;
    }
    tmpImg.src = url;
    //$("#home-girl").fadeOut(500).css("width",newImgWidth+"px").css("background", "url(" + url + ") no-repeat").fadeIn(500);
    $("#home-girl").stop().fadeOut(800, "swing", function () {
      $("#home-girl").css("width", newImgWidth + "px").css("background", "url(" + url + ") no-repeat").fadeIn(800);
    });
  }

  $('.sel').each(function (index, element) {

    $(this).click(function () {
      //clearInterval(timer);
      //timer=setInterval(loop,galLoop);
      if (cur_page == index) {
        return;
      }
      changePicture(index);
    });
    $(this).hover(function () {
        $('.balloon').stop().fadeTo(300, 0).filter('.balloon:eq(' + index + ')').stop().fadeTo(400, 1);
      },
      function () {
        $('.balloon').stop().fadeTo(300, 0);
      });
  });
  $('.balloon').hide();
});

