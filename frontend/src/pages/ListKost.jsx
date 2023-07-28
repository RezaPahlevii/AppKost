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
  Modal,
  Row,
} from "react-bootstrap";
import Nav2 from "../components/Nav2";
import axios from "axios";
import Footer2 from "../components/Footer2";
import "../css/ListKost.css";
import { Icon, divIcon } from "leaflet";
import { Link } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useDispatch } from "react-redux";

const ListKost = () => {
  const dispatch = useDispatch();
  const [kosts, setKosts] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCommonFacilities, setSelectedCommonFacilities] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

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

  const handleFacilitiesModal = () => {
    setShowFacilitiesModal(!showFacilitiesModal);
  };

  const handleFacilityCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFacilities((prevFacilities) => [...prevFacilities, value]);
    } else {
      setSelectedFacilities((prevFacilities) =>
        prevFacilities.filter((facility) => facility !== value)
      );
    }
  };
  const availableFacilities = [
    "Kasur",
    "Bantal",
    "Meja",
    "Kursi",
    "Lemari Pakaian",
    "Kipas Angin",
    "Dispenser",
    "Kamar Mandi di Dalam",
  ];

  const handleCommonFacilityCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCommonFacilities((prevFacilities) => [
        ...prevFacilities,
        value,
      ]);
    } else {
      setSelectedCommonFacilities((prevFacilities) =>
        prevFacilities.filter((facility) => facility !== value)
      );
    }
  };

  const availableCommonFacilities  = [
    "Wifi",
    "Pengurus Kost",
    "Jemuran",
    "Dapur",
    "Parkir Motor",
    "R. Tengah",
  ];

  const filteredKosts = kosts
    .filter((kost) => {
      const searchWords = search.toLowerCase().split(/[.,\s]+/);
      const nameLower = kost.nama.toLowerCase();
      const jkLower = kost.jk.toLowerCase();
      const alamatLower = kost.alamat.toLowerCase();
      const desaLower = kost.desa.toLowerCase();
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
          [
            nameLower,
            jkLower,
            alamatLower,
            desaLower,
            priceLower,
            ownerNameLower,
          ].some((text) => text.includes(word))
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
    })
    .filter((kost) => {
      if (selectedFacilities.length === 0) {
        return true;
      } else {
        return kost.fasilitas.some((fasilitas) =>
          selectedFacilities.includes(fasilitas.nama_f)
        );
      }
    })
    .filter((kost) => {
      return kost.harga >= priceRange.min && kost.harga <= priceRange.max;
    });

  const handlePriceChange = (event) => {
    const { name, value } = event.target;

    // Memeriksa apakah nilai input adalah angka
    if (!isNaN(value)) {
      setPriceRange({
        ...priceRange,
        [name]: Number(value),
      });
    }
  };
  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return "Invalid Number";
    }
    return numberValue.toLocaleString("id-ID");
  };

  return (
    <div>
      <Nav2 />
      <Container className="my-3 py-5" style={{ maxWidth: "1250px" }}>
        <Row className="pt-4">
          {/* menu fasilitas, gender, dan harga (fixed top) */}
          <Col className="mt-auto">
            <div>
              <div className="bg-white">
                <Row className="align-items-center">
                  <Col className="mb-3" sm={12} md={12} lg={4}>
                    <Button
                      onClick={handleFacilitiesModal}
                      as={ButtonGroup}
                      title="Fasilitas"
                      variant="outline-secondary"
                      className="rounded-pill mb-3 mb-md-0 mr-2"
                    >
                      Fasilitas
                    </Button>
                    <DropdownButton
                      as={ButtonGroup}
                      title="Gender"
                      variant="outline-secondary"
                      className="rounded-pill mb-3 mb-md-0"
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
                  </Col>
                  <Col sm={12} md={12} lg={5}>
                    <div className="d-flex align-items-center">
                      <div className="input-group me-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Min:</span>
                        </div>
                        <input
                          type="tel"
                          className="form-control"
                          value={priceRange.min}
                          onChange={handlePriceChange}
                          name="min"
                          min={0}
                          max={1000000}
                          style={{ minWidth: "100px" }}
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="input-group me-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Max:</span>
                        </div>
                        <input
                          type="tel"
                          className="form-control"
                          value={priceRange.max}
                          onChange={handlePriceChange}
                          name="max"
                          min={0}
                          max={1000000}
                          style={{ minWidth: "100px" }}
                          pattern="[0-9]*"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col sm={12} md={12} lg={3}>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Harga:</span>
                      <RangeSlider
                        className="range-slider"
                        min={0}
                        max={1000000}
                        value={priceRange.min}
                        onChange={handlePriceChange}
                        name="min"
                      />
                      <RangeSlider
                        className="range-slider"
                        min={0}
                        max={1000000}
                        value={priceRange.max}
                        onChange={handlePriceChange}
                        name="max"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
            </div>
          </Col>

          <Col sm={4}>
            <Form sticky="top" className="d-flex pt-2 pb-5 mt-auto">
              <Form.Control
                onChange={handleSearch}
                type="search"
                placeholder="Masukkan nama kost/harga/alamat/fasilitas"
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
                                {kost.fasilitas &&
                                  kost.fasilitas
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
                                {kost.peraturans
                                  .slice(0, 5)
                                  .map((item, index) => (
                                    <span
                                      key={item.peraturan}
                                      className="mr-2 text-muted"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {item.peraturan}
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
                                Rp <strong>{formatCurrency(kost.harga)}</strong>{" "}
                                /bulan
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

      {/* Facilities Modal */}
      <Modal size="lg" show={showFacilitiesModal} onHide={handleFacilitiesModal}>
        <div className="mx-5 my-3">
        <Modal.Header closeButton>
          <Modal.Title>Pilih Fasilitas</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
          <Row>
            <Col className="mb-4" sm={12} md={6} lg={6}>
            <Form.Label className="form-label">Fasilitas Kost</Form.Label>
            {availableFacilities.map((facility) => (
              <Form.Check
                key={facility}
                type="checkbox"
                label={facility}
                value={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={handleFacilityCheckboxChange}
              />
            ))}
            </Col>
            <Col sm={12} md={6} lg={5}>
            <Form.Label className="form-label">Fasilitas Umum</Form.Label>
            {availableCommonFacilities.map((facility) => (
              <Form.Check
                key={facility}
                type="checkbox"
                label={facility}
                value={facility}
                checked={selectedCommonFacilities.includes(facility)}
                onChange={handleCommonFacilityCheckboxChange}
              />
            ))}
            </Col>
          </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFacilitiesModal}>
            Tutup
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
      <Footer2 />
    </div>
  );
};

export default ListKost;
