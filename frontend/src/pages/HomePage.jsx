import React, { useEffect, useState } from "react";
import { Button, Card, CardImg, Col, Container, Form, Row } from "react-bootstrap";
// import RekomendasiKost from "../components/RekomendasiKost";
import rumah from "./../image/rumah.jpg";
import rumah2 from "./../image/rumah2.jpg";
import Banner from "../components/Banner";
// import rumah3 from "./../image/rumah3.jpg";s
import Nav2 from "./../components/Nav2";
// import SearchBar from "../components/SearchBar";
import Footer2 from "../components/Footer2";
import axios from "axios";
// import { Link } from "react-router-dom";

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
          <Banner banner={rumah2} />
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
                const priceLower = kost.harga.toString().toLowerCase();
                const ownerNameLower = kost.user.name.toLowerCase();
                const filterFasilitas = kost.f_kamar.find((fasilitas) =>
                fasilitas.toLowerCase().includes(searchLower)
              );

                return search.toLowerCase() === "" ||
                nameLower.includes(searchLower) ||
                priceLower.includes(searchLower) ||
                ownerNameLower.includes(searchLower) ||
                filterFasilitas;
                
              })
              .map((kost, index) => (
                <Col key={kost.uuid} xs={12} sm={6} md={4} lg={3}>
                  <Card className="mb-3">
                    <CardImg variant="top" src={rumah} />
                    <Card.Body>
                      <Card.Title>{kost.nama}</Card.Title>
                      <Card.Text>{kost.harga}</Card.Text>
                      <Card.Text>{kost.user.name}</Card.Text>
                      <Card.Text>{kost.f_kamar.slice(0, 4).join(", ")}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>

          {/* <div className="col-4">
            <RekomendasiKost
              image={rumah2}
              kost="Kost Pink"
              alamat="Jl. Bathin Alam GG. AMD"
              desa="Desa Sungai Alam"
              harga="Rp. 500.000 / bulan"
            />
          </div>
          <div className="col-4">
            <RekomendasiKost
              image={rumah3}
              kost="Kost Kuning"
              alamat="Jl. Bathin Alam GG. AMD"
              desa="Desa Sungai Alam"
              harga="Rp. 300.000 / bulan"
            />
          </div>
          <div className="col-4">
            <RekomendasiKost
              image={rumah4}
              kost="Kost Biru"
              alamat="Jl. Bathin Alam GG. AMD"
              desa="Desa Sungai Alam"
              harga="Rp. 700.000 / bulan"
            />
          </div> */}
        </div>
      </Container>
      <Footer2 />
    </div>
  );
};

export default HomePage;
