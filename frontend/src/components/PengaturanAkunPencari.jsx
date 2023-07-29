import React, { useEffect } from "react";
import Nav2 from "../components/Nav2";
import Sidebar from "../components/Sidebar2";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const PengaturanAkunPencari = () => {
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

  return (
    <div className="custom-container">
      <Nav2 />
      <Sidebar />
      <div className="mainContent">
        <Container className="mt-3">
          <h2>pengaturan-akun</h2>
        </Container>
      </div>
    </div>
  );
};

export default PengaturanAkunPencari;
