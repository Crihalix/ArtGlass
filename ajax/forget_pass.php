<div class="modal_content_inner form_popup ">
    <h2 class="subtitle text_center">Восстановление пароля</h2>
    <div class="sub_pp_txt text_center">
        Введите e-mail указанный при регистрации.<br>
        Мы отправим на него новый пароль
    </div>
    <form class="forget_pass_form">
        <div class="field_group">
            <label class="tit_label" for="login_email">E-mail</label>
            <label class="field_wrap fa fa-envelope row_vld">
                <input type="email" id="login_email" class="field big_field" data-validate="required-email" value=""
                       placeholder="">
            </label>
        </div>
        <a href="" data-toggle="modal" data-href="ajax/sing_in.php">Уже вспомнил!:)<br> (если надо переход назад на попап Входа)</a>
        <div class="popup_btn_groupe">
            <input type="submit" class="btn btn_red w_190" value="Войти">
        </div>
    </form>
</div>
