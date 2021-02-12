const search = document.querySelector("#search");
const btn = document.querySelector("#glass");

const searchCity = (event) => {
  //change city picture
  console.log(document.getElementById("header-image"));
  fetch(`https://api.teleport.org/api/urban_areas/slug:${search.value}/images/`)
    .then(response => response.json())
    .then((data) => {
      console.log(data.photos[0].image.web);
      document.getElementById("header-image").style.backgroundImage = `url(${data.photos[0].image.web})`;
    });

  // `url(https://d13k13wj6adfdf.cloudfront.net/urban_areas/bogota_web-7fc246764f.jpg)`;
};

// listen the click in the searchbar
btn.addEventListener("click", searchCity);

