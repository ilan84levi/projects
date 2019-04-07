"use strict"; //strict mode

// Self Invoked Function
// Immediately Invoded Function Expression (IIFE)
//The rule of this function is to simply detach its contents from the window object
(function () {

    $(function () { //// Document Ready

        getAllCCoins()
        // this function get's all the coins from the api, and put the info in div's.
        // this function like 2 other functions along the way, is connected to a promise function. 
        async function getAllCCoins() {

            let switcher = 1;
            try {
                let coins = await fetchData("https://api.coingecko.com/api/v3/coins/list");
                for (let i = 0; i < coins.length; i++) {
                    let card = "<div class='card col col-lg-4' style='width: 18rem;'><div class='card-body'>" +
                        "<div class='custom-control custom-switch '>" + "<div class='controlSwitch'><input type='checkbox' unchecked name='" + coins[i].id + "' alt='" + coins[i].symbol + "' data-toggle='toggle' class='custom-control-input' id='" + "switch" + switcher + "'>" +
                        "<label class='custom-control-label switch' for='" + "switch" + switcher + "'></label></div></div>" +
                        "<h5 class='card-title'>" + coins[i].id + "</h5>" +
                        "<h6 class='card-subtitle mb-2 text-muted col'>" + coins[i].symbol + "</h6>" +
                        "<button type='button' class='btn btn-primary btn-sm moreInfoBtnClass collapsible' id='" + coins[i].id + "' data-toggle='collapse' data-target='" + coins[i].id + "'>more info</button>" +
                        "<div class='content collapse col'>" + "</div></div></div>";
                    $(".showAllCoins").append(card);
                    switcher++;
                }
            } catch (error) {

                console.log("Error: " + error.status);
            }

        }

        $("#coinsListDivId").on("click", '.moreInfoBtnClass', function () {
            getMoreDetailsBtn(this.id);
        });

//this function show's more information about the coin when the user click on the more info button.
// connected to a promise
        async function getMoreDetailsBtn(id) {
            let moreInfoBtnClass = $(".moreInfoBtnClass");

            if ($(".collapsible[id='" + id + "']").siblings(".collapse").html().length > 1) {
                $(".collapsible[id='" + id + "']").siblings(".collapse").css("display", "none");
                $(".collapsible[id='" + id + "']").siblings(".collapse").empty();
            } else if ($(".collapsible[id='" + id + "']").siblings(".collapse").html().length < 1) {
                $(".collapse").empty();
                let cuerntTime = new Date().getTime();
                let coinDetails = localStorage.getItem(id);
                var obj = JSON.parse(coinDetails);

                // if more then 2 minutes passed, the function will take the details from the api
                // otherwise it will pull the details from the local memory if exist there. 
                if (localStorage.getItem(id) && cuerntTime - obj.time < 120000) {
                    $(".collapsible[id='" + id + "']").siblings(".collapse").css("display", "block").append(obj.img + obj.coinPrice);
                } else {
                    localStorage.removeItem(id);
                    try {
                        let moreInfo = await fetchData("https://api.coingecko.com/api/v3/coins/" + id);
                        let collapseDiv =
                            "<img src='" + moreInfo.image.small + "'>";
                        let coinPrices =
                            "<p>" + moreInfo.market_data.current_price.usd + " $" + "</p><br>" +
                            "<p>" + moreInfo.market_data.current_price.eur + " euro" + "</p><br>" +
                            "<p>" + moreInfo.market_data.current_price.ils + " NIS" + "</p><br>";
                        //saving the data in locale storage
                        
                        saveToLocalStorage(id, collapseDiv, coinPrices);

                        $(".collapse").empty();
                        for (let i = 0; i < moreInfoBtnClass.length; i++) {
                            if (moreInfoBtnClass[i].id === id) {

                                if ($(".collapsible[id='" + id + "']").siblings(".collapse").css("display", "block") == true) {
                                    $(".collapsible[id='" + id + "']").siblings(".collapse").empty();
                                } else {
                                    $(".collapsible[id='" + id + "']").siblings(".collapse").css("display", "block").append(collapseDiv + coinPrices);
                                }

                            }

                        }

                    } catch (error) {
                        $("#data").append("Error: " + error.status);
                    }
                }
            }

        }

        // this is the promise function, who handle 3 functions api's requests
        // the loader is connected also, until the user get all the data, he see the loader.  
        async function fetchData(url) {
            $(".loader").css("display", "block");
            let myPromise = new Promise((resolve, reject) => {
                $.ajax({
                    method: "GET",
                    url: url,
                    success: function (response) {
                        resolve(response);
                    },
                    error: function (error) {
                        reject(error);
                    },
                }).done(function () {
                    $(".loader").css("display", "none");
                })
            });
            return myPromise;
        }

        //simple search function 
        $(function () {

            $("#searchBox").on("keydown", function () {
                $(".card").show()
            })

            $("#searchBox").on("keyup", function () {
                let value = $(this).val().toLowerCase();
                $(".card-subtitle").filter(function () {

                    if ($(this).text().toLowerCase() === value) {
                        $(".card").hide()
                        $(this).parent().parent().show()
                    }

                });

            });

        });

        // a complexed function responsible for the checkbox's
        let toggleArray = [];
        $("#coinsListDivId").on("change", "input[type='checkbox']", function () {

            if (this.checked) {

                if (toggleArray.length > 4) {
                    let coinDetails = localStorage.getItem("coinsReport");
                    var obj = JSON.parse(coinDetails);
                    if (toggleArray.length > obj.coinsArray.length) {
                        toggleArray = obj.coinsArray;

                        let timeStamp = new Date().getTime();
                        let coinObj = {
                            "alt": this.alt,
                            "id": this.id,
                            "name": this.name,
                            "time": timeStamp
                        }
                        toggleArray.push(coinObj);

                    } else {
                        $(this).prop("checked", false);
                        ChangeCoinModel(toggleArray);
                    }

                } else {

                    let timeStamp = new Date().getTime();
                    let coinObj = {
                        "alt": this.alt,
                        "id": this.id,
                        "name": this.name,
                        "time": timeStamp
                    }
                    toggleArray.push(coinObj);

                }

            } else {

                toggleArray.splice(toggleArray.indexOf(this.alt), 1)

            }

            coinsListlocale(toggleArray, "coinsReport");

        });

        // when the user try to select more than 5 coins this function calls the model
        // also this function handle all the model functionality 
        function ChangeCoinModel(toggleArray) {

            let modalSwitcher = 0;
            let modalCoinsArray = [];

            let table = "<table>";

            for (let i = 0; i < toggleArray.length; i++) {

                let toggle =
                    "<div class='custom-control custom-switch '><div class='controlSwitch'><input type='checkbox' checked alt='" +
                    toggleArray[i].alt + "' data-toggle='toggle' class='custom-control-input' id='" + "id" + modalSwitcher + "'>" +
                    "<label class='custom-control-label switch' for='" + "id" + modalSwitcher + "'></label></div></div>";

                let tr = "<tr><td>" + toggleArray[i].name + "</td>" + "<td>" + toggleArray[i].alt + "</td>" + "<td>" + toggle + "</td></tr>";
                table += tr;
                modalSwitcher++;

                let modalCoinObj = {
                    "alt": toggleArray[i].alt,
                    "id": toggleArray[i].id,
                    "name": toggleArray[i].name
                }

                modalCoinsArray.push(modalCoinObj);

            }
            table += "</tr>";
            $(".modal-body").html(table);
            $("#coinsModal").modal("show");

            $(".modal-body").on("change", "input[type='checkbox']", function () {

                if (this.checked) {

                    let coinDetails = localStorage.getItem("coinsReport");
                    var obj = JSON.parse(coinDetails);
                    let objLength = obj.coinsArray.length

                    for (let i = 0; i < obj.coinsArray.length; i++) {
                        if (modalCoinsArray.length < objLength && this.alt === obj.coinsArray[i].alt && modalCoinsArray.indexOf(this.alt) != this.alt) {

                            let modalCoinObj = {
                                "alt": obj.coinsArray[i].alt,
                                "id": obj.coinsArray[i].id,
                                "name": obj.coinsArray[i].name
                            }

                            modalCoinsArray.push(modalCoinObj);

                        }
                    }

                } else {

                    for (let i = 0; i < modalCoinsArray.length; i++) {

                        let index = modalCoinsArray.findIndex(x => x.alt === this.alt);

                        if (this.alt === modalCoinsArray[i].alt) {

                            modalCoinsArray.splice(index, 1)

                        }

                    }

                }

            });

            $("#coinsModal button:nth-of-type(1)").on("click", function () {

                $("#coinsModal").modal("hide");
            });

            $("#coinsModal button:nth-of-type(2)").on("click", function () {

                coinsListlocale(modalCoinsArray, "coinsReport");
                toggleArray = modalCoinsArray;

                let coinDetails = localStorage.getItem("coinsReport");
                var obj = JSON.parse(coinDetails);

                $(" input[type='checkbox']").prop("checked", false)

                for (let i = 0; i < obj.coinsArray.length; i++) {
                    let coinsid = obj.coinsArray[i].id;
                    var indexNum = coinsid.replace(/^\D+/g, '');

                    $("input[type='checkbox']")[indexNum - 1].checked = true;

                }

                $("#coinsModal").modal("hide");

            });

        }


        // local storage function - for the image and price
        function saveToLocalStorage(id, collapseDiv, coinPrices) {
            var timeStamp = new Date().getTime();
            let coinDetailsObject = {
                "img": collapseDiv,
                "coinPrice": coinPrices,
                "time": timeStamp
            };

            let jsonString = JSON.stringify(coinDetailsObject);
            localStorage.setItem(id, jsonString);

        }

        //coins report on local memory - for the coins the user select
        function coinsListlocale(toggleArray, name) {
            var timeStamp = new Date().getTime();
            let coinsListForReport = {
                "coinsArray": toggleArray,
                "time": timeStamp
            };

            let jsonString = JSON.stringify(coinsListForReport);
            localStorage.setItem(name, jsonString);

        }

        // this function trigger the chart 
        $("#reportsBtn").on("click", function () {
            if (toggleArray != 0) {
                $(".about").hide();
                $("#coinsListDivId").hide();
                setTimeout(function () {
                    coinsChart();
                    myCoinsChart()
                }, 1000);
                $("#chartContainer").show();
                $(".modalDiv").append("<div class='loader'></div>");
                setTimeout(function () {
                    $(".modalDiv > .loader").remove();
                }, 2000);

            } else {
                $("#reportsBtn").prop("checked", false);
                alert("choose coins to display!!");
            }
        });

        // this function belongs to the chart part - get the coins details from the api
        async function coinsChart() {

            let coinArray = [];

            let coinDetails = localStorage.getItem("coinsReport");
            var obj = JSON.parse(coinDetails);
            for (let i = 0; i < obj.coinsArray.length; i++) {
                let coin = obj.coinsArray[i].alt.toUpperCase();
                coinArray.push(coin);
            }

            try {

                let coinsCharts = await fetchData("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + coinArray + "&tsyms=USD");
                return coinsCharts;

            } catch (error) {

            }

        }

        // this function responsible to show the coins on chart
        function myCoinsChart() {

            let dataPoints0 = [];
            let dataPoints1 = [];
            let dataPoints2 = [];
            let dataPoints3 = [];
            let dataPoints4 = [];

            let chart = new CanvasJS.Chart("chartContainer", {
                theme: "light2",
                backgroundColor: "#f8f9fa",
                title: {
                    text: "cryptocurrency market",
                    fontColor: "#2f4f4f",
                    fontSize: 30,
                    padding: 10,
                    margin: 15,
                    backgroundColor: "#FFFFE0",
                    borderThickness: 1,
                    cornerRadius: 5,
                    fontWeight: "bold"
                },

                axisX: {
                    title: "TIME - MINUTES AND SECONDS",
                    valueFormatString: "mm:ss",
                    titleFontFamily: "comic sans ms",
                    xValueType: "dateTime",
                    interval: 2,
                    includeZero: true
                },

                axisY: {
                    title: "value $",
                    titleFontFamily: "comic sans ms",
                    zoomEnabled: true,
                    viewportMinimum: 0,
                    minimum: 0,
                    interlacedColor: "#F0F8FF",
                    tickLength: 5,
                    tickColor: "DarkSlateBlue",
                    tickThickness: 2,
                    prefix: "$",
                },

                legend: {
                    verticalAlign: "bottom"
                },

                data: [{
                        type: "spline",
                        xValueType: "dateTime",
                        showInLegend: true,
                        markerType: "circle",
                        yValueFormatString: "$####.00",
                        xValueFormatString: "mm:ss TT",
                        dataPoints: dataPoints0
                    },

                    {
                        type: "spline",
                        xValueType: "dateTime",
                        showInLegend: true,
                        markerType: "triangle",
                        yValueFormatString: "$####.00",
                        xValueFormatString: "mm:ss TT",
                        dataPoints: dataPoints1
                    },

                    {
                        type: "spline",
                        xValueType: "dateTime",
                        showInLegend: true,
                        markerType: "square",
                        dataPoints: dataPoints2,
                        yValueFormatString: "$####.00",
                        xValueFormatString: "mm:ss TT",
                    },

                    {
                        type: "spline",
                        xValueType: "dateTime",
                        showInLegend: true,
                        markerType: "cross",
                        dataPoints: dataPoints3,
                        yValueFormatString: "$####.00",
                        xValueFormatString: "mm:ss TT",
                    },

                    {
                        type: "spline",
                        xValueType: "dateTime",
                        showInLegend: true,
                        markerType: "line",
                        dataPoints: dataPoints4,
                        yValueFormatString: "$####.00",
                        xValueFormatString: "mm:ss TT",
                    },
                ]
            });

            chart.render();

            function updateChart() {
                let coinsChartArray = [];
                let coinsCharts = coinsChart();
                coinsCharts.then(function (result) {

                    for (let key in result) {
                        let coin = {
                            "key": key,
                            "usd": result[key].USD
                        }
                        coinsChartArray.push(coin);
                    }

                    if (typeof (coinsChartArray[0]) == "undefined" || coinsChartArray[0] == null) {
                        coinsChartArray[0] = {
                            key: "no info",
                            usd: 0
                        }

                    }

                    if (typeof (coinsChartArray[1]) == "undefined" || coinsChartArray[0] == null) {
                        coinsChartArray[1] = {
                            key: "no info",
                            usd: 0
                        }

                    }

                    if (typeof (coinsChartArray[2]) == "undefined" || coinsChartArray[0] == null) {
                        coinsChartArray[2] = {
                            key: "no info",
                            usd: 0
                        }

                    }

                    if (typeof (coinsChartArray[3]) == "undefined" || coinsChartArray[0] == null) {
                        coinsChartArray[3] = {
                            key: "no info",
                            usd: 0
                        }
                    }

                    if (typeof (coinsChartArray[4]) == "undefined" || coinsChartArray[0] == null) {
                        coinsChartArray[4] = {
                            key: "no info",
                            usd: 0
                        }
                    }

                    let yValue0 = coinsChartArray[0].usd;
                    let yValue1 = coinsChartArray[1].usd;
                    let yValue2 = coinsChartArray[2].usd;
                    let yValue3 = coinsChartArray[3].usd;
                    let yValue4 = coinsChartArray[4].usd;

                    let time = new Date();
                    time.getMinutes();
                    time.getSeconds();

                    // pushing the new values
                    dataPoints0.push({
                        x: time,
                        y: yValue0
                    });

                    dataPoints1.push({
                        x: time,
                        y: yValue1
                    });

                    dataPoints2.push({
                        x: time,
                        y: yValue2
                    });

                    dataPoints3.push({
                        x: time,
                        y: yValue3
                    });


                    dataPoints4.push({
                        x: time,
                        y: yValue4
                    });

                    chart.options.data[0].legendText = coinsChartArray[0].key + ": " + yValue0;
                    chart.options.data[1].legendText = coinsChartArray[1].key + ": " + yValue1;
                    chart.options.data[2].legendText = coinsChartArray[2].key + ": " + yValue2;
                    chart.options.data[3].legendText = coinsChartArray[3].key + ": " + yValue3;
                    chart.options.data[4].legendText = coinsChartArray[4].key + ": " + yValue4;
                    chart.render();

                });

            }
                // calling this function every 2 seconds so the chart will be updated
            let myIntreval = setInterval(function () {
                updateChart()
                coinsChart()
            }, 2000);

            // home button - where we see all the coins
            $("#homeBtn").on("click", function () {
                $("#chartContainer").hide();
                $(".about").hide();
                $("#coinsListDivId").show();
                clearInterval(myIntreval);
                localStorage.removeItem("coinsReport");
                toggleArray = [];
                $("#coinsListDivId input[type='checkbox']").prop("checked", false);
            });

            // about button
            $("#aboutBtn").on("click", function () {
                $(".about").show();
                $("#coinsListDivId").hide();
                $("#chartContainer").hide();
                clearInterval(myIntreval);
                localStorage.removeItem("coinsReport");
            });

            $("#homeBtn").on("click", function () {
                $("#coinsListDivId").show();
                $(".about").hide();
                $("#chartContainer").hide();
                clearInterval(myIntreval);
                localStorage.removeItem("coinsReport");
                $("#coinsListDivId input[type='checkbox']").prop("checked", false);
            });

        }

        $("#aboutBtn").on("click", function () {
            $(".about").show();
            $("#coinsListDivId").hide();
            $("#chartContainer").hide();
            toggleArray = [];
            localStorage.removeItem("coinsReport");
        });

        $("#homeBtn").on("click", function () {
            $("#coinsListDivId").show();
            $(".about").hide();
            $("#chartContainer").hide();
            toggleArray = [];
            localStorage.removeItem("coinsReport");
            $("#coinsListDivId input[type='checkbox']").prop("checked", false);
        });

    });

})()