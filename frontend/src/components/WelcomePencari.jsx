import React, { useEffect, useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from "../image/Avatar.jpg";
import axios from "axios";

const WelcomePencari = () => {
  const { user } = useSelector((state) => state.auth);
  const [bio, setBio] = useState("");
  const { nama, asal, jk, umur, NoWA, url } = bio;

  useEffect(() => {
    getBio();
  }, []);

  const getBio = async () => {
    const response = await axios.get("http://localhost:5000/biodata");
    if (response.data.length > 0) {
      setBio(response.data[0]);
    }else {
      setBio({});
    }
  };
  
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">Selamat Datang {user && user.name}</h2>
      {nama || asal || jk || umur || NoWA || url ? (
      <Row>
        <Col xs={12} sm={6} md={4} lg={4}>
          <Card>
            <Row>
              <Col className="ml-5 mt-4">
                <Row>
                  <>
                    <h5>
                      <strong>{nama}</strong>
                    </h5>
                    <p>
                      {jk}
                      <br />
                      {umur} <br />
                      {asal} <br />
                      {NoWA}
                    </p>
                  </>
                </Row>
              </Col>
              <Col className="text-end">
                <CardImg variant="top" src={url} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      ) : null}
    </div>
  );
};

export default WelcomePencari;
