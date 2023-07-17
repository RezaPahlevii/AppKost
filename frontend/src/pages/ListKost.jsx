import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardImg,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import Nav2 from "../components/Nav2";
import axios from "axios";
import Footer2 from "../components/Footer2";
import "../css/ListKost.css";
import { Icon, divIcon } from "leaflet";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const ListKost = () => {
  const [kosts, setKosts] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    getKosts();
  }, []);

  const getKosts = async () => {
    const response = await axios.get("http://localhost:5000/rekomendasi-kost");
    setKosts(response.data);
  };

  const petaPosition = [1.4583828821304539, 102.15096143773447];
  const customIcon = new Icon({
    iconUrl: require("../image/pinLokasi.png"),
    iconSize: [36, 36],
  });
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const filteredKosts = kosts
    .filter((kost) => {
      const searchWords = search.toLowerCase().split(/[.,\s]+/);
      const nameLower = kost.nama.toLowerCase();
      const jkLower = kost.jk.toLowerCase();
      const alamatLower = kost.alamat.toLowerCase();
      const priceLower = kost.harga.toString().toLowerCase();
      const ownerNameLower = kost.user.name.toLowerCase();
      const filterFasilitas = kost.fasilitas.find((fasilitas) =>
        searchWords.some((word) =>
          fasilitas.nama_f.toLowerCase().includes(word)
        )
      );

      return (
        (searchWords.length === 1 && searchWords[0] === "") ||
        searchWords.every((word) =>
          [nameLower, jkLower, alamatLower, priceLower, ownerNameLower].some((text) =>
            text.includes(word)
          )
        ) ||
        filterFasilitas
      );
    })
    .filter((kost) => {
      if (gender === "") {
        return true;
      } else {
        return kost.jk.toLowerCase() === gender.toLowerCase();
      }
    });

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
                <DropdownButton
                  as={ButtonGroup}
                  title="Gender"
                  variant="outline-secondary"
                  className="rounded-pill"
                >
                  <Dropdown.Item
                    active={gender === "putra"}
                    onClick={() => handleGenderChange("putra")}
                  >
                    Putra
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={gender === "putri"}
                    onClick={() => handleGenderChange("putri")}
                  >
                    Putri
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <hr />
            </div>
          </Col>
          <Col sm={4}>
            <Form sticky="top" className="d-flex pt-2 pb-5 mt-auto">
              <Form.Control
                onChange={handleSearch}
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
              {filteredKosts.map((kost) => (
                <Link
                  to={`/rumah-kost/detail/${kost.uuid}`}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={kost.uuid}
                >
                  <Card className="mb-3">
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
                {kosts.map((kost) => (
                  <Marker
                    key={kost.uuid}
                    position={kost.kordinat.split(",").map(Number)}
                    icon={customIcon}
                  >
                    <Popup>{kost.nama}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
            <Link
              className="btn btn-outline-success"
              to={"/maps"}
              style={{ textDecoration: "none", marginTop: "10px" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Full Maps
            </Link>
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
