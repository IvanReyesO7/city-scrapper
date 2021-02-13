const search = document.querySelector("#search");
const btn = document.querySelector("#glass");

const searchCity = (event) => {
  //change city picture
  fetchImages(search);
  // displays map
  mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnJleWVzbzciLCJhIjoiY2trcnVyb2Z5MDB3ZTJvbXA4MTZ1aGt4YiJ9.7lE4xg5oMtbhAj9Q-5kn9g';
  var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });
}

// listen the click in the searchbar
btn.addEventListener("click", searchCity);

// fetch images
const fetchImages = (search) => {
  fetch(`https://api.teleport.org/api/urban_areas/slug:${search.value}/images/`)
      .then(response => response.json())
      .then((data) => {
        document.getElementById("header-image").style.backgroundImage = `url(${data.photos[0].image.web})`;
      });
}

