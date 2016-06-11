
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
            catalogDropdown.removeClass('drpd_lvl3_line');
            catalogDropdown.addClass('drpd_lvl2_line');
        }

        function resetSizeDrpd3(event) {
            catalogDropdown.outerWidth(containerWidth);
            drpd_lvl3.outerWidth(containerWidth - (catalogListWidth * 2) - 2); //2 - this is border-width pixels

            drpd_lvl1Height = $('.catalog_menu_main_page').length ? 408 : catalogList.height();
            drpd_lvl2Height = $(event.target).parents('li').find('>.list_lvl2').height();
            drpd_lvl3Height = $(event.target).parents('li').find('>.drpd_bl_lvl3').height();
            //set and calculate height
            catalogDropdown.height(Math.max(drpd_lvl1Height, drpd_lvl2Height, drpd_lvl3Height));
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
            controls: false,
            pager: trigerOneSlider,
            adaptiveHeight: false
        };
        $('.main_slider').bxSlider(main_slider);
    })();



    $('body').iePlaceholder();

    $('body').on('click', '.dropdown', function (e) {
        if (!$(event.target).hasClass("dropdown").length) {
            e.stopPropagation();
        }
    });
    $('[data-toggle="dropdown"]').dropdown();


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


    $('.mask_tel').inputmask('+38 (999) 999 99 99', {'placeholder': '+38 (___) ___ __ __'});

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

    {
    //$('.main_slider').slick({
    //    infinite: true,
    //    speed: 300,
    //    dots: false,
    //    autoplay: true,
    //    slidesToShow: 1,
    //    autoplaySpeed: 5000,
    //    variableWidth: false
    //});
    //$('.atricle_slider').slick({
    //    infinite: true,
    //    speed: 300,
    //    dots: false,
    //    autoplay: false,
    //    adaptiveHeight: true
    //});

    //(function() {
    //    var viewsSlider = $('.jq_sl_fourInrow');
    //    if( viewsSlider.length){
    //        viewsSlider.slick({
    //            dots: false,
    //            infinite: false,
    //            slidesToShow: 4,
    //            speed: 200,
    //            slidesToScroll: 4,
    //            responsive:
    //                [
    //                    {
    //                        breakpoint: 1190,
    //                        settings: {
    //                            slidesToShow: 3,
    //                            slidesToScroll: 3
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 960,
    //                        settings: {
    //                            slidesToShow: 4,
    //                            slidesToScroll: 4
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 840,
    //                        settings: {
    //                            slidesToShow: 3,
    //                            slidesToScroll: 3
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 678,
    //                        settings: {
    //                            slidesToShow: 2,
    //                            slidesToScroll: 2
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 480,
    //                        settings: {
    //                            slidesToShow: 1,
    //                            slidesToScroll: 1
    //                        }
    //                    }
    //                ]
    //        });
    //    }
    //}());

    //(function() {
    //    if( $('.jq-views_slider').length) {
    //
    //        var viewsSlider = $('.jq-views_slider');
    //        viewsSlider.slick({
    //            dots: false,
    //            infinite: false,
    //            slidesToShow: 5,
    //            speed: 200,
    //            slidesToScroll: 5,
    //            responsive: [
    //                {
    //                    breakpoint: 1024,
    //                    settings: {
    //                        slidesToShow: 4,
    //                        slidesToScroll: 4
    //                    }
    //                },
    //                {
    //                    breakpoint: 840,
    //                    settings: {
    //                        slidesToShow: 3,
    //                        slidesToScroll: 3
    //                    }
    //                },
    //                {
    //                    breakpoint: 678,
    //                    settings: {
    //                        slidesToShow: 2,
    //                        slidesToScroll: 2
    //                    }
    //                },
    //                {
    //                    breakpoint: 480,
    //                    settings: {
    //                        slidesToShow: 1,
    //                        slidesToScroll: 1
    //                    }
    //                }
    //            ]
    //        });
    //    }
    //}());
    //
    //(function() {
    //    if( $('.jq-filter_slider').length){
    //
    //        var viewsSlider = $('.jq-filter_slider');
    //        viewsSlider.slick({
    //            dots: false,
    //            infinite: false,
    //            slidesToShow: 5,
    //            speed: 200,
    //            slidesToScroll: 5,
    //            responsive:
    //                [
    //                    {
    //                        breakpoint: 1024,
    //                        settings: {
    //                            slidesToShow: 4,
    //                            slidesToScroll: 4
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 840,
    //                        settings: {
    //                            slidesToShow: 3,
    //                            slidesToScroll: 3
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 678,
    //                        settings: {
    //                            slidesToShow: 2,
    //                            slidesToScroll: 2
    //                        }
    //                    },
    //                    {
    //                        breakpoint: 480,
    //                        settings: {
    //                            slidesToShow: 1,
    //                            slidesToScroll: 1
    //                        }
    //                    }
    //                ]
    //        });
    //
    //        var filterNav = $('.filter_slide_terms');
    //        filterNav.find('a').on(clickHandler, function(){
    //
    //            var typeFilt = $(this).attr('data-sort');
    //
    //            filterNav.find('a').removeClass('active');
    //            $(this).addClass('active');
    //            viewsSlider.slick('slickUnfilter');
    //
    //            if(typeFilt === 'all'){
    //                viewsSlider.slick('slickUnfilter');
    //            } else if (typeFilt === 'type1') {
    //                viewsSlider.slick('slickFilter','.type_sort1');
    //            } else if (typeFilt === 'type2') {
    //                viewsSlider.slick('slickFilter','.type_sort2');
    //            } else if (typeFilt === 'type3') {
    //                viewsSlider.slick('slickFilter','.type_sort3');
    //            } else if (typeFilt === 'type4') {
    //                viewsSlider.slick('slickFilter','.type_sort4');
    //            }
    //
    //        });
    //    }
    //
    //}());
}


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

            setTimeout(function(){
                triggerClose = true;
            },500);
        }
        function closeMenu() {
            $('.site_menu').removeClass('open_menu');
            $('.catalog_menu_dropdown').removeClass('open_menu');
            //$('.category_articles').removeClass('open_menu');
            $('.backdrop').remove();
            //$('.close_mob_menu').remove();
            $body.removeClass('backdrop_in');
            $body.css('padding-right', 0);

            setTimeout(function(){
                triggerClose = false;
            },500);
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


    $('.scroll-pane').jScrollPane({
        autoReinitialise: true
        //verticalDragMaxHeight: 386
    });

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
    (function(){
        $('body').on(clickHandler, '.views_btns a', function(){
            $(this).closest('.views_btns').find('.view_btn').removeClass('active');
            $(this).addClass('active')
        });
    }());





   /* $(function () {
        $('[data-toggle="popover"]').popover();
    });
    $('body').on(clickHandler, function (e) {
        var idPopover = $('.popover').attr('id');
        $('[aria-describedby="'+idPopover+'"]').popover('hide');
    });*/
    var isVisiblePP = false;
    var hideAllPopovers = function() {
        $('[data-toggle="popover"]').each(function() {
            $(this).popover('hide');
        });
    };
    $('body').on(clickHandler, function(e) {
        if($('.popover').is(':visible')){
            hideAllPopovers();
            isVisiblePP = false;
            e.stopPropagation();
            console.log(2)
        }
    });
    $(function () {

        $('[data-toggle="popover"]').popover({
            trigger: 'manual'
        }).on(clickHandler, function(e) {
            // if any other popovers are visible, hide them
            if(isVisiblePP) {
                hideAllPopovers();
            }

            $(this).popover('show');

            // handle clicking on the popover itself
            $('.popover').off(clickHandler).on(clickHandler, function(e) {
                e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
            });

            isVisiblePP = true;
            e.stopPropagation();
        });
    });


//modal
    (function() {

        $('body').on('click', '[data-toggle="modal"]', function(e) {
            e.preventDefault();
            var $modal = $('#modal'),
                $this = $(this),
                winWith = window.innerWidth;

            if($this.hasClass('go_to_sing_in')){
                if(winWith >= 479 ){
                    $('.sing_in[data-toggle="dropdown"]').dropdown('toggle');
                } else {
                    $modal.find('.modal_content').load($this.attr('data-href'), showModal);
                }
            } else{
                $modal.find('.modal_content').load($this.attr('href'), showModal);
            }

            $modal.on('shown.bs.modal', centeredPopUp);
            $modal.on('show.bs.modal', centeredPopUp);
            $(window).on('resize', centeredPopUp);

            function showModal() {
                $modal.iePlaceholder();
                $modal.find('.modal_block').removeClass('without_close');


                $modal.find('.styler').styler({
                    selectSmartPositioning: false,
                    singleSelectzIndex: 1
                });
                $(this).find('.jq-selectbox').removeAttr('data-validavalidate'); //for correct work with validate class, must be before validate init


                if($modal.find('.scroll-pane').length){
                    $modal.find('.scroll-pane').jScrollPane({
                        autoReinitialise: true
                    });
                }
                $modal.find('.mask_tel').inputmask('+38 (999) 999 99 99', {'placeholder': '+38 (___) ___ __ __'});


                $modal.find('.question_ico').popover({trigger: 'manual'}).on(clickHandler, function(e) {
                    // if any other popovers are visible, hide them
                    if(isVisiblePP) {
                        hideAllPopovers();
                    }
                    $(this).popover('show');
                    // handle clicking on the popover itself
                    $('.popover').off(clickHandler).on(clickHandler, function(e) {
                        e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
                    });

                    isVisiblePP = true;
                    e.stopPropagation();
                });


                $modal.find('.datepicker').datepicker({
                    maxDate: "+0d"
                });

                if($modal.find('#map').length){

                    var latitude = "49.982403";
                    var longitude = "36.247789";
                    var zoommap = 17;

                    (function() {
                        google.maps.event.addDomListener(window, 'load', init);
                        function init() {
                            var mapOptions = {
                                center: new google.maps.LatLng(latitude, longitude),
                                zoom: zoommap,
                                zoomControl: false,
                                disableDoubleClickZoom: true,
                                mapTypeControl: false,
                                scaleControl: false,
                                scrollwheel: true,
                                panControl: false,
                                streetViewControl: false,
                                draggable : true,
                                overviewMapControl: false,
                                overviewMapControlOptions: {
                                    opened: false
                                },
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };
                            var mapElement = document.getElementById('our_addr_map');
                            var map = new google.maps.Map(mapElement, mapOptions);




                            new google.maps.Marker({
                                position: new google.maps.LatLng(latitude,longitude),
                                map: map,
                                icon: 'dist/img/gg_map_pin_ico.png'
                            });

                        }
                    })();
                }




                //validations
                $('.recover_pass_form').formValidation({
                    successEvent: function() {
                        //отправить форму аяксом, в ответ можно присылать нужный html
                        $modal.find('.modal_block').addClass('without_close').find('.modal_content').html('<div class="modal_content_inner notice"><p class="notice_descript">Проверьте почту. Мы отправили вам письмо<br>с дальнейшими инструкциями</p></div>');
                        centeredPopUp();
                    }
                }).on('submit', function() {
                    return false;
                });

                //validations
                $('.order_call,.buy_one_click_form').formValidation({
                    successEvent: function() {
                        //отправить форму аяксом, в ответ можно присылать нужный html
                        $modal.find('.modal_block').addClass('without_close').find('.modal_content').html('<div class="modal_content_inner notice"><p class="notice_descript">Спасибо! <br> Мы в ближайшее время свяжемся с Вами!</p></div>');
                        centeredPopUp();
                    }
                }).on('submit', function() {
                    return false;
                });

                //formValidation
                $('.sing_in_form, .tell_payment_form, .leave_review_form, .report_entry_form, .ask_question_pp_form').formValidation({
                    successEvent: function() {
                        //отправить форму аяксом, в ответ можно присылать нужный html
                        //$modal.find('.modal_block').addClass('without_close').find('.modal_content').html('<div class="modal_content_inner notice"><p class="notice_descript">Спасибо! <br> Мы в ближайшее время свяжемся с Вами!</p></div>');
                        //centeredPopUp();
                    }
                }).on('submit', function() {
                    return false;
                });


                $modal.modal();
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
    })();




    //amount_goods
    (function(){
        $('body').on(clickHandler, '.less', function(){
            var $counter = $(this).parents('.amount_goods').find('input');
            if($counter.val() > 1 ) {
                $counter.val(Number($counter.val()) * 1 - 1);
            }
        });

        $('body').on(clickHandler, '.more', function(){
            var $counter = $(this).parents('.amount_goods').find('input');
            $counter.val(Number($counter.val()) * 1 + 1);
        });
    })();



    //open_textarea
    (function(){
        $('body').on(clickHandler, '.open_textarea', function(){

            var _this = $(this),
                thisAttrTxt = _this.attr('data-toggle-text'),
                thisTxt = _this.text(),
                wrapArtTxt = _this.closest('.leave_comment');

            function replaceTxt(){
                _this.attr('data-toggle-text',thisTxt);
                thisTxt = _this.text(thisAttrTxt);
            }

            if(_this.closest('.leave_comment').hasClass('opened')){
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


    //show all text on haracteristic in detailed
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
    //pay_bonus
    (function(){
        $('body').on(clickHandler, '.pay_bonus', function(e){
            e.preventDefault();
            e.stopPropagation();
            var _this = $(this),
                bonusForm = $('.bonus_form_bl');


            if(_this.hasClass('opened')){
                _this.removeClass('opened');
                bonusForm.slideUp(200);
            } else{
                _this.addClass('opened');
                bonusForm.slideDown(200);
            }
        });
    })();

//repeated password
    (function() {
        $('body').on('submit keyup', '.registration_form,.change_pass_form', function () {
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

    //prod det slider
    (function() {
        $('.prod_det_slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            speed: 200,
            asNavFor: '.prod_det_thumbnails'

        });

        $('.prod_det_thumbnails').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: '.prod_det_slider',
            dots: true,
            //	centerMode: true,
            focusOnSelect: true
        });

        //remove active class from all thumbnail slides
        $('.slider-nav-thumbnails .slick-slide').removeClass('slick-current');
        //set active class to first thumbnail slides
        $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-current');
        // On before slide change match active thumbnail to current slide
        $('.prod_det_slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var mySlideNumber = nextSlide;
            $('.prod_det_thumbnails .slick-slide').removeClass('slick-current');
            $('.prod_det_thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-current');
        });
    })();









    //formValidation
    $('.sing_in_form').formValidation({
        successEvent: function() {
            //отправить форму аяксом, в ответ можно присылать нужный html
        }
    }).on('submit', function() {
        return false;
    });

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







    $(function (){
         $('a[href*=#]').bind(clickHandler, function(scrolling){
             var anchor = $(this);
             $('html, body').stop().animate({
             scrollTop: $(anchor.attr('href')).offset().top - 55}, 500);
         scrolling.preventDefault();
         });
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

    $('.datepicker').datepicker({
        minDate: "+0d"
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