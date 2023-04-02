import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import osm from "./osmprovider.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeolocation from "./useGeolocation.js";

export default function Map1() {
  const [center, setCenter] = useState({ lat: 13, lon: 18 });
  // const [map, setMap] = useState(null);
  const zoom_level = 9;
  const mapRef = useRef();
  const [points, setPoints] = useState([0, 0]);
  const location = useGeolocation();
  const [check, setCheck] = useState(false);
  const markericon = new L.icon({
    iconUrl: require("./resources/location-pin.png"),
    iconSize: [35, 40],
  });

  

  // useEffect(() => {
  //   if (map) {
  //     map.on("click", function (e) {
  //       alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
  //     });
  //   }
  // }, [map]);

  const locatepoint = () => {
    setCheck(true);
    mapRef.current.flyTo(points, zoom_level, { animate: true });
  };

  // mapRef.onClick((e)=>
  // {
  //   console.log(e);
  // })

  const showmylocation = () => {
    if (location.loaded && !location.error) {
      console.log(mapRef.current.leafletElement);
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lon],
        zoom_level,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };
  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom_level}
        ref={mapRef}
        // whenCreated={setMap}
      >
        
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
        {/* <Marker position={[13, 18]} icon={markericon}>

          <Popup>
            why the hell you clicked!!!
          </Popup>
        </Marker> */}
        {location.loaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lon]}
            icon={markericon}
          >
            <Popup>your location</Popup>
          </Marker>
        )}

        {check && <Marker position={points} icon={markericon}></Marker>}
      </MapContainer>
      <div>
        <button onClick={showmylocation}>Locate me</button>
      </div>
      <div>
        <label for="lat">latitude</label>
        <input
          type="number"
          id="lat"
          onChange={(e) => {
            setPoints([e.target.value, points[1]]);
          }}
        />
        <label for="lon">longitude</label>
        <input
          type="number"
          id="lon"
          onChange={(e) => {
            setPoints([points[0], e.target.value]);
          }}
        />
        <div>
          <button onClick={locatepoint}>find location</button>
        </div>
      </div>
    </div>
  );
}
