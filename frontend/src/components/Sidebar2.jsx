import React from "react";
import "../css/sidebar.css";
// import logo from "../../Asset/logo.png";
import { IoIosHome, IoIosLogOut, IoIosPeople, IoMdSpeedometer } from "react-icons/io";
import { ImPlay } from "react-icons/im";
import {
  MdDeliveryDining,
  MdOutlineExplore,
  MdOutlinePermContactCalendar,
} from "react-icons/md";
import { BsTrophy, BsCreditCard2Front, BsQuestion } from "react-icons/bs";
import { BiCarousel, BiTrendingUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "../features/authSlice";

// Import Icons =================>

const Sidebar = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)

  const logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        {/* <img src={"#"} alt="Imge Name" /> */}
      </div>
      <div className="menuDiv">
        <h3 className="divTitle">MENU USER</h3>

        <ul className="menuLists grid">
          <li className="listItem">
            <a href="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className="smallText">Dashboard</span>
            </a>
          </li>
          <li className="listItem ">
            <a href="/rumah-kost" className="menuLink flex">
              <IoIosHome className="icon" />
              <span className="smallText">Rumah Kost</span>
            </a>
          </li>
          {user && user.role === "admin" && (
            <>
          <li className="listItem">
            <a href="/users" className="menuLink flex">
              <IoIosPeople className="icon" />
              <span className="smallText">Users</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <ImPlay className="icon" />
              <span className="smallText">Sosmed</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BiCarousel className="icon" />
              <span className="smallText">Carousel</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <IoIosPeople className="icon" />
              <span className="smallText">Footer</span>
            </a>
          </li>
            </>
          )}
        </ul>
      </div>
      <div className="settingDiv">
        <h3 className="divTitle">SETTING</h3>

        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <IoIosLogOut className="icon" />
              <span onClick={logout} className="smallText">Logout</span>
            </a>
          </li>
        </ul>
      </div>

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
