import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "../css/maps.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Container } from "react-bootstrap";

const TestMap = () => {
  const [latitude, setLatitude] = useState("");
  const [markerPosition, setMarkerPosition] = useState([
    1.4585110731407618, 102.15337262025002,
  ]);

  const position = [1.4583828821304539, 102.15096143773447];

  const customIcon = new Icon({
    iconUrl: require("../image/pinLokasi.png"),
    iconSize: [40, 40],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  };

  return (
    <Container>
      <div className="pt-3">
        {/* Latitude */}
        <div className="field mb-4">
          <label className="label">Alamat Kordinat</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude"
            />
          </div>
        </div>
        <MapContainer
          style={{ height: "500px", width: "100%" }}
          s
          center={position}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            <Marker
              position={markerPosition}
              icon={customIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setMarkerPosition([lat, lng]);
                  setLatitude(`${lat}, ${lng}`); // Memperbarui nilai input alamat koordinat
                },
              }}
            ></Marker>
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </Container>
  );
};

export default TestMap;
