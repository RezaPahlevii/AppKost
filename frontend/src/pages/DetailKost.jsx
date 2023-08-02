import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Figure,
  Row,
} from "react-bootstrap";
import Nav2 from "../components/Nav2";
import Footer2 from "../components/Footer2";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon } from "leaflet";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { SlLocationPin } from "react-icons/sl";
import { TbWindow } from "react-icons/tb";
import { LuClock9 } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { GiPillow, GiLovers, GiCctvCamera } from "react-icons/gi";
import { SiAirtable } from "react-icons/si";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import {
  MdOutlineNotInterested,
  MdOutlineLocalLaundryService,
} from "react-icons/md";
import { FaWifi, FaTv, FaUtensils, FaWindowClose } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { reset, getMe } from "../features/authSlice";
import PageNotFound from "../image/404 home.webp";
import "../css/detailKost.css";

const DetailKost = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [foto1, setFoto1] = useState("");
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");
  const [foto4, setFoto4] = useState("");
  const [kost, setKost] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
    dispatch(getMe());
  }, [dispatch]);

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
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f2f2f2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            style={{ maxWidth: "300px", height: "auto" }}
            src={PageNotFound}
            alt="Page Not Found"
          />
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Oops! Halaman Tidak Di Temukan
          </div>
          <div
            style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}
          >
            <p></p>
            Halaman yang Anda cari mungkin telah dihapus atau untuk sementara
            tidak tersedia.
          </div>
          <a
            style={{ color: "#007bff", textDecoration: "none" }}
            href="/kost-list"
          >
            Go back
          </a>
        </div>
      </div>
    );
  }

  const {
    nama,
    harga,
    no_hp,
    desa,
    alamat,
    jk,
    fasilitas,
    fasilitas_umums,
    fasilitas_keamanans,
    peraturans,
    catatan_tambahan,
  } = kost;

  const renderIcon = (namaFasilitas) => {
  };

  const loginDulu = () => {
    dispatch(getMe());
    dispatch(reset());
    window.open("/login", "_blank");
  };

  const ajukanSewa = () => {
    const noWa = no_hp.replace(/^0/, "+62");
    window.open(`https://wa.me/${noWa}`, "_blank");
  };

  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return "Invalid Number";
    }
    return numberValue.toLocaleString("id-ID");
  };
  const bigMaps = () => {
    navigate("/maps");
  };
  return (
    <div>
      <Nav2 />
      <Container className="pt-4" style={{ maxWidth: "1100px" }}>
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
              <p
                onClick={bigMaps}
                style={{
                  cursor: "pointer",
                }}
              >
                <SlLocationPin className="mr-2" />
                {alamat}, Desa {desa}
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
              <div className="mt-2">
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
              <div className="mt-2">
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
              <div className="mt-2">
                <h3>
                  <strong>Catatan Tambahan</strong>
                </h3>
                <p>{catatan_tambahan}</p>
                <hr />
              </div>
              <div className="mt-2">
                <h3>
                  <strong>Fasilitas Umum</strong>
                </h3>
                <Row>
                  <Col xs={6}>
                    {fasilitas_umums
                      .slice(0, Math.ceil(fasilitas_umums.length / 2))
                      .map((item) => (
                        <div key={item.f_umum} className="fasilitas-item">
                          <div className="icon">{renderIcon(item.f_umum)}</div>
                          <div className="text">{item.f_umum}</div>
                        </div>
                      ))}
                  </Col>
                  <Col xs={6}>
                    {fasilitas_umums
                      .slice(Math.ceil(fasilitas_umums.length / 2))
                      .map((item) => (
                        <div key={item.f_umum} className="fasilitas-item">
                          {renderIcon(item.f_umum)}
                          {item.f_umum}
                        </div>
                      ))}
                  </Col>
                </Row>
                <hr />
              </div>
              <div className="mt-2">
                <h3>
                  <strong>Fasilitas Keamanan</strong>
                </h3>
                <Row>
                  {fasilitas_keamanans.map((item) => (
                    <div key={item.f_keamanan} className="fasilitas-item">
                      {renderIcon(item.f_keamanan)}
                      {item.f_keamanan}
                    </div>
                  ))}
                </Row>
                <hr />
              </div>
              <div className="mt-2">
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
                <strong>{formatCurrency(kost.harga)}</strong> / bulan
              </h4>
              {user == null ? (
                <Button onClick={loginDulu} variant="success">
                  Hubungi Pemilik
                </Button>
              ) : (
                <Button onClick={ajukanSewa} variant="success">
                  Hubungi Pemilik
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
