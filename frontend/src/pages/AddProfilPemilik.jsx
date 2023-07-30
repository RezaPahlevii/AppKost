import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { getMe } from "../features/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Nav2 from "../components/Nav2";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar2";

const FormBiodataPenyewa = () => {
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [file, setFile] = useState("");
  const [jk, setJK] = useState("");
  const [umur, setUmur] = useState("");
  const [NoWA, setNoWA] = useState("");
  const [asal, setAsal] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveBio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    formData.append("jk", jk);
    formData.append("umur", umur);
    formData.append("NoWA", NoWA);
    formData.append("asal", asal);
    try {
      await axios.post("http://localhost:5000/biodata", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="custom-container">
        <Nav2 />
        <Sidebar />
        <div className="mainContent">
          <Container className="pt-3">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-centered">
                  <div className="column is-8">
                    <h3 className="title text-center">Biodata</h3>
                    <div className="card is-shadowless">
                      <div className="card-content">
                        <div className="content">
                          <form onSubmit={saveBio}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                              <label className="label">Image</label>
                              <div className="control">
                                <div className="file">
                                  <label className="file-label">
                                    <input
                                      type="file"
                                      className="file-input"
                                      onChange={loadImage}
                                    />
                                    <span className="file-cta">
                                      <span className="file-label">
                                        Choose a file...
                                      </span>
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
                              <label className="label">Nama</label>
                              <div className="control">
                                <input
                                  type="text"
                                  className="input"
                                  value={nama}
                                  onChange={(e) => setNama(e.target.value)}
                                  placeholder="Nama"
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Jenis Kelamin</label>
                              <div className="control">
                                <div className="select is-fullwidth">
                                  <select
                                    value={jk}
                                    onChange={(e) => setJK(e.target.value)}
                                  >
                                    <option hidden>Jenis Kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Umur</label>
                              <div className="control">
                                <input
                                  type="text"
                                  className="input"
                                  value={umur}
                                  onChange={(e) => setUmur(e.target.value)}
                                  placeholder="25 Tahun"
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">No WA</label>
                              <div className="control">
                                <input
                                  type="text"
                                  className="input"
                                  value={NoWA}
                                  onChange={(e) => setNoWA(e.target.value)}
                                  placeholder="Nomor Whatsapp"
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Asal Daerah</label>
                              <div className="control">
                                <input
                                  type="text"
                                  className="input"
                                  value={asal}
                                  onChange={(e) => setAsal(e.target.value)}
                                  placeholder="nama daerah anda berasal "
                                />
                              </div>
                            </div>
                            <div className="field">
                              <div className="control">
                                <button
                                  type="submit"
                                  onClick={saveBio}
                                  className="button is-success"
                                >
                                  Simpan
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FormBiodataPenyewa;
