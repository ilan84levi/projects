<?php
session_start();
if (isset($_SESSION["userName"])) {
    $userName = $_SESSION["userName"];
} else {
    $userName = null;
    header('location:../index.php');
}
?>
<!--if u try to get directly to phppages/myplaylist.php
it will redirect you to index.php-->
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Nosifer" rel="stylesheet">
        <link rel="stylesheet" href="../styles/style.css">
         <link rel="shortcut icon" href="http://localhost/favicon.ico">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="../js/playlist.js"></script>
        <script src="../js/addMovie.js"></script>

    </head>
    <body onload="showPlayList()">
        <header>
    
            <h1 id="mainheaderh1" class="col-12"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h1>

            <ul class='breadcrumb'>

                <?php
                if ($userName == null) {

                    echo "<li  class='breadcrumb-item active'><span><span class='badge badge-primary'>hello guest</span> </span></li>";
                    echo "<li  class='breadcrumb-item active' data-toggle='modal' data-target='#loginModal'>login</li>";
                    echo "<li  class='breadcrumb-item active' data-toggle='modal' data-target='#registerModal'>register</li>";
                } else {
                    echo "<li  class='breadcrumb-item active'><span>HELLO <span id='userNamePlaylist'> $userName</span></span></li>";
                    echo "<li  class='breadcrumb-item active'><a href='logout.php'><span>LOG-OUT </span></a></li>";
                    echo "<li  class='breadcrumb-item active' data-toggle='modal' data-target='#addVideoBtn' onclick='getCatergories()'>ADD TO PLAYLIST</li>";
                    echo "<li  class='breadcrumb-item active'> <a href='../index.php'> home</a></li>";
                    echo "<input class='form-control mr-sm-2 serchBox' type='search' placeholder='Search' aria-label='Search'  id='serchInSql'>";
                }
                ?>
            </ul>

        </header>

        <div id="userplayList"></div>

        <!-- Modal Play-><!---->       
        <div class="modal " tabindex="-1" role="dialog" id='playIt'>

            <div class="modal-dialog " role="document" id="id01">

                <div class="modal-content ">
                    <div class="modal-header">
                        <h4 class="modal-title"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body  embed-responsive-16by9 embed-responsive">

                        <iframe class="embed-responsive-item" id="videoBoard" width="500" height="400"
                                src="" frameborder="0" allowfullscreen>
                        </iframe>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal edit-><!---->       
        <div class="modal" tabindex="-1" role="dialog" id="editVideo">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><span class="headerFirstWord">THE</span> PLAYLIST<span><i class="fab fa-youtube"></i></span> <span class="headerFirstWord">SITE</span></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="categoryPlaylistUpdate">

                        </div>
                        <input type="text"  placeholder="movie name"        class="login-register-Inputs form-control lastName"         id="moviename" >
                        <input type="text"  placeholder="Description"        class="login-register-Inputs form-control userName"         id="Description">
                        <input type="text"  placeholder="videoLink"         class="login-register-Inputs form-control password"         id="videoLink" >
                        <input type="hidden"  id="videoId" >
                        <button onclick="editVideoToApi()"                       class="btn btn-primary registerBtn">UPDATE</button>
                        <p id="updateMovieMessage"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <!--Modal add to playlist-->
        <div class="modal" tabindex="-1" role="dialog" id='addVideoBtn'>
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

                            <h3>add to playlist</h3>
                            <div id="categoryList"></div>
                            <input type="text"  placeholder="movie name"        class="login-register-Inputs form-control lastName"         id="movienamePlaylistPage" >
                            <input type="text"  placeholder="Description"        class="login-register-Inputs form-control userName"         id="DescriptionPlaylistPage">
                            <input type="text"  placeholder="videoLink"         class="login-register-Inputs form-control password"         id="videoLinkPlaylistPage" >
                            <button onclick='addVideo()'                       class="btn btn-primary registerBtn">add</button>
                            <p id="addMovieToPlayListMessage"></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>



    </body>
</html>
