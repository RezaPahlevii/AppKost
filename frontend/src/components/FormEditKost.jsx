import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
// import "../css/maps.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const FormEditKost = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [desa, setDesa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [nama_f, setNama_f] = useState([]);
  const [peraturan, setPeraturan] = useState("");
  const [catatan_tambahan, setCatatan_tambahan] = useState("");
  const [kordinat, setKordinat] = useState("");
  let [latitude, longitude] = kordinat ? kordinat.split(",") : [0, 0];
  const [foto1, setFoto1] = useState("");
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");
  const [foto4, setFoto4] = useState("");
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [preview4, setPreview4] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [markerPosition, setMarkerPosition] = useState([
    1.4585110731407618, 102.15337262025002,
  ]);
  const markers = [
    {
      geocode: [latitude, longitude],
    },
  ];

  // tampilkan data form edit sesuai record database
  useEffect(() => {
    const getKostById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/rumah-kost/${id}`
        );
        setNama(response.data.nama);
        setHarga(response.data.harga);
        setNo_hp(response.data.no_hp);
        setDesa(response.data.desa);
        setAlamat(response.data.alamat);
        setJk(response.data.jk);
        setNama_f(response.data.fasilitas.map((item) => item.nama_f));
        setPeraturan(response.data.peraturans.map((item) => item.peraturan));
        setCatatan_tambahan(response.data.catatan_tambahan);
        setFoto1(response.data.foto1);
        setFoto2(response.data.foto2);
        setFoto3(response.data.foto3);
        setFoto4(response.data.foto4);
        setKordinat(response.data.kordinat);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getKostById();
  }, [id]);

  const updateKost = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/rumah-kost/${id}`, {
        nama: nama,
        harga: harga,
        no_hp: no_hp,
        desa: desa,
        alamat: alamat,
        jk: jk,
        nama_f: nama_f,
        peraturan: peraturan,
        catatan_tambahan: catatan_tambahan,
        foto1: foto1,
        foto2: foto2,
        foto3: foto3,
        foto4: foto4,
        kordinat: kordinat,
      });
      console.log(nama);
      navigate("/rumah-kost");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleCheckboxChangeFasilitas = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNama_f([...nama_f, value]);
    } else {
      setNama_f(nama_f.filter((item) => item !== value));
    }
  };

  const handleCheckboxChangePeraturan = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPeraturan([...peraturan, value]);
    } else {
      setPeraturan(peraturan.filter((item) => item !== value));
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setFoto_kost(file);
  //   setPreview(URL.createObjectURL(file));
  // };

  const changeFoto1 = (e) => {
    const files = Array.from(e.target.files);
    const foto1 = [];
    const preview1 = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        foto1.push(file);
        preview1.push(reader.result);
        setFoto1(foto1);
        setPreview1(preview1);
      };
      reader.readAsDataURL(file);
    });
  };
  const changeFoto2 = (e) => {
    const files = Array.from(e.target.files);
    const foto2 = [];
    const preview2 = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        foto2.push(file);
        preview2.push(reader.result);
        setFoto2(foto2);
        setPreview2(preview2);
      };
      reader.readAsDataURL(file);
    });
  };
  const changeFoto3 = (e) => {
    const files = Array.from(e.target.files);
    const foto3 = [];
    const preview3 = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        foto3.push(file);
        preview3.push(reader.result);
        setFoto3(foto1);
        setPreview3(preview1);
      };
      reader.readAsDataURL(file);
    });
  };
  const changeFoto4 = (e) => {
    const files = Array.from(e.target.files);
    const foto4 = [];
    const preview4 = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        foto4.push(file);
        preview4.push(reader.result);
        setFoto4(foto4);
        setPreview4(preview4);
      };
      reader.readAsDataURL(file);
    });
  };

  const petaPosition = [1.4583828821304539, 102.15096143773447];

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
    <div>
      <h1 className="title">Rumah Kost</h1>
      <h2 className="subtitle">Update Kost</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateKost}>
              <p className="has-text-centered">{msg}</p>

              <div className="field mb-4">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Kost"
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Harga</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Harga Sewa perbulan"
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Nomor Whatsapp</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={no_hp}
                    onChange={(e) => setNo_hp(e.target.value)}
                    placeholder="Nomor yang bisa dihubungi"
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Desa</label>
                <Form.Select
                  onChange={(e) => setDesa(e.target.value)}
                  value={desa}
                >
                  <option hidden>Pilih desa</option>
                  <option>Sungai Alam</option>
                  <option>Air Putih</option>
                </Form.Select>
              </div>

              <div className="field mb-4">
                <label className="label">Alamat</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Alamat detail rumah kost"
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Jenis Kost</label>
                <Form.Select onChange={(e) => setJk(e.target.value)} value={jk}>
                  <option hidden>Pilih Jenis Kost</option>
                  <option>Putra</option>
                  <option>Putri</option>
                  <option>Campur</option>
                </Form.Select>
              </div>
              <div className="field mb-4">
                <label className="label">Fasilitas Kamar</label>
                <div className="control ml-5 checkbox-container">
                  <Form.Check
                    inline
                    label="Lemari"
                    value="Lemari"
                    className="checkbox-item"
                    checked={nama_f.includes("Lemari")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Kasur"
                    value="Kasur"
                    className="checkbox-item"
                    checked={nama_f.includes("Kasur")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Bantal"
                    value="Bantal"
                    className="checkbox-item"
                    checked={nama_f.includes("Bantal")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Kamar Mandi di Dalam"
                    value="Kamar Mandi di Dalam"
                    className="checkbox-item"
                    checked={nama_f.includes("Kamar Mandi di Dalam")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Meja"
                    value="Meja"
                    className="checkbox-item"
                    checked={nama_f.includes("Meja")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Kipas Angin"
                    value="Kipas Angin"
                    className="checkbox-item"
                    checked={nama_f.includes("Kipas Angin")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Fasilitas Keamanan</label>
                <div className="control ml-5 checkbox-container">
                  <Form.Check
                    inline
                    label="CCTV"
                    value="CCTV"
                    className="checkbox-item"
                    checked={nama_f.includes("CCTV")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Jendela Bertrali"
                    value="Jendela Bertrali"
                    className="checkbox-item"
                    checked={nama_f.includes("Jendela Bertrali")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Pagar"
                    value="Pagar"
                    checked={nama_f.includes("Pagar")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Fasilitas Umum</label>
                <div className="control ml-5 checkbox-container">
                  <Form.Check
                    inline
                    label="Pengurus Kost"
                    value="Pengurus Kost"
                    className="checkbox-item"
                    checked={nama_f.includes("Pengurus Kost")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Wifi"
                    value="Wifi"
                    className="checkbox-item"
                    checked={nama_f.includes("Wifi")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Jemuran"
                    value="Jemuran"
                    checked={nama_f.includes("Jemuran")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Parkir Motor"
                    value="Parkir Motor"
                    checked={nama_f.includes("Parkir Motor")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Dapur"
                    value="Dapur"
                    checked={nama_f.includes("Dapur")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Peraturan Kost</label>
                <div className="control ml-5 checkbox-container">
                  <Form.Check
                    inline
                    label="Khusus Mahasiswa"
                    value="Khusus Mahasiswa"
                    className="checkbox-item"
                    checked={peraturan.includes("Khusus Mahasiswa")}
                    onChange={handleCheckboxChangePeraturan}
                  />
                  <Form.Check
                    inline
                    label="Pasutri"
                    value="Pasutri"
                    className="checkbox-item"
                    checked={peraturan.includes("Pasutri")}
                    onChange={handleCheckboxChangePeraturan}
                  />
                  <Form.Check
                    inline
                    label="Jam Malam"
                    value="Jam Malam"
                    className="checkbox-item"
                    checked={peraturan.includes("Jam Malam")}
                    onChange={handleCheckboxChangePeraturan}
                  />
                </div>
              </div>

              <div className="field mb-4">
                <label className="label">Catatan Tambahan</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={catatan_tambahan}
                    onChange={(e) => setCatatan_tambahan(e.target.value)}
                    placeholder="Catatan Tambahan"
                  ></textarea>
                </div>
              </div>

              <Row className="mb-3">
                <label className="label">Image</label>
                <Col>
                  {/* Foto Kost1 */}
                  <div className="field">
                    <div className="control">
                      <label htmlFor="fileInput1" className="file-label">
                        {" "}
                        {/* Gunakan id yang unik untuk setiap input */}
                        <input
                          id="fileInput1"
                          className="file-input"
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={changeFoto1}
                          style={{ display: "none" }}
                        />
                        <span className="file-cta">
                          <span className="file-label">Pilih Foto 1</span>
                        </span>
                      </label>
                      {preview1 && (
                        <figure>
                          <img
                            src={preview1}
                            alt="Preview Image"
                            style={{ maxWidth: "500px", maxHeight: "500px" }}
                          />
                        </figure>
                      )}
                    </div>
                  </div>
                </Col>
                <Col>
                  {/* Foto Kost2 */}
                  <div className="field">
                    <div className="control">
                      <label htmlFor="fileInput2" className="file-label">
                        {" "}
                        {/* Gunakan id yang unik untuk setiap input */}
                        <input
                          id="fileInput2"
                          className="file-input"
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={changeFoto2}
                          style={{ display: "none" }}
                        />
                        <span className="file-cta">
                          <span className="file-label">Pilih Foto 2</span>
                        </span>
                      </label>
                      {preview2 && (
                        <figure>
                          <img
                            src={preview2}
                            alt="Preview Image"
                            style={{ maxWidth: "500px", maxHeight: "500px" }}
                          />
                        </figure>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  {/* Foto Kost3 */}
                  <div className="field">
                    <div className="control">
                      <label htmlFor="fileInput3" className="file-label">
                        {" "}
                        {/* Gunakan id yang unik untuk setiap input */}
                        <input
                          id="fileInput3"
                          className="file-input"
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={changeFoto3}
                          style={{ display: "none" }}
                        />
                        <span className="file-cta">
                          <span className="file-label">Pilih Foto 3</span>
                        </span>
                      </label>
                      {preview3 && (
                        <figure>
                          <img
                            src={preview3}
                            alt="Preview Image"
                            style={{ maxWidth: "500px", maxHeight: "500px" }}
                          />
                        </figure>
                      )}
                    </div>
                  </div>
                </Col>
                <Col>
                  {/* Foto Kost4 */}
                  <div className="field">
                    <div className="control">
                      <label htmlFor="fileInput4" className="file-label">
                        {" "}
                        {/* Gunakan id yang unik untuk setiap input */}
                        <input
                          id="fileInput4"
                          className="file-input"
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={changeFoto4}
                          style={{ display: "none" }}
                        />
                        <span className="file-cta">
                          <span className="file-label">Pilih Foto 4</span>
                        </span>
                      </label>
                      {preview4 && (
                        <figure>
                          <img
                            src={preview4}
                            alt="Preview Image"
                            style={{ maxWidth: "500px", maxHeight: "500px" }}
                          />
                        </figure>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="field mt-5">
                <label className="label">Alamat Kordinat</label>
                <div className="control">
                  <input
                    readOnly
                    type="text"
                    className="input"
                    value={kordinat}
                    onChange={(e) => setKordinat(e.target.value)}
                    placeholder="Titik Kordinat"
                  />
                </div>
              </div>

              <div>
                <p className="text-danger">
                  (Cek kembali alamat rumah kost anda di peta, jika sudah benar
                  maka anda bisa save)
                </p>
                <MapContainer
                  style={{ height: "500px", width: "100%" }}
                  s
                  center={petaPosition}
                  zoom={17}
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
                    <Marker
                      position={marker.geocode}
                      icon={customIcon}
                      draggable
                      eventHandlers={{
                        dragend: (e) => {
                          const { lat, lng } = e.target.getLatLng();
                          setMarkerPosition([lat, lng]);
                          setKordinat(`${lat}, ${lng}`); // Memperbarui nilai input alamat koordinat
                        },
                      }}
                    ></Marker>
                    ))}
                  </MarkerClusterGroup>
                </MapContainer>
              </div>

              <form>
                <div className="field mt-4">
                  <div className="control">
                    <button
                      type="submit"
                      onClick={updateKost}
                      className="button is-success"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditKost;
