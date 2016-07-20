
//mobile events
var clickHandler = "click";
if('ontouchstart' in document.documentElement && (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
    clickHandler = "touchstart";
}



$(document).ready(function() {

    var winWidth = window.innerWidth;
    $(window).on('resize', function () {
        winWidth = window.innerWidth;
    });
    var $body = $('body');

    //dropdownMenu width
    (function () {
        var containerWidth,
            catalogDropdown = $('.catalog_menu_dropdown'),
            catalogList,
            catalogListWidth,
            drpd_lvl1Height,
            drpd_lvl2Height,
            drpd_lvl3,
            drpd_lvl3Height;



        //jq_list
        function resetSize() {
            drpd_lvl1Height = $('.catalog_menu_main_page').length ? 408 : catalogList.height();
            catalogDropdown.outerWidth(catalogListWidth).height(drpd_lvl1Height);
            catalogDropdown.removeClass('drpd_lvl3_line drpd_lvl2_line');
        }

        function resetSizeDrpd2(event) {
            var maxHeight;
            catalogDropdown.outerWidth(catalogListWidth * 2 + 2);//2 - this is border-width pixels

            drpd_lvl1Height = $('.catalog_menu_main_page').length ? 408 : catalogList.height();
            drpd_lvl2Height = $(event.target).parents('li').find('>.list_lvl2').height();
            //set and calculate height
            maxHeight = Math.max(drpd_lvl1Height, drpd_lvl2Height);
            catalogDropdown.height(maxHeight);
            $(event.target).parents('li').find('>.list_lvl2').css('min-height', maxHeight + 'px');
            catalogDropdown.removeClass('drpd_lvl3_line');
            catalogDropdown.addClass('drpd_lvl2_line');
        }

        function resetSizeDrpd3(event) {
            var maxHeight;
            catalogDropdown.outerWidth(containerWidth);
            drpd_lvl3.outerWidth(containerWidth - (catalogListWidth * 2) - 2); //2 - this is border-width pixels

            drpd_lvl1Height = $('.catalog_menu_main_page').length ? 408 : catalogList.height();
            drpd_lvl2Height = $(event.target).parents('li').find('>.list_lvl2').height();
            drpd_lvl3Height = $(event.target).parents('li').find('>.drpd_bl_lvl3').height();
            //set and calculate height
            maxHeight = Math.max(drpd_lvl1Height, drpd_lvl2Height, drpd_lvl3Height);
            catalogDropdown.height(maxHeight);
            $(event.target).parents('li').find('>.drpd_bl_lvl3').css('min-height', maxHeight + 'px');
            catalogDropdown.addClass('drpd_lvl3_line');
        }

        function setSize(event) {
            catalogList = $('.list_lvl1');
            drpd_lvl3 = $('.drpd_bl_lvl3');
            containerWidth = $('.container').width();
            catalogListWidth = catalogList.outerWidth();

            if ($(event.target).closest('.drpd_bl_lvl3').length) {
                resetSizeDrpd3(event);
                return;
            } else if ($(event.target).closest('ul').hasClass('list_lvl2')) {

                if ($(event.target).parents('li.has_dropdown_list').parent('.list_lvl2').length) {
                    resetSizeDrpd3(event);
                } else {
                    resetSizeDrpd2(event);
                }
                return;
            } else if ($(event.target).closest('ul').hasClass('list_lvl1')) {

                if ($(event.target).parents('li').hasClass('has_dropdown_list')) {
                    resetSizeDrpd2(event);
                } else {
                    resetSize();
                }
                return;
            } else {
                resetSize();
            }

        }

        $('.catalog_menu').on('mouseover', function (event) {
            if(winWidth > 1023){
                setSize(event);
            }
        });
        $('.catalog_menu').on('mouseleave', function (event) {
            if(winWidth > 1023){
                resetSize(event);
            }
        });

    })();

    // mobile catalog dropdowns
    (function () {
        $('.open_cat_drpd_btn').on(clickHandler, function(){
            var parentLi = $(this).parent('.has_dropdown_list');

            if($(this).siblings('.list_lvl2').length){
                if(parentLi.hasClass('opened_cat_drpd')){
                    parentLi.removeClass('opened_cat_drpd');
                    parentLi.children('.list_lvl2').slideUp(500);
                } else{
                    parentLi.addClass('opened_cat_drpd');
                    parentLi.children('.list_lvl2').slideDown(500);
                }
            } else if ($(this).siblings('.drpd_bl_lvl3').length) {
                if(parentLi.hasClass('opened_cat_drpd')){
                    parentLi.removeClass('opened_cat_drpd');
                    parentLi.children('.drpd_bl_lvl3').slideUp(500);
                } else{
                    parentLi.addClass('opened_cat_drpd');
                    parentLi.children('.drpd_bl_lvl3').slideDown(500);
                }
            }
        });

    })();


    //main slider
    (function () {

        var trigerOneSlider = ($('.main_slider').children().length < 2) ? false : true;
        var main_slider = {
            pause: 5000,
            auto: trigerOneSlider,
            speed: 600,
            controls: true,
            pager: trigerOneSlider,
            adaptiveHeight: false
        };
        $('.main_slider').bxSlider(main_slider);
    })();


    //read_all_txt
    (function(){
        $('body').on(clickHandler, '.read_all_txt', function(){

            var _this = $(this),
                thisAttrTxt = _this.data('toggle-text'),
                thisTxt = _this.text(),
                wrapArtTxt = _this.closest('.cut_txt_wrap');

            function replaceTxt(){
                _this.data('toggle-text',thisTxt);
                thisTxt = _this.text(thisAttrTxt);
            }

            if(_this.closest('.cut_txt_wrap').hasClass('opened')){
                wrapArtTxt.removeClass('opened');
                _this.removeClass('fa-angle-up');
                _this.addClass('fa-angle-down');
                replaceTxt();
            } else{
                _this.removeClass('fa-angle-down');
                _this.addClass('fa-angle-up');
                wrapArtTxt.addClass('opened');
                replaceTxt();
            }
        });
    })();

    //h_search_mbl_pp
    (function(){
        var $searchBlock = $('.h_search_mbl_pp');

        $body.on(clickHandler, '.open_search_pp', function(){
            if($searchBlock.hasClass('show_search')){
                $searchBlock.removeClass('show_search');
                $('.backdrop').remove();
            } else {
                $searchBlock.addClass('show_search');
                $body.append('<div class="backdrop backdrop_search"></div>');
            }
        });

        $body.on(clickHandler, '.close_search_pp', function(){
            $searchBlock.removeClass('show_search');
            $('.backdrop').remove();
        });
    })();


    //main_menu trigger
    (function() {
        var $body = $('body'),
            triggerClose = null;

        $('.mbl_site_menu_btn').on(clickHandler, function(e){
            $('.site_menu').addClass('open_menu');
            openMenu();
        });
        $('.mbl_catalog_btn ').on(clickHandler, openCatalogMenu);
        //$('.category_mob_btn').on(clickHandler, categoryArticles);


        $body.on(clickHandler,'.backdrop', function(e){
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });

        //$body.on(clickHandler,'.main_menu .sing_in', function(e){
        //    e.stopPropagation();
        //    setTimeout(function(){
        //        closeMenu();
        //    },500);
        //});

        $('body').on(clickHandler, '.back_mobile_btn', function(event) {
            //if (!$(event.target).closest(".main_menu,.filter_col,.category_articles").length && triggerClose) {
            closeMenu();
            //}
            //event.stopPropagation();
        });

        function openCatalogMenu() {
            $('.catalog_menu_dropdown').addClass('open_menu');
            openMenu();
        }
        //function categoryArticles() {
        //    $('.category_articles').addClass('open_menu');
        //    openMenu();
        //}

        function openMenu(){
            //
            //if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            //    $body.append('<a class="close_mob_menu">&nbsp;</a>');
            //}

            $body.append('<div class="backdrop"></div>');
            $body.addClass('backdrop_in');
            setScrollMargin();

            //setTimeout(function(){
            //    triggerClose = true;
            //},500);
        }
        function closeMenu() {
            $('.site_menu').removeClass('open_menu');
            $('.catalog_menu_dropdown').removeClass('open_menu');
            $('.h_search_mbl_pp').removeClass('show_search');
            $('.backdrop').remove();
            $body.removeClass('backdrop_in');
            $body.css('padding-right', 0);

            //setTimeout(function(){
            //    triggerClose = false;
            //},500);
        }

        function setScrollMargin() {
            var div = document.createElement('div');

            div.style.overflowY = 'scroll';
            div.style.width =  '50px';
            div.style.height = '50px';
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            var scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);

            $('body').css('padding-right', scrollWidth);
        }
    })();





    $('.dropdown_toggle').dropdown();

    $('body').on('click', '.dropdown', function (e) {
        if (!$(event.target).hasClass("dropdown").length) {
            e.stopPropagation();
        }
    });



    //onlyNumbers
    (function () {
        var $body = $('body');
        $body.on('change', '.number_input', testReg);
        $body.on('keyup', '.number_input', testReg);

        function testReg() {
            var number = $(this).val();
            number = number.replace(/[^0-9\+\/*-]/g, "");
            $(this).val(number);
        }
    })();

    //amount_goods
    (function(){
        $('body').on(clickHandler, '.less', function(){
            var $counter = $(this).parents('.amount_goods').find('input');
            if($counter.val() >= 1 ) {
                $counter.val(Number($counter.val()) * 1 - 1);
            }
            if($counter.val() == 0){
                $(this).parents('.pdp_choose_item').removeClass('active');
            }
        });

        $('body').on(clickHandler, '.more', function(){
            var $counter = $(this).parents('.amount_goods').find('input');
            $counter.val(Number($counter.val()) * 1 + 1);
            $(this).parents('.pdp_choose_item').addClass('active');
        });
    })();




    //pdp slider
    (function(){
        $('.pdp_slider').bxSlider({
            pagerCustom: '.pdp_small_img'
        });
    })();

    //show/hide password
    (function() {
        var $body = $('body');

        $body.on('click', '.show_password', showPassword);
        $body.on('click', '.hide_password', hidePassword);

        function showPassword(e) {
            e.preventDefault();
            $(this).removeClass('show_password fa-eye-slash').addClass('hide_password fa-eye').parent().find('input').prop('type', 'text');
        }

        function hidePassword(e) {
            e.preventDefault();
            $(this).removeClass('hide_password fa-eye').addClass('show_password fa-eye-slash').parent().find('input').prop('type', 'password');
        }
    })();


    //bootstrap tooltip
    $('.tooltip_btn').tooltip();

    (function() {

        var copyBnt =  $('.copy_txt_btn');

        copyBnt.bind('click', function() {
            var input = document.querySelector('#vendor-code');

            input.setSelectionRange(0, input.value.length + 1);
            try {
                var success = document.execCommand('copy');
                if (success) {
                    $(this).trigger('copied', ['Артикул скопирован в буфер обмена']);
                } else {
                    $(this).trigger('copied', ['Скопируйте с помощью клавиш Ctrl+С']);
                }
            } catch (err) {
                $(this).trigger('copied', ['Скопируйте с помощью клавиш Ctrl+С']);
            }
        });

        // Handler for updating the tooltip message.
        copyBnt.bind('copied', function(event, message) {
            $(this).attr('title', message)
                .tooltip('fixTitle')
                .tooltip('show')
                .attr('title', ['Скопировать артикул в буфер обмена'])
                .tooltip('fixTitle');
        });
    })();



    //bootstrap popover
    $(function () {
        $('[data-toggle="popover"]').popover({
            html: true,
            placement : 'top',
            template: '<div class="popover"><button class="popover_close btn fa fa-close"></button><div class="popover-content"></div><div class="arrow"></div></div>'
        });
    });


    //show all with text replace
    (function(){
        $('body').on(clickHandler, '.show_all', function(){

            var _this = $(this),
                thisAttrTxt = _this.attr('data-toggle-text'),
                thisTxt = _this.text(),
                wrapArtTxt = _this.closest('.show_all_wrap');

            function replaceTxt(){
                _this.attr('data-toggle-text',thisTxt);
                thisTxt = _this.text(thisAttrTxt);
            }

            if(_this.closest('.show_all_wrap').hasClass('opened')){
                _this.removeClass('opened');
                wrapArtTxt.removeClass('opened');
                replaceTxt();
            } else{
                _this.addClass('opened');
                wrapArtTxt.addClass('opened');
                replaceTxt();
            }
        });
    })();



//modal и ваидация
    (function() {
        var lastHref = '';
        $('body').on('click', '[data-toggle="modal"]', function(e) {
            e.preventDefault();
            var $modal = $('#modal'),
                $this = $(this),
                winWith = window.innerWidth;


            // когда мы кликаем на войти\регистрацию с мобильного меню
            if($this.hasClass('mbl_pp_link')){

                $('.site_menu').removeClass('open_menu');
                $('.backdrop').remove();
                $body.removeClass('backdrop_in');
                $body.css('padding-right', 0);

                setTimeout(function(){
                    showModal();
                }, 500);
            } else{
                showModal();
            }

            $modal.on('shown.bs.modal', centeredPopUp);
            $modal.on('show.bs.modal', centeredPopUp);
            $(window).on('resize', centeredPopUp);

            function showModal(){
                if(lastHref === $this.data('href') && !$this.hasClass('pp_no_bg')){
                    paramsModal();
                    console.log('ravnu!')
                } else {
                    $modal.find('.modal_content').load($this.data('href'), paramsModal);
                }

                if($this.hasClass('pp_no_close')){
                    $modal.find('.close_modal').addClass('hidden');
                } else {
                    $modal.find('.close_modal').removeClass('hidden');
                }
            }
            function paramsModal() {
                $modal.iePlaceholder();
                //$modal.find('.modal_block').removeClass('without_close');


                $modal.find('.styler').styler({
                    selectSmartPositioning: false,
                    singleSelectzIndex: 1
                });
                $(this).find('.jq-selectbox').removeAttr('data-validavalidate'); //for correct work with validate class, must be before validate init


                if($modal.find('.scroll-pane').length){
                    $modal.find('.scroll-pane').jScrollPane({
                        autoReinitialise: true,
                        verticalDragMinHeight: 17,
                        verticalDragMaxHeight: 17
                    });
                }
                $modal.find('.mask_tel').inputmask('+38 (999) 999 99 99', {'placeholder': '+38 (___) ___ __ __'});


                //$modal.find('.question_ico').popover({trigger: 'manual'}).on(clickHandler, function(e) {
                //    // if any other popovers are visible, hide them
                //    if(isVisiblePP) {
                //        hideAllPopovers();
                //    }
                //    $(this).popover('show');
                //    // handle clicking on the popover itself
                //    $('.popover').off(clickHandler).on(clickHandler, function(e) {
                //        e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
                //    });
                //
                //    isVisiblePP = true;
                //    e.stopPropagation();
                //});


                $modal.find('.datepicker').datepicker({
                    maxDate: "+0d"
                });

                //if($modal.find('#map').length){
                //
                //    var latitude = "49.982403";
                //    var longitude = "36.247789";
                //    var zoommap = 17;
                //
                //    (function() {
                //        google.maps.event.addDomListener(window, 'load', init);
                //        function init() {
                //            var mapOptions = {
                //                center: new google.maps.LatLng(latitude, longitude),
                //                zoom: zoommap,
                //                zoomControl: false,
                //                disableDoubleClickZoom: true,
                //                mapTypeControl: false,
                //                scaleControl: false,
                //                scrollwheel: true,
                //                panControl: false,
                //                streetViewControl: false,
                //                draggable : true,
                //                overviewMapControl: false,
                //                overviewMapControlOptions: {
                //                    opened: false
                //                },
                //                mapTypeId: google.maps.MapTypeId.ROADMAP
                //            };
                //            var mapElement = document.getElementById('our_addr_map');
                //            var map = new google.maps.Map(mapElement, mapOptions);
                //
                //
                //
                //
                //            new google.maps.Marker({
                //                position: new google.maps.LatLng(latitude,longitude),
                //                map: map,
                //                icon: 'dist/img/gg_map_pin_ico.png'
                //            });
                //
                //        }
                //    })();
                //}




                //validations
                $('.validation_wish_pp').formValidation({
                    successEvent: function() {
                        //отправить форму аяксом, в ответ можно присылать нужный html
                        $modal.find('.modal_block').find('.modal_content').load('ajax/wish_popup_add.php', paramsModal);
                        centeredPopUp();
                    }
                }).on('submit', function() {
                    return false;
                });
                //
                ////validations
                //$('.order_call,.buy_one_click_form').formValidation({
                //    successEvent: function() {
                //        //отправить форму аяксом, в ответ можно присылать нужный html
                //        $modal.find('.modal_block').addClass('without_close').find('.modal_content').html('<div class="modal_content_inner notice"><p class="notice_descript">Спасибо! <br> Мы в ближайшее время свяжемся с Вами!</p></div>');
                //        centeredPopUp();
                //    }
                //}).on('submit', function() {
                //    return false;
                //});
                //
                ////formValidation
                //$('.sing_in_form, .tell_payment_form, .leave_review_form, .report_entry_form, .ask_question_pp_form').formValidation({
                //    successEvent: function() {
                //        //отправить форму аяксом, в ответ можно присылать нужный html
                //        //$modal.find('.modal_block').addClass('without_close').find('.modal_content').html('<div class="modal_content_inner notice"><p class="notice_descript">Спасибо! <br> Мы в ближайшее время свяжемся с Вами!</p></div>');
                //        //centeredPopUp();
                //    }
                //}).on('submit', function() {
                //    return false;
                //});


                lastHref = $this.data('href');

                if($this.hasClass('pp_no_bg')){
                    $modal.modal({
                        backdrop: false,
                        hasScroll: true,
                        keyboard: true
                    });
                    console.log('попап без бекграунда!')
                } else{
                    $modal.modal({
                        keyboard: true
                    });
                }
            }
            return false;
        });


        function centeredPopUp() {
            var $modal = $('.modal_block'),
                blockHeight = $modal.outerHeight(),
                windowHeight = $(window).outerHeight(),
                margin = (windowHeight - blockHeight)/2;

            if(windowHeight < blockHeight) {
                $modal.css('marginTop', 20);
            } else {
                $modal.css('marginTop', margin);
            }
        }

        $('body').on('hidden.bs.modal', '#modal', function () {
            $(this).removeData('bs.modal');
        });


        //валидация форм
        (function () {
            var $form_cab = $('.form_cab_data');
            $form_cab.formValidation({
                successEvent: function() {
                    //отправить форму аяксом, в ответ можно присылать нужный html
                    var $modal = $('#modal');

                    if($form_cab.hasClass('pp_no_close')){
                        $modal.find('.close_modal').addClass('hidden');
                    } else {
                        $modal.find('.close_modal').removeClass('hidden');
                    }

                    $modal.find('.modal_content').load('ajax/cab_success_data.php');

                    if($form_cab.hasClass('pp_no_bg')){
                        $modal.modal({
                            backdrop: false,
                            hasScroll: true
                        });
                    } else{
                        $modal.modal();
                    }
                    centeredPopUp();
                }
            }).on('submit', function() {
                return false;
            });

        })();

        $('body').on('keydown', function(e){

            if(e.keyCode  == 27){
                $('#modal').modal('hide');
            }
        });
    })();

    //formValidation
    $('.discount_code_form').formValidation({
        successEvent: function() {
            var $formBlock = $('.cart_discount_code');
            $formBlock.find('.cart_discount_code_tit').text('с учетом скидки');
            $formBlock.find('.btn').hide();
            $formBlock.find('.discount_code_form').addClass('success_code');
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.cart_order_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });


    //anchor
    (function() {
        $('a[href*=#]').bind(clickHandler, function(scrolling){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 15}, 500);
            scrolling.preventDefault();
        });
    })();

    //leave review form
    (function() {
        var reviewForm = $('.leave_review'),
            timeAnim = 400;

        function showReviewForm(){
            reviewForm.slideDown(timeAnim);
        }
        function hideReviewForm(){
            reviewForm.slideUp(timeAnim);
        }
        $('body').on('click', '.open_review_form', showReviewForm);
        $('body').on('click', '.close_review_form', hideReviewForm);
    })();

    //open catalog in filter
    (function() {
            var timeAnim = 400;


        $('body').on('click', '.filter_head_tg', function(){
            var filterCatalogList = $(this).closest('.filter_catalog');

            if(filterCatalogList.hasClass('opened')){
                filterCatalogList.removeClass('opened');
                filterCatalogList.find('.filter_catalog_list').slideUp(timeAnim);
            } else {
                filterCatalogList.addClass('opened');
                filterCatalogList.find('.filter_catalog_list').slideDown(timeAnim);
            }
        });
    })();



    //slider ui
    (function () {

        var objectColor = [
            {
                code : '#ffffff',
                name : 'белый'
            }, {
                code : '#ff0000',
                name : 'Красный'
            }, {
                code : '#ff7700',
                name : 'Оранжевый'
            }, {
                code : '#ffee00',
                name : 'Желтый'
            }, {
                code : '#99ff00',
                name : 'Жесто-салатовый'
            }, {
                code : '#22ff00',
                name : 'Салатовый'
            }, {
                code : '#00ff2b',
                name : 'Салатовой2'
            }, {
                code : '#00ffa2',
                name : 'Голубой'
            }, {
                code : '#00e6ff',
                name : 'Голубой2'
            }, {
                code : '#0080ff',
                name : 'Светло-синий'
            }, {
                code : '#0008ff',
                name : 'Синий'
            }, {
                code : '#6600ff',
                name : 'Синий2'
            }, {
                code : '#e600ff',
                name : 'Фиолетовый'
            }, {
                code : '#ff00a2',
                name : 'Розовый'
            }, {
                code : '#333333',
                name : 'Черный'
            }
        ];

        var colorRange = $('.jq_colorRange'),
            i;

        if(colorRange.length){
            for(i = 0; i < objectColor.length; i++) {
                colorRange.append('<div class="table_cell" style="background-color: ' + objectColor[i].code + '">')
            }

            var colorSlider = $("#slider-color").slider({
                range: "max",
                min: 0,
                max: objectColor.length-1,
                value: 2,
                slide: function (event, ui) {
                    $(".ja_slider_color_name").text(objectColor[ui.value].name);
                }
            }).css('margin', '0 '+ $('.jq_colorRange').find('.table_cell').eq(0).width()/2 +'px');

            $(".ja_slider_color_name").text(objectColor[colorSlider.slider("value")].name);

            $('body').on(clickHandler, '.jq_colorRange .table_cell', function(){
                colorSlider.slider('value', $(this).index());
                $(".ja_slider_color_name").text(objectColor[$("#slider-color").slider("value")].name);
            });

        }

    })();


    //slider ui colors
    (function () {

        var $slider = $('#slider'),
            minValue = 500,
            maxValue = 10500;

        $slider.slider({
            range: true,
            min: minValue,
            max: maxValue,
            values: [minValue, maxValue],
            slide: function(event, ui) {
                $('#from').val(ui.values[0]);
                $('#to').val(ui.values[1]);
            }
        });

        var fromInput = $('#from');
        var toInput = $('#to');

        fromInput.val($slider.slider('values', 0));
        toInput.val($slider.slider('values', 1));


        fromInput.on('change keyup', checkVal1);
        toInput.on('change keyup', checkVal2);

        function checkVal1() {

            //if($slider.slider('values', 1) < +(fromInput.val())) {
            //    $('#from').val(function (index, value) {
            //        return value.substr(0, value.length - 1);
            //    });
            //}
            $slider.slider('values', 0, $('#from').val());
        }
        //$slider.slider('values', 0, fromInput.val());

        function checkVal2(){

            //var _thisVal = $('#to').val();
            //
            //if( +($('#from').val()) >  +_thisVal ){
            //    $('#to').val($('#from').val());
            //    $slider.slider('values', 1, _thisVal);
            //} else if(+_thisVal >  maxValue) {
            //    $slider.slider('values', 1, maxValue);
            //    $('#to').val(maxValue);
            //} else {
            //    $slider.slider('values', 1, _thisVal);
            //}
            $slider.slider('values', 1, $('#to').val());
        }

    })();



    $('body').iePlaceholder();




    (function () {
        var $pendItem;

        //удалить товар из списка
        $('body').on(clickHandler, '.js-del-pend-item-btn', function(){
            $pendItem = $(this).closest('.js-del-pend-item');
        });

        //удалить список товаров
        $('body').on(clickHandler, '.js-del-pend-list-btn', function(){
            $pendItem = $(this).closest('.js-del-pend-list');
        });


        //подтверждение удаления
        $('body').on(clickHandler, '.js-approve-del-pend', function(){
            if($pendItem.length){
                $pendItem.remove();
                $('#modal').modal('hide');
            }
        });

    })();




    //repeated password
    (function() {
        $('body').on('submit keyup', '.form_cab_data', function () {
            var $repeatedPass = $(this).find('.repeated_password'),
                valueX = $(this).find('.password_input').val(),
                valueY = $repeatedPass.val();

            if(!(valueY === '')){
                if (valueX !== valueY) {
                    $repeatedPass.parent().removeClass('correct').addClass('error');
                    return false;
                } else {
                    $repeatedPass.parent().removeClass('error').addClass('correct');
                }
            }
        });
    })();

    $('.js-mask_tel').inputmask('+7 (999) 999 99 99', {'placeholder': '+7 (___) ___ __ __'});


    //open blocl
    (function(){
        $('body').on(clickHandler, '.js-show_block_btn', function(e){
            e.preventDefault();
            e.stopPropagation();
            var $blockWrap = $(this).closest('.js-show_block_wrap'),
                $block = $blockWrap.find('.js-show_block');


            if($blockWrap.hasClass('opened')){
                $blockWrap.removeClass('opened');
                $block.slideUp(200);
            } else{
                $blockWrap.addClass('opened');
                $block.slideDown(200);
            }
        });
    })();




    (function () {

        $('body').on(clickHandler,'.js-toggle-datepicker-pp', function(){

            if($(this).closest('.js-wrap-datepicker-pp').hasClass('opened_dp')){
                $(this).closest('.js-wrap-datepicker-pp').removeClass('opened_dp');
            } else {
                $(this).closest('.js-wrap-datepicker-pp').addClass('opened_dp');
            }
        });
    })();

    (function () {

        $('body').on(clickHandler,'.js-join_seminar', function(){

            if($(this).closest('.js-wrap-seminar_pp').hasClass('opened_seminar_pp')){
                $(this).closest('.js-wrap-seminar_pp').removeClass('opened_seminar_pp');
            } else {
                $(this).closest('.js-wrap-seminar_pp').addClass('opened_seminar_pp');
            }
        });

    })();

    (function () {

    })();






































































    (function () {
        $('body').on(clickHandler, '.show_all_tel', function () {
            var parent = $(this).closest('.tel_list_block');
            if (parent.hasClass('opened')) {
                parent.removeClass('opened');
            } else {
                parent.addClass('opened');
            }
        });
    })();


    //tabs
    (function () {
        $('.tabs li').on(clickHandler, toggleTab);
        $('.radio_tabs li').on(clickHandler, toggleTab);

        function toggleTab() {
            var $tab = $(this),
                index = $tab.index();

            $tab.addClass('active').siblings().removeClass('active')
                .parents('.tab_wrapper').find('.tab_cnt').eq(index).addClass('active').siblings().removeClass('active');
        }
    })();




    $('.styler').styler({
        selectSmartPositioning: false,
        singleSelectzIndex: 1
    });

    $('.select_towns').styler({
        selectSmartPositioning: false,
        singleSelectzIndex: 1,
        onSelectClosed: function () {
            if ($(this).find('option:selected').val() !== '0') {
                $(this).closest('.input_town_bl').find('.input_town').val($(this).find('option:selected').text());
            }
        }
    });
    $('.tab_select').styler({
        selectSmartPositioning: false,
        singleSelectzIndex: 1,
        onSelectClosed: function () {
            $(this).closest('.tab_wrapper').find('.tab_cnt').removeClass('active').eq($(this).find('option:selected').val()).addClass('active');
        }
    });
    $('.jq-selectbox').removeAttr('data-validate'); //for correct work with validate class, must be before validate init



    //$('.scroll-pane').jScrollPane({
    //    autoReinitialise: true
    //    //verticalDragMaxHeight: 386
    //});

    //
    //
    //(function(){
    //    $('.search_field').on('focus', function() {
    //        $(this).closest('.search_block ').find('.search_drpd').show(0);
    //    });
    //    $('.search_field').on('focusout', function(){
    //        $(this).closest('.search_block ').find('.search_drpd').hide(0);
    //    });
    //}());
    //
    //(function(){
    //    $('.selection_block').find('.field').on('focus', function() {
    //        $(this).closest('.row ').addClass('zInd').find('.drpdwn_search').show(0);
    //    });
    //    $('.selection_block').find('.field').on('focusout', function(){
    //        $(this).closest('.row ').removeClass('zInd').find('.drpdwn_search').hide(0);
    //    });
    //}());
    //
    //(function(){
    //    $('.town_field').on('focus', function() {
    //        $(this).closest('.row ').addClass('zInd').find('.drpdwn_search').show(0);
    //    });
    //    $('.town_field').on('focusout', function(){
    //        $(this).closest('.row ').removeClass('zInd').find('.drpdwn_search').hide(0);
    //    });
    //}());

    //filter views_btns
    //(function(){
    //    $('body').on(clickHandler, '.views_btns a', function(){
    //        $(this).closest('.views_btns').find('.view_btn').removeClass('active');
    //        $(this).addClass('active')
    //    });
    //}());





   /* $(function () {
        $('[data-toggle="popover"]').popover();
    });
    $('body').on(clickHandler, function (e) {
        var idPopover = $('.popover').attr('id');
        $('[aria-describedby="'+idPopover+'"]').popover('hide');
    });*/
    //var isVisiblePP = false;
    //var hideAllPopovers = function() {
    //    $('[data-toggle="popover"]').each(function() {
    //        $(this).popover('hide');
    //    });
    //};
    //$('body').on(clickHandler, function(e) {
    //    if($('.popover').is(':visible')){
    //        hideAllPopovers();
    //        isVisiblePP = false;
    //        e.stopPropagation();
    //        console.log(2)
    //    }
    //});
    //$(function () {
    //
    //    $('[data-toggle="popover"]').popover({
    //        trigger: 'manual'
    //    }).on(clickHandler, function(e) {
    //        // if any other popovers are visible, hide them
    //        if(isVisiblePP) {
    //            hideAllPopovers();
    //        }
    //
    //        $(this).popover('show');
    //
    //        // handle clicking on the popover itself
    //        $('.popover').off(clickHandler).on(clickHandler, function(e) {
    //            e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
    //        });
    //
    //        isVisiblePP = true;
    //        e.stopPropagation();
    //    });
    //});













    //accordions faq
    (function() {
        var questionsItems = $('.question_item'),
            answerCnt = questionsItems.find('.cnt');

        $('body').on(clickHandler, '.question_item .head', function () {
            var item = $(this).closest('.question_item');

            if(!item.hasClass('opened')){
                questionsItems.removeClass('opened');
                answerCnt.stop().slideUp(300);
                item.addClass('opened').find('.cnt').stop().slideDown(300);
            } else {
                answerCnt.stop().slideUp(300);
                questionsItems.removeClass('opened');
            }
        });
    })();

    //close info order
    (function() {

        $('body').on(clickHandler, '.hide_deteiles_order', function () {
            var order_info_cnt = $('.detailes_order_cnt'),
                _this = $(this),
                thisAttrTxt = _this.attr('data-toggle-text'),
                thisTxt = _this.text();;

            function replaceTxt(){
                _this.attr('data-toggle-text',thisTxt);
                thisTxt = _this.text(thisAttrTxt);
            }

            if($('.detailes_order_cnt').is(':visible')){
                order_info_cnt.stop().slideUp(300);
                replaceTxt();
            } else {
                order_info_cnt.stop().slideDown(300);
                replaceTxt();
            }
        });
    })();

    //answer form
    (function() {

        $('body').on(clickHandler, '.reply_btn', function () {
            $(this).hide(0);
            $('.reply_from_block').slideDown(200);
        });
    })();

    (function() {
        $('body').on(clickHandler, '.on_favorite_link', function(){
            var _this = $(this),
                thisAttrTxt = _this.attr('data-toggle-text'),
                thisTxt = _this.find('span').text();

            function replaceTxt(){
                _this.attr('data-toggle-text',thisTxt);
                thisTxt = _this.find('span').text(thisAttrTxt);
            }

            if(_this.hasClass('active')){
                _this.removeClass('active');
                replaceTxt();
            } else{
                _this.addClass('active');
                replaceTxt();
            }
        });
    })();


    (function() {
        $('body').on(clickHandler, '.show_all_rev', function(){
            $(this).closest('.revies_cnt').addClass('show');
            $(this).hide(0);
        });
    })();

    (function() {
        $('body').on(clickHandler, '.show_all_review', function(){
            $(this).closest('.reviews_list').find('.review_item').removeClass('hidden');
            $(this).hide(0);
        });
    })();









    //formValidation
    $('.new_client').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });

    //formValidation
    $('.regular_client').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.bonus_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });

    //registration_form
    $('.registration_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });

    //change_pass_form
    $('.change_pass_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.leave_comment_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.reply_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.leave_review_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.subscrible_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.ask_question_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });
    //formValidation
    $('.select_prod_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });

    //search_block
    $('.search_block').find('form').formValidation({
        successEvent: function() {

        }
    }).on('submit', function() {
        return false;
    });







    var $toTop = $('.to_top');
    $toTop.scrollToTop();
    $toTop.showBlock();
});










    $('body').on(clickHandler, '#main_menu_toggle', function() {
        var navigation = $('#main_menu');

        if (navigation.is(':visible')) {
            navigation.stop(true, true).slideUp(200);
        } else {
            navigation.stop(true, true).slideDown(200);
        }
    });
    //

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;',
        nextText: '&#x3e;',
        direction: "up",
        currentText: 'Сегодня',
        monthNames: [ 'Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: [ 'Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: [ 'воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: [ 'вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: [ 'Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $('.js-datepicker-pp').datepicker({
        minDate: "+0d",
        showOn: "button"
    });


    $(window).resize(function(){
        var main_menu = $('#main_menu');
        var winWith = window.innerWidth;
        if(winWith > 540) {
            main_menu.css('display', 'table');
        } else {
            main_menu.css('display', 'none');
        }
    });


$(function() {

    var nav_container = $(".jq_prod_navigate");
    var nav = $(".jq_prod_nav_wrap");

    var top_spacing = 0;
    var waypoint_offset = 50;

    nav_container.waypoint({
        handler: function(event, direction) {

            if (direction == 'down') {

                nav_container.css({ 'height':nav.outerHeight() });
                nav.stop(true, true).addClass("sticky").css("top",-nav.outerHeight()).animate({"top":top_spacing},200);

            } else {

                nav_container.css({ 'height':'auto' });
                nav.stop(true, true).removeClass("sticky").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""},200);

            }

        },
        offset: function() {
            return -nav.outerHeight()-waypoint_offset;
        }
    });

    var sections = $(".section_for_nav");
    var navigation_links = $(".jq_prod_nav_wrap a");

    sections.waypoint({
        handler: function(event, direction) {

            var active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('.jq_prod_nav_wrap a[href="#' + active_section.attr("id") + '"]');
            navigation_links.removeClass("selected");
            active_link.addClass("selected");

        },
        offset: '25%'
    });


});