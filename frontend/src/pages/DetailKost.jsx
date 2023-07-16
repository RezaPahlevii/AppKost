import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Figure,
  Row,
  Tooltip,
} from "react-bootstrap";
import Nav2 from "../components/Nav2";
import Footer2 from "../components/Footer2";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon } from "leaflet";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaWifi, FaShower, FaTv, FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { reset, getMe } from "../features/authSlice";

const DetailKost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [foto1, setFoto1] = useState("");
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");
  const [foto4, setFoto4] = useState("");
  const [kost, setKost] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const petaPosition = [1.4583828821304539, 102.15096143773447];
  const markers = [
    {
      geocode: kost?.kordinat?.split(",").map(Number) || [],
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("../image/pinLokasi.png"),
    iconSize: [40, 40],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  };

  useEffect(() => {
    const getKostById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/rumah-kost/detail/${id}`
        );
        setFoto1(response.data.fotos[0]?.url1);
        setFoto2(response.data.fotos[0]?.url2);
        setFoto3(response.data.fotos[0]?.url3);
        setFoto4(response.data.fotos[0]?.url4);
        setKost(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getKostById();
  }, [id]);

  if (!kost) {
    return <div>Loading...</div>;
  }

  const {
    nama,
    harga,
    no_hp,
    desa,
    alamat,
    jk,
    fasilitas,
    peraturans,
    catatan_tambahan,
    fotos,
  } = kost;

  const renderIcon = (namaFasilitas) => {
    switch (namaFasilitas) {
      case "Kasur":
        return <FaBed />;
      case "WiFi":
        return <FaWifi />;
      case "Kipas Angin":
        return <FaWifi />;
      case "Pagar":
        return <FaWifi />;
      case "Parkir Motor":
        return <FaWifi />;
      case "Lemari":
        return <FaWifi />;
      case "Meja":
        return <FaWifi />;
      case "Pengurus Kost":
        return <FaShower />;
      case "Jemuran":
        return <FaShower />;
      case "Bantal":
        return <FaShower />;
      case "Kamar Mandi di Dalam":
        return <FaShower />;
      case "Jendela Bertrali":
        return <FaShower />;
      case "CCTV":
        return <FaShower />;
      case "TV":
        return <FaTv />;
      case "Dapur":
        return <FaUtensils />;
      case "Khusus Mahasiswa":
        return <FaUtensils />;
      case "Jam Malam":
        return <FaUtensils />;
      default:
        return null;
    }
  };

  const loginDulu = () => {
    dispatch(getMe());
    dispatch(reset());
    window.open("/login", "_blank");
  };
  
  const ajukanSewa =()=>{
    window.open('/form-biodata-penyewa', '_blank');
  }
  return (
    <div>
      <Nav2 />
      <Container className="pt-3" style={{ maxWidth: "1100px" }}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item
                style={{ textDecoration: "none" }}
                href="/kost-list"
              >
                List Kost
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Detail Kost</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col
            style={{ marginRight: "-15px", marginBottom: "-15px" }}
            xs={12}
            md={8}
          >
            <Figure>
              <Figure.Image alt="Foto 1" src={foto1} />
            </Figure>
          </Col>
          <Col xs={12} md={4}>
            <Row style={{ marginRight: "-15px", marginBottom: "-15px" }}>
              <Figure>
                <Figure.Image alt="Foto 2" src={foto2} />
              </Figure>
            </Row>
            <Row style={{ marginRight: "-15px", marginBottom: "-15px" }}>
              <Figure>
                <Figure.Image alt="Foto 3" src={foto3} />
                {/* <Button variant="primary" onClick={handleShow}>
                  Launch demo modal
                </Button> */}
              </Figure>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <div>
              <h3>
                <strong>{nama}</strong>
              </h3>
              <p>
                <Button className="mr-3" variant="outline-success">
                  Kost {jk}
                </Button>
                <FaLocationDot /> {alamat}, Desa {desa}
              </p>
              <div className="mt-5">
                <h3>
                  <strong>Spesifikasi tipe kamar</strong>
                </h3>
                <p>
                  2.7 x 2.2 meter <br />
                  Tidak termasuk listrik
                </p>
                <hr />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>Fasilitas kamar</strong>
                </h3>
                <Row>
                  <Col xs={6}>
                    {fasilitas
                      .slice(0, Math.ceil(fasilitas.length / 2))
                      .map((item) => (
                        <div key={item.nama_f} className="fasilitas-item">
                          <div className="icon">{renderIcon(item.nama_f)}</div>
                          <div className="text">{item.nama_f}</div>
                        </div>
                      ))}
                  </Col>
                  <Col xs={6}>
                    {fasilitas
                      .slice(Math.ceil(fasilitas.length / 2))
                      .map((item) => (
                        <div key={item.nama_f} className="fasilitas-item">
                          {renderIcon(item.nama_f)}
                          {item.nama_f}
                        </div>
                      ))}
                  </Col>
                  <style jsx>{`
                    .fasilitas-item {
                      display: flex;
                      align-items: center;
                      margin-bottom: 10px;
                      gap: 10px;
                    }
                  `}</style>
                </Row>
                <hr />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>Peraturan kost</strong>
                </h3>
                <Row>
                  {peraturans.map((item) => (
                    <div key={item.peraturan} className="fasilitas-item">
                      {renderIcon(item.peraturan)}
                      {item.peraturan}
                    </div>
                  ))}
                </Row>
                <hr />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>Catatan Tambahan</strong>
                </h3>
                <p>{catatan_tambahan}</p>
                <hr />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>Fasilitas Umum</strong>
                </h3>
                <Row>
                  <Col xs={6}>
                    {fasilitas
                      .slice(0, Math.ceil(fasilitas.length / 2))
                      .map((item) => (
                        <div key={item.nama_f} className="fasilitas-item">
                          <div className="icon">{renderIcon(item.nama_f)}</div>
                          <div className="text">{item.nama_f}</div>
                        </div>
                      ))}
                  </Col>
                  <Col xs={6}>
                    {fasilitas
                      .slice(Math.ceil(fasilitas.length / 2))
                      .map((item) => (
                        <div key={item.nama_f} className="fasilitas-item">
                          {renderIcon(item.nama_f)}
                          {item.nama_f}
                        </div>
                      ))}
                  </Col>
                </Row>
                <hr />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>Fasilitas Keamanan</strong>
                </h3>
                <Row>
                  <Col xs={6}>
                    {fasilitas
                      .slice(0, Math.ceil(fasilitas.length / 2))
                      .map((item) => (
                        <div key={item.nama_f} className="fasilitas-item">
                          <div className="icon">{renderIcon(item.nama_f)}</div>
                          <div className="text">{item.nama_f}</div>
                        </div>
                      ))}
                  </Col>
                  <Col xs={6}>
                    {fasilitas
                      .slice(Math.ceil(fasilitas.length / 2))
                      .map((item) => (
                        <div key={item.nama_f} className="fasilitas-item">
                          {renderIcon(item.nama_f)}
                          {item.nama_f}
                        </div>
                      ))}
                  </Col>
                </Row>
                <hr />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>Lokasi dan Lingkungan Sekitar</strong>
                </h3>
                <MapContainer
                  style={{ height: "400px", width: "100%" }}
                  center={petaPosition}
                  zoom={16}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustomClusterIcon}
                  >
                    {markers.map((marker, index) => (
                      <Marker
                        key={index}
                        position={marker.geocode}
                        icon={customIcon}
                      ></Marker>
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
                <strong>{harga}</strong> / bulan
              </h4>
              <p>No. HP: {no_hp}</p>
              {user == null ? (
                <Button onClick={loginDulu} variant="success">
                  Ajukan Sewa
                </Button>
              ) : (
                <Button onClick={ajukanSewa} variant="success">
                  Ajukan Sewa
                </Button>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer2 />
    </div>
  );
};

export default DetailKost;
