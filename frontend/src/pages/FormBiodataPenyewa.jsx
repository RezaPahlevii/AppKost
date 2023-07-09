import React from 'react'
import { Container } from 'react-bootstrap'
import Nav2 from '../components/Nav2'
import Footer2 from '../components/Footer2'

const FormBiodataPenyewa = () => {
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
                    <form>
                      <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Jenis Kelamin</label>
                        <div className="control">
                          <div className="select is-fullwidth">
                            <select
                              defaultValue="Laki-laki"
                            >
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
                            placeholder="25 Tahun"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">No HP</label>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
                            placeholder="Nomor Handphone"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">No WA</label>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
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
                            placeholder="nama daerah anda berasal "
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                              <button
                                type="submit"
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