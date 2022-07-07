$(document).ready(function() {
  console.log(map_id);
  let initialLat = 43.7;
  let initialLong = -79.4;
  if(points.length > 0) {
    [initialLat, initialLong] = [points[0].latitude, points[0].longitude];
  }
    const map = L.map('map').setView([initialLat, initialLong], 13); // [lat, long],
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
});
