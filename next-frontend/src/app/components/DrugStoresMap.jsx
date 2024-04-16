import { useEffect } from 'react';
import Head from 'next/head';

const DrugStoresMap =({ googleApiKey })=> {
    let map, service, infoWindow;
    let userDraggedMap = false;
    let markers = [];

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation.",
        );
        infoWindow.open(map);
    }

    function clearMarkers(markers) {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
    }

    async function initMap() {
        if (typeof google === 'undefined') {
            console.error('Google Maps API not loaded');
            return;
        }
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");

        map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: {lat: 39.8283, lng: -98.5795},
            mapId: "USA",
        });

        service = new google.maps.places.PlacesService(map);
        infoWindow = new google.maps.InfoWindow();

        function performSearch(userLocationMarker = null) {
            const request = {
                query: "Drug Store",
                fields: ["name", "geometry"],
                bounds: map.getBounds(),
            };

            service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    // Clear existing markers
                    clearMarkers(markers)

                    // Fit bounds to display all markers
                    const bounds = new google.maps.LatLngBounds();
                    results.forEach((place) => {
                        // for unknown reasons this has to be marker. google.maps.marker.advancedmarkerelemnt does not work properly.
                        const newInfoWindow = new google.maps.InfoWindow();
                        const marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location,
                        });
                        markers.push(marker);
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.union(place.geometry.location);
                        }
                        google.maps.event.addListener(marker, "click", () => {
                            const content = document.createElement("div");
                            const nameElement = document.createElement("h2");

                            nameElement.textContent = place.name;
                            content.appendChild(nameElement);

                            const placeAddressElement = document.createElement("p");

                            placeAddressElement.textContent = place.formatted_address;
                            content.appendChild(placeAddressElement);
                            infoWindow.setContent(content);
                            infoWindow.open(map, marker);
                        });
                    });
                    setTimeout(() => {
                        const bounds = new google.maps.LatLngBounds();
                        markers.forEach((marker) => bounds.extend(marker.position));
                    }, 500);
                }
            });
        }

        map.addListener("dragstart", () => {
            userDraggedMap = true;
        });
        map.addListener("idle", () => {
            if (userDraggedMap) {
                performSearch();
                userDraggedMap = false;
            }
        })

        let userLocationMarker = null;

        const locationButton = document.createElement("button");

        locationButton.textContent = "Stores Near Me";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                clearMarkers(markers)
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        infoWindow.setPosition(pos);
                        infoWindow.setContent("Current Location");
                        infoWindow.open(map);
                        map.setCenter(pos);
                        map.setZoom(13);
                        if (userLocationMarker !== null) {
                            userLocationMarker.setMap(null);
                        }
                        userLocationMarker = new google.maps.Marker({
                            map: map,
                            position: pos,
                            icon: {path: google.maps.SymbolPath.CIRCLE, scale: 10,}
                        })
                        performSearch();
                    },
                    () => {
                        handleLocationError(true, infoWindow, map.getCenter());
                    })
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });
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
