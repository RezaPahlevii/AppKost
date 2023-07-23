import React from "react";
import { LogOut, reset, getMe } from "../features/authSlice";
import {
  Container,
  Navbar,
  Form,
  Button,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)

  const logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const login = () =>{
    dispatch(getMe());
    dispatch(reset());
    navigate("/login");
  };
  const dashboard =()=>{
    navigate("/dashboard")
  }
  
  return (
    <div className="mb-5 ">
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <NavLink
            style={{ textDecoration: "none", color: "Black" }}
            to={"/"}
          >
            AppKost
          </NavLink>
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
          <NavLink
            style={{ textDecoration: "none", paddingRight: 15, color: "Black" }}
            to={"/pusat-bantuan"}
          >
            Pusat Bantuan
          </NavLink>
          <Form className="d-flex">
           {user == null ? (
            <Button onClick={login} variant="outline-success">Login</Button>
           ) : (
            <>
            <Button onClick={logout} variant="outline-success">Logout</Button>
            <Button onClick={dashboard} variant="outline-success">avatar</Button>
            </>
           )
        }
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Nav;