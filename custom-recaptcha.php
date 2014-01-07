<?php
  
  $publickey = "6Leum-wSAAAAAEzgDbLIv8pSCcOJxt5kYTrel14p";

?>

<div id="recaptcha_widget" style="display:none" class="recaptcha_widget">
  <div id="recaptcha_image"></div>
  <div class="recaptcha_only_if_incorrect_sol" style="color:red">Incorrect. Please try again.</div>

  <div class="recaptcha_input">
    <label class="recaptcha_only_if_image" for="recaptcha_response_field">Enter the words above:</label>
    <label class="recaptcha_only_if_audio" for="recaptcha_response_field">Enter the numbers you hear:</label>

    <input type="text" id="recaptcha_response_field" name="recaptcha_response_field">
  </div>

  <ul class="recaptcha_options">
    <li>
      <a href="javascript:Recaptcha.reload()">
        <i class="fa fa-refresh"></i>
        <span class="captcha_hide">Get another CAPTCHA</span>
      </a>
    </li>
    <li class="recaptcha_only_if_image">
      <a href="javascript:Recaptcha.switch_type('audio')">
        <i class="fa fa-volume-up"></i><span class="captcha_hide"> Get an audio CAPTCHA</span>
      </a>
    </li>
    <li class="recaptcha_only_if_audio">
      <a href="javascript:Recaptcha.switch_type('image')">
        <i class="fa fa-picture"></i><span class="captcha_hide"> Get an image CAPTCHA</span>
      </a>
    </li>
    <li>
      <a href="javascript:Recaptcha.showhelp()">
        <i class="fa fa-question-sign"></i><span class="captcha_hide"> Help</span>
      </a>
    </li>
  </ul>
</div>

<script type="text/javascript" src="http://www.google.com/recaptcha/api/challenge?k=<?php echo $publickey; ?>"></script>
<noscript>
  <iframe src="http://www.google.com/recaptcha/api/noscript?k=<?php echo $publickey; ?>" height="300" width="500" frameborder="0"></iframe><br>
  <textarea name="recaptcha_challenge_field"></textarea>
  <input type="hidden" name="recaptcha_response_field" value="manual_challenge">
</noscript>

<!-- End Responsive reCAPTCHA-->