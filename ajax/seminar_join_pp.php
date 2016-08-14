<form class="seminar_join_pp_form">
    <div class="seminar_join_pp_wrap">
        <h2 class="title hid_dsk">Записаться<br>
            на семинар</h2>
        <div class="field_group row_vld">
            <label for="seminar_join_name" class="tit_label">Фамилия, имя</label>
            <input type="text" class="field h_30" id="seminar_join_name" data-validate="required" value="" placeholder="">
        </div>
        <div class="fields_group clear_fix">
            <div class="field_group field_telephone row_vld">
                <label for="seminar_tel" class="tit_label">Телефон</label>
                <input type="tel" class="field h_30 js-mask_tel" id="seminar_tel" data-validate="required-number"
                       value="" placeholder="">
            </div>
            <div class="field_group field_email row_vld">
                <label for="seminar_email" class="tit_label">Email</label>
                <input type="email" class="field h_30" id="seminar_email" data-validate="required-email"
                       value="" placeholder="">
            </div>
        </div>

        <div class="fields_group clear_fix">
            <div class="field_group field_calendar">
                <label class="tit_label">Дата проведения</label>
                <input type="tel" readonly class="field h_30"
                       value="28.12 — 30.12" placeholder="">
                <div class="calendar_block js-wrap-datepicker-pp">
                    <button class="btn datepicker_btn js-toggle-datepicker-pp">
                        <span class=" fa fa-calendar"></span>
                    </button>
                    <div class="datepicker_pp js-datepicker-pp">
                        <button class="js-toggle-datepicker-pp btn close_btn fa fa-close"></button>
                    </div>
                </div>
            </div>
            <div class="field_group field_counts_guest text_center">
                <label class="tit_label">К-во участников</label>
                <div class="amount_goods">
                    <button class="btn less fa fa-minus"></button>
                    <input type="number" class="field number_input" value="1">
                    <button class="btn more fa fa-plus"></button>
                </div>
            </div>
        </div>
    </div>
    <div class="seminar_join_pp_btn_bl">
        <button class="btn btn_red w_290">Оставить заявку</button>
        <label class="checkbox_item checkbox_item_big check_dark">
            <input type="checkbox" class="hide" value="">
            <span class="checkbox_ico fa fa-check"></span>
            и отправить событие в google-календарь
        </label>
    </div>
</form>
<button class="close_btn btn js-close-seminar-pp fa fa-close"></button>