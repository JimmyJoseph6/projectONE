// A $( document ).ready() block. Code waiting for document to load (doucment ready jquery)
var subscriptionKey = "709f3fa6b4694c208fcb0c00e0215bc9"
var subscriptionKeyTwo = "a7361f543ba94a8b8d48c66395222fda"
var subscriptionKeyOfe= "4d6082d40356466e8b134bd9c084bb28"
var Gkey = "AIzaSyB7TE4cFhhyLquzYnqgpAKY9USJcOf4ErA"
var placeKey = "AIzaSyBFwGqbtcoa0X8yvd6XpX3P6A8tBC6iB7g"

$("#pac-input").remove();

//CURRENT DATE VARIABLES AND FORMULA/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
today = mm + '-' + dd + '-' + yyyy;
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
$(function() {
var params = {
// Request parameters
};
//TODAYS GAME'S API PULL/////////
$.ajax({
    url: "https://api.fantasydata.net/v3/nba/scores/JSON/GamesByDate/" + today + $.param(params),
    beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKeyOfe);
    },
    type: "GET",
    // Request body
    data: "{body}",
})
.done(function(data) {
    console.log("TODAY'S GAMES & SCORES success");
    console.log(data);
    console.log(data[0].PointSpread)

    for(var i = 0; i < 30; i++) {
    var winner = "<div class='winner'>" + (data[i].AwayTeam) + " = " + ((data[i].AwayTeamScore)) + "</div>";
    var ticker = "<div class='col-md-1' id='tickBox'>" + winner + (data[i].HomeTeam) + " = " + ((data[i].HomeTeamScore)) + "</div>";
    // var scorer = ticker + '<div class="board" "  data-team="'+ data[i].Name +'">'
    // scorer = '<div class="col-md-4">' + scorer + "</div>";
    $('#todayScores').append(ticker);
    }

})
.fail(function() {
    console.log("error");
});
});
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


/////************************************************/////////////////////////////////////////


//AJAX CALL FOR STANDINGS AND DIVISON/RECORD INFORMATION//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
$(function() {
var params = {
    // Request parameters
};

$.ajax({
    url: "https://api.fantasydata.net/v3/nba/scores/JSON/Standings/2019?" + $.param(params),
    beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKeyOfe);
    },
    type: "GET",
    // Request body
    data: "{body}",
})
.done(function(data) {
    console.log("STANDINGS success");
    console.log(data);
    
})

.fail(function() {
    console.log("error");
});
});
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


/////************************************************/////////////////////////////////////////


