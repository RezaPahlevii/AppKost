import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)

  const logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="user-access">
      <aside className="menu pl-3 has-shadow">
        <div>
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}><IoHome />Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/rumah-kost"}><IoPricetag />Rumah Kost</NavLink>
          </li>
        </ul>
        </div>
        <div className="adminOnly">
        {user && user.role === "admin" && (
          <ul className="menu-list">
            <p className="menu-label">Admin</p>
            <li>
            <NavLink to={"/users"}><IoPerson />Users</NavLink>
            </li>
            <li>
            <NavLink to={"/footer-edit"}><IoPerson />Footer</NavLink>
            </li>
            <li>
            <NavLink to={"/banner-edit"}><IoPerson />Banner</NavLink>
          </li>
        </ul>
        )}
        </div> 
        <div className="settings">
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut />
              Logout
            </button>
          </li>
        </ul>
        </div>

      </aside>
    </div>
  );
}

export default Sidebar;
