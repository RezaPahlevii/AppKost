import React, { useState } from "react";
import Layout from "./Layout";

const EditProfilPemilik = () => {
  const [isEditing, setIsEditing] = useState(true); // State untuk menandai apakah sedang dalam mode editing

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Logika untuk menyimpan data profil pemilik kost
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <h3 className="title text-center">Profil Pemilik Kost</h3>
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
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Jenis Kelamin</label>
                        <div className="control">
                          <div className="select is-fullwidth">
                            <select
                              disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">
                          Alamat Rumah Sekarang
                        </label>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
                            placeholder="Alamat rumah yang anda tempati sekarang "
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          {!isEditing ? (
                            <button
                              type="button"
                              className="button is-success"
                              onClick={handleEditClick}
                            >
                              Ubah
                            </button>
                          ) : (
                            <>
                              <button
                                type="submit"
                                className="button is-success"
                                onClick={handleSaveClick}
                              >
                                Simpan
                              </button>
                              <button
                                type="button"
                                className="button is-warning"
                                onClick={() => setIsEditing(false)}
                              >
                                Batal
                              </button>
                            </>
                          )}
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
    </Layout>
  );
};

export default EditProfilPemilik;
