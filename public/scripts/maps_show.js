$(document).ready(function() {

  console.log(map_id);
  let initialLat = 43.7;
  let initialLong = -79.4;
  if(points.length > 0) {
    [initialLat, initialLong] = [points[0].latitude, points[0].longitude];
  }
  const map = L.map('map').setView([initialLat, initialLong], 13); // [lat, long],
  
  L.esri.Vector.vectorBasemapLayer(basemapEnum, {
    apiKey: apiKey
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

  const searchControl = L.esri.Geocoding.geosearch({
    position: "topleft",
    placeholder: "Enter an address or place e.g. 1 York St",
    useMapBounds: false,
    providers: [
      L.esri.Geocoding.arcgisOnlineProvider({
        apikey: apiKey,
      })
    ]
  }).addTo(map);
      
  const results = L.layerGroup().addTo(map);

  searchControl.on("results", (data) => {
    console.log(data.results);
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
      // const lngLatString = `${Math.round(data.results[i].latlng.lng * 1000000) / 1000000}, ${
      //   Math.round(data.results[i].latlng.lat * 1000000) / 1000000
      // }`;

      const long = data.results[i].latlng.lng;
      const lat = data.results[i].latlng.lat;
      
      const marker = L.marker(data.results[i].latlng);
      marker.bindPopup(`<a class="" href="/points/new?lat=${lat}&long=${long}&map_id=${map_id}" role="button">Add Point Here</a>`);
      results.addLayer(marker);
      marker.openPopup();
    }
  });
});
  
