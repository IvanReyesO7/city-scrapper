const search = document.querySelector("#search");
const btn = document.querySelector("#glass");

const searchCity = (event) => {
  //change city picture
  console.log(btn)
  document.getElementById("header-image").backgroundImage = "url('https://d13k13wj6adfdf.cloudfront.net/urban_areas/bogota_web-7fc246764f.jpg')";
};

// listen the click in the searchbar
btn.addEventListener("click", searchCity);