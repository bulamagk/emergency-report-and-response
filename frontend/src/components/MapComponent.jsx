import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ location }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: Number(location.lat),
    lng: Number(location.lon),
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
