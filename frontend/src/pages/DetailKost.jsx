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
import Kolase from "./../image/rumah.jpg";
import Footer2 from "../components/Footer2";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, map } from "leaflet";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, getMe } from "../features/authSlice";

const DetailKost = () => {
  const [detailKost, setDetailKost] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [desa, setDesa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [f_kamar, setF_kamar] = useState([]);
  const [peraturan_kost, setPeraturan_kost] = useState([]);
  const [catatan_tambahan, setCatatan_tambahan] = useState("");
  const [foto_kost, setFoto_kost] = useState("");
  const [previews, setPreviews] = useState([]);
  const [msg, setMsg] = useState("");
  const [kordinat, setKordinat] = useState("");
  let [latitude, longitude] = kordinat ? kordinat.split(",") : [0, 0];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {user} = useSelector((state) => state.auth)
  const petaPosition = [1.4583828821304539, 102.15096143773447];
  const markers = [
    {
      geocode: [latitude, longitude],
      popUp: "Ini Detail Kost Hijau",
      toolTip: "Kost Hijau, klik untuk detail kost",
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

  // tampilkan data form edit sesuai record database
  useEffect(() => {
    const getKostById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/rumah-kost-view/${id}`
        );
        setNama(response.data.nama);
        setHarga(response.data.harga);
        setNo_hp(response.data.no_hp);
        setDesa(response.data.desa);
        setAlamat(response.data.alamat);
        setJk(response.data.jk);
        setF_kamar(response.data.f_kamar);
        setPeraturan_kost(response.data.peraturan_kost);
        setCatatan_tambahan(response.data.catatan_tambahan);
        setFoto_kost(response.data.foto_kost);
        setKordinat(response.data.kordinat);
        console.log(kordinat)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getKostById();
  }, [id]);


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
      <Container className="pt-3">
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
                  <strong>{nama}</strong>
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
                      <Row>
                        <Col xs={6}>
                          {f_kamar
                            .slice(0, Math.ceil(f_kamar.length / 2))
                            .map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                        </Col>
                        <Col xs={6}>
                          {f_kamar
                            .slice(Math.ceil(f_kamar.length / 2))
                            .map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <p></p>
                    </Col>
                  </Row>
                  <hr />
                </div>
                <div className="mt-5 mt-5">
                  <h3>
                    <strong>Peraturan khusus tipe kamar ini</strong>
                  </h3>
                  <p>
                  <Row>
                        <Col xs={3}>
                          {peraturan_kost
                            .slice(0, Math.ceil(peraturan_kost.length / 2))
                            .map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                        </Col>
                        <Col xs={3}>
                          {peraturan_kost
                            .slice(Math.ceil(peraturan_kost.length / 2))
                            .map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                        </Col>
                      </Row>
                  </p>
                  <hr />
                </div>
                <div className="mt-5 mt-5">
                  <h3>
                    <strong>Catatan Tambahan</strong>
                  </h3>
                  <p>
                    {catatan_tambahan}
                  </p>
                  <hr />
                </div>
                <div className="mt-5 mt-5">
                  <h3>
                    <strong>Fasilitas Umum</strong>
                  </h3>
                  <p>
                    Kost ini terdiri dari 3 lantai. Tipe kamar A berada di
                    lantai 3. Semua kamar di tipe ini memiliki jendela yang
                    menghadap secara langsung ke arah koridor.
                  </p>
                  <hr />
                </div>
                <div className="mt-5 mt-5">
                  <h3>
                    <strong>Fasilitas Keamanan</strong>
                  </h3>
                  <p>
                    Kost ini terdiri dari 3 lantai. Tipe kamar A berada di
                    lantai 3. Semua kamar di tipe ini memiliki jendela yang
                    menghadap secara langsung ke arah koridor.
                  </p>
                  <hr />
                </div>
                <div className="mt-5 mt-5">
                  <h3>
                    <strong>Lokasi dan Lingkungan Sekitar</strong>
                  </h3>
                  <MapContainer
                    style={{ height: "400px", width: "100%" }}
                    center={petaPosition}
                    zoom={15}
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
                  <strong>{harga}</strong> / bulan
                </h4>
                {user == null?(
                  <Button onClick={loginDulu} variant="success">Ajukan Sewa</Button>
                  ):(
                  <Button onClick={ajukanSewa} variant="success">Ajukan Sewa</Button>
                )}
              </Card>
            </Col>
          </Row>
        </>
      </Container>
      <Footer2 />
    </div>
  );
};

export default DetailKost;
