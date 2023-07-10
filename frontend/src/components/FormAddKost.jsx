import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
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
  const [f_kamar, setF_kamar] = useState([]);
  const [peraturan_kost, setPeraturan_kost] = useState([]);
  const [catatan_tambahan, setCatatan_tambahan] = useState("");
  const [kordinat, setKordinat] = useState("");
  const [foto_kost, setFoto_kost] = useState("");
  const [previews, setPreviews] = useState("");
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
    formData.append("f_kamar", f_kamar);
    formData.append("peraturan_kost", peraturan_kost);
    formData.append("catatan_tambahan", catatan_tambahan);
    formData.append("foto_kost", foto_kost);
    formData.append("kordinat", kordinat);
    try {
      await axios.post("http://localhost:5000/rumah-kost", formData, {
        headers: {
          "Content-Type": "application/json",
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
      setF_kamar([...f_kamar, value]);
    } else {
      setF_kamar(f_kamar.filter((item) => item !== value));
    }
  };

  const handleCheckboxChangePeraturan = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPeraturan_kost([...peraturan_kost, value]);
    } else {
      setPeraturan_kost(peraturan_kost.filter((item) => item !== value));
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto_kost(image);
    setPreviews(URL.createObjectURL(image));
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
                    checked={f_kamar.includes("Lemari")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Kasur"
                    value="Kasur"
                    className="checkbox-item"
                    checked={f_kamar.includes("Kasur")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Bantal"
                    value="Bantal"
                    className="checkbox-item"
                    checked={f_kamar.includes("Bantal")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Kamar Mandi di Dalam"
                    value="Kamar Mandi di Dalam"
                    className="checkbox-item"
                    checked={f_kamar.includes("Kamar Mandi di Dalam")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Meja"
                    value="Meja"
                    className="checkbox-item"
                    checked={f_kamar.includes("Meja")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Kipas Angin"
                    value="Kipas Angin"
                    className="checkbox-item"
                    checked={f_kamar.includes("Kipas Angin")}
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
                    checked={f_kamar.includes("CCTV")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Jendela Bertrali"
                    value="Jendela Bertrali"
                    className="checkbox-item"
                    checked={f_kamar.includes("Jendela Bertrali")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Pagar"
                    value="Pagar"
                    checked={f_kamar.includes("Pagar")}
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
                    checked={f_kamar.includes("Pengurus Kost")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Wifi"
                    value="Wifi"
                    className="checkbox-item"
                    checked={f_kamar.includes("Wifi")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Jemuran"
                    value="Jemuran"
                    checked={f_kamar.includes("Jemuran")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Parkir Motor"
                    value="Parkir Motor"
                    checked={f_kamar.includes("Parkir Motor")}
                    onChange={handleCheckboxChangeFasilitas}
                  />
                  <Form.Check
                    inline
                    label="Dapur"
                    value="Dapur"
                    checked={f_kamar.includes("Dapur")}
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
                    checked={peraturan_kost.includes("Khusus Mahasiswa")}
                    onChange={handleCheckboxChangePeraturan}
                  />
                  <Form.Check
                    inline
                    label="Pasutri"
                    value="Pasutri"
                    className="checkbox-item"
                    checked={peraturan_kost.includes("Pasutri")}
                    onChange={handleCheckboxChangePeraturan}
                  />
                  <Form.Check
                    inline
                    label="Jam Malam"
                    value="Jam Malam"
                    className="checkbox-item"
                    checked={peraturan_kost.includes("Jam Malam")}
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

              {/* Foto Kost */}
              {/* <div className="field">
                <label className="label">Foto Kost</label>
                <div className="control">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={loadImage}
                   
                  />
                </div>
              </div> */}

              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={loadImage}
                      />
                </div>
              </div>
              {previews ? (
                <figure className="image is-128x128">
                  <img src={previews} alt="Preview Image" />
                </figure>
              ) : (
                ""
              )}

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
