const search = document.querySelector("#search");
const btn = document.querySelector("#glass");
const headers = document.querySelector(".news-headers");

//event click on search
const searchCity = (event) => {
  //unhide info
  document.querySelector('#hide').style.visibility = "visible"
  document.querySelector('#hide').style.display = "block"
  //Change displayed name
  fetchHeaderData(search);
  //Get the date
  fetchDate(search);
  //change city picture
  fetchImages(search);
  //cards miniature and fatcs
  fetchMiniature(search);
  //get some news!
  getTheNews(search);
  // displays map

}

// listen the click in the searchbar
btn.addEventListener("click", searchCity);

// fetch images
const fetchImages = (search) => {
  const teleport = search.value.toLowerCase().split(" ").join("-")
  console.log(teleport);
  fetch(`https://api.teleport.org/api/urban_areas/slug:${teleport}/images/`)
    .then(response => response.json())
    .then((data) => {
      document.getElementById("header-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.photos[0].image.web})`;
    });
}

//fetch header info (City name, country and weather) and card facts
const fetchHeaderData = (search) => {
  fetch(`https://api.teleport.org/api/cities/?search=${search.value}&embed=city%3Asearch-results%2Fcity%3Aitem`)
  .then(response => response.json())
  .then((data) => {
    document.getElementById("city-header-name").innerText = data._embedded["city:search-results"][0].matching_full_name;
    const city_info = data._embedded["city:search-results"][0].matching_full_name.split(",");
    document.getElementById("city_card_name").innerText = city_info[0];
    document.getElementById("city_card_country").innerText = city_info[city_info.length - 1];
    document.getElementById("city_card_population").innerText = data._embedded["city:search-results"][0]._embedded["city:item"].population;
    document.getElementById("wiki").href = `https://en.wikipedia.org/wiki/${search.value}`
  });
}

//fetch date and weather conditions
const fetchDate = (search) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=61aa4137c2a624fd51f9b0b5c814c3ac`)
    .then(response => response.json())
    .then((data) => {
      console.log(data.coord);
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      // get the date and time
      const time = (data.dt + data.timezone);
      const today = new Date(time * 1000);
      const fecha = `${month[today.getMonth()]} ${today.getDate() - 1}, ${today.getFullYear()}`;
      document.getElementById("date-and-time").innerText = fecha;
      // get the weather conditions
      document.getElementById("temp").innerText = `${Math.floor((data.main.temp - 273))}°C`;
      const capitalize = data.weather[0].description;
      document.getElementById("condition").innerText = capitalize.charAt(0).toUpperCase() + capitalize.slice(1);
      displayMap(data.coord);
    });
}

//fetch card little image
const fetchMiniature = (search) => {
  fetch(`https://api.pexels.com/v1/search?query=${search.value}&per_page=1`, {
    headers: {
      Authorization: "563492ad6f91700001000001dbd624862f8646099d7865d640b4690b"
    }
  })
    .then(response => response.json())
    .then((data) => {
      document.getElementById("card-image").style.backgroundImage  = `url(${data.photos[0].src.original})`;
    });
}

const getTheNews = (search) => {
  fetch(`http://newsapi.org/v2/everything?q=${search.value}&language=en&apiKey=5f330d1114724ac7b93dc0ac8f10e81e`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById('main-news-img').src = data.articles[0].urlToImage;
      document.getElementById('main-news-title').innerText = data.articles[0].title;
      document.getElementById('main-news-description').innerText = data.articles[0].description;
      const headerNews = [data.articles[1], data.articles[2], data.articles[3]];
      headers.innerText = "";
      headerNews.forEach(news => {
        const newsResults = `<div class="card-product">
          <img class="news-headers-img" src="${news.urlToImage}" alt="" />
          <div class="card-product-infos">
            <h2>${news.title}</h3>
            <p>${news.description}</p>
          </div>
        </div>`;
        headers.insertAdjacentHTML('beforeend', newsResults);
      });
    });
}

const displayMap = (coord) =>{
  mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnJleWVzbzciLCJhIjoiY2trcnVyb2Z5MDB3ZTJvbXA4MTZ1aGt4YiJ9.7lE4xg5oMtbhAj9Q-5kn9g';
  var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [coord.lon, coord.lat], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });
}