//API PULL FOR ALL NBA TEAMS AND INFO
//////////////////////////////////////////////////////////////////////////////////////////////
$(function() {

    var params = {
        // Request parameters
    };

    $.ajax({
    url: "https://api.fantasydata.net/v3/nba/scores/JSON/AllTeams?" + $.param(params),
    
        beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKeyOfe);
        },

    type: "GET",
    // Request body
    data: "{body}",
    })

    .done(function(data) {
    console.log("All TEAMS LIST success");
    console.log(data);
    
        //DISPLAY OF ALL LOGOS////////////////////////////////////////////////////////////////////
        for(var i = 0; i < 30; i++){

            var name = "<div class='name'>" + (data[i].Name) + " </div>";
            var image ='<img class="logos" id="'+ data[i].Name + '"src=' + (data[i].WikipediaLogoUrl) + '  data-team="'+ data[i].Name +'" data-conf="'+ data[i].Conference +'" data-wins="'+ data[i].Wins +'" data-city="'+ data[i].City +'">' + name
            image = '<div class="col-md-2">' + image + "</div>";
            $('#images').append(image);    
        }


            //on click function
        $(document).on('click','.logos',function(){
            console.log($(this).data('team'))
        })
    

        //on click function
        $(document).on('click','.logos',function(){
            console.log($(this).data('team'))
        }) 
        
        

    
        //ON CLICK FUNCTION////////////////////////////////////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        $(document).on('click', '.logos' ,function(){
        
            // console.log($(this).data('team'))
            // console.log($(this).data('conf'))
            
            $('#teamName').html("Team:" + " " + $(this).data('team'))
            $('#teamConf').html("Conference:" + " " + $(this).data('conf'))

            $("#map").css({ //adds the map onto the page from the on click
                "position": "relative;",
                "float": "right",
                "overflow": "hidden",
                "margin-top":"20px",
                "height": "40%",
                "width": "40%",
                "border": "black solid 3px"
            })
            
            var teamCity = $(this).data('city');
            console.log(teamCity);

            //STADIUM AJX CALL for LONGITUDE AND LATITUDE/////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////
            $(function() {

                var params = {
                    // Request parameters
                };
                
                $.ajax({
                    url: "https://api.fantasydata.net/v3/nba/scores/JSON/Stadiums?" + $.param(params),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKeyOfe);
                    },
                    type: "GET",
                    // Request body
                    data: "{body}",
                })
                
                .done(function(data) {

                    // console.log("TEAM STADIUM success");
                    console.log(data);
                    console.log(teamCity);

                    for(let i = 0; i < 29; i++) {
                        
                        if(teamCity === data[i].City) {
                            var nbaLat = data[i].GeoLat;
                            var nbaLong = data[i].GeoLong;
                        }
                    }

                    if(teamCity == 'Utah') { //Utah Jazz lat & long
                        var nbaLat = 40.768333;
                        var nbaLong = -111.901111;
                    } if (teamCity == 'Indiana'){ //Indiana Pacers lat & long
                        var nbaLat = 39.7640;
                        var nbaLong = -86.1555;
                    } if (teamCity == 'Detroit'){ //Detroit Pistons lat & long
                        var nbaLat = 42.341048;
                        var nbaLong = -83.055163;
                    } if (teamCity == 'Minnesota'){ //Minnesota Twolves lat & long
                        var nbaLat = 44.974329436;
                        var nbaLong = -93.272332244;
                    }if (teamCity == 'Golden State'){ //G State Warriors lat & long
                        var nbaLat = 37.750163666;
                        var nbaLong = -122.201832526;
                    }

                    console.log("Lat: " + nbaLat, "Long: " + nbaLong);
            
                    //GOOGLE MAPS API/////////////////////////////////////////////////////////
                    //////////////////////////////////////////////////////////////////////////
                    var map;
                    var infowindow;

                    function initialize() {

                        var center =  center,
                        radius: 8000,
                        types: ['bar', 'restaurant']
                        };

                        infowindow = new google.maps.InfoWindow()
                        var service = new google.maps.places.PlacesService(map);
                        service.nearbySearch(request, callback);
                    };

                    function callback(results, status) {

                        if (status == google.maps.places.PlacesServiceStatus.OK) {

                            for (var i = 0; i < results.length; i++) {
                                createMarker(results[i]);
                            }
                        }
                    }new google.maps.LatLng(nbaLat, nbaLong);
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: center,
                            zoom: 13
                        });

                        var request = {
                        location:

                    function createMarker(place) {

                        var placeLoc = place.geometry.location;
                        var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                        })

                        google.maps.event.addListener(marker, 'click', function () {
                        console.log(placeLoc);
                        infowindow.setContent(place.name);
                        infowindow.open(map, this);
                        })
                    }

                    google.maps.event.addDomListener(window, 'load', initialize);
                    initialize()

                }).
                
                fail(function() {    
                console.log("error");
                });

            });
        })

    })

    .fail(function() {
    console.log("error");
    });

});
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


/////************************************************/////////////////////////////////////////


//scoreboard for current games api call check//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
$(function() {
    var params = {
    // Request parameters
    };

    $.ajax({
        url: "https://api.fantasydata.net/v3/nba/scores/JSON/AreAnyGamesInProgress?" + $.param(params),
        beforeSend: function(xhrObj){
        // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKeyOfe);
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        console.log("CURRENT GAMES success");
        console.log(data);
    })
    .fail(function() {
        console.log("error");
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
