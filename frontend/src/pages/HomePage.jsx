import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardImg, Col, Container, Form, Row } from "react-bootstrap";
import Banner from "../components/Banner";
import Nav2 from "./../components/Nav2";
import Footer2 from "../components/Footer2";
import axios from "axios";
import { Link } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "../css/cardHomePage.css";

const HomePage = () => {
  const [kosts, setKosts] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const getRekomendasiKosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/rekomendasi-kost"
      );
      setKosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRekomendasiKosts();
  }, []);

  const sliderRef = useRef(null);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "transparent",
          fontSize: "24px",
          width: "40px", // Customize the width of the arrow container
          height: "40px", // Customize the height of the arrow container
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <i className="fa fa-chevron-left" style={{ color: "grey" }}></i>
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "transparent",
          fontSize: "24px",
          width: "40px", // Customize the width of the arrow container
          height: "40px", // Customize the height of the arrow container
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <i className="fa fa-chevron-right" style={{ color: "grey" }}></i>
      </div>
    );
  }
  const sliderSettings = {
    infinite: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth >= 768 ? 4 : 2,
    slidesToScroll: windowWidth >= 768 ? 1 : 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const formatCurrency = (value) => {
    // Convert the value to a number (in case it's a string)
    const numberValue = Number(value);
  
    // Check if the value is a valid number
    if (isNaN(numberValue)) {
      return "Invalid Number";
    }
  
    // Use toLocaleString to format the number as currency
    return numberValue.toLocaleString("id-ID");
  };
  

  return (
    <div>
      <Nav2 />
      <Container className="my-5 py-5" style={{ maxWidth: "1250px" }}>
        <div className="pb-5 search-container">
          <h2>
            <strong>Temukan Kost Kebutuhan Anda</strong>
          </h2>
          <p> Dapatkan infonya dan langsung sewa di AppKost</p>
          <Col sm={4}>
            <Form sticky="top" className="d-flex pt-2 pb-5">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Masukkan nama kost/alamat/area"
                className="me-2"
                aria-label="Search"
                style={{ height: "2.5rem", width: "2" }}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </div>
        <div>
          <Banner />
        </div>
        <div className="row mt-5 pt-5">
          <Row>
            <Col xs={8} sm={9} md={9} lg={10}>
            <h3 className="pb-4">
              <strong>Rekomendasi Kost</strong>
            </h3>
            </Col>
            <Col className="text-end">
            <Button size="sm" href="/kost-list" variant="success" className="mr-2" style={{ padding: "10px 10px" }}>Lihat Semua</Button>
            </Col>
          </Row>
          <Slider ref={sliderRef} {...sliderSettings}>
            {kosts
              .filter((kost) => {
                const searchLower = search.toLowerCase();
                const nameLower = kost.nama.toLowerCase();
                const alamatLower = kost.alamat.toLowerCase();
                const priceLower = kost.harga.toString().toLowerCase();
                const ownerNameLower = kost.user.name.toLowerCase();
                const filterFasilitas = kost.fasilitas.find((fasilitas) =>
                  fasilitas.nama_f.toLowerCase().includes(searchLower)
                );

                return (
                  search.toLowerCase() === "" ||
                  nameLower.includes(searchLower) ||
                  alamatLower.includes(searchLower) ||
                  priceLower.includes(searchLower) ||
                  ownerNameLower.includes(searchLower) ||
                  filterFasilitas
                );
              })
              .map((kost, index) => (
                <div className="slider-card" key={kost.uuid}>
                  <Col className="mx-4" xs={10} sm={10} md={10} lg={10}>
                    <Link
                      to={`/rumah-kost/detail/${kost.uuid}`}
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card>
                        <CardImg variant="top" src={kost.fotos[0].url1} />
                        <Card.Body>
                          <Card.Title>{kost.nama}</Card.Title>
                          <Card.Text className="my-1">{kost.jk}</Card.Text>
                          <Card.Text className="my-1">
                            {kost.desa} <br />
                            {kost.alamat}
                          </Card.Text>
                          <Card.Text>
                            {kost.fasilitas.slice(0, 5).map((item, index) => (
                              <span
                                key={item.nama_f}
                                className="mr-1 text-muted"
                                style={{ fontSize: "13px" }}
                              >
                                {item.nama_f}
                                {index !== 4 && ","}
                              </span>
                            ))}
                          </Card.Text>
                          <Card.Text>
                           Rp <strong>{formatCurrency(kost.harga)}</strong> /bulan
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                </div>
              ))}
          </Slider>
        </div>
      </Container>
      <Footer2 />
    </div>
  );
};

export default HomePage;
