/*
 Plugin: jQuery Parallax
 Version 1.1.3
 Author: Ian Lunn
 Twitter: @IanLunn
 Author URL: http://www.ianlunn.co.uk/
 Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
  var tmp = 0;
  var $window = $(window);
  var windowHeight = $window.height();

  $window.resize(function () {
    windowHeight = $window.height();
  });

  $.fn.parallax = function (xpos, speedFactor, animateDue, isReverse, outerHeight) {
    var $this = $(this);
    var getHeight;
    var animateDue = animateDue || 0;
    var reverse = isReverse ? 1 : -1;
    var firstTop;
    var originalBackgroundPosY;
    var paddingTop = 0;

    //get the starting position of each element to have parallax applied to it
    $this.each(function () {
      firstTop = $this.offset().top;
      if($this.css("background-position")){
        originalBackgroundPosY = $this.css("background-position").split(" ")[1];
      }else{
        // fix IE issue;
        originalBackgroundPosY = $this.css("background-position-y");
      }
    });

    if (outerHeight) {
      getHeight = function (jqo) {
        return jqo.outerHeight(true);
      };
    } else {
      getHeight = function (jqo) {
        return jqo.height();
      };
    }

    // setup defaults if arguments aren't specified
    if (arguments.length < 1 || xpos === null) xpos = "50%";
    if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
    if (arguments.length < 3 || outerHeight === null) outerHeight = true;

    // function to be called whenever the window is scrolled or resized
    function update() {
      var pos = $window.scrollTop();

      $this.each(function () {
        var $element = $(this);
        var top = $element.offset().top;
        var height = getHeight($element);

        // Check if totally above or totally below viewport
        if (top + height < pos || top > pos + windowHeight) {
          return;
        }
        var adjPosY = Math.round((firstTop - pos) * speedFactor * reverse) + parseInt(originalBackgroundPosY);
        //$this.css('backgroundPosition', xpos + " " + adjPosY + "px");
        var ss = xpos + " " + adjPosY + "px";
        $this.stop().animate({"backgroundPosition": ss}, tmp,"easeOutQuart");
        tmp = animateDue;
      });
    }

    $window.bind('scroll', update).resize(update);
    update();
  };
})(jQuery);
