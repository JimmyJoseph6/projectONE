// A $( document ).ready() block. Code waiting for document to load (doucment ready jquery)
var subscriptionKey = "709f3fa6b4694c208fcb0c00e0215bc9"
var Gkey = "AIzaSyB7TE4cFhhyLquzYnqgpAKY9USJcOf4ErA"
var placeKey = "AIzaSyBFwGqbtcoa0X8yvd6XpX3P6A8tBC6iB7g"




//variables to get current date

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



    $(function() {
    var params = {
        // Request parameters
    };
    
    //TODAYS GAME'S API PULL
    $.ajax({
        url: "https://api.fantasydata.net/v3/nba/scores/JSON/GamesByDate/" + today + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        console.log("TODAY'S GAMES & SCORES success");
        console.log(data);

        for(var i = 0; i < 14; i++){
        var winner = "<div class='winner'>" + (data[i].AwayTeam) + " = " + (data[i].AwayTeamScore) + "</div>";
        var ticker = "<div class='col-md-1' id='tickBox'>" + winner + (data[i].HomeTeam) + " = " + (data[i].HomeTeamScore) + "</div>";
        // var scorer = ticker + '<div class="board" "  data-team="'+ data[i].Name +'">'
        // scorer = '<div class="col-md-4">' + scorer + "</div>";
        $('#todayScores').append(ticker);
    
        }
    })
    .fail(function() {
        console.log("error");
    });
    });



    // $(function() {
    // var params = {
    //     // Request parameters
    // };
    
    // $.ajax({
    //     url: "https://api.fantasydata.net/v3/nba/scores/JSON/Games/2019?" + $.param(params),
    //     beforeSend: function(xhrObj){
    //         // Request headers
    //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    //     },
    //     type: "GET",
    //     // Request body
    //     data: "{body}",
    // })
    // .done(function(data) {
    //     console.log("SZN SCHEDULE success");
    //     console.log(data);
    // })
    // .fail(function() {
    //     alert("error");
    // });
    // });




    // $(function() {
    // var params = {
    //     // Request parameters
    // };
    
    // $.ajax({
    //     url: "https://api.fantasydata.net/v3/nba/scores/{format}/Standings/2019?" + $.param(params),
    //     beforeSend: function(xhrObj){
    //         // Request headers
    //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    //     },
    //     type: "GET",
    //     // Request body
    //     data: "{body}",
    // })
    // .done(function(data) {
    //     console.log("STANDINGS success");
    //     console.log(data);
    // })
    // .fail(function() {
    //     console.log("error");
    // });
    // });




    $(function() {
    var params = {
        // Request parameters
    };
    
    $.ajax({
        url: "https://api.fantasydata.net/v3/nba/scores/JSON/Stadiums?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKey);
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        console.log("TEAM STADIUM success");
        console.log(data);


        
        for(var i = 0; i < 30; i++) {
        
            console.log(data[i].State)
        var nbaLat = (data[6].GeoLat)
        var nbaLong = (data[6].GeoLong)
    

        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: nbaLat, lng: nbaLong},
              zoom: 13
          
          
          
            });
          
            var input = document.getElementById('pac-input');
          
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
          
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          
            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var marker = new google.maps.Marker({
              map: map
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
          
            autocomplete.addListener('place_changed', function() {
              infowindow.close();
              var place = autocomplete.getPlace();
              if (!place.geometry) {
                return;
              }
          
              if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
              } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
              }
          
              // Set the position of the marker using the place ID and location.
              marker.setPlace({
                placeId: place.place_id,
                location: place.geometry.location
              });
              marker.setVisible(true);
          
              infowindowContent.children['place-name'].textContent = place.name;
              infowindowContent.children['place-id'].textContent = place.place_id;
              infowindowContent.children['place-address'].textContent =
                  place.formatted_address;
              infowindow.open(map, marker);
            });
          }
          
          initMap()

        }
    })

    .fail(function() {
        console.log("error");
    });
    });


    //API PULL FOR ALL NBA TEAMS AND INFO
    $(function() {

    var params = {
        // Request parameters
    };
    
    $.ajax({
        url: "https://api.fantasydata.net/v3/nba/scores/JSON/AllTeams?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "GET",
        // Request body
        data: "{body}",
    })

    .done(function(data) {
        console.log("All TEAMS LIST success");
        console.log(data);
        
        //DISPLAY OF ALL LOGOS 
        for(var i = 0; i < 30; i++){
            var name = "<div class='name'>" + (data[i].Name) + " </div>";
            var image = name + '<img class="logos" id="'+ data[i].Name + '"src=' + (data[i].WikipediaLogoUrl) + '  data-team="'+ data[i].Name +'">'
            image = '<div class="col-md-2">' + image + "</div>";
            $('#images').append(image);
            
        }


        //on click function
 
        $(document).on('click','.logos',function(){
            console.log($(this).data('team'));
            $("#teamName").html($(this).data("team"));

        })
    })


    

    

    .fail(function() {
        console.log("error");
    });

    });

 
    $(function() {
    var params = {
        // Request parameters
    };
    
    $.ajax({
        url: "https://api.fantasydata.net/v3/nba/scores/JSON/AreAnyGamesInProgress?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
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

 

  
 









