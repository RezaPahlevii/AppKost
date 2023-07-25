import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Nav.css'; // Import file CSS untuk mengatur tampilan
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset, getMe } from "../features/authSlice";
import axios from 'axios';

const navbar = () => {
  const expand = 'md';
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
    <Navbar fixed="top" expand={expand} className="bg-body-tertiary mb-3">
      <Container style={{ maxWidth: "1250px" }}>
        <NavLink style={{ textDecoration: "none", paddingRight: 15, color: "Black" }} href="/">AppKost</NavLink>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="d-md-flex flex-md-row d-block flex-column ml-auto"> {/* Tambahkan kelas justify-content-end pada elemen Nav */}
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
                to={"/maps"}
              >
                Maps
              </Nav.Link>
              <Nav.Link
                style={{
                  textDecoration: "none",
                  paddingRight: 15,
                  color: "Black",
                }}
                to={"/kost-list"}
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
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default navbar;
