import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Nav.css"; // Import file CSS untuk mengatur tampilan
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset, getMe } from "../features/authSlice";
import Avatar from "@mui/material/Avatar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navbar = () => {
  const expand = "md";
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

  return (
    <Navbar fixed="top" expand={expand} className="bg-body-tertiary mb-3">
      <Container style={{ maxWidth: "1250px" }}>
        <NavLink
          style={{ textDecoration: "none", paddingRight: 15, color: "Black" }}
          to={"/"}
        >
          AppKost
        </NavLink>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              AppKost
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="d-md-flex flex-md-row d-block flex-column ml-auto">
              <Nav.Link
                as={NavLink}
                style={{
                  textDecoration: "none",
                  paddingRight: 15,
                  color: "Black",
                }}
                to={"/pusat-bantuan"}
              >
                Pusat Bantuan
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                style={{
                  textDecoration: "none",
                  paddingRight: 15,
                  color: "Black",
                }}
                to={"/tentang-kami"}
              >
                Tentang Kami
              </Nav.Link>
              <Nav.Link
                style={{
                  textDecoration: "none",
                  paddingRight: 15,
                  color: "Black",
                }}
                href="/maps"
              >
                Maps
              </Nav.Link>
              <Nav.Link
                style={{
                  textDecoration: "none",
                  paddingRight: 15,
                  color: "Black",
                }}
               href="/kost-list"
              >
                List Rumah Kost
              </Nav.Link>
              <Form className="d-flex">
                {user == null ? (
                  <Button onClick={login} variant="outline-success">
                    Login
                  </Button>
                ) : (
                  <>
                    <Dropdown alignRight>
                      <Dropdown.Toggle
                        as={Avatar}
                        id="avatar-dropdown"
                        className="no-caret"
                      >
                        <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={dashboard}>Akun</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </Form>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default navbar;
