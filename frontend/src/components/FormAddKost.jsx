import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import "../css/checkboxFormAddKost.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const FormAddKost = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [desa, setDesa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [nama_f, setNama_f] = useState("");
  const [peraturan, setPeraturan] = useState("");
  const [catatan_tambahan, setCatatan_tambahan] = useState("");
  const [kordinat, setKordinat] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [preview4, setPreview4] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [markerPosition, setMarkerPosition] = useState([
    1.4585110731407618, 102.15337262025002,
  ]);

  const saveKost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("no_hp", no_hp);
    formData.append("desa", desa);
    formData.append("alamat", alamat);
    formData.append("jk", jk);
    formData.append("nama_f", nama_f);
    formData.append("peraturan", peraturan);
    formData.append("catatan_tambahan", catatan_tambahan);
    formData.append("url1", url1);
    formData.append("url2", url2);
    formData.append("url3", url3);
    formData.append("url4", url4);
    formData.append("kordinat", kordinat);
    try {
      await axios.post("http://localhost:5000/rumah-kost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  const loadImage1 = (e) => {
    const image1 = e.target.files[0];
    setUrl1(image1);
    setPreview1(URL.createObjectURL(image1));
  };
  const loadImage2 = (e) => {
    const image2 = e.target.files[0];
    setUrl2(image2);
    setPreview2(URL.createObjectURL(image2));
  };
  const loadImage3 = (e) => {
    const image3 = e.target.files[0];
    setUrl3(image3);
    setPreview3(URL.createObjectURL(image3));
  };
  const loadImage4 = (e) => {
    const image4 = e.target.files[0];
    setUrl4(image4);
    setPreview4(URL.createObjectURL(image4));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Lakukan tindakan pengiriman formulir
  // };

  const position = [1.4583828821304539, 102.15096143773447];

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
      <h2 className="subtitle">Add New Kost</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveKost}>
              <p className="has-text-centered">{msg}</p>

              {/* Nama Kost */}
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

              {/* Harga Kost */}
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

              {/* No WA */}
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

              {/* Desa */}
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

              {/* Alamat */}
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

              {/* gender kost */}
              <div className="field mb-4">
                <label className="label">Jenis Kost</label>
                <Form.Select onChange={(e) => setJk(e.target.value)} value={jk}>
                  <option hidden>Pilih Jenis Kost</option>
                  <option>Putra</option>
                  <option>Putri</option>
                  <option>Campur</option>
                </Form.Select>
              </div>

              {/* Fasilitas Kamar */}
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

              {/* Fasilitas Keamanan */}
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

              {/* Fasilitas Umum */}
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

              {/* Peraturan Kost*/}
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

              {/* Catatan Tambahan*/}
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
                <label className="label">Foto Kost</label>
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
                          onChange={loadImage1}
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
                          onChange={loadImage2}
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
                          onChange={loadImage3}
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
                          onChange={loadImage4}
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

              {/* Kordinat */}
              <div className="field mb-4">
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

              <div className="pt-3">
                <MapContainer
                  style={{ height: "500px", width: "100%" }}
                  center={position}
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
                    <Marker
                      position={markerPosition}
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
                  </MarkerClusterGroup>
                </MapContainer>
              </div>

              <form>
                <div className="field mb-4 mt-3">
                  <div className="control">
                    <button
                      type="submit"
                      onClick={saveKost}
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

export default FormAddKost;
