<<<<<<< Updated upstream

$(document).ready(function() {
  import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
});
map.addControl(searchControl);
  
  console.log(map_id);
  let initialLat = 43.7;
  let initialLong = -79.4;
  if(points.length > 0) {
    [initialLat, initialLong] = [points[0].latitude, points[0].longitude];
  }
    var map = L.map('map').setView([initialLat, initialLong], 13); // [lat, long],
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // add existing points to map
    for(const i in points) {
      eval("marker_"+ i +" = L.marker(["+points[i].latitude+","+points[i].longitude+"]).addTo(map)");
      eval(`marker_${i}.bindPopup('<a href="/points/${points[i].id}">${points[i].name}</a>').openPopup()`);
    }

    let popup = L.popup();
    function onMapClick(e) {
      const lat = e.latlng.lat.toString();
      const long = e.latlng.lng.toString();

      popup
        .setLatLng(e.latlng)
        .setContent(`<a class="" href="/points/new?lat=${lat}&long=${long}&map_id=${map_id}" role="button">Add Point Here</a>`)
        .openOn(map);
    }
    map.on('click', onMapClick);
=======
$(document).ready(function() {

 //require('node_modules/leaflet-geosearch/dist/geosearch.css');

// Either get GeoSearch from the window global, or import from `leaflet-geosearch`
// import * as GeoSearch from 'leaflet-geosearch';

// const map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// const search = new GeoSearch.GeoSearchControl({
//   provider: new GeoSearch.OpenStreetMapProvider(),
// });
// //map.addControl(search);


// const form = document.querySelector('form');
// const input = form.querySelector('input[type="text"]');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const results = await provider.search({ query: input.value });
//   console.log(results); // » [{}, {}, {}, ...]
// });



  // Initialize map to specified coordinates
//   let map = L.map('map', {
//     center: [51.5, -0.1], // CAREFULL!!! The first position corresponds to the lat (y) and the second to the lon (x)
//     zoom: 12
//   });

//   // Add tiles (streets, etc)
//   L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//   var query_addr = "30 Clegg Road, markham";
// // Get the provider, in this case the OpenStreetMap (OSM) provider.
// const provider = new window.GeoSearch.OpenStreetMapProvider()
// // Query for the address
// var query_promise = provider.search({ query: query_addr});
// // Wait until we have an answer on the Promise
// query_promise.then( value => {
//    for(i=0;i < value.length; i++){
//      // Success!
//      var x_coor = value[i].x;
//      var y_coor = value[i].y;
//      var label = value[i].label;
//      // Create a marker for the found coordinates
//      var marker = L.marker([y_coor,x_coor]).addTo(map) // CAREFULL!!! The first position corresponds to the lat (y) and the second to the lon (x)
//      // Add a popup to said marker with the address found by geosearch (not the one from the user)
//      marker.bindPopup("<b>Found location</b><br>"+label).openPopup();
//    };
// }, reason => {
//   console.log(reason); // Error!
// } );

L.esri.Geocoding.geocode({apikey: 'AAPK7046718103a34f8c9cdf6a3db575ea9dznUHxBthgbCiLdxLNu1gX7l4d9VmRAAOgwSADsUrlCi8a63S_OXlc7M6vgH37BK1'}).text('380 New York St, Redlands, California, 92373').run(function (err, results, response) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(results);
});





  // console.log(map_id);
  // let initialLat = 43.7;
  // let initialLong = -79.4;
  // if(points.length > 0) {
  //   [initialLat, initialLong] = [points[0].latitude, points[0].longitude];
  // }
  //   const map = L.map('map').setView([initialLat, initialLong], 13); // [lat, long],
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     attribution: '© OpenStreetMap'
  //   }).addTo(map);

  //   // add existing points to map
  //   for(const i in points) {
  //     eval("marker_"+ i +" = L.marker(["+points[i].latitude+","+points[i].longitude+"]).addTo(map)");
  //     eval(`marker_${i}.bindPopup('<a href="/points/${points[i].id}">${points[i].name}</a>').openPopup()`);
  //   }

  //   let popup = L.popup();
  //   function onMapClick(e) {
  //     const lat = e.latlng.lat.toString();
  //     const long = e.latlng.lng.toString();

  //     popup
  //       .setLatLng(e.latlng)
  //       .setContent(`<a class="" href="/points/new?lat=${lat}&long=${long}&map_id=${map_id}" role="button">Add Point Here</a>`)
  //       .openOn(map);
  //   }
  //   map.on('click', onMapClick);
>>>>>>> Stashed changes
});
