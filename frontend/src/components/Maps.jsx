import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "../css/maps.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const position = [1.4583828821304539, 102.15096143773447];
const markers = [
  {
    geocode: [1.4585110731407618, 102.15337262025002],
    popUp: "Ini Detail Kost Hijau",
    toolTip: "Kost Hijau, klik untuk detail kost",
  },
  {
    geocode: [1.4566212064700033, 102.15186820403704],
    popUp: "Ini Detail Kost Kuning",
    toolTip: "Kost Kuning, klik untuk detail kost",
  },
  {
    geocode: [1.4576274250341035, 102.1483645167577],
    popUp: "Ini Detail Kost Biru",
    toolTip: "Kost Biru, klik untuk detail kost",
  },
];

const customIcon = new Icon({
  iconUrl: require("../image/pinLokasi.png"),
  iconSize: [40, 40],
});

const createCustomClusterIcon = (cluster)=>{
  return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`
  })
}

const Maps = () => {
  return (
    <div className="full-maps">
      <div className="pt-3">
        <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup 
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}>
            {markers.map((marker) => (
              <Marker position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
                <Tooltip sticky>
                  <h6>{marker.toolTip}</h6>
                </Tooltip>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
