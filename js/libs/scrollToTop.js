(function($){
    var $element;

    var ScrollToTop = {
        init: function(options, elem) {

            $element = $(elem);
            var self = this;

            self.options = $.extend({}, $.fn.showBlock.options, options);

            $('.to_top').on('click', ScrollToTop.goToTop);
        },
        goToTop: function () {
            $('html, body').animate({
                scrollTop: 0
            }, {
                duration: ScrollToTop.options.speed
            });
        }
    };

    $.fn.scrollToTop = function (options) {
        return this.each(function () {
            ScrollToTop.init(options, this);
        });
    };

    $.fn.scrollToTop.options = {
        speed: 500
    };
})(jQuery);