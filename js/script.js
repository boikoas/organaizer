$(function () {

    calendar = {};

// Названия месяцев
    calendar.monthName = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

// Названия дней недели
    calendar.dayName = [
        'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
    ];

// Выбранная дата
    calendar.selectedDate = {
        'Day': null,
        'Month': null,
        'Year': null
    };

    calendar.jobList = [];
    var tempJobList = {
        'id': null,
        'title': null,
        'date': null,
        'participants': null,
        'info': null
    };

// ID элемента для размещения календарика
    calendar.element_id = null;
    var id_selector = '';
// Выбор даты
    calendar.selectDate = function (day, month, year) {
        calendar.selectedDate = {
            'Day': day,
            'Month': month,
            'Year': year
        };
        id_selector = '#' + day + '_' + month + '_' + year;
        $("#modal-body").html('');
        $(".selected").removeClass("selected");

        $(id_selector).addClass('selected');
        var modals = '';


        if ((id_temp_job = calendar.listJob('' + day + '_' + month + '_' + year)) != null) {
            modals += '<div  class="container">';
            modals += '<div  class="row edits">';
            modals += '<div style="display:none;" class="ids">';
            modals += '<input type="text" value="' + calendar.jobList[id_temp_job].id + '" id="ids" placeholder="ids">';
            modals += '</div>';
            modals += '<div class="title col-lg-12">';
            modals += '<input type="text" id="title"value="' + calendar.jobList[id_temp_job].title + '" placeholder="Событие">';
            modals += '</div>';
            modals += '<div class="date col-lg-12">';
            modals += '<input type="text" id="date"  disabled value="' + calendar.jobList[id_temp_job].date + '" placeholder="День, месяц, год">';
            modals += '</div>';
            modals += '<div class="participants col-lg-12">';
            modals += '<input type="text" id="participants" value="' + calendar.jobList[id_temp_job].participants + '" placeholder="Имена участников">';
            modals += '</div>';
            modals += '<div class="info col-lg-12">';
            modals += '<textarea  id="info" placeholder="Описание">' + calendar.jobList[id_temp_job].info + ' </textarea>';
            modals += '</div>';
            modals += '<div class="modal_buttons col-lg-12">';
            modals += ' <button class="btn modal_save" onclick=calendar.addNewJob();>Готово</button>';
            modals += ' <button class="btn modal_delete" onclick=calendar.clearJob("' + calendar.jobList[id_temp_job].id + '");>Удалить</button>';
            modals += '</div>';
            modals += '</div>';
            modals += '</div>';


        } else {
            modals += '<div  class="container">';
            modals += '<div  class="row add">';
            modals += '<div style="display:none;" class="ids">';
            modals += '<input type="text" value="' + day + '_' + month + '_' + year + '" id="ids" placeholder="ids">';
            modals += '</div>';
            modals += '<div class="title col-lg-12">';
            modals += '<input type="text" id="title" placeholder="Событие">';
            modals += '</div>';
            modals += '<div class="date col-lg-12">';
            modals += '<input type="text" id="date"  disabled value="' + day + '.' + month + '.' + year + '"placeholder="День, месяц, год">';
            modals += '</div>';
            modals += '<div class="participants col-lg-12">';
            modals += '<input type="text" id="participants" placeholder="Имена участников">';
            modals += '</div>';
            modals += '<div class="info col-lg-12">';
            modals += '<textarea  id="info" placeholder="Описание"></textarea>';
            modals += '</div>';
            modals += '<div class="modal_buttons col-lg-12">';
            modals += ' <button class="btn modal_save" onclick="calendar.addNewJob();">Готово</button>';
            modals += ' <button class="btn modal_delete" onclick=calendar.clearJob("' + day + '_' + month + '_' + year + '");>Удалить</button>';
            modals += '</div>';
            modals += '</div>';
            modals += '</div>';


        }
        ;

        $("#modal-body").append(modals);
        $("#myModalBox").modal('show');

    };
    $("[data-toggle='tooltip']").tooltip();
// Отрисовка календарика на выбранный месяц и год
    calendar.drawCalendar = function (month, year) {
        var tmp = '';
        var id_temp_job = null;



        // Месяц и навигация
        tmp += '<div class="col-lg-12">';
        tmp += '<div class="col-lg-3 menu ">';
        tmp += '<div class="navigation1 col-lg-1" ' +
                'onclick="calendar.drawCalendar(' + (month > 1 ? (month - 1) : 12) +
                ',' + (month > 1 ? year : (year - 1)) + ');">&#9668;<\/div>';
        tmp += '<div class="navigation col-lg-8"> ' +
                calendar.monthName[(month - 1)] + '&nbsp;&nbsp;' + year + '<\/div>';
        tmp += '<div class="navigation2 col-lg-1" ' +
                'onclick="calendar.drawCalendar(' + (month < 12 ? (month + 1) : 1) +
                ',' + (month < 12 ? year : (year + 1)) + ');">&#9658;<\/div><\/div>';
        tmp += '<div class="today col-lg-1" ' +
                'onclick="calendar.now();">' +
                'Сегодня<\/div>';
        tmp += '<\/div>';
        tmp += '<div class="col-lg-12">';
        tmp += '<table class="table table-bordered" >';
        // Шапка таблицы с днями недели


        // Количество дней в месяце
        var total_days = 32 - new Date(year, (month - 1), 32).getDate();
        var total_days_last = 32 - new Date(year, (month - 2), 32).getDate();
        // Начальный день месяца
        var start_day = new Date(year, (month - 1), 1).getDay();

        if (start_day == 0) {
            start_day = 7;
        }

        start_day--;
        var total_days_last = 32 - new Date(year, (month - 2), 32).getDate() - start_day + 1;
        var start_day2 = 0;
        var next_day_month = 1;
        month_next = (month + 1 > 12 ? 1 : month + 1);


        month_previe = (month - 1 > 0 ? month - 1 : 12);
        // Количество ячеек в таблице
        var final_index = Math.ceil((total_days + start_day) / 7) * 7;

        var day = 1;
        var index = 0;
        var class_name = '';

        do {
            class_name = '';

            // Начало строки таблицы
            if (index % 7 == 0) {
                tmp += '<tr>';
            }
            ;
            // Пустые ячейки до начала месяца или после окончания


            if (index >= (total_days + start_day)) {

                if ((id_temp_job = calendar.listJob('' + next_day_month + '_' + month_next + '_' + year)) != null) {
                    resultSeach = calendar.getCalendarJob(id_temp_job);
                    class_name += 'thera_job';
                    console.log(1);
                }
                else {
                    resultSeach = '';
                }
                ;
                tmp += '<td  id="' + next_day_month + '_' + month_next + '_' + year + '"  class="grayed  ' + class_name + '" ' +
                        'onclick="calendar.selectDate(' +
                        next_day_month + ',' + month_next + ',' + year + ');">' + next_day_month + resultSeach +
                        '<\/td>';
                next_day_month++;
            }
            else {

                // Выбранный день

                // Праздничный день
                if (index % 7 == 6 || index % 7 == 5) {
                    class_name = 'holiday';
                }
                ;
                // Ячейка с датой
                if (index < 7) {
                    if (index < start_day) {
                        if ((id_temp_job = calendar.listJob('' + total_days_last + '_' + month_previe + '_' + year)) != null) {
                            resultSeach = calendar.getCalendarJob(id_temp_job);
                            class_name += 'thera_job';
                        }
                        else {
                            resultSeach = '';
                        }
                        ;
                        tmp += '<td id="' + total_days_last + '_' + month_previe + '_' + year + '" class="grayed  ' + class_name + '" ' +
                                'onclick="calendar.selectDate(' +
                                total_days_last + ',' + month_previe + ',' + year + ');">' + calendar.dayName[start_day2] + ', ' + total_days_last + resultSeach + '<\/td>';
                        start_day2++;
                        total_days_last++;
                    } else {
                        if ((id_temp_job = calendar.listJob('' + day + '_' + month + '_' + year)) != null) {
                            resultSeach = calendar.getCalendarJob(id_temp_job);
                            class_name += 'thera_job';
                        }
                        else {
                            resultSeach = '';
                        }
                        ;
                        tmp += '<td id="' + day + '_' + month + '_' + year + '" class="' + class_name + '" ' +
                                'onclick="calendar.selectDate(' +
                                day + ',' + month + ',' + year + ');">' + calendar.dayName[start_day2] + ', ' + day + resultSeach + '<\/td>';
                        start_day2++;
                        day++;
                    }
                    ;
                } else {
                    if ((id_temp_job = calendar.listJob('' + day + '_' + month + '_' + year)) != null) {
                        resultSeach = calendar.getCalendarJob(id_temp_job);
                        class_name += 'thera_job';
                    }
                    else {
                        resultSeach = '';
                    }
                    ;
                    tmp += '<td id="' + day + '_' + month + '_' + year + '"  class="' + class_name + '" ' +
                            'onclick="calendar.selectDate(' +
                            day + ',' + month + ',' + year + ');">' + day + resultSeach + '<\/td>';
                    day++;
                }
            }
            ;
            // Конец строки таблицы
            if (index % 7 == 6) {
                tmp += '<\/tr>';
            }
            index++;
        }
        while (index < final_index);

        tmp += '<\/table>';
        tmp += '<\/div>';
        // Вставить таблицу календарика на страницу
        var el = document.getElementById(calendar.element_id);
        if (el) {
            el.innerHTML = tmp;
        }
    }

    calendar.listJob = function (id) {
        var find = null;
        calendar.jobList.forEach(function (item, i, arr) {
            if (item.id == id) {
                find = i;
                return find;
            }
            ;
        });
        return find;

    };
    calendar.addNewJob = function () {
        if ((id_temp_job = calendar.listJob($("#ids").val())) != null) {
            calendar.updateJob(id_temp_job);
            $(".selected").removeClass("selected");

            $(id_selector).addClass('selected');

        } else {
            tempJobList = {
                'id': $("#ids").val(),
                'title': $("#title").val(),
                'date': $("#date").val(),
                'participants': $("#participants").val(),
                'info': $("#info").val()
            };
            calendar.jobList.push(tempJobList);
            calendar.update();


        }
        ;

        $("#myModalBox").modal('hide');

    };
    calendar.showNewJobSmall = function () {

        $(".job_add").removeClass('hide');


    };
    calendar.hideNewJobSmall = function () {

        $(".job_add").addClass('hide');


    };
    calendar.addNewJobSmall = function () {
        var temp;

        var temp_date;
        var temp_info;
        temp = $(".job_add_text").val();
        temp_date = temp.split(',');
        temp_info = temp_date[1];
        temp_date = temp_date[0].split('.');

        if ((id_temp_job = calendar.listJob('' + temp_date[0] + '_' + temp_date[1] + '_' + temp_date[2])) != null) {

            alert('Дата уже занята');
        }
        else {
            tempJobList = {
                'id': temp_date[0] + '_' + temp_date[1] + '_' + temp_date[2],
                'title': temp_info,
                'date': temp_date[0] + '.' + temp_date[1] + '.' + temp_date[2],
                'participants': '',
                'info': ''
            };
            calendar.jobList.push(tempJobList);
            calendar.update();
        }
        ;
        calendar.hideNewJobSmall();



    };
    calendar.updateJob = function (id) {

        calendar.jobList[id].id = $("#ids").val(),
                calendar.jobList[id].title = $("#title").val(),
                calendar.jobList[id].date = $("#date").val(),
                calendar.jobList[id].participants = $("#participants").val(),
                calendar.jobList[id].info = $("#info").val()
        calendar.update();



    };

    calendar.clearJob = function (id) {
        calendar.jobList.forEach(function (item, i, arr) {
            if (item.id == id) {
                calendar.jobList.splice(i, 1);
                $("#myModalBox").modal('hide');
                calendar.update();
                return;
            }
            ;
        });
    };
    calendar.getCalendarJob = function (id) {
        var preview_job = '';
        preview_job += '<br><span class="titles">';
        preview_job += calendar.jobList[id].title;
        preview_job += '</span><br>';
        preview_job += '<span class="participants">';
        preview_job += calendar.jobList[id].participants;
        preview_job += '</span><br>';
        preview_job += '<span class="infos">';
        preview_job += calendar.jobList[id].info;
        preview_job += '</span>';
        preview_job += '<br>';

        return preview_job;
    };

    calendar.update = function () {
        calendar.drawCalendar(
                calendar.selectedDate.Month,
                calendar.selectedDate.Year
                );
    };
    calendar.now = function () {
        calendar.selectedDate = {
            'Day': new Date().getDate(),
            'Month': parseInt(new Date().getMonth()) + 1,
            'Year': new Date().getFullYear()
        };
        calendar.drawCalendar(
                calendar.selectedDate.Month,
                calendar.selectedDate.Year
                );
        return;
    };
// ID элемента для размещения календарика
    calendar.element_id = 'calendar_table';

// По умолчанию используется текущая дата
    calendar.selectedDate = {
        'Day': new Date().getDate(),
        'Month': parseInt(new Date().getMonth()) + 1,
        'Year': new Date().getFullYear()
    };
    calendar.search = function () {
        $("#search_job").removeClass('hide');
        var data = $("#search").val();
        $("#search_job").html('');
        var temp_search = '';

        if (data != '') {
            calendar.jobList.forEach(function (item, i, arr) {
                if (item.title.indexOf(data) != -1) {
                    temp_search += '<option onclick=calendar.selectSearch("' + item.id + '");>';
                    temp_search += item.title;
                    temp_search += '</option>';

                } else if (item.title.indexOf(date) != -1) {
                    temp_search += '<option onclick=calendar.selectSearch("' + item.id + '");>';
                    temp_search += item.date;
                    temp_search += '</option>';

                } else if (item.participants.indexOf(date) != -1) {
                    temp_search += '<option onclick=calendar.selectSearch("' + item.id + '");>';
                    temp_search += item.participants;
                    temp_search += '</option>';

                };
            });
        }
        ;
        $("#search_job").append(temp_search);


    };
    calendar.selectSearch = function (ids) {

        var temp_date;
        temp_date = ids.split('_');
        calendar.selectedDate = {
            'Day': temp_date[0],
            'Month': temp_date[1],
            'Year': temp_date[2]
        };
        calendar.drawCalendar(temp_date[1], temp_date[2]);
        $('#' + ids).addClass('select');

        return;
    };
// Нарисовать календарик
    calendar.drawCalendar(
            calendar.selectedDate.Month,
            calendar.selectedDate.Year
            );
    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $("#search_job"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.addClass('hide'); // скрываем его
        }
    });


});