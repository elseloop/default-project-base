<!DOCTYPE html>
<?php
    require_once('recaptchalib.php');
?>
<html>
<head>
  <title>Contact Omlet</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/build/min/style.min.css">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,700' rel='stylesheet' type='text/css'>
  <script src="js/modernizr.js"></script>
</head>

<body class="pg-contact">
  
  <section class="hero">
    
    <header class="site-header wrap">
        
        <h1 class="logo-wrap"><a href="/" class="logo">Omlet</a></h1>

        <nav class="main-nav">
          <a href="/company.html">Company</a>
          <a class="active" href="/contact.php">Contact</a>
        </nav>

    </header>

  </section>

  <article>
    <div class="pg-content">
      <div class="pg-inner">
        <h2>Contact Omlet</h2>
        <p>We’ve hatched our first app, but we’re just getting started. For more information about Omlet, MobiSocial, or our official launch in Silicon Valley, please use this simple contact form.</p>
        
        <?php
        if (isset($_REQUEST['email']))
        //if "email" is filled out, send email
          {
              $email = $_REQUEST['email'] ;         
              $message = $_REQUEST['message'] ;
              
              $privatekey = "6Leum-wSAAAAACPiXTdAhamvGFC5vrdgg-8CyTbE";
                $resp = recaptcha_check_answer ($privatekey,
                                              $_SERVER["REMOTE_ADDR"],
                                              $_POST["recaptcha_challenge_field"],
                                              $_POST["recaptcha_response_field"]);

                if (!$resp->is_valid) {
                      echo "<p><b>The reCAPTCHA wasn't entered correctly.</b></p>";
                } 
                else {
                    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

                            require '../../usr/share/php/libphp-phpmailer/class.phpmailer.php';
                            require '../../usr/share/php/libphp-phpmailer/class.smtp.php';

                            $mail = new PHPMailer;

                            $mail->IsSMTP();    
                            //$mail->SMTPDebug  = 2;  
                            $mail->SMTPAuth   = TRUE;                  // enable SMTP authentication
                            $mail->SMTPSecure = "tls";                 // sets the prefix to the servier
                            $mail->Host       = "email-smtp.us-east-1.amazonaws.com";      // sets GMAIL as the SMTP server
                            //$mail->Port       = 587;                   // set the SMTP port
                            $mail->Username   = "AKIAI63SVJCKRHCFOVYA"; // GMAIL username
                            $mail->Password   = "AsYn5a0NgwquqMww4OSSyvRCXIQTZq9qreYCOFpjecdr";      // GMAIL password
                            //$mail->SetFrom("contact@omlet.me", "Omlet Site");
                            $mail->SetFrom("contact@omlet.me", "Omlet Site");
                            $mail->AddReplyTo($email);
                            $mail->addAddress('contact@omlet.me');  // Add a recipient
                            $mail->Subject = '[Website Query]';
                            $mail->Body    = $message;
                            $mail->AltBody = $message;

                            if(!$mail->send()) {
                               echo "<p><b>Oops! There was a problem sending your message</b></p>";
                               //echo 'Mailer Error: ' . $mail->ErrorInfo;
                            }

                        //send email
                            else {
                                echo "<p><b>Thank you for reaching out to us!</b></p>";
                                $email = "";
                                $message = "";
                            }
                      }
                      else {
                          echo "<p><b>Please enter a valid email.</b></p>";
                      }
                }
              
          }
          else {
              $email = "";
              $message = "";   
          }
          echo "<form method='post' action='contact.php'>
            <table>
            <tr><td>Email: </td><td><input name='email' type='text' value='".$email."'></td></tr>
          <tr><td colspan='2'><textarea name='message' rows='10' style='width: 100%;'>".$message."</textarea></td></tr>
          </table>";
          
          $publickey = "6Leum-wSAAAAAEzgDbLIv8pSCcOJxt5kYTrel14p";
          echo recaptcha_get_html($publickey);
          
          echo "<input type='submit'>
          </form>";
        ?>
        
      </div>
    </div>
  </article>

  <footer class="site-footer">
    <div class="wrap">
      
      <nav class="social-nav">
        <a class="fb" href="https://www.facebook.com/omletchat">Facebook</a>
        <a class="tw" href="https://twitter.com/OmletChat">Twitter</a>
        <a class="email" href="mailto:contact@omlet.me">Email</a>
        <a class="insta" href="http://instagram.com/omletapp">Instagram</a>
      </nav>

      <p class="site-credits">Made with <span>&hearts;</span> in Palo Alto, CA. Copyright 2014 MobiSocial Inc.</p>

    </div>

  </footer>

  <script src="js/build/scripts.min.js"></script>

</body>
</html>