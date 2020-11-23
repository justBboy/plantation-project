document.getElementById("map-area-btn").addEventListener("click", fetchMap);
document
  .getElementById("locate-me-btn")
  .addEventListener("click", showCurrentPosition);

document.getElementById("reset-btn").addEventListener("click", () => {
  map.flyTo({
    center: [-6.9273026, 27.9693414],
    zoom: 1.2,
    essential: true,
  });
});

document.getElementById("death-rate-checkbox").addEventListener("click", () => {
  showDeathRate(map);
});

document
  .getElementById("c02-emission-rate-checkbox")
  .addEventListener("click", () => {
    showCo2Emission(map);
  });

document
  .getElementById("nearby-btn")
  .addEventListener("click", queryPlantSellerLocation);

let deathRateShown = false;
let shownCo2Emission = false;
let source_added_emission = false;
let source_added_deathrate = false;

const mapContainer = document.getElementById("mapContainer");
mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGJib3kiLCJhIjoiY2tobXAxZHQzMDNncDJxcG4yM2pvbmI1MCJ9.EI4dzn4N7UaI9x7ITkNK0w";
var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-6.9273026, 27.9693414],
  zoom: 1.2,
});

var currentMarkers = [];
var lng = 0;
var lat = 0;
var num = 0;
map.on("click", function (e) {
  lng = e.lngLat.wrap()["lng"];
  lat = e.lngLat.wrap()["lat"];
  if (currentMarkers !== null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
  }

  var markers = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  currentMarkers.push(markers);
});
function showCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap);
  } else {
    alert("geolocation is not accepted on your device or browser");
  }
  function showMap(position) {
    map.flyTo({
      center: [position.coords.longitude, position.coords.latitude],
      essential: true,
      zoom: 17,
    });
  }
}

