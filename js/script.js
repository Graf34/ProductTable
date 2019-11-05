function serch() {
    
    document.getElementById("elem").innerHTML = '';//Удаление содержимого
    fetch('http://exercise.develop.maximaster.ru/service/products/')//Запрос 
        .then(function (responce) {
            return responce.json();//Получение данных из json
        })

        .then(function (data) {
            var row = document.getElementById("elem").innerHTML;//переменная элемента в котором строится таблица
            row += '<table> <tr class="heading" ><th>ID</th><th>Название</th><th>Колличество</th><th>Цена за единицу</th><th>Сумма</th></tr>'//Добавление заголовка таблицы
            var rows = 0;//Колличество записей
            var min  = document.getElementById("min").value;//Максимальная цена
            var max  = document.getElementById("max").value;//Минемальная цена
            rows = 0;
            for (var x = 0; x < data.length; x++) {
                
                if ((min=='' && max=='')||(min==0 && max==0)){//Если фильтр пустой
                    //Вывод всех записей
                    row += '<tr><td>' + x + '</td><td>' + data[x]['name'] + '</td><td>' + data[x]['quantity'] + '</td><td>' + data[x]['price'] + '</td><td>' + (data[x]['quantity'] * data[x]['price']) + '</td></tr>';
                    document.getElementById("elem").innerHTML = row;
                    rows++;
                }
                else{
                    if (((data[x]['price']>=min)&&((data[x]['price']<=max)))||((data[x]['price']>=min)&&((max==''))))//Вывод подходящих записей 
                    {
                        row += '<tr><td>' + x + '</td><td>' + data[x]['name'] + '</td><td>' + data[x]['quantity'] + '</td><td>' + data[x]['price'] + '</td><td>' + (data[x]['quantity'] * data[x]['price']) + '</td></tr>';
                       document.getElementById("elem").innerHTML = row;
                       rows++;
                    }
                }
            }
            if (rows==0)//Если ниодной записи не выведено
            {
                document.getElementById("elem").innerHTML = '<h2> Нет данных, попадающих под условие фильтра </h2>';
            }
        });
}

