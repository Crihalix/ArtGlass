(function ($) {
    jQuery.fn.iePlaceholder = function(){
        var make = function() {
            if (document.all && !window.atob) {
                var $textInput = $('input[type="text"]'),
                    $passwordInput = $('input[type="password"]'),
                    $bothInputs = $('input[type="text"], input[type="password"]');

                $textInput.each(function() {
                    setPlaceholder($(this));
                });
                $textInput.on('focus', function() {
                    compareFocus($(this));
                });

                $passwordInput.each(function() {
                    setPlaceholder($(this));
                    $(this).attr('data-type', 'password').attr('type', 'text');
                });
                $passwordInput.on('focus', function() {
                    compareFocus($(this));
                    $(this).attr('type', 'password');
                });

                $bothInputs.on('blur', function() {
                    compareBlur($(this));
                });

                /* Protected send form */
                $('form').on('submit', function() {
                    protectSendForm($(this));
                });
            }
        };

        return make();

        function setPlaceholder($el) {
            if (! $el.val()) {
                var ph = $el.attr('placeholder');
                $el.val(ph);
            }
        }

        function compareFocus($el) {
            var val = $el.attr('placeholder');

            if($el.val() == val) {
                $el.val('');
            }
        }

        function compareBlur($el) {
            var val = $el.attr('placeholder');
            if($el.val() == '') {
                $el.val(val);
                $el.attr('type', 'text');
            }
        }

        function protectSendForm($el) {
            $el.find('input[type="text"], input[type="password"]').each(function(index, element) {
                compareFocus($(this));

                setTimeout(function() {
                    setPlaceholder($(element));
                }, 100)
            });
        }
    };
})(jQuery);