import React, { useEffect, useState } from "react";
import "../css/sidebar.css";
import {
  IoIosHome,
  IoIosLogOut,
  IoIosPeople,
  IoMdSpeedometer,
} from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { VscDashboard } from "react-icons/vsc";
import { BsQuestion } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LogOut, reset } from "../features/authSlice";
import Avatar from "../image/Avatar.jpg";
import { Col, Row } from "react-bootstrap";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="sideBar grid">
      <Row className="">
        <Col className="text-center">
          <img
            src={Avatar}
            alt="Imge Name"
            class="rounded-circle"
            style={{ width: "100px" }}
          />
        </Col>
      </Row>
      <Row className="">
        <div className="menuDiv">
          <h3 className="divTitle">MENU USER</h3>

          <ul className="menuLists grid">
            {user &&
              (user.role === "pemilik kost" || user.role === "admin") && (
                <li className="listItem">
                  <a href="/dashboard" className="menuLink flex">
                    <IoMdSpeedometer className="icon" />
                    <span className="smallText">Dashboard</span>
                  </a>
                </li>
              )}

            {user &&
              (user.role === "pemilik kost" || user.role === "admin") && (
                <li className="listItem ">
                  <a href="/rumah-kost" className="menuLink flex">
                    <IoIosHome className="icon" />
                    <span className="smallText">Rumah Kost</span>
                  </a>
                </li>
              )}

            {user && user.role === "pencari kost" && (
              <li className="listItem ">
                <a href="/dashboard" className="menuLink flex">
                  <VscDashboard className="icon" />
                  <span className="smallText">Dashboard</span>
                </a>
              </li>
            )}

            {user && user.role === "pencari kost" && (
              <li className="listItem ">
                <a href="/pengaturan-akun" className="menuLink flex">
                  <AiOutlineSetting className="icon" />
                  <span className="smallText">Pengaturan Akun</span>
                </a>
              </li>
            )}

            {user && user.role === "admin" && (
              <>
                <li className="listItem">
                  <a href="/users" className="menuLink flex">
                    <IoIosPeople className="icon" />
                    <span className="smallText">Users</span>
                  </a>
                </li>
              </>
            )}

            <li className="listItem">
              <a href="/biodata" className="menuLink flex">
                <IoIosPeople className="icon" />
                <span className="smallText">Biodata</span>
              </a>
            </li>
          </ul>
        </div>
      </Row>
      <Row className="">
        <div className="settingDiv">
          <h3 className="divTitle">SETTING</h3>
          <ul className="menuLists grid">
            <li className="listItem">
              <a href="/dashboard" className="menuLink flex">
                <IoIosLogOut className="icon" />
                <span onClick={logout} className="smallText">
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Row>
      <div className="sideBarCard">
        <div className="circle">
          <b></b>
          <b></b>
          <BsQuestion className="icon"></BsQuestion>
        </div>
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Pusat Bantuan</h3>
          <p>
            Having a Problem ! Just Call with Us Expert Call you To Soon !:)
          </p>
          <button className="btn">GO To the Help </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
