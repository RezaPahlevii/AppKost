import React, { useEffect } from "react";
import FormAddUser from "../components/FormAddUser";
import Nav2 from "../components/Nav2";
import Sidebar from "../components/Sidebar2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, navigate]);

  return (
    <div className="custom-container">
      <Nav2 />
      <Sidebar />
      <div className="mainContent">
        <FormAddUser />
      </div>
    </div>
  );
};

export default AddUser;
