AOS.init({
  duration: 1000,
  startEvent: "DOMContentLoaded",
});

console.log("works")

let isCo2GraphShown = false;
let isEmissionGraphShown = false;

document.getElementById("co2-btn").addEventListener("click", () => {
  data = localStorage.getItem('co2-concentration');
  fillConcChart(data)
});
document
  .getElementById("emission-btn")
  .addEventListener("click", fillEmissionChart);

let sel = document.getElementById("country-selector");

Array.from(document.querySelectorAll('.footer-btn')).forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    $("html, body").animate({scrollTop: $(e.target.dataset.scrollTo).offset().top - 50}, 1000)
  })
})

fetch(globalFiles.globalConcFile)
.then(res => res.json())
.then(data => localStorage.setItem('co2-concentration', JSON.stringify(data)))
.then(() => {
  data = localStorage.getItem('co2-concentration')
  fillConcChart(data)
})

function fillConcChart(data) {
  if (!isCo2GraphShown) {
    var year = [];
    var conc = [];
    let data = JSON.parse(localStorage.getItem('co2-concentration'));
    console.log(data)
    data.forEach((d) => {
          year.push(d["Year"]);
          conc.push(d["CO2 concentrations"]);
        });
        isEmissionGraphShown = false;
        document.querySelector(
          ".chartsSection__charts"
        ).innerHTML = `<canvas id='co2-conc-chart' style='width: 100%; height: 400px;'></canvas>`;
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

fetch(globalFiles.co2File)
.then(res => res.json())
.then(data => localStorage.setItem('emission-data', JSON.stringify(data)))
.catch(e => console.log(e))

function fillEmissionChart() {
  if (!isEmissionGraphShown) {
    isCo2GraphShown = false;
    let year = [];
    let co2 = [];
    let temp = [];
      data = JSON.parse(localStorage.getItem('emission-data'));
        document.querySelector(".chartsSection__charts").innerHTML = `
            <canvas id='emission-chart' style='width:100%; height:400px;'></canvas>`;
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
