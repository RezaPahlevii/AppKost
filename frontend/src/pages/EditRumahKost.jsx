import React, { useEffect } from "react";
import FormEditKost from "../components/FormEditKost";
import Nav2 from "../components/Nav2";
import Sidebar from "../components/Sidebar2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditRumahKost = () => {
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
        <FormEditKost />
      </div>
    </div>
  );
};

export default EditRumahKost;
