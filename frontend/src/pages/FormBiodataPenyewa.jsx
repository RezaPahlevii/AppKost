import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Nav2 from '../components/Nav2';
import Footer2 from '../components/Footer2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormBiodataPenyewa = () => {
  const [nama, setNama] = useState("");
  const [jk, setJK] = useState("");
  const [umur, setUmur] = useState("");
  const [NoWA, setNoWA] = useState("");
  const [asal, setAsal] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveBio = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/biodata-penyewa", {
        nama: nama,
        jk: jk,
        umur: umur,
        NoWA: NoWA,
        asal: asal
      });
      navigate("/biodata-penyewa");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  
  return (
    <div>
      <Nav2 />
      <Container className="pt-3">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <h3 className="title text-center">Biodata Penyewa</h3>
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
                            <select value={jk} onChange={(e) => setJK(e.target.value)}
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
                        <label className="label">
                         Asal Daerah
                        </label>
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
      <Footer2 />
    </div>
  )
}

export default FormBiodataPenyewa