import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardImg, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import rumah from "./../image/rumah.jpg";

const Welcome = () => {
  const {user} = useSelector((state)=> state.auth);
  const [kosts, setKosts] = useState ([]);

    useEffect(()=>{
        getKosts();
    }, []);

    const getKosts = async ()=>{
        const response = await axios.get("http://localhost:5000/rumah-kost");
        setKosts(response.data);
    };
  return (
    <div>
        <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'>Selamat Datang {user && user.name}</h2>
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
    </div>
  )
}

export default Welcome