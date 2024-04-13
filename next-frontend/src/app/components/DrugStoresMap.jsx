import { useEffect } from 'react';
import Head from 'next/head';

const DrugStoresMap =({ googleApiKey })=> {
    let map, infoWindow;

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation.",
        );
        infoWindow.open(map);
    }

    async function initMap() {
        if (typeof google === 'undefined') {
            console.error('Google Maps API not loaded');
            return;
        }
        const position = {lat: 39.8283, lng: -98.5795};
        //@ts-ignore
        const {Map} = await google.maps.importLibrary("maps");
        const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: "USA",
        });
        infoWindow = new google.maps.InfoWindow();

        const locationButton = document.createElement("button");

        locationButton.textContent = "Stores Near Me";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        infoWindow.setPosition(pos);
                        infoWindow.setContent("Location found.");
                        infoWindow.open(map);
                        map.setCenter(pos);
                    },
                    () => {
                        handleLocationError(true, infoWindow, map.getCenter());
                    },
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });


        // const marker = new AdvancedMarkerElement({
        //     map: map,
        //     position: position,
        //     title: "User Location",
        // });
    }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [googleApiKey]);
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Head>
                <title>Geolocation</title>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <link rel="stylesheet" type="text/css" href="./DrugStoresMapStyle.css"/>
            </Head>
            <div id="map" style={{width: '600px', height: '400px'}}></div>
            <style>
                {'.custom-map-control-button {\n' +
                    '  background-color: #fff;\n' +
                    '  border: 0;\n' +
                    '  border-radius: 2px;\n' +
                    '  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);\n' +
                    '  margin: 10px;\n' +
                    '  padding: 0 0.5em;\n' +
                    '  font: 400 18px Roboto, Arial, sans-serif;\n' +
                    '  overflow: hidden;\n' +
                    '  height: 40px;\n' +
                    '  cursor: pointer;\n' +
                    '}\n' +
                    '.custom-map-control-button:hover {\n' +
                    '  background: rgb(235, 235, 235);\n' +
                    '}'}
            </style>
        </div>
    );
}
export default DrugStoresMap

