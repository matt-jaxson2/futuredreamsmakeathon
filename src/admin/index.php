<?php
include('class.admin.php');

use \futureDreams\functions;

$admin = new futureDreams\functions\admin();

$msg = "&nbsp;";
$msg_type = "";

if (isset($_POST['submit'])) {
    $file = $_FILES['csv_file'];

    // Validate file type
    if ($file['type'] == 'text/csv') {
        $count = $admin->processData($file);
        $msg = "Success, uploaded " . $count . " entries!";
        $msg_type = "success";
      } else {
        $msg = "Error, please choose a csv file to upload!";
        $msg_type = "error";
    }
}

$entries = $admin->entries();

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Makeathon - Future Dreams CSV upload</title>
    <link rel="icon" href="https://futuredreams.org.uk/wp-content/uploads/2021/07/cropped-favicon-80x80.png" sizes="32x32">
    <link rel="icon" href="https://futuredreams.org.uk/wp-content/uploads/2021/07/cropped-favicon-300x300.png" sizes="192x192">
    <link rel="apple-touch-icon" href="https://futuredreams.org.uk/wp-content/uploads/2021/07/cropped-favicon-300x300.png">
    <meta name="msapplication-TileImage" content="https://futuredreams.org.uk/wp-content/uploads/2021/07/cropped-favicon-300x300.png">
    <style>
      /* inherit from main app */
      :root{--grid-columns: 5;--white: #FFFFFF;--grey1: #3e3e3e;--pink1: #ED8EAB;--pink2: #FDD2DF;--pink-opacity: rgba(234, 128, 176, .6);--font-body: "Gill Sans", Arial, sans-serif;--font-header: "Chronicle Display", serif}*,*:before,*:after{border:0;box-sizing:border-box;font-size:100%;line-height:100%;margin:0;outline:0;padding:0;-webkit-text-size-adjust:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}html,body{margin:0;min-height:100vh;padding:0}body{color:var(--grey1);font-family:var(--font-body);font-size:1rem;letter-spacing:.1rem}.wrapper{background-image:url(/assets/ribbon-small-gALt1wBi.jpg);background-position:100% 11rem;background-repeat:no-repeat;background-size:contain;display:flex;flex-direction:column;min-height:100vh}.wrapper:before{background:linear-gradient(177.34deg,var(--white) 37.03%,var(--pink1) 94.42%);bottom:0;content:"";left:0;mix-blend-mode:multiply;pointer-events:none;position:fixed;right:0;top:0}.bottom-content{margin-block-start:auto;z-index:10}@media (min-width: 576px){.wrapper{background-image:url(/assets/ribbon-large-UIw7ABRU.jpg);background-position:100% 0;background-size:cover}}.button{background-color:var(--white);border-radius:6px;color:#3e3e3e;display:block;font-size:1.125rem;line-height:1;padding:.875rem;text-align:center;text-decoration:none;text-wrap:nowrap;transition:background-color .3s ease;width:90%}.button:hover,.button:focus{background-color:#fdd2df}@media (min-width: 375px){.button{min-width:320px;width:auto}}.site-header{margin-block-start:3rem;margin-inline:auto;text-align:center}.site-header__logo{display:inline-block;margin-block-end:2rem;height:14px;width:166px}.site-header__title{font-weight:300;line-height:1.125}.site-header__title-second-line{display:block;font-family:var(--font-header);font-size:2.5rem;line-height:1.2}@media (min-width: 768px){.site-header{margin-block-start:4.375rem}.navigation{display:flex;justify-content:center;margin-block-end:1.75rem}@media (min-width: 992px){.navigation{margin-block-end:3rem}}
      /* custom to admin */
      h3 { 
        padding: 0; 
        margin: 0 0 0.5em 0; 
        font-weight: normal;
      }
      div.upload {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 3em;
      }
      form {
        margin-bottom: 20px;
      }
      div.upload_form {
        padding: 30px 60px;
        border: 2px solid white;
        background-color: rgba(234, 128, 176, .8);
      }
      div.error { color: red; }
      div.success { color: green; }

      input[type=file] {
        font-family: var(--font-body);
        width: 100%;
        padding: 12px 0;
        margin: 8px 0;
        border-radius: 4px;
        box-sizing: border-box;
      }
      button[type=submit] {
        background-color: var(--white) !important;
        border-radius: 6px;
        color: #3e3e3e;
        display: block;
        font-size: 1.125rem;
        line-height: 1;
        padding: 0.875rem;
        text-align: center;
        text-decoration: none;
        text-wrap: nowrap;
        transition: background-color .3s ease;
        width: 90%;
        cursor: pointer;
        font-family: var(--font-body);
      }
      button[type=submit]:hover {
        background-color: var(--pink2) !important;
      }      
    </style>
  </head>
  <body>
    <div class="wrapper">
      <header class="site-header">
        <img class="site-header__logo" src="../images/logo.svg" alt="Future Dreams">
        <h1 class="site-header__title">BE PART OF SOMETHING BIG <span class="site-header__title-second-line">MAKEATHON</span></h1>
      </header>
      <main>
        <div class="upload">
            <div class="upload_form">
              <div class="messages <?= $msg_type ?>"><h3><?php echo $msg ?></h3></div>
              <form action="<?php echo htmlentities($_SERVER['PHP_SELF']);?>" method="post" enctype="multipart/form-data">
                  <label for="file-upload">
                    <p>Please select a (.csv) file to upload new entries.</p>
                  </label>
                    <input id="file-upload" type="file" name="csv_file" accept=".csv">
                  <button type="submit" name="submit">Upload CSV</button>
              </form>
              <p>There are currently <?=$entries ?> entries available to display.</p>
            </div>
        </div>
      </main>
    </div>
  </body>
</html>
