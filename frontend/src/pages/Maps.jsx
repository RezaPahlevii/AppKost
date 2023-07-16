import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "../css/maps.css";
import "leaflet/dist/leaflet.css";
import Nav2 from "../components/Nav2.jsx";
import Footer2 from "../components/Footer2";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";

const Maps = () => {
  const [kordinat, setKordinat] = useState([]);
  const [msg, setMsg] = useState("");
  const position = [1.4583828821304539, 102.15096143773447];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/maps");
        setKordinat(response.data);
      } catch (error) {
        setMsg(error.message);
      }
    };
    fetchData();
  }, []);

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
    <div className="full-maps">
      <Nav2 />
      <div className="pt-3">
        <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {kordinat.map((data, index) => (
              <Marker
                key={index}
                position={data.kordinat.split(",").map(Number)}
                icon={customIcon}
              >
                <Tooltip>{data.nama}</Tooltip>
                <Popup>
                  Nama Kost: {data.nama} <br />
                  Desa: {data.desa} <br />
                  Alamat: {data.alamat} <br />
                  Harga: {data.harga} <br />
                  Untuk: {data.jk}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      <Footer2 />
    </div>
  );
};

export default Maps;
