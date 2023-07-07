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
// import FilterFasilitas from "../components/FilterFasilitas";
// import KostList from "../components/KostList";
import Nav2 from "../components/Nav2";
import Maps from "./../components/Maps";
import axios from "axios";
import Footer2 from "../components/Footer2";
import rumah from "./../image/rumah.jpg";
import "../css/ListKost.css";
import { useNavigate } from "react-router-dom";
// import Rumah2 from "./../image/rumah2.jpg";
// import Rumah3 from "./../image/rumah3.jpg";
// import Rumah4 from "./../image/rumah4.jpg";

const ListKost = (props) => {
  const [kosts, setKosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
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

  const buttonFullMaps =()=>{
    navigate("/maps");
  }

  const handleDetailKost =(id)=>{
    navigate(`/detail-kost/${id}`);
  }

  return (
    <div>
      <Nav2 />
      <Container>
        <Row className="sticky-top pt-5 " >
          <Col className="mt-auto">
          <div >
            <div className="bg-white">
            <Button variant="outline-secondary" className="mr-2 rounded-pill">
              Harga
            </Button>
            <Button variant="outline-secondary" className="mr-2 rounded-pill">
              Fasilitas
            </Button>
            <Button variant="outline-secondary" className="mr-2 rounded-pill">
              Gender
            </Button>
            </div>
            <hr />
          </div>
          </Col>
          <Col sm={4}>
            <Form sticky="top" className="d-flex pt-2 pb-5 mt-auto">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Masukkan nama kost/alamat/fasilitas"
                className="me-2"
                aria-label="Search"
                style={{ height: "2.5rem", width: "2" }}
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12} lg={7}>
            <div className="card-container">
              {kosts
                .filter((kost) => {
                  const searchLower = search.toLowerCase();
                  const nameLower = kost.nama.toLowerCase();
                  const priceLower = kost.harga.toString().toLowerCase();
                  const ownerNameLower = kost.user.name.toLowerCase();
                  const filterFasilitas = kost.f_kamar.find((fasilitas) =>
                    fasilitas.toLowerCase().includes(searchLower)
                  );

                  return (
                    search.toLowerCase() === "" ||
                    nameLower.includes(searchLower) ||
                    priceLower.includes(searchLower) ||
                    ownerNameLower.includes(searchLower) ||
                    filterFasilitas
                  );
                })
                .map((kost, index) => (
                  <Card onClick={handleDetailKost} key={kost.uuid} className="mb-3">
                    <Row>
                      <Col xs={5}>
                        <CardImg variant="top" src={rumah} />
                      </Col>
                      <Col xs={7}>
                        <Card.Body>
                          <Row>
                          <Card.Title>{kost.nama}</Card.Title>
                          </Row>
                          <Row>
                          <Card.Text>Desa {kost.desa}<br/>{kost.alamat}</Card.Text> 
                          <Row>
                          <Card.Text>{kost.f_kamar.slice(0, 5).join(", ")}</Card.Text>
                          </Row>
                          </Row>
                          <Row>
                            <Col>
                          <Card.Text></Card.Text>
                            </Col>
                            <Col>
                          <Card.Text className="text-end">{kost.harga} /bulan</Card.Text>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
            </div>
          </Col>
          <Col className="" xs={12} lg={5}>
            <Maps />
            <Button onClick={buttonFullMaps} className="mt-3">Full Maps</Button>
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
