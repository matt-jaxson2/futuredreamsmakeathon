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
        <img class="site-header__logo" src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='190.33'%20height='15.9'%3e%3cg%20data-name='Layer%202'%3e%3cg%20data-name='Layer%201'%3e%3cpath%20d='M72%203.17a2.07%202.07%200%200%200-1.1-.84%208%208%200%200%200-2.33-.24h-.67V7h.84a6.33%206.33%200%200%200%202.32-.29%202.1%202.1%200%200%200%201-.87%202.47%202.47%200%200%200%20.35-1.33A2.42%202.42%200%200%200%2072%203.17Zm75.41%206.17h6.66l-3.33-7.3-3.33%207.3zM102.65%201.2h-4.29v13.5h4.37a7.13%207.13%200%200%200%205-1.85%206.35%206.35%200%200%200%202-4.9%206.47%206.47%200%200%200-2-4.87%207.14%207.14%200%200%200-5.08-1.88Zm21.41%203.03A2.63%202.63%200%200%200%20123%202a4.88%204.88%200%200%200-3-.8h-2.53v6.07H120a4.9%204.9%200%200%200%203-.8%202.65%202.65%200%200%200%201.06-2.24Z'%20style='fill:none'/%3e%3cpath%20d='M0%2015.7h2.22V8.48h6.05V6.5H2.22V2.17h6.05V.2H0v15.5zM23.7%209a8.06%208.06%200%200%201-.29%202.58%203.21%203.21%200%200%201-.95%201.31%204.83%204.83%200%200%201-3.21%201%205.32%205.32%200%200%201-2.41-.51A3.58%203.58%200%200%201%2015.32%2012a6.58%206.58%200%200%201-.5-3V.2h-2.23V9a10.8%2010.8%200%200%200%20.25%202.75%206.16%206.16%200%200%200%20.63%201.48%205.12%205.12%200%200%200%20.94%201.09%207.19%207.19%200%200%200%204.86%201.58%207.08%207.08%200%200%200%204.81-1.59%204.8%204.8%200%200%200%20.92-1.1%205.65%205.65%200%200%200%20.64-1.52A10%2010%200%200%200%2025.93%209V.2H23.7Zm6.25-6.85h5.32V15.7h2.22V2.15h5.41V.18H29.95v1.97zM58.05%209a8.06%208.06%200%200%201-.29%202.58%203.1%203.1%200%200%201-.94%201.31%204.86%204.86%200%200%201-3.22%201%205.35%205.35%200%200%201-2.41-.51A3.64%203.64%200%200%201%2049.67%2012a6.58%206.58%200%200%201-.5-3V.2h-2.23V9a11.29%2011.29%200%200%200%20.25%202.75%205.78%205.78%200%200%200%20.64%201.48%204.8%204.8%200%200%200%20.93%201.09%207.19%207.19%200%200%200%204.86%201.58%207.11%207.11%200%200%200%204.82-1.59%205.07%205.07%200%200%200%20.94-1.08%206%206%200%200%200%20.62-1.54A10.55%2010.55%200%200%200%2060.28%209V.2h-2.23Zm17.47%203.6a27.68%2027.68%200%200%200-2-2.94%206.82%206.82%200%200%200-1.45-1.33A4.05%204.05%200%200%200%2074%206.86a4.06%204.06%200%200%200%20.68-2.34%203.92%203.92%200%200%200-1.38-3.16A5.64%205.64%200%200%200%2069.58.2h-3.89v15.5h2.22V9h.58a3.6%203.6%200%200%201%201.51.2%204.76%204.76%200%200%201%201%20.82%2011.64%2011.64%200%200%201%201.26%201.52l.74%201.21.69%201.13.43.61a1.29%201.29%200%200%201%20.13.19l.68%201h2.64l-.82-1.11c-.26-.42-.69-1.09-1.23-1.97Zm-4.45-5.91a6.33%206.33%200%200%201-2.32.31h-.84V2.09h.67a8%208%200%200%201%202.33.24%202.07%202.07%200%200%201%201.1.84%202.42%202.42%200%200%201%20.38%201.32A2.47%202.47%200%200%201%2072%205.82a2.1%202.1%200%200%201-.93.87Zm12.77%202.2h6.35V6.9h-6.35V2.17h6.57V.2h-8.79v15.48h9V13.7h-6.78V8.89zM102.59.2h-5.43v15.5h5.64a8.14%208.14%200%200%200%206.09-2.19A7.62%207.62%200%200%200%20111%208a7.56%207.56%200%200%200-2.17-5.59A8.53%208.53%200%200%200%20102.59.2Zm5.15%2012.65a7.13%207.13%200%200%201-5%201.85h-4.38V1.2h4.29a7.14%207.14%200%200%201%205.12%201.88%206.47%206.47%200%200%201%202%204.87%206.35%206.35%200%200%201-2.03%204.9ZM122.41%208q3-1.1%203-3.78A3.58%203.58%200%200%200%20124%201.28%205.89%205.89%200%200%200%20120.22.2h-4v15.5h1.2V8.27h2.1a3.82%203.82%200%200%201%202.2.52%2010.16%2010.16%200%200%201%202.11%202.66l2.7%204.25H128l-3.51-5.36A6.86%206.86%200%200%200%20122.41%208ZM120%207.27h-2.57V1.2H120a4.88%204.88%200%200%201%203%20.8%202.63%202.63%200%200%201%201%202.23%202.65%202.65%200%200%201-1%202.24%204.9%204.9%200%200%201-3%20.8Zm12.77%201.14h7.07V7.4h-7.07V1.2h7.26v-1h-8.46v15.5h8.63v-1h-7.43V8.41zM150.42.09l-7.17%2015.61h1.26l2.49-5.36h7.58L157%2015.7h1.26L151.07.09Zm-3%209.25L150.73%202l3.34%207.3Zm22.05-1.94L163.54.2h-1.2v15.5h1.2V1.95l5.92%207.25%205.9-7.25V15.7h1.21V.2h-1.22l-5.88%207.2zm20.3%202.06a3.9%203.9%200%200%200-1.38-1.28%2020.94%2020.94%200%200%200-2.57-1.11%205.41%205.41%200%200%201-2.32-1.39%202.59%202.59%200%200%201-.56-1.62%202.72%202.72%200%200%201%20.94-2.1%203.34%203.34%200%200%201%202.34-.85%207.23%207.23%200%200%201%203.47%201.19V1a7.41%207.41%200%200%200-3.59-1%204.52%204.52%200%200%200-3.1%201.2%203.84%203.84%200%200%200-1.31%202.91%203.49%203.49%200%200%200%20.54%202%203.83%203.83%200%200%200%201.31%201.2%2024.18%2024.18%200%200%200%202.57%201.11%205.41%205.41%200%200%201%202.39%201.48%203%203%200%200%201-.36%204%203.31%203.31%200%200%201-2.33.89%207%207%200%200%201-3.9-1.65v1.4a7.13%207.13%200%200%200%204%201.36%204.49%204.49%200%200%200%203.09-1.23%204%204%200%200%200%201.31-3%203.93%203.93%200%200%200-.54-2.21Z'%20style='fill:%23030304'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e" alt="Future Dreams">
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
