const search = document.querySelector("#search");
const btn = document.querySelector("#glass");

const searchCity = (event) => {
  //change city picture
  console.log(document.getElementById("header-image"));
  document.getElementById("header-image").style.backgroundImage = "url(https://d13k13wj6adfdf.cloudfront.net/urban_areas/bogota_web-7fc246764f.jpg)";
  // `url(https://d13k13wj6adfdf.cloudfront.net/urban_areas/bogota_web-7fc246764f.jpg)`;
};

// listen the click in the searchbar
btn.addEventListener("click", searchCity);
