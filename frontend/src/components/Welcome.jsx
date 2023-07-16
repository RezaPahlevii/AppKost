import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardImg, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import rumah from "./../image/rumah.jpg";

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

    const myImageStyle = {marginRight:"10px", marginTop:"10px", width: '150px', height: 'auto' };

  return (
    <div>
        <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'>Selamat Datang {user && user.name}</h2>
        <Row>
            {kosts.map((kost, index) => (
              <Col key={kost.uuid} xs={12} sm={6} md={4} lg={4}>
                 <Link
                    to={`/rumah-kost/detail/${kost.uuid}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                <Card className="mb-3">
                  <Row>
                    <Col className='ml-5 mt-5'>
                      <h4><strong>{kost.nama} <br /> </strong></h4> 
                      <p>Kost Putra</p>
                    </Col>
                    <Col className='text-end'>
                    <CardImg  style={myImageStyle} variant="top" src={kost.fotos[0].url1} />
                    </Col>
                    <Row className='ml-3 '>
                      <Col>
                    <p>{kost.desa} <br /> {kost.alamat} </p>
                      </Col>
                      <Col lg={4}></Col>
                      <Row>
                        <Col></Col>
                        <Col className='text-end'><p>{kost.harga} /bulan</p></Col>
                      </Row>
                    </Row>
                  </Row>
                </Card>
              </Link>
              </Col>
            ))}
          </Row>
    </div>
  )
}

export default Welcome