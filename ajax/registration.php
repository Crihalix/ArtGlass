<div class="modal_content_inner form_popup ">
    <h2 class="subtitle text_center">Регистрация аккаунта</h2>
    <div class="sub_pp_txt text_center">
        Уже зарегистрированны?<br>
        <a href="" data-toggle="modal" data-href="ajax/sing_in.php">Войти в магазин</a>
    </div>
    <form class="validation_form">
        <div class="field_group">
            <label class="tit_label" for="user_name">Ваше имя</label>
            <label class="field_wrap fa fa-user">
                <input type="text" id="user_name" class="field big_field" value="" placeholder="">
            </label>
        </div>
        <div class="field_group">
            <label class="tit_label" for="login_email">E-mail</label>
            <label class="field_wrap fa fa-envelope">
                <input type="email" id="login_email" class="field big_field" value="" placeholder="">
            </label>
        </div>
        <div class="field_group">
            <label class="tit_label" for="login_pass">Пароль</label>
            <label class="field_wrap fa fa-lock">
                <input type="password" id="login_pass" class="field big_field" value="" placeholder="">
                <a href="" class="view_pass_field fa fa-eye-slash show_password"></a>
            </label>
        </div>
        <div class="popup_btn_groupe">
            <input type="submit" class="btn btn_red w_190" value="Войти">
        </div>
    </form>
</div>
