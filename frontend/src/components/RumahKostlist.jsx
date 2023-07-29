import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const RumahKostlist = () => {
  const [kosts, setKosts] = useState([]);
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    getKosts();
  }, []);

  const getKosts = async () => {
    const response = await axios.get("http://localhost:5000/rumah-kost");
    setKosts(response.data);
  };

  const deleteKost = async (kostId) => {
    await axios.delete(`http://localhost:5000/rumah-kost/${kostId}`);
    getKosts();
  };
  const handleDeleteClick = (kostId) => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus kost ini?');
    if (isConfirmed) {
      deleteKost(kostId);
    }
  };
  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return "Invalid Number";
    }
    return numberValue.toLocaleString("id-ID");
  };
  return (
    <div>
      <h1 className="title">Rumah Kost</h1>
      <h2 className="subtitle">List of Rumah Kost</h2>
      <Link to="/rumah-kost/add" className="btn btn-primary mb-3">
        Tambah Kost
      </Link>
      <div className="">
        <Table responsive className="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kost</th>
              <th>Harga</th>
              {user && user.role === "admin" &&(
              <th>Nama Pemilik</th>
              )}
              <th>No WA</th>
              <th>Alamat</th>
              <th>Jenis Kost</th>
              <th>Fasilitas</th>
              <th>Peraturan</th>
              <th>Catatan Tambahan</th>
              {/* <th>Foto Kost</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kosts.map((kost, index) => (
              <tr key={kosts.uuid}>
                <td>{index + 1}</td>
                <td>{kost.nama}</td>
                <td>{formatCurrency(kost.harga)}</td>
                {user && user.role === "admin" &&(
                <td>{kost.user.name}</td>
                )}
                <td>{kost.no_hp}</td>
                <td>{kost.desa} {kost.alamat}</td>
                <td>{kost.jk}</td>
                <td>
                  {kost.fasilitas.map((fasilitas, index) => (
                    <span key={index}>{fasilitas.nama_f}</span>
                  ))}
                </td>
                <td>
                  {kost.peraturans.map((peraturans, index) => (
                    <span key={index}>{peraturans.peraturan}</span>
                  ))}
                </td>
                <td>{kost.catatan_tambahan}</td>
                {/* <td>{kost.foto_kost}</td> */}
                <td>
                  <Link
                    to={`/rumah-kost/edit/${kost.uuid}`}
                    className="btn btn-warning mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(kost.uuid)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RumahKostlist;
