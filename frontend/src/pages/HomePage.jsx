import React, { useEffect, useState } from "react";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import RekomendasiKost from "../components/RekomendasiKost";
import rumah from "./../image/rumah.jpg";
import rumah2 from "./../image/rumah2.jpg";
import rumah3 from "./../image/rumah3.jpg";
import rumah4 from "./../image/rumah4.jpg";
import Nav2 from "./../components/Nav2";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import Footer2 from "../components/Footer2";
import axios from "axios";
// import { Link } from "react-router-dom";

const HomePage = () => {
  const [kosts, setKosts] = useState([]);

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
        <div className="pb-5">
          <SearchBar />
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
            {kosts.map((kost, index) => (
              <Col key={kost.uuid} xs={12} sm={6} md={4} lg={3}>
                <Card className="mb-3">
                  <CardImg variant="top" src={rumah} />
                  <Card.Body>
                    <Card.Title>{kost.name}</Card.Title>
                    <Card.Text>{kost.price}</Card.Text>
                    <Card.Text>{kost.user.name}</Card.Text>
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
