        let temp;
        let loc;
        let humidity;
        let icon;
        function getGeo(){
          navigator.geolocation.getCurrentPosition(initMap)
        }
        function initMap(position) {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          let city = {lat: lat,lng: lon}
           let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: city
        });
        let marker = new google.maps.Marker({
          position: city,
          map: map
        });
        }
        function updateMap(lat, lng){
          let city = {lat: lat,lng: lng}
           var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: city
        });
        let marker = new google.maps.Marker({
          position: city,
          map: map
        });
        }
        


        function tempCF(){
          let x = document.getElementById("temp").innerHTML;
          let y = document.getElementById("CF").innerHTML;

          x = parseInt(x);

          if  (y=="C"){
            x = Math.floor((9/5*x+32)); 
        document.getElementById("temp").innerHTML = x;
        document.getElementById("CF").innerHTML = "F"}    
           else if (y=="F"){
              x = Math.floor((x-32)*5/9);
        document.getElementById("temp").innerHTML = x;
        document.getElementById("CF").innerHTML = "C";  

                  };
        }
        function updateByName(value) {
          const APPID = "55e568aa04114cdf3dc4b90c9ae0a60c";
          let url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + "&APPID=" + APPID;
          sendRequest(url);
        }
        function updateByGeo(position){
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          const APPID = "55e568aa04114cdf3dc4b90c9ae0a60c";
          let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+lon+ "&APPID=" + APPID;
          sendRequest(url);
        }
        function sendRequest(url){
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            
           
            let weather = {};
            weather.temp = data.main.temp;
            weather.humidity = data.main.pressure;
            weather.loc = data.name;
            //weather.icon = data.weather[0].icon;
            update(weather);
          }
        }; 
          xmlhttp.open("GET", url, true);
          xmlhttp.send();
        }
        function update(weather){
          weather.temp = Math.round(weather.temp);
          weather.humidity = Math.round(weather.humidity);
          document.getElementById("temp").innerHTML = weather.temp-273;
          document.getElementById("humidity").innerHTML = weather.humidity;
          document.getElementById("loc").innerHTML = weather.loc;
          document.getElementById("icon").innerHTML ="<img src="+"http://openweathermap.org/img/w/" + weather.icon + ".png></img>";
          
        };

window.onload = function(){
let temp = document.getElementById("temp").innerHTML;
let loc = document.getElementById("loc").innerHTML;
let humidity = document.getElementById("humidity").innerHTML;
//let icon = document.getElementById("icon").innerHTML;
          
         
$('#form').submit((event) => {
let value = $('#searchCity').val();
event.preventDefault();
$('#searchCity').val("");
updateByName(value);
let geocoder =  new google.maps.Geocoder();
geocoder.geocode( { 'address': value}, function(results, status) {
 if (status == google.maps.GeocoderStatus.OK) {
            updateMap(results[0].geometry.location.lat(),results[0].geometry.location.lng()); 
          } else {
            alert("Something got wrong " + status);
          }
        });
});
navigator.geolocation.getCurrentPosition(showPosition);

 function showPosition(position) {
  updateByGeo(position)
 } 
}

