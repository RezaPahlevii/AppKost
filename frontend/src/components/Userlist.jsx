import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };
  const handleDeleteClick = (kostId) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin Pengguna ini?"
    );
    if (isConfirmed) {
      deleteKost(kostId);
    }
  };
  const editUser = async (userId) => {
    navigate(`/users/edit/${userId}`);
  }

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
    printWindow.document.write('<h2 class="subtitle">Daftar Pengguna</h2>');
    printWindow.document.write(tableRef.current.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Daftar Users</h2>
      <div className="mb-2">
        <Link to="/users/add" className="btn btn-primary mr-2">
          Tambah
        </Link>
        <Button onClick={handlePrint} variant="outline-success">
          Print
        </Button>
      </div>
      <Table className="table is-striped is-fullwidth" ref={tableRef}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="action-buttons">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="action-buttons">
                <Button
                  size="sm"
                  onClick={() => editUser(user.uuid)}
                  className="btn btn-warning "
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteClick(user.uuid)}
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
  );
};

export default Userlist;
