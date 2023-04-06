'use strict';

function selector(element, parent = document) {
    return parent.querySelector(element);
}

const btnTrack = selector('.btn-track');
const displayMap = selector('.map');

function getLocation(position){    
    const {latitude, longitude} = position.coords;

    console.log(
        `Latitud: ${latitude}\n` + 
        `Longitud: ${longitude}\n` 
    );

    mapConfig(longitude, latitude);
}

function errorHandler(){
    mapConfig(-97.19267,49.81486); // show this location by default
    console.log("Unable to retrieve your location");
}

const options = {
    enableHighAccuracy: true
}

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmF0ZWphZGEiLCJhIjoiY2xnMTQ4am5sMHN4NjNwcTFnemVtNmJyciJ9.ulDWtEH2eHe48Es8RfYOMA';

function mapConfig(longitude, latitude){
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude,latitude],
        zoom: 16
    });
     
    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );
    
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({color: '#35b8be'})
    .setLngLat([longitude,latitude])
    .addTo(map);
}

btnTrack.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        console.log('Geolocation not supported by your browser');
    }
});
