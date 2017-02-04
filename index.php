<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<html>
    <head>
        <meta charset="UTF-8">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>     
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
        <script src="js/script.js"></script>
        <link href="css/style.css" rel="stylesheet">

        <title>Органайзер</title>
    </head>
    <body>

        <header class="container" >
            <div class="row">
                <div class="header col-lg-8">
                    <button class="btn adds" onclick="calendar.showNewJobSmall()" >
                        Добавить
                    </button>
                    <button class="btn update" onclick="calendar.update();">
                        Обновить
                    </button>


                </div>
                <div class="col-lg-4" class="block_mini_add">
                    <span class="glyphicon glyphicon-search col-lg-1 clears_image" aria-hidden="true"></span>
                    <input type="text" id="search" placeholder="События, дата или участник" class="col-lg-10 search_textbox " onclick="calendar.search()" onchange="calendar.search()">
                    <span class="col-lg-1 clears_button" onclick="calendar.hideSearchJobSmall()">X</span><br>
                </div>
            </div>     
            <div class="row">
                <div class="col-lg-8">
                    <div   class="job_add hide">
                        <span  onclick="calendar.hideNewJobSmall()">X</span><br>
                        <input type="text" placeholder="Введите в формате: Дата,  Название события" id="" class="job_add_text" "><br>
                        <button class="btn job_add_button" onclick="calendar.addNewJobSmall()">
                            Создать
                        </button>
                    </div>
                </div>

                <div class="col-lg-4 block_mini_search">
                    <div id="search_job" class="hide" multiple="multiple">

                    </div>
                </div>
            </div>

        </header>
        <hr>
        <section class="container">


            <div class="row">

                <div id="calendar_table" class="calendar_table col-lg-12">


                </div>
            </div>

        </section>
        <footer class="container">
            <div id="myModalBox" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- Заголовок модального окна -->
                        <span ></span>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>


                        <!-- Основное содержимое модального окна -->
                        <div id="modal-body">

                        </div>


                    </div>
                </div>
            </div>
        </footer>

    </body>
</html>
