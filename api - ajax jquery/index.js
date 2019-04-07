"use strict";

(function () {

    $(function () {

        $("#getAllCountries").on("click", function () {

            $.ajax({
                type: "GET",
                url: "https://restcountries.eu/rest/v2/all",
                success: function (response) {
                    $("#ajaxContainer").empty();
                    for (let i = 0; i < response.length; i++) {
                        let flag = "<img src='" + response[i].flag + "' class='images'>";
                        let nameAndDomain = "<p>" + "country: " + response[i].name + "<br>" + " top level domain: " + response[i].topLevelDomain + "</p><br>";
                        let capital = "<h3>" + "capital: " + response[i].capital + "</h3><br>";
                        // let currencies = "<p>" + JSON.stringify(response[i].currencies) + "</p><br>";
                        let currencies = "<p>" + response[i].currencies[0].code + " " + response[i].currencies[0].name + " " +  response[i].currencies[0].symbol + "</p>";
                        let container = "<div class=' col-sm myStyleDiv'>" + flag + nameAndDomain + capital + currencies + "</div>";
                        $("#ajaxContainer").append(container);
                    }
                },
                error: function (err) {
                    alert("Error: " + err.status);
                }
            });
        });

    });

    $(function () {
        $("#serchBtnCountry").on("click", function () {
            let value = $("#searchCuntry").val().toLowerCase();
            if(value.length > 0){
            $.ajax({
                method: "get",
                url: "https://restcountries.eu/rest/v2/name/" + value,

                success: function (response) {
                    $("#ajaxContainer").empty();
                    for (let i = 0; i < response.length; i++) {
                        let flag = "<img src='" + response[i].flag + "' class='images'>";
                        let nameAndDomain = "<p>" + "country: " + response[i].name + "<br>" + response[i].topLevelDomain + "</p><br>";
                        let capital = "<h3>" + response[i].capital + "</h3><br>";
                        let currencies = "<p>" + response[i].currencies[0].code + " " + response[i].currencies[0].name + " " +  response[i].currencies[0].symbol + "</p>";
                        let container = "<div class=' col-sm myStyleDiv'>" + flag + nameAndDomain + capital + currencies + "</div>";
                        $("#ajaxContainer").append(container);
                    }

                },

                error: function (err) {
                    alert("Error: " + err.status)
                }

            });
        }
        else{
            return false;
        }

        });
    });

})()