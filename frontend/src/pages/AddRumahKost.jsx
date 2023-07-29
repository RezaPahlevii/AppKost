import React, { useEffect } from "react";
import Nav2 from "../components/Nav2";
import Sidebar from "../components/Sidebar2";
import FormAddKost from "./../components/FormAddKost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddRumahKost = () => {
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
        <FormAddKost />
      </div>
    </div>
  );
};

export default AddRumahKost;
