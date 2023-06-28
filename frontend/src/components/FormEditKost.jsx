import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

const FormEditKost = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [desa, setDesa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [f_kamar, setF_kamar] = useState([]);
  const [peraturan_kost, setPeraturan_kost] = useState([]);
  const [catatan_tambahan, setCatatan_tambahan] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [msg, setMsg] = useState("");
  const [foto_kost, setFoto_kost] = useState("");
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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
        setF_kamar(response.data.f_kamar);
        setPeraturan_kost(response.data.peraturan_kost);
        setCatatan_tambahan(response.data.catatan_tambahan);
        setLongitude(response.data.longitude);
        setLatitude(response.data.latitude);
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setFoto_kost(file);
  //   setPreview(URL.createObjectURL(file));
  // };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const foto_kost = [];
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        foto_kost.push(file);
        previews.push(reader.result);
        setFoto_kost(foto_kost);
        setPreviews(previews);
      };

      reader.readAsDataURL(file);
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
                <Form.Select onChange={(e) => setDesa(e.target.value)} value={desa}>
                  <option hidden>Pilih desa</option>
                  <option >Sungai Alam</option>
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

              {/* <div className="field mb-4">
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
              </div> */}

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

              {/* <div className="field mb-4">
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
              </div> */}

              <div className="field">
                <label className="label">Foto Kost</label>
                <div className="control">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Preview Foto</label>
                <div className="control">
                  <div className="columns is-multiline">
                    {previews.map((preview, index) => (
                      <div key={index} className="column is-one-third">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="preview"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="field mb-4">
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
              <div className="field mb-4">
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
                <div className="field mb-4">
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
