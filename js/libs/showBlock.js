(function($){
    var $element;

    var ShowBlock = {
        init: function(options, elem) {

            $element = $(elem);
            var self = this;

            self.options = $.extend({}, $.fn.showBlock.options, options);

            $(window).scroll(ShowBlock.countDistance);
            $(window).load(ShowBlock.countDistance);
        },
        countDistance: function() {
            var scroll = $('html').scrollTop() || $('body').scrollTop();

            if (scroll > ShowBlock.options.offset && window.innerWidth > 1210) {
                $element.fadeIn(ShowBlock.options.speed);
            }
            else {
                $element.fadeOut(ShowBlock.options.speed);
            }
        }
    };

    $.fn.showBlock = function (options) {
        return this.each(function () {
            ShowBlock.init(options, this);
        });
    };

    $.fn.showBlock.options = {
        offset: 400,
        speed: 200
    };
})(jQuery);