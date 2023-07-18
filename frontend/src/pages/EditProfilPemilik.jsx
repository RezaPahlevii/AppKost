import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { getMe } from "../features/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";

const FormBiodataPenyewa = () => {
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [jk, setJK] = useState("");
  const [umur, setUmur] = useState("");
  const [NoWA, setNoWA] = useState("");
  const [asal, setAsal] = useState("");
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

  // Tampilkan data form edit sesuai record database
  useEffect(() => {
    const getBioUsersById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/biodata/${id}`
        );
        setNama(response.data.nama);
        setJK(response.data.jk);
        setUmur(response.data.umur);
        setNoWA(response.data.NoWA);
        setAsal(response.data.asal);
      } catch (error) {
        if (error.response) {
          setMsg("Silahkan lengkapi biodata anda!");
        }
      }
    };
    getBioUsersById();
  }, [id]);

  const saveBio = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/biodata", {
        nama: nama,
        jk: jk,
        umur: umur,
        NoWA: NoWA,
        asal: asal,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Layout>
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
      </Layout>
    </div>
  );
};

export default FormBiodataPenyewa;
