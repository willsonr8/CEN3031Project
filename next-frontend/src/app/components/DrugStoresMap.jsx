import { useEffect } from 'react';
import Head from 'next/head';

const DrugStoresMap =({ googleApiKey })=> {
    let map;

    async function initMap() {
        if (typeof google === 'undefined') {
            console.error('Google Maps API not loaded');
            return;
        }
        // The location of Uluru
        const position = {lat: 39.8283, lng: -98.5795};
        // Request needed libraries.
        //@ts-ignore
        const {Map} = await google.maps.importLibrary("maps");
        const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Uluru",
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
                <title>Add Map</title>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <link rel="stylesheet" type="text/css" href="/style.css"/>
            </Head>
            <div id="map" style={{width: '600px', height: '400px'}}></div>
        </div>
    );
}
export default DrugStoresMap

