import { GoogleMap, GoogleMapsEvent } from 'ionic-native';

// create a new map using element ID
let map = new GoogleMap('elementID');

// or create a new map by passing HTMLElement
let element: HTMLElement = document.getElementById('elementID');

// In Angular 2 or Ionic 2, if we have this element in html: <div #map></div>
// then we can use @ViewChild to find the element and pass it to GoogleMaps
@ViewChild('map') mapElement;
let map = new GoogleMap(mapElement);

// listen to MAP_READY event
map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));


// create LatLng object
let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

// create CameraPosition
let position: CameraPosition = {
  target: ionic,
  zoom: 18,
  tilt: 30
};

// move the map's camera to position
map.moveCamera(position);

// create new marker
let markerOptions: GoogleMapsMarkerOptions = {
  position: ionic,
  title: 'Ionic'
};

map.addMarker(markerOptions)
  .then((marker: GoogleMapsMarker) => {
    marker.showInfoWindow();
  });