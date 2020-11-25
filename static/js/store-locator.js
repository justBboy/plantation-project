
const mapContainer = document.getElementById("storeMapContainer");
console.log(mapContainer)
mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGJib3kiLCJhIjoiY2tobXAxZHQzMDNncDJxcG4yM2pvbmI1MCJ9.EI4dzn4N7UaI9x7ITkNK0w";
var map = new mapboxgl.Map({
  container: "storeMapContainer",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-6.9273026, 27.9693414],
  zoom: 1.2,
});

let currentMarkers = [];

let stores;

document.getElementById('reset').addEventListener('click', reset)

$('#locator-search').on('input', function(e){
    currentMarkers.forEach(marker => {
                    marker.remove();
                })
    if(stores){
        newStores = stores.filter(store => store[0].toLowerCase().includes(e.target.value.toLowerCase()))
        createStoreList(newStores)
        addStoreLocationListeners();
    }
})


function reset(){
    map.flyTo({
        center: [-6.9273026, 27.9693414],
        essential: true,
        zoom: 1.2
    })
}

fetch(globalFiles.woodstoresFile)
.then(res => res.text())
.then(data => {
    Papa.parse(data, {
        complete: result => {
            stores = result.data.slice(1);
            createStoreList(stores)
        }
    })
})
.then(() => {
   addStoreLocationListeners(); 
})

function createStoreList(stores){
     let storeListElem = document.getElementById('store-list');
            storeListElem.innerHTML = "";
            stores.forEach(store => {
                let storelng = parseFloat(store[2])

                let storelat = parseFloat(store[1]);
                let storeLink = store[3]
                let newStore = document.createElement('li');
                
                newStore.classList.value = 'list-group-item store-item';

                newStore.innerHTML = `<h6 style="flex:1; word-wrap: wrap">${store[0]}</h6>
                <span>
                <button title="locate on map" class="btn btn-success store-elem" data-store-latitude="${storelat}" data-store-longitude="${storelng}"><i class="fa fa-map-marker" aria-hidden="true"></i></button>
                <a class="btn btn-danger" title="get info on google map" target="_blank" href="${storeLink ? storeLink : ''}"><i class="fa fa-info" aria-hidden="true"></i></a>
                </span>
                `

                storeListElem.appendChild(newStore)

                let markerEl = document.createElement('div');
                markerEl.className = 'marker';

                

                let popup = new mapboxgl.Popup().setText(store[0]).addTo(map)

                let marker = new mapboxgl.Marker(markerEl)
                .setLngLat([storelng, storelat])
                .addTo(map)
                .setPopup(popup)
                currentMarkers.push(marker)
    })
    console.dir(currentMarkers)
}

function addStoreLocationListeners(){
Array.from(document.querySelectorAll('.store-elem')).forEach(storeElem => storeElem.addEventListener('click', e => {
        e.preventDefault();
        let lng = parseFloat(e.target.dataset.storeLongitude);
        let lat = parseFloat(e.target.dataset.storeLatitude);
        map.flyTo({
            center: [lng, lat],
            essential: true,
            zoom: 13
        })
    }))
}

/* 
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
              var popup = new mapboxgl.Popup().setText(store[0]).addTo(map);
              var markers = new mapboxgl.Marker()
                .setLngLat([storePosLongitude, storePosLatitude])
                .addTo(map)
                .setPopup(popup);
              currentMarkers.push(markers);
              console.log(currentMarkers)
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

        map.flyTo({
          center: [currentNearestStoreLongitude, currentNearestStoreLatitude],
          essential: true,
          zoom: 3,
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
} */
