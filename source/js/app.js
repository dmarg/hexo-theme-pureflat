$(document).ready(function () {
    init();
    var flip = 0;
    $("#menuLink").click(function(event){
        event.preventDefault();
        $(".content-header").toggle( flip++ % 2 === 0 );
    });
    $('.post').getReadingTime();
});

$(window).resize(function () {
});

function init(){
    $(".sidebar").niceScroll();
    $(".post-description img").parent("a").addClass("fancybox");
    $(".fancybox").fancybox();
}


// jQuery Reading Time
(function ($, window, document, undefined) {

  if (window.location.pathname.split('/')[1] === 'post') {

    var pluginName = "getReadingTime";

    var defaults = {
      bubble: '#scrollbubble'
    };

    function Plugin(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
      this.scroll_timer = null;
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    Plugin.prototype = {
      init: function () {
        $(window).scroll($.proxy(this.updateTime, this));
        $('<div id="scrollbubble"></div>').appendTo("body");
        $('<style>#scrollbubble{display:none;position:fixed;top:0;right:20px;z-index:500;background-color:rgba(0, 0, 0, 0.75);color:#fff;border-radius:3px;font-family:"Open Sans", sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:10px 8px}#scrollbubble:after{content:" ";position:absolute;top:50%;right:-8px;height:0;width:0;margin-top:-4px;border:4px solid transparent;border-left-color:rgba(0, 0, 0, 0.75)}</style>').appendTo('body');
      },
      updateTime: function () {
        var total_reading_time = 0,
          bubble = $(this.options.bubble),
          post_content = $(this.element);
        var viewportHeight = $(window).height(),
         scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
         progress = $(window).scrollTop() / ($(document).height() - viewportHeight),
         distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - bubble.height() / 2;
        var total_reading_time = this.calculate_total_time_words(post_content, this.element) / 60;
        var total_reading_time_remaining = Math.ceil(total_reading_time - (total_reading_time * progress));
        var text = '';

        if(total_reading_time_remaining > 1) {
          text = total_reading_time_remaining + ' minutes left';
        } else if (progress >= 0.90) {
          text = 'Thanks for reading';
        } else if (total_reading_time_remaining <= 1) {
          text = 'Less than a minute';
        }

        bubble
          .css('top', distance)
          .text(text)
          .fadeIn(100);

        // Fade out the annotation after 1 second of no scrolling.
        if (this.scroll_timer !== null) {
          clearTimeout(this.scroll_timer);
        }

        this.scroll_timer = setTimeout(function() {
          bubble.fadeOut();
        }, 1000);
      },
      calculate_total_time_words: function(post_content, element){
        var total = 0;
        post_content.each(function() {
          total += Math.round(60*$(element).text().split(' ').length/250); // 250 = number of words per minute
        });

        return total;
      }
    };

    $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  }
})(jQuery, window, document);