const search = document.querySelector("#search");
const btn = document.querySelector("#glass");

const searchCity = (event) => {
  //Change displayed name
  fetchHeaderData(search);
  //Get the date
  fetchDate(search);
  //change city picture
  fetchImages(search);
  // displays map
  // mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnJleWVzbzciLCJhIjoiY2trcnVyb2Z5MDB3ZTJvbXA4MTZ1aGt4YiJ9.7lE4xg5oMtbhAj9Q-5kn9g';
  // var map = new mapboxgl.Map({
  // container: 'map', // container ID
  // style: 'mapbox://styles/mapbox/streets-v11', // style URL
  // center: [-74.5, 40], // starting position [lng, lat]
  // zoom: 9 // starting zoom
  // });
}

// listen the click in the searchbar
btn.addEventListener("click", searchCity);

// fetch images
const fetchImages = (search) => {
  fetch(`https://api.teleport.org/api/urban_areas/slug:${search.value}/images/`)
    .then(response => response.json())
    .then((data) => {
      document.getElementById("header-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.photos[0].image.web})`;
    });
}

//fetch header info (City name, country and weather)
const fetchHeaderData = (search) => {
  fetch(`https://api.teleport.org/api/cities/?search=${search.value}&embed=city%3Asearch-results%2Fcity%3Aitem`)
  .then(response => response.json())
  .then((data) => {
    console.log(data._embedded["city:search-results"][0].matching_full_name);
    document.getElementById("city-header-name").innerText = data._embedded["city:search-results"][0].matching_full_name;
  });
}

//fetch date and weather conditions
const fetchDate = (search) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=61aa4137c2a624fd51f9b0b5c814c3ac`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      // get the date and time
      const time = (data.dt + data.timezone);
      const today = new Date(time * 1000);
      const fecha = `${month[today.getMonth()]} ${today.getDate() - 1}, ${today.getFullYear()} ${today.getUTCHours()}:${today.getUTCMinutes()}`;
      document.getElementById("date-and-time").innerText = fecha;
      // get the weather conditions
      document.getElementById("temp").innerText = `${Math.floor((data.main.temp - 273))}°C`;
      const capitalize = data.weather[0].description;
      document.getElementById("condition").innerText = capitalize.charAt(0).toUpperCase() + capitalize.slice(1);
    });
}