function fetchMap(e) {
  e.preventDefault();
  let cityName = document.getElementById("city-name").value;
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=pk.eyJ1IjoianVzdGJib3kiLCJhIjoiY2tobXAxZHQzMDNncDJxcG4yM2pvbmI1MCJ9.EI4dzn4N7UaI9x7ITkNK0w`
  )
    .then((res) => res.json())
    .then((data) => {
      map.flyTo({
        center: [data.features[0].center[0], data.features[0].center[1]],
        essential: true,
        zoom: 10,
      });
    });
}

function showDeathRate() {
  let deathRateChecked = document.getElementById("death-rate-checkbox");
  if (source_added_deathrate) {
    console.log("source added");
    if (deathRateChecked.checked) {
      map.setLayoutProperty("deathrate", "visibility", "visible");
      deathRateShown = true;
    } else {
      map.setLayoutProperty("deathrate", "visibility", "none");
      deathRateShown = false;
    }
  } else {
    showDeathRateFunc();
    source_added_deathrate = true;
  }
}

function showDeathRateFunc() {
  map.addSource("data2", {
    type: "geojson",
    data: globalFiles.deathRateFile,
  });
  map.addLayer(
    {
      id: "deathrate",
      type: "heatmap",
      source: "data2",
      maxzoom: 15,
      paint: {
        // increase weight as diameter breast height increases
        "heatmap-weight": {
          property:
            "Deaths - Air pollution - Sex: Both - Age: Age-standardized (Rate)",
          type: "exponential",
          stops: [
            [1, 0],
            [62, 1],
          ],
        },
        // increase intensity as zoom level increases
        "heatmap-intensity": {
          stops: [
            [11, 1],
            [15, 3],
          ],
        },
        // assign color values be applied to points depending on their density
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(236,12,3,0.1)",
          0.2,
          "rgb(208,12,3)",
          0.4,
          "rgb(166,12,3)",
          0.6,
          "rgb(103,12,3)",
          0.8,
          "rgb(28,12,3)",
        ],
        // increase radius as zoom increases
        "heatmap-radius": {
          stops: [
            [21, 25],
            [25, 30],
          ],
        },
        // decrease opacity to transition into the circle layer
        "heatmap-opacity": {
          default: 1,
          stops: [
            [14, 1],
            [15, 0],
          ],
        },
      },
    },
    "waterway-label"
  );
}

function showCo2Emission() {
  let co2EmissionChecked = document.getElementById(
    "c02-emission-rate-checkbox"
  );
  if (source_added_emission) {
    if (co2EmissionChecked.checked) {
      map.setLayoutProperty("pollution", "visibility", "visible");
      shownCo2Emission = true;
    } else {
      map.setLayoutProperty("pollution", "visibility", "none");
      shownCo2Emission = false;
    }
  } else {
    showCo2EmissionFunc();
    source_added_emission = true;
  }
}

function showCo2EmissionFunc() {
  map.addSource("data", {
    type: "geojson",
    data: globalFiles.co2File,
  });
  map.addLayer(
    {
      id: "pollution",
      type: "heatmap",
      source: "data",
      maxzoom: 15,
      paint: {
        // increase weight as diameter breast height increases
        "heatmap-weight": {
          property: "CO2-emissions",
          type: "exponential",
          stops: [
            [1, 0],
            [62, 1],
          ],
        },
        // increase intensity as zoom level increases
        "heatmap-intensity": {
          stops: [
            [11, 1],
            [15, 3],
          ],
        },
        // assign color values be applied to points depending on their density
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(236,222,239,0)",
          0.2,
          "rgb(208,209,230)",
          0.4,
          "rgb(166,189,219)",
          0.6,
          "rgb(103,169,207)",
          0.8,
          "rgb(28,144,153)",
        ],
        // increase radius as zoom increases
        "heatmap-radius": {
          stops: [
            [21, 25],
            [25, 30],
          ],
        },
        // decrease opacity to transition into the circle layer
        "heatmap-opacity": {
          default: 1,
          stops: [
            [14, 1],
            [15, 0],
          ],
        },
      },
    },
    "waterway-label"
  );
}

function queryPlantSellerLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPlantSellers);
  }
  function getPlantSellers(position) {
    let currentNearestStore;
    let currentNearestStoreDifferenceMagnitude;
    let userLongitude = position.coords.longitude;
    let userLatitude = position.coords.latitude;
    fetch(globalFiles.woodstoresFile)
      .then((res) => res.text())
      .then((data) => {
        Papa.parse(data, {
          complete: (result) => {
            result.data.slice(1).forEach((store) => {
              let storePos = store[1].trim().split(",");
              let storePosLatitude = parseInt(storePos[0]);
              let storePosLongitude = parseInt(storePos[1]);
              if (!currentNearestStoreDifferenceMagnitude) {
                currentNearestStoreDifferenceMagnitude = getMagnitude(
                  storePosLatitude,
                  storePosLongitude
                );
                currentNearestStore = store;
              } else {
                newCurrentNearestStoreDifferenceMagnitude = Math.min(
                  getMagnitude(storePosLatitude, storePosLongitude),
                  getMagnitude(userLatitude, userLongitude)
                );
                if (
                  newCurrentNearestStoreDifferenceMagnitude !=
                  currentNearestStoreDifferenceMagnitude
                ) {
                  currentNearestStore = store;
                }
              }
            });
          },
        });
      })
      .then(() => {
        let currentNearestStoreCoords = currentNearestStore[1]
          .trim()
          .split(",");
        let currentNearestStoreLatitude = parseInt(
          currentNearestStoreCoords[0]
        );
        let currentNearestStoreLongitude = parseInt(
          currentNearestStoreCoords[1]
        );
        console.log(currentNearestStore);
        if (currentMarkers !== null) {
          for (var i = currentMarkers.length - 1; i >= 0; i--) {
            currentMarkers[i].remove();
          }
        }

        var markers = new mapboxgl.Marker().setLngLat([currentNearestStoreLongitude, currentNearestStoreLatitude]).addTo(map);
        currentMarkers.push(markers);
        map.flyTo({
          center: [currentNearestStoreLongitude, currentNearestStoreLatitude],
          essential: true,
          zoom: 15,
        });
      });
  }
}

function checkNearness(x1, y1, x2, y2) {
  return Math.sqrt(
    Math.abs(Math.pow(x2, 2)) -
      Math.abs(Math.pow(x1, 2)) +
      (Math.abs(Math.pow(y2, 2)) - Math.abs(Math.pow(y1, 2)))
  );
}

function getMagnitude(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
