import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";

const RumahKostlist = () => {
  const [kosts, setKosts] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus kost ini?"
    );
    if (isConfirmed) {
      deleteKost(kostId);
    }
  };
  const editKost = async (kostId) => {
    navigate(`/rumah-kost/edit/${kostId}`);
  }
  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return "Invalid Number";
    }
    return numberValue.toLocaleString("id-ID");
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Daftar Pengguna</title>");
    printWindow.document.write(
      '<link rel="stylesheet" href="/path/to/print.css" type="text/css" media="print">'
    );
    printWindow.document.write("<style>");
    printWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      h1.title {
        text-align: center;
      }
      h2.subtitle {
        margin-bottom: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      /* Gaya CSS untuk menyembunyikan tombol aksi saat mencetak */
      .action-buttons {
        display: none;
      }
    `);
    printWindow.document.write("</style>");
    printWindow.document.write("</head><body>");
    printWindow.document.write('<h1 class="title">Bengkalis Kost</h1>');
    printWindow.document.write('<h2 class="subtitle">Daftar Kost</h2>');
    printWindow.document.write(tableRef.current.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div>
      <h1 className="title">Rumah Kost</h1>
      <h2 className="subtitle">List of Rumah Kost</h2>
      <div className="mb-2">
        <Link to="/rumah-kost/add" className="btn btn-primary mr-2">
          Tambah Kost
        </Link>
        <Button onClick={handlePrint} variant="outline-success">
          Cetak
        </Button>
      </div>
      <div className="">
        <Table
          ref={tableRef}
          responsive
          className="table table-striped table-hover table-sm"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kost</th>
              <th>Harga</th>
              {user && user.role === "admin" && <th>Nama Pemilik</th>}
              <th>No WA</th>
              <th>Alamat</th>
              <th>Jenis Kost</th>
              <th>Fasilitas</th>
              <th>Peraturan</th>
              <th>Catatan Tambahan</th>
              <th className="action-buttons">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kosts.map((kost, index) => (
              <tr key={kosts.uuid}>
                <td>{index + 1}</td>
                <td>{kost.nama}</td>
                <td>{formatCurrency(kost.harga)}</td>
                {user && user.role === "admin" && <td>{kost.user.name}</td>}
                <td>{kost.no_hp}</td>
                <td>
                  {kost.desa} {kost.alamat}
                </td>
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
                <td className="action-buttons">
                  <Button
                    size="sm"
                    onClick={() => editKost(kost.uuid)}
                    className="btn btn-warning mr-1"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteClick(kost.uuid)}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
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
