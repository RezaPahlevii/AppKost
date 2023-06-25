import React, { useEffect, useState } from "react";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import FilterFasilitas from "../components/FilterFasilitas";
// import KostList from "../components/KostList";
import Nav2 from "../components/Nav2";
import Maps from "./../components/Maps";
import axios from "axios";
import Footer2 from "../components/Footer2";
import rumah from "./../image/rumah.jpg";
import "../css/ListKost.css";
// import Rumah2 from "./../image/rumah2.jpg";
// import Rumah3 from "./../image/rumah3.jpg";
// import Rumah4 from "./../image/rumah4.jpg";

const ListKost = () => {
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
      <>
          <Nav2 />
      </>
      <Container className="pt-5">
      <FilterFasilitas />
  <Row>
    <Col xs={12} lg={7}>
      <div className="card-container">
        {kosts.map((kost, index) => (
          <Card key={kost.uuid} className="mb-3">
            <Row>
              <Col xs={5}>
                <CardImg variant="top" src={rumah} />
              </Col>
              <Col xs={7}>
                <Card.Body>
                  <Card.Title>{kost.nama}</Card.Title>
                  <Card.Text>{kost.harga}</Card.Text>
                  <Card.Text>{kost.user.name}</Card.Text>
                  <Card.Text>{kost.f_kamar.join(", ")}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </Col>
    <Col className="" xs={12} lg={5}>
      <Maps />
    </Col>
  </Row>
</Container>
      <>
        <Footer2 />
      </>
    </div>
  );
};

export default ListKost;
