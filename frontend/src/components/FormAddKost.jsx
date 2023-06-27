import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const FormAddKost = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [desa, setDesa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [f_kamar, setF_kamar] = useState([]);
  const [peraturan_kost, setPeraturan_kost] = useState("");
  const [catatan_tambahan, setCatatan_tambahan] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [msg, setMsg] = useState("");
  const [foto_kost, setFoto_kost] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  // const loadImage = (e) => {
  //   const image = e.target.fotos[0];
  //   setFoto_kost(image);
  //   setPreview(URL.createObjectURL(image));
  // };

  const saveKost = async (e) => {
    e.preventDefault();
    // const saveFoto = new SaveFoto();
    // saveFoto.append("foto_kost", foto_kost)
    try {
      await axios.post("http://localhost:5000/rumah-kost", {
        nama: nama,
        harga: harga,
        no_hp: no_hp,
        desa: desa,
        alamat: alamat,
        jk: jk,
        f_kamar: f_kamar,
        peraturan_kost: peraturan_kost,
        catatan_tambahan: catatan_tambahan,
        foto_kost: foto_kost,
        longitude: longitude,
        latitude: latitude,
      });
      navigate("/rumah-kost");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setF_kamar([...f_kamar, value]);
    } else {
      setF_kamar(f_kamar.filter(item => item !== value));
    }
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

              <div className="field">
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

              <div className="field">
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
              <div className="field">
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
              <div className="field">
                <label className="label">Desa</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={desa}
                    onChange={(e) => setDesa(e.target.value)}
                    placeholder="Desa rumah kost"
                  />
                </div>
              </div>
              <div className="field">
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
              <div className="field">
                <label className="label">Jenis Kost</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={jk}
                    onChange={(e) => setJk(e.target.value)}
                    placeholder="Putra/Putri/Campur"
                  />
                </div>
              </div>

              {/* <div className="field">
                <label className="label">Fasilitas Kamar</label>
                <div className="inputs">
                  <input
                    type="checkbox"
                    value={f_kamar}
                    onChange={(e) => setF_kamar(e.target.value)}
                  />{" "}
                  Lemari
                  <input
                    type="checkbox"
                    value={f_kamar}
                    onChange={(e) => setF_kamar(e.target.value)}
                  />{" "}
                  Kipas
                  <input
                    type="checkbox"
                    value={f_kamar}
                    onChange={(e) => setF_kamar(e.target.value)}
                  />{" "}
                  Kasur
                  <input
                    type="checkbox"
                    value={f_kamar}
                    onChange={(e) => setF_kamar(e.target.value)}
                  />{" "}
                  Meja
                  <input
                    type="checkbox"
                    value="AC"
                    label="AC"
                    onChange={(e) => setF_kamar(e.target.value)}
                  />
                </div>
              </div> */}

              <div className="field">
                <label className="label">Fasilitas Kamar</label>
                <div className="control">
                  <label>
                    <input
                      type="checkbox"
                      value="AC"
                      checked={f_kamar.includes("AC")}
                      onChange={handleCheckboxChange}
                    />
                    AC
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="TV"
                      checked={f_kamar.includes("TV")}
                      onChange={handleCheckboxChange}
                    />
                    TV
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Kulkas"
                      checked={f_kamar.includes("Kulkas")}
                      onChange={handleCheckboxChange}
                    />
                    Kulkas
                  </label>
                </div>
              </div>

              <div className="field">
                <label className="label">Peraturan Kost</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={peraturan_kost}
                    onChange={(e) => setPeraturan_kost(e.target.value)}
                    placeholder="Peraturan kost"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Catatan Tambahan</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={catatan_tambahan}
                    onChange={(e) => setCatatan_tambahan(e.target.value)}
                    placeholder="Catatan tambahan"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Foto Kost</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        value={foto_kost}
                        onChange={(e) => setFoto_kost(e.target.value)}
                      />
                      <span className="file-cta">
                        <span className="file-label">pilih foto kost...</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              ) : (
                ""
              )}

              <div className="field">
                <label className="label">Longitude</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Latitude</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                  />
                </div>
              </div>

              <form>
                <div className="field">
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
