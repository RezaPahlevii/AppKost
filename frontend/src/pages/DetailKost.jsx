import React, { useEffect, useState } from "react";
import {Breadcrumb,Button,Card,Col,Container,Figure,Row, Tooltip,} from "react-bootstrap";
import Nav2 from "../components/Nav2";
import Kolase from "./../image/rumah.jpg";
import Footer2 from "../components/Footer2";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, map } from "leaflet";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailKost = () => {

  const { id } = useParams();
  const [DetailKost, setDetailKost] = useState([]);
  const position = [1.4583828821304539, 102.15096143773447];
  const markers = [
    {
      geocode: [1.4585110731407618, 102.15337262025002],
      popUp: "Ini Detail Kost Hijau",
      toolTip: "Kost Hijau, klik untuk detail kost",
    }
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

  const getDetailKost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/rekomendasi-kost"
      );
      setDetailKost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailKost();
  }, []);


  return (
    <div>
      <Nav2 />
      <Container>
        {DetailKost.map((kost, index) => (
        <>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Detail Kost</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col>
            <Figure>
              <Figure.Image
                width={700}
                height={200}
                alt="171x180"
                src={Kolase}
              />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col>
            <Figure>
              <Figure.Image
                width={700}
                height={200}
                alt="171x180"
                src={Kolase}
              />
            </Figure>
          </Col>
        </Row>
        <Row>
          <Col md={8} mt="2">
            <div>
              <h3>
                <strong>
                {kost.nama}
                </strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate repudiandae incidunt quae rerum voluptate?
              </p>
              <div className="mt-5 mt-5">
                <h3>
                  <strong>Spesifikasi tipe kamar</strong>
                </h3>
                <p>
                  2.7 x 2.2 meter <br />
                  Tidak termasuk listrik
                </p>
                <hr />
              </div>
              <div className="mt-5 mb-5">
                <Row>
                  <h3>
                    <strong>Fasilitas kamar</strong>
                  </h3>
                </Row>
                <Row>
                  <Col>
                    <p>
                      AC <br />
                      Meja <br />
                      Kasur <br /> Bantal <br /> Lemari Pakaian <br /> Kursi
                    </p>
                  </Col>
                  <Col>
                    <p>
                      AC <br />
                      Meja <br />
                      Kasur <br /> Bantal <br /> Lemari Pakaian <br /> Kursi
                    </p>
                  </Col>
                </Row>
                <hr />
              </div>
              <div className="mt-5 mt-5">
                <h3>
                  <strong>Peraturan khusus tipe kamar ini</strong>
                </h3>
                <p>
                  Tipe ini bisa diisi maks. 2 orang/ kamar <br />
                  Tidak untuk pasutri
                  <br />
                  Tidak boleh bawa anak
                </p>
                <hr />
              </div>
              <div className="mt-5 mt-5">
                <h3>
                  <strong>Cerita Pemilik Kost Ini</strong>
                </h3>
                <p>
                  Kost ini terdiri dari 3 lantai. Tipe kamar A berada di lantai
                  3. Semua kamar di tipe ini memiliki jendela yang menghadap
                  secara langsung ke arah koridor. <br />
                  <strong>Selengkapnya..</strong>
                </p>
                <hr />
              </div>
              <div className="mt-5 mt-5">
                <h3>
                  <strong>Fasilitas Umum</strong>
                </h3>
                <p>
                  Kost ini terdiri dari 3 lantai. Tipe kamar A berada di lantai
                  3. Semua kamar di tipe ini memiliki jendela yang menghadap
                  secara langsung ke arah koridor.
                </p>
                <hr />
              </div>
              <div className="mt-5 mt-5">
                <h3>
                  <strong>Fasilitas Parkir</strong>
                </h3>
                <p>
                  Kost ini terdiri dari 3 lantai. Tipe kamar A berada di lantai
                  3. Semua kamar di tipe ini memiliki jendela yang menghadap
                  secara langsung ke arah koridor.
                </p>
                <hr />
              </div>
              <div className="mt-5 mt-5">
                <h3>
                  <strong>Lokasi dan Lingkungan Sekitar</strong>
                </h3>
                <MapContainer  style={{ height: "400px", width: "100%" }} center={position} zoom={15} scrollWheelZoom={false}>
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
                <hr />
              </div>
            </div>
          </Col>
          <Col>
            <Card className="py-4 px-5">
              <h4 className="mb-3">
                <strong>Rp. 500.000</strong> / bulan
              </h4>
              <Button variant="success">Ajukan Sewa</Button>
            </Card>
          </Col>
        </Row>
          </>
          ))}
      </Container>
      <Footer2/>
    </div>
  );
};

export default DetailKost;
