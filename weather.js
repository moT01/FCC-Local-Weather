$(document).ready(function() {
  var lat, lon, weatherurl, icon, fahrenheit, celsius, units = "F";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      weatherurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=d11bdf68802f711df543c8e449512397";

      $.getJSON(weatherurl, function(weatherobj) {  
        
        icon = "http://openweathermap.org/img/w/" + weatherobj.weather[0].icon + ".png";
        fahrenheit = Math.round((weatherobj.main.temp - 273.15) * 1.8 + 32);
        celsius = Math.round(weatherobj.main.temp - 273.15);
        
        $(".temp").html(fahrenheit);
        $("#units").html("°"+units);
        $("#icon").attr("src", icon);
        $("#icon").attr("title", weatherobj.weather[0].description);
        $(".city").html(weatherobj.name);
        
        $(".temp").add("#units").click(function() { 
          if (units === "F") {
            units = "C"; 
            $(".temp").html(celsius); 
            $("#units").html("°"+units); 
          }
          else {
            units = "F"; 
            $(".temp").html(fahrenheit); 
            $("#units").html("°"+units);
          }
        }); //close .temp click
      }) //close function(weatherobj) //close $.getJSON
    }); //close function(position)
  } //close if  
}); //close document.ready