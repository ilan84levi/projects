<?php
session_start();
if (isset($_SESSION["userName"])) {
    $userName = $_SESSION["userName"];
} else {
    $userName = null;
}
?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>ilan site</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Nosifer" rel="stylesheet">
        <link rel="stylesheet" href="styles/style.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="js/playlist.js"></script>
        <script src="js/addMovie.js"></script>
        <script src="js/register.js"></script>
        <script src="js/login.js"></script>
        <script src="js/addMovieMain.js"></script>
    </head>
    <body>
        <header>
            <h1 id="mainheaderh1" class="col-12"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h1>
            <ul class='breadcrumb'>
                <?php
                if ($userName == null) {
                    echo "<li class='breadcrumb-item active' >hello guest</span></li>";
                    echo "<li class='breadcrumb-item active'  data-toggle='modal' data-target='#loginModal'>login</li>";
                    echo "<li class='breadcrumb-item active registerbtn' data-toggle='modal' data-target='#registerModal'>register</li>";
                } else {
                    echo "<li class='breadcrumb-item active'><span>HELLO <span id='userNameMain'> $userName</span></span></li>";
                    echo "<li class='breadcrumb-item active'><a href='phpPages/logout.php'><span>LOG-OUT </span></a></li>";
                    echo "<li class='breadcrumb-item active'><a href='phppages/myPlayList.php' onclick='showPlayList($userName)'><span>MY PLAYLIST</span></a></li>";
                    echo "<li class='breadcrumb-item active' data-toggle='modal' data-target='#addVideo' onclick='getCatergories()'>ADD TO PLAYLIST</li>";
                }
                ?>
            </ul>
        </header>
        <div class="secondPic"></div>
        <div class="jumbotron">
        <h1 class="display-4">wellcome</h1>
        <p class="lead">HELLO Friends, This is the most simple and easy to use site
            Which allows you to create a playlist.
            The site was created with the audience's needs in mind .</p>
        <hr class="my-4">     
         <div class="video-container ">
                <video autoplay loop muted class="container-fluid">
                    <source src="assets/video/videoplayback.mp4" type="video/mp4">
                </video>
            </div>
</div>
        <!-- Modal login-->
        <div class="modal" tabindex="-1" role="dialog" id="loginModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="login-register-Box">
                            <h3>LOGIN</h3>
                            <input type="text"  placeholder="USER NAME" class="login-register-Inputs form-control" id="loginUserNameId"><br>
                            <input type="text" placeholder="PASSWORD" class="login-register-Inputs form-control" id="loginPasswordId"> 
                            <button id="loginWithAjax" class="btn btn-primary">login</button>
                            <p id="loginErrorsModal"></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"  data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal register-->
        <div class="modal" tabindex="-1" role="dialog" id="registerModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="login-register-Box">
                            <h3 id="registerMessage">REGISTER</h3>
                            <input type="text"  placeholder="first Name"       class="login-register-Inputs form-control firstName"        id="firstName" >
                            <input type="text"  placeholder="last NAME"        class="login-register-Inputs form-control lastName"         id="lastName" >
                            <input type="text"  placeholder="USER NAME"        class="login-register-Inputs form-control userName"         id="userName">
                            <input type="text"  placeholder="PASSWORD"         class="login-register-Inputs form-control password"         id="password" > 
                            <input type="text"  placeholder="confirm PASSWORD" class="login-register-Inputs form-control repassword"       id="repassword" >
                            <button type="button" class="btn btn-primary" onclick="register()">registeration</button>
                            <p id="registerErrorMessage"></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal add to playlist-->
        <div class="modal" tabindex="-1" role="dialog" id='addVideo'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>add to playlist</h3>
                        <div id="categoryDiv"></div>
                        <input type="text"  placeholder="movie name"        class="login-register-Inputs form-control lastName"         id="moviename" >
                        <input type="text"  placeholder="Description"        class="login-register-Inputs form-control userName"         id="Description">
                        <input type="text"  placeholder="videoLink"         class="login-register-Inputs form-control password"         id="videoLink" >
                        <button onclick='addVideo()'                       class="btn btn-primary registerBtn">add</button>
                        <p id="mainAddVideoMessage"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <footer>Ilan levi  &copy;</footer>
    </body>
</html>
