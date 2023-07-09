import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";

const BiodataPenyewa = () => {
  const [bios, setBios] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    getBio();
  }, []);

  const getBio = async () => {
    const response = await axios.get("http://localhost:5000/biodata-penyewa");
    setBios(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <Layout>
      <div className="mt-3">
        <h1 className="title">Biodata Penyewa</h1>
        <h2 className="subtitle">List of Biodata</h2>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Umur</th>
              <th>No WA</th>
              <th>Asal Daerah</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bios.map((bio, index) => (
              <tr key={bio.uuid}>
                <td>{index + 1}</td>
                <td>{bio.nama}</td>
                <td>{bio.jk}</td>
                <td>{bio.umur}</td>
                <td>{bio.NoWA}</td>
                <td>{bio.asal}</td>
                <td>
                  <Link
                    to={`/users/edit/${bio.uuid}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(bio.uuid)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BiodataPenyewa;
