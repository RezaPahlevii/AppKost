import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Banner from "../components/Banner";
import Nav2 from "./../components/Nav2";
import Footer2 from "../components/Footer2";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [kosts, setKosts] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

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

  return (
    <div>
      <Nav2 />
      <Container className="my-5 py-5">
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
          <div>
            <h3 className="pb-4">
              <>
                <strong>Rekomendasi Kost</strong>
              </>
            </h3>
          </div>
          <Row>
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
                <Col key={kost.uuid} xs={12} sm={6} md={4} lg={3}>
                  <Link
                    to={`/rumah-kost/detail/${kost.uuid}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="mb-3">
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
                          <strong>{kost.harga}</strong> /bulan
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
      <Footer2 />
    </div>
  );
};

export default HomePage;
