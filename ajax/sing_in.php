<div class="modal_content_inner form_popup ">
    <h2 class="subtitle text_center">Вход в магазин</h2>
    <div class="sub_pp_txt text_center">
        Еще нет аккаунта?<br>
        <a href="" data-toggle="modal" data-href="ajax/registration.php">Зарегистрировать аккаунт бесплатно</a>
    </div>
    <form class="validation_sing_in">
        <div class="field_group">
            <label class="tit_label" for="login_email">E-mail</label>
            <label class="field_wrap fa fa-envelope row_vld" >
                <input type="email" id="login_email" class="field big_field" data-validate="required-email" value=""
                       placeholder="">
                <div class="error_msg">
                    ошибка
                </div>
            </label>
        </div>
        <div class="field_group">
            <label class="tit_label" for="login_pass">Пароль</label>
            <label class="field_wrap fa fa-lock row_vld">
                <input type="password" id="login_pass" class="field big_field" data-validate="required" value=""
                       placeholder="">
            </label>
        </div>
        <div class="forgot_pass_bl">
            <a href="" data-toggle="modal" data-href="ajax/forget_pass.php" class="">Я забыл свой пароль</a>
        </div>
        <div class="popup_btn_groupe">
            <input type="submit" class="btn btn_red w_190" value="Войти">
        </div>
    </form>
</div>