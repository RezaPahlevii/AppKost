import React, { useEffect, useState } from "react";
import { LogOut, reset, getMe } from "../features/authSlice";
import { Container, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [kosts, setKosts] = useState([]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const login = () => {
    dispatch(getMe());
    dispatch(reset());
    navigate("/login");
  };
  const dashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    getKosts();
  }, []);
  const getKosts = async () => {
    const response = await axios.get("http://localhost:5000/rumah-kost");
    setKosts(response.data);
  };

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
          <NavLink style={{ textDecoration: "none", color: "Black" }} to={"/"}>
            AppKost
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <NavLink
              style={{
                textDecoration: "none",
                paddingRight: 15,
                color: "Black",
              }}
              className="mx-2"
              to={"/pusat-bantuan"}
            >
              Pusat Bantuan
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                paddingRight: 15,
                color: "Black",
              }}
              className="mx-2"
              to={"/tentang-kami"}
            >
              Tentang Kami
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                paddingRight: 15,
                color: "Black",
              }}
              className="mx-2"
              to={"/maps"}
            >
              Maps
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                paddingRight: 15,
                color: "Black",
              }}
              className="mx-2"
              to={"/kost-list"}
            >
              List Rumah Kost
            </NavLink>
            <Form className="d-flex">
              {user == null ? (
                <Button onClick={login} variant="outline-success">
                  Login
                </Button>
              ) : (
                <>
                  <NavDropdown title={user.name} id="collasible-nav-dropdown">
                    <NavDropdown.Item
                      onClick={dashboard}
                      variant="outline-success"
                    >
                      Akun
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={logout}
                      variant="outline-success"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Nav;
