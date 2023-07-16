import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Form,
  Row,
  Tooltip,
} from "react-bootstrap";
import Nav2 from "../components/Nav2";
import axios from "axios";
import Footer2 from "../components/Footer2";
import "../css/ListKost.css";
import { Icon, divIcon } from "leaflet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const ListKost = () => {
  const [kosts, setKosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  console.log(search);

  useEffect(() => {
    getKosts();
  }, []);

  const getKosts = async () => {
    const response = await axios.get("http://localhost:5000/rekomendasi-kost");
    setKosts(response.data);
  };

  const buttonFullMaps = () => {
    navigate("/maps");
  };
  const petaPosition = [1.4583828821304539, 102.15096143773447];
  const customIcon = new Icon({
    iconUrl: require("../image/pinLokasi.png"),
    iconSize: [40, 40],
  });
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
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  };

  return (
    <div>
      <Nav2 />
      <Container style={{ maxWidth: "1250px" }}>
        <Row className="sticky-top pt-5 ">
          <Col className="mt-auto">
            <div>
              <div className="bg-white">
                <Button
                  variant="outline-secondary"
                  className="mr-2 rounded-pill"
                >
                  Harga
                </Button>
                <Button
                  variant="outline-secondary"
                  className="mr-2 rounded-pill"
                >
                  Fasilitas
                </Button>
                <Button
                  variant="outline-secondary"
                  className="mr-2 rounded-pill"
                >
                  Gender
                </Button>
              </div>
              <hr />
            </div>
          </Col>
          <Col sm={4}>
            <Form sticky="top" className="d-flex pt-2 pb-5 mt-auto">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Masukkan nama kost/alamat/fasilitas"
                className="me-2"
                aria-label="Search"
                style={{ height: "2.5rem", width: "2" }}
              />
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12} lg={7}>
            <div className="card-container">
              {kosts
                .filter((kost) => {
                  const searchLower = search.toLowerCase();
                  const nameLower = kost.nama.toLowerCase();
                  const priceLower = kost.harga.toString().toLowerCase();
                  const ownerNameLower = kost.user.name.toLowerCase();
                  // const filterFasilitas = kost.f_kamar.find((fasilitas) =>
                  //   fasilitas.toLowerCase().includes(searchLower));

                  return (
                    search.toLowerCase() === "" ||
                    nameLower.includes(searchLower) ||
                    priceLower.includes(searchLower) ||
                    ownerNameLower.includes(searchLower) ||
                    filterFasilitas
                  );
                })
                .map((kost, index) => (
                  <Link
                    to={`/rumah-kost/detail/${kost.uuid}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card key={kost.uuid} className="mb-3">
                      <Row>
                        <Col xs={6}>
                          <CardImg
                            style={{ width: "auto", height: "100%" }}
                            variant="top"
                            src={kost.fotos[0].url1}
                          />
                        </Col>
                        <Col xs={6}>
                          <Card.Body>
                            <Row>
                              <Card.Title>{kost.nama}</Card.Title>
                            </Row>
                            <Row>
                              <Card.Text>
                                Desa {kost.desa}
                                <br />
                                {kost.alamat}
                              </Card.Text>
                            </Row>
                            <Row>
                              <Col>
                                <Card.Text>
                                  {kost.fasilitas
                                    .slice(0, 5)
                                    .map((item, index) => (
                                      <span
                                        key={item.nama_f}
                                        className="mr-2 text-muted"
                                        style={{ fontSize: "15px" }}
                                      >
                                        {item.nama_f}
                                        {index !== 4 && ","}
                                        {/* Add comma separator between items except for the last one */}
                                      </span>
                                    ))}
                                </Card.Text>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Card.Text></Card.Text>
                              </Col>
                              <Col>
                                <Card.Text className="text-end">
                                  <strong>{kost.harga}</strong> /bulan
                                </Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                ))}
            </div>
          </Col>
          <Col className="" xs={12} lg={5}>
            <MapContainer
              style={{ height: "450px", width: "100%" }}
              center={petaPosition}
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
            <Button onClick={buttonFullMaps} className="mt-3">
              Full Maps
            </Button>
          </Col>
        </Row>
      </Container>
      <>
        <Footer2 />
      </>
    </div>
  );
};

export default ListKost;
