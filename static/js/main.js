AOS.init({
  duration: 1000,
  startEvent: "DOMContentLoaded",
});

document.getElementById("map-area-btn").addEventListener("click", fetchMap);
document
  .getElementById("locate-me-btn")
  .addEventListener("click", showCurrentPosition);

document.getElementById("reset-btn").addEventListener("click", () => {
      map.flyTo({
        center: [-6.9273026,27.9693414],
        zoom: 1.2,
        essential: true,
      });
});

document.getElementById("death-rate-btn").addEventListener("click", () => {
  showDeathRate(map);
});

document.getElementById("co2-emission-btn").addEventListener("click", () => {
  showCo2Emission(map);
});
let sel = document.getElementById("country-selector");

document.getElementById('nearby-btn').addEventListener('click', queryPlantSellerLocation)

let isCo2GraphShown = false;
let isEmissionGraphShown = false;
let deathRateShown = false;
let shownCo2Emission = false;
let source_added_emission = false;
let source_added_deathrate= false;

document.getElementById("co2-btn").addEventListener("click", fillConcChart);
document
  .getElementById("emission-btn")
  .addEventListener("click", fillEmissionChart);
const mapContainer = document.getElementById("mapContainer");

mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGJib3kiLCJhIjoiY2tobXAxZHQzMDNncDJxcG4yM2pvbmI1MCJ9.EI4dzn4N7UaI9x7ITkNK0w";
var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-6.9273026, 27.9693414],
  zoom: 1.2,
});

var currentMarkers=[];
  var lng = 0;
  var lat = 0;
  var num = 0;
  map.on('click',  function (e) {

    lng = e.lngLat.wrap()["lng"];
    lat = e.lngLat.wrap()["lat"];
    if (currentMarkers!==null) {
      for (var i = currentMarkers.length - 1; i >= 0; i--) {
        currentMarkers[i].remove();
      }
    }


    var markers = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);
    currentMarkers.push(markers);
  });

function fillConcChart(e) {
  if (!isCo2GraphShown) {
    var year = [];
    var conc = [];
    console.log(globalFiles.globalConcFile);
    fetch(globalFiles.globalConcFile)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((d) => {
          year.push(d["Year"]);
          conc.push(d["CO2 concentrations"]);
        });
      })
      .then(() => {
        isEmissionGraphShown = false;
        document.querySelector(
          ".chartsSection__charts"
        ).innerHTML = `<canvas id='co2-conc-chart'></canvas>`;
        document.getElementById("country-selector").style.display = "none";
        const ctx = document.getElementById("co2-conc-chart").getContext("2d");
        var mChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: year,
            datasets: [
              {
                label: "CO2 Concentration",
                data: conc,
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            hover: {
              mode: "nearest",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },
          },
        });
        isCo2GraphShown = true;
      })
      .catch((err) => console.log(err));
  } else {
    document.querySelector(".chartsSection__charts").innerHTML = "";
    isCo2GraphShown = false;
  }
  return false;
}

var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Faeroe Islands",
  "Falkland Islands",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function fillEmissionChart(e) {
  if (!isEmissionGraphShown) {
    isCo2GraphShown = false;
    let year = [];
    let co2 = [];
    let temp = [];
    fetch(globalFiles.co2File)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector(".chartsSection__charts").innerHTML = `
            <canvas id='emission-chart'></canvas>`;
        document.getElementById("country-selector").style.display = "block";
        data.features.forEach((feature) => {
          let key = feature["properties"]["Entity"];

          if (key == sel.value) {
            temp.push(feature["properties"]);
          }
        });
        temp = temp.slice(Math.max(temp.length - 6, 1));
        temp.forEach((el) => {
          year.push(el["Year"]);
          co2.push(el["CO2-emissions"]);
        });
        sel.onchange = () => {
          isEmissionGraphShown = false;
          fillEmissionChart();
        };
        const ctx = document.getElementById("emission-chart").getContext("2d");
        isEmissionGraphShown = true;
        var mChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: year,
            datasets: [
              {
                label: "CO2 emissions",
                data: co2,
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            hover: {
              mode: "nearest",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },
          },
        });
      });
  } else {
    document.querySelector(".chartsSection__charts").innerHTML = "";
    document.getElementById("country-selector").style.display = "none";
    isEmissionGraphShown = false;
  }
  return false;
}

