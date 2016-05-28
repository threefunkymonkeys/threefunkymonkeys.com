jQuery(document).ready(function() {
  // module connectors configuration
  "use strict";

  var mods = jQuery('.mod').toArray();

  for (var i = 0; i < mods.length; i++) {
    var mod = mods[i];
    jQuery(mod).attr('data-connectors', '1');
  };

});

// extend Tc.Module Class
Tc.Module = Tc.Module.extend({
  onInitStyle: function(data) {
    var $ctx = this.$ctx;

    if(data['color_scheme']) {
      $ctx.removeClass(/colorScheme.+/);
      $ctx.addClass("colorScheme"+Tc.Utils.String.capitalize(data['color_scheme']));
    }

  }
});

jQuery.extend({
  randomColor: function() {
    return '#' + Math.floor(Math.random()*256*256*256).toString(16);
  }
});

(function(removeClass) {
  "use strict";

  jQuery.fn.removeClass = function(value) {
    if(value && typeof value.test === 'function') {
      for(var i = 0; i < this.length; i++) {
        var elem = this[i];
        if( elem.nodeType === 1 && elem.className ) {
          var classNames = elem.className.split(/\s+/);
          for(var n = 0; n < classNames.length; n++) {
            if(value.test(classNames[n])) {
              classNames.splice(n, 1);
            }
          }
          elem.className = jQuery.trim(classNames.join(" "));
        }
      }
    } else {
      removeClass.call(this, value);
    }

    return this
  }
})(jQuery.fn.removeClass);

jQuery(document).ready(function() {
  "use strict";
  jQuery('html').removeClass('no-js');
});

jQuery(document).foundation();


(function($) {
  "use strict";
  $(document).ready(function() {

    var videos = $('video').toArray();
    for (var i = 0; i < videos.length; i++) {
      videos[i].muted = true;
    };

    $('.fadeinleft, .fadeinright, .fadein, .popin').appear(function() {
      var delay = $(this).data('delay');
      var that = this;

      setTimeout(function() {
        $(that).addClass('appear');
      }, delay)

    });


    $(window).scroll(function() {

      var scroll = $(window).scrollTop();

      if ( scroll >= 40 ) {
        $('body').addClass('shrink');
      } else {
        $('body').removeClass('shrink');
      }

    });

    $('form#contact_form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: '/contact',
          data: $(form).serialize(),
          success: function(data) {
            if(data.match(/success/)) {
              $(form).trigger('reset');
              $('#thanks').show().fadeOut(5000);
            }
          }
        });
        return false;
      }
    });

    if($('.masonry-container').length > 0) {

      var masonryContainers = $('.masonry-container').toArray();

      for (var i = 0; i < masonryContainers.length; i++) {
        var container = masonryContainers[i];

        // initialize Masonry after all images have loaded
        $(container).imagesLoaded(function() {

          setTimeout(function() {
            window.msnry = new Masonry($(container)[0], {
              itemSelector: '.mod',
              // columnWidth: '.mod',
              gutter: 30
            });

            // window.msnry.layout();

          }, 10);

        });

      };

    }


    // onepage nav scroll
    if ( $("nav.top-bar.onepage").length > 0 ) {
      $('.top-bar-section a[href=#top]').closest('li').addClass('active');

      var ctx = $("nav.top-bar.onepage");

      // var headerHeight = ctx.height();
      // $(window).scroll(function() {
      //   headerHeight = ctx.height();
      //   console.log(headerHeight);
      // });
      var headerHeight = 59;

      // use to mark whether the scrolling is caused by clicking
      var clickScrolling = false;
      // cache for current anchor id
      var currentAnchorId;

      $('.top-bar-section a', ctx).on('click', function(event) {
        $('.top-bar-section a', ctx).closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        clickScrolling = true;
        // console.log($(this).attr('href').offset());
        try {
          if ( $(this).attr('href') == '#top' ) {
            var distance = 0
          } else {
            var distance = $($(this).attr('href')).offset().top - headerHeight + 'px';
          }

          // console.log(distance);

          $('html, body').stop().animate({
            scrollTop: distance
          }, { duration: 1200, easing: "easeInOutExpo", complete: function() { clickScrolling = false; } });
          event.preventDefault();
        } catch(e) {}
      });


      // hightlight nav when scrolling
      var anchors = $('.top-bar-section a', ctx).map(function() {
        var anchor = $($(this).attr('href'));
        if(anchor.length) { return anchor; }
      });

      $(window).scroll(function() {
        if(clickScrolling) return false;

        var fromTop = $(this).scrollTop();
        var passedAnchors = anchors.map(function() {
          // add 1 to make the current nav change 1px before it should when scrolling top to bottom
          if(fromTop + headerHeight + 1 >= $(this).offset().top)
            return this;
        });
        // get the last anchor in the passedAnchors as the current one
        var currentAnchor = passedAnchors[passedAnchors.length - 1];
        if(currentAnchor) {
          if(currentAnchorId !== currentAnchor.attr('id')) {
            currentAnchorId = currentAnchor.attr('id');
            $('.top-bar-section a', ctx).closest('li').removeClass('active');
            $('.top-bar-section a[href=#'+currentAnchorId+']', ctx).closest('li').addClass('active');
          }
        }

      });


    }


  });
})(jQuery);
(function($) {
  Tc.Module.BarGraph = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var bars = $(".bars", $ctx).toArray();

      for (var i = 0; i < bars.length; i++) {
        var bar = bars[i];

        var highlights = $('> li > .highlighted', $(bar)).toArray();

        for (var j = 0; j < highlights.length; j++) {
          var hightlight = highlights[j];

          $(hightlight).appear(function() {
            var percent = $(this).attr("data-percent");
            // $bar.html('<p class="highlighted"><span class="tip">'+percent+'%</span></p>');
            // http://stackoverflow.com/questions/3363035/jquery-animate-forces-style-overflowhidden
            $(this).animate({
              'width': percent + '%'
            }, 1700, function() { $(this).css('overflow', 'visible'); });
          });

        };

      };

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BlogPost = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      if($ctx.find('img, .images').length == 0) {
        $ctx.addClass('no-media');
      }

      $('.images', $ctx).slick({
        autoplay: true,
        pauseOnHover: false,
        dots: true,
        speed: 1500,
        arrows: false
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BoxedSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $('.slides', $ctx).slick({
        autoplay: true,
        pauseOnHover: false,
        dots: true,
        speed: 1500,
        arrows: false
      });

      $ctx.css('maxHeight', 'initial');

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BoxedTextSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;


      $('.boxes', $ctx).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 568,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CallToAction = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Clients = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var slides_to_show = $ctx.data('slides_to_show');

      $('.clients', $ctx).slick({
        slidesToShow: slides_to_show,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.DefaultSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.sequence-min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var options = {
        nextButton: true,
        prevButton: true,
        autoPlay: true,
        autoPlayDelay: 3000,
        pauseButton: true,
        cycle: true,
        // preloader: true,
        animateStartingFrameIn: true,
        pagination: true,
        reverseAnimationsWhenNavigatingBackwards: true,
        preventDelayWhenReversingAnimations: true,
        fadeFrameWhenSkipped: false,
        swipeEvents: {
          left: "next",
          right: "prev"
        },
        pauseOnHover: false
      }

      var autostop = $('.sequence', $ctx).data('autostop') == 'on' ? true : false;
      var timeout = $('.sequence', $ctx).data('timeout');

      if ( timeout == '0' ) {
        options.autoPlay = false;
      } else {
        options.autoPlay = true;
        options.autoPlayDelay = parseInt(timeout, 10);
      }

      if ( autostop ) {
        options.autoStop = true;
      } else {
        options.autoStop = false;
      }

      // console.log(options);

      var sequence = $(".sequence", $ctx).sequence(options).data("sequence");
      sequence.beforeCurrentFrameAnimatesOut = function() {
        var sequence = this;
        var removeStatic = function() {
          jQuery(".frame.static").removeClass('static');
          if ( !window.sequenceAutoStarted && sequence.settings.autoPlay ) {
            sequence.startAutoPlay(sequence.settings.autoPlayDelay);
            window.sequenceAutoStarted = true;
          }
        }
        setTimeout(removeStatic, 1000);

        // when the next frame is the last one
        if ( sequence.nextFrameID == sequence.frames.length && options.autoStop ) {
          // console.log(sequence.nextFrameID);
          sequence.stopAutoPlay();
        }

      }


    }
  })
})(Tc.$);
(function($) {
  Tc.Module.FullscreenSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var fullscreen_slide = function() {
        $('.fullscreen_slideshow', $ctx).width($(window).width());
        if( $ctx.hasClass('force')) {
          $('.fullscreen_slideshow', $ctx).height($(window).height());
        } else {
          $('.fullscreen_slideshow', $ctx).height($(window).height() - $('.top-bar').height());
        }
      }

      fullscreen_slide();

      $(window).on('resize', fullscreen_slide);

      var options = {
        nextButton: true,
        prevButton: true,
        autoPlay: false,
        autoStop: true,
        autoPlayDelay: 3000,
        pauseButton: true,
        cycle: true,
        // preloader: true,
        animateStartingFrameIn: true,
        pagination: true,
        reverseAnimationsWhenNavigatingBackwards: true,
        preventDelayWhenReversingAnimations: true,
        fadeFrameWhenSkipped: false,
        swipeEvents: {
          left: "next",
          right: "prev"
        },
        pauseOnHover: false
      }

      var autostop = jQuery('.fullscreen_slideshow', $ctx).data('autostop') == 'on' ? true : false;
      var timeout = jQuery('.fullscreen_slideshow', $ctx).data('timeout');

      if ( timeout == '0' || !timeout ) {
        options.autoPlay = false;
      } else {
        options.autoPlay = true;
        options.autoPlayDelay = parseInt(timeout, 10);
      }


      if ( autostop ) {
        options.autoStop = true;
      } else {
        options.autoStop = false;
      }

      var fullscreen = jQuery(".fullscreen_slideshow", $ctx).sequence(options).data("sequence");

      fullscreen.beforeCurrentFrameAnimatesOut = function() {
        var sequence = this;
        var removeStatic = function() {
          jQuery(".frame.static").removeClass('static');

          if ( !window.fullSequenceAutoStarted && sequence.settings.autoPlay ) {
            sequence.startAutoPlay(sequence.settings.autoPlayDelay);
            window.fullSequenceAutoStarted = true;
          }
        }
        setTimeout(removeStatic, 1000);
        // when the next frame is the last one
        if ( sequence.nextFrameID == sequence.frames.length && options.autoStop ) {
          sequence.stopAutoPlay();
        }
      }

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Gallery = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      // function pixelized_dimensions(resize) {
      //   $('.item > a', $ctx).css({
      //     width: '99%',
      //     height: 'auto'
      //   });

      //   if(resize) {
      //     $('.item > a', $ctx).css({
      //       width: Math.floor($('.item > a', $ctx).width()),
      //       height: Math.floor($('.item > a', $ctx).height())
      //     });
      //   }
      // }

      // pixelized_dimensions($.browser.mozilla);

      // if(!$.browser.msie) {
      //   var timer;
      //   $(window).resize(function() {
      //     clearTimeout(timer);
      //     timer = setTimeout(function() {
      //       pixelized_dimensions(true);
      //     }, 100);
      //   });
      // }

      $('.gallery-nav ul li a', $ctx).on('click', function() {

        $('.gallery-nav ul li').removeClass('current');
        $(this).closest('li').addClass('current');

        var cat = $(this).attr('data-cat');

        var gallery = $('.gallery-nav').closest('.modGallery').find('ul.gallery');

        if (cat === 'all') {
          $('li', gallery).removeClass('hidden');
        } else {

          var lis = $('li', gallery).toArray();

          for (var i = 0; i < lis.length; i++) {
            var li = lis[i];

            if ($(li).hasClass(cat)) {
              $(li).removeClass('hidden');
            } else {
              $(li).addClass('hidden');
            }

          };

        }

        return false;

      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.IconText = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.MasonryGallery = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var items = $('.gallery li', $ctx).toArray();

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        $(this).data('masonry-id', i);
      };

      var msnry = new Masonry($('.gallery')[0], { itemSelector: 'li', gutter: 0, isInitLayout: false });

      window.msnry = msnry;

      $('.gallery', $ctx).imagesLoaded( function() {
        // setTimeout(function() {})
        // console.log($('#main').width());
        // console.log($('body').width());
        // console.log($('.gallery').width());
        msnry.layout();
      });

      $('.gallery-nav ul li a', $ctx).on('click', function() {

        $('.gallery-nav ul li').removeClass('current');
        $(this).closest('li').addClass('current');

        var cat = $(this).attr('data-cat');

        var gallery = $('.gallery-nav').closest('.mod').find('ul.gallery');

        if (cat === 'all') {

          // msnry.reveal(masonryItems);
          // TODO:
          // 1. remove all
          // 2. add all
          //

          var exists = $('.gallery li', $ctx).toArray();
          // console.log(exists);
          var elems = [];

          for (var i = 0; i < items.length; i++) {
            var item = items[i];

            var skip = false;

            for (var i = 0; i < exists.length; i++) {
              var exist = exists[i];

              if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
                skip = true;
              }
            };

            if (!skip) {
              ($('.gallery', $ctx)[0]).appendChild($(this)[0]);
              elems.push($(this)[0]);
            }
          };

          msnry.prepended(elems);

        } else {

          var lis = $('li', gallery).toArray();

          for (var i = 0; i < lis.length; i++) {
            var li = lis[i];

            if (!$(li).hasClass(cat)) {
              msnry.remove($(li));
            }

          };


          var exists = $('.gallery li', $ctx).toArray();
          var elems = [];

          for (var i = 0; i < items.length; i++) {
            var item = items[i];

            var skip = false;


            for (var i = 0; i < exists.length; i++) {
              var exist = exists[i];

              if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
                skip = true;
              }
            };

            if ( $(this).hasClass(cat) && !skip) {
              ($('.gallery', $ctx)[0]).appendChild($(this)[0]);
              elems.push($(this)[0]);
            }

          };

          msnry.appended(elems);

        }

        msnry.layout();

        // console.log(items);

        return false;

      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Milestone = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.appear.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $ctx.appear(function() {
        $('strong', $ctx).countTo({
          speed: 1400
        });
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.PriceBox = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.SectionHeader = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.StylePanel = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.cookie.js', 'plugin', 'onBinding');
      // this.require('json2.js', 'plugin', 'onBinding');
      // this.require('jquery.url.js', 'plugin', 'onBinding');
    },
    setCookie: function(key, value) {
      var cookie = JSON.parse($.cookie('orig_html') || '{}') || {};
      cookie[key] = value;
      $.cookie('orig_html', JSON.stringify(cookie), { expires: 7, path: '/' });
    },
    readCookie: function(key) {
      var cookie = JSON.parse($.cookie('orig_html') || '{}') || {};
      if(key) {
        return cookie[key];
      } else {
        return cookie;
      }
    },
    reloadMod: function() {
      // to make css pie work

      var mods = $('.ie8 .mod *').toArray();

      for (var i = 0; i < mods.length; i++) {
        var mod = mods[i];

        var klass = $(mod).attr('class');
        $(mod).attr('class', klass);
      };

    },
    afterBinding: function() {
      // $.cookie('orig_html', null);
      var $ctx = this.$ctx;

      if(this.readCookie('bg_pattern')) {
        $('body').removeClass(/pattern\-\d+/);
        $('body').addClass(this.readCookie('bg_pattern'));
      }

      if(this.readCookie('color_scheme')) {
        $('body').removeClass(/colorScheme.+/);
        $('body').addClass("colorScheme"+Tc.Utils.String.capitalize(this.readCookie('color_scheme')));
      }

      var path = window.location.pathname;


        if ( path.match(/^\/wrap(\/)?(\/\w+\.html)?$|(\/demo\-[2-3])/) ) {


        var color_scheme = this.readCookie('color_scheme');

        // console.log(color_scheme);
        var path = $('.title-area .name img').attr('src').split('/').slice(0, -1).join('/');

        if ( !color_scheme || color_scheme == 'yellow' ) {
          $('.title-area .name img').attr('src', path + '/' + 'logo.png');
        } else {
          $('.title-area .name img').attr('src', path + '/' + 'logo-black.png');
        }

      }

      this.fire('initStyle', this.readCookie());

      this.reloadMod();

      if($.url().param('screenshot')) {
        $ctx.hide();
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;
      var that = this;

      // $ctx.css('margin-left', '0');

      $('.panel-container').find('.bg_pattern').on('click', function() {
        that.setCookie('bg_pattern', $(this).attr('id'));
        that.afterBinding();
        return false;
      });

      $('.panel-container').find('.color_scheme').on('click', function() {
        that.setCookie('color_scheme', $(this).attr('id'));
        that.afterBinding();
        return false;
      });

      $('.switch', $ctx).on('click', function() {
        if($(this).hasClass('to-open')) {
          $(this).removeClass('to-open');
          $(this).addClass('to-close');
          $ctx.stop().animate({"left": $('.panel-container', $ctx).outerWidth() }, {duration: 500});
        } else {
          $(this).removeClass('to-close');
          $(this).addClass('to-open');
          $ctx.stop().animate({"left": "0px"}, {duration: 500});
        }

        return false;
      });

      $('.demo', $ctx).change(function() {

        var target = $(this).val();

        if (target) {
          var host = window.location.host;
          if ( target == 'demo-1' ) {

              window.location = 'http://' + host + '/wrap/' + 'index.html';

          } else {

              window.location = 'http://' + host + '/wrap/' + target + '/index.html';

          }

        }

        return false;
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.TeamMember = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Testimonials = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('slick.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var show_dots = true;

      if ($ctx.hasClass('simple')) {
        show_dots = false;
      }

      $('.items', $ctx).slick({
        autoplay: true,
        pauseOnHover: false,
        dots: show_dots,
        speed: 1500,
        arrows: false
      });

    }
  })
})(Tc.$);

(function($) {
  Tc.Module.ScrollTo = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var body = $("body");

      body.on('click', '.scrollto', function(event) {
        var _this = $(this);
        var _target = _this.data('target');
        var _parent = _this.data('parent');

        body.animate({
          scrollTop: $(_target).offset().top - 100
        }, 500);

        if(_parent) {
          _this.parents(_parent).find('.active').removeClass('active');
          _this.parent().addClass('active');
        }

      });
    }
  })
})(Tc.$);