function fill_selector() {
  var sel = document.getElementById("country-selector");
  console.log(sel);
  for (var i = 0; i < country_list.length; i++) {
    var opt = document.createElement("option");
    opt.innerHTML = country_list[i];
    opt.value = country_list[i];
    sel.appendChild(opt);
  }
}

fill_selector();

function showCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap);
  } else {
    alert("geolocation is not accepted on your device or browser");
  }
  function showMap(position) {
       map.flyTo({
        center: [position.coords.longitude,position.coords.latitude],
        essential: true,
        zoom : 17
      });
   
  }
 
}

function fetchMap(e) {
  e.preventDefault();
  let cityName = document.getElementById("city-name").value;
}

function showDeathRate(){
        if (source_added_deathrate){
          source_added_deathrate = true;
          if(!deathRateShown){
            map.setLayoutProperty('deathrate', 'visibility', 'visible');
            deathRateShown = true;
          }
          else{
            map.setLayoutProperty('deathrate', 'visibility', 'none')
            deathRateShown = false;
          }
        }
      else{
        showDeathRateFunc();
        source_added_deathrate = true;
      }

 }

 function showDeathRateFunc(){
      map.addSource('data2', {
        type: 'geojson',
        data: globalFiles.deathRateFile
      });
      map.addLayer({
        id: 'deathrate',
        type: 'heatmap',
        source: 'data2',
        maxzoom: 15,
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'Deaths - Air pollution - Sex: Both - Age: Age-standardized (Rate)',
            type: 'exponential',
            stops: [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(236,12,3,0.1)',
            0.2, 'rgb(208,12,3)',
            0.4, 'rgb(166,12,3)',
            0.6, 'rgb(103,12,3)',
            0.8, 'rgb(28,12,3)'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [21, 25],
              [25, 30]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          },
        }
      }, 'waterway-label');
    }
    
function showCo2Emission(){
        if (source_added_emission){
          source_added_emission = true;
          if(!shownCo2Emission){
            map.setLayoutProperty('pollution', 'visibility', 'visible');
            shownCo2Emission = true;
          }
          else{
            map.setLayoutProperty('pollution', 'visibility', 'none')
            shownCo2Emission = false;
          }
        }
      else{
        showCo2EmissionFunc();
        source_added_emission = true;
      }

 }


    function showCo2EmissionFunc(){
      map.addSource('data', {
        type: 'geojson',
        data: globalFiles.co2File
      });
      map.addLayer({
        id: 'pollution',
        type: 'heatmap',
        source: 'data',
        maxzoom: 15,
        paint: {	
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'CO2-emissions',
            type: 'exponential',
            stops: [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(236,222,239,0)',
            0.2, 'rgb(208,209,230)',
            0.4, 'rgb(166,189,219)',
            0.6, 'rgb(103,169,207)',
            0.8, 'rgb(28,144,153)'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [21, 25],
              [25, 30]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          },
        }
      }, 'waterway-label');
    }


function queryPlantSellerLocation(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPlantSellers);
  } 
  async function getPlantSellers(position){
    console.log(position)
    let countryReq = await fetch(`http://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1IjoianVzdGJib3kiLCJhIjoiY2tobXAxZHQzMDNncDJxcG4yM2pvbmI1MCJ9.EI4dzn4N7UaI9x7ITkNK0w&types=poi&proximity&types=country`)
    let countryData = await countryReq.json();
    let countryShortCode = countryData.features[0].properties.short_code
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/plant%20seller.json?access_token=pk.eyJ1IjoianVzdGJib3kiLCJhIjoiY2tobXAxZHQzMDNncDJxcG4yM2pvbmI1MCJ9.EI4dzn4N7UaI9x7ITkNK0w&types=poi&proximity=${position.coords.latitude}, ${position.coords.longitude}&country=${countryShortCode}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if(data.features.length){
      data.features[0]
 map.flyTo({
        center: [data.features[0].center[0],data.features[0].center[1]],
        essential: true,
        zoom : 17
      });
    }else{
      alert('Not finding plant sellers in your location')
    }
  })
  }
}
 