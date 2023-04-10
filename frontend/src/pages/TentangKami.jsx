import React from 'react'
import Nav from '../components/Nav'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Pendiri1 from "./../image/Levi.jpg"
import Pendiri2 from "./../image/Bima.jpg"

const TentangKami = () => {
  return (
    <div>
      <Nav/>
      <Container className="my-5 py-5">
        <div className="text-center ">
        <h4><strong>TENTANG KAMI</strong></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p>
          <h4><strong>KISAH PENDIRI</strong></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p>
          <h4><strong>PENDIRI</strong></h4>
        </div>
        <Row className="mb-5">
          <Col> <div><h6><strong>Muhammad Syah Reza Pahlevi</strong></h6></div>
        <div className="text-secondary"><h6>Fullstack Web Development</h6></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p></Col>
          <Col className="text-center " >
            <img width="250px" src={Pendiri1} alt="Levi" class="rounded-circle shadow p-0"/>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col> <div><h6><strong>Bima Fadi Lana</strong></h6></div>
        <div className="text-secondary"><h6>Fullstack Mobile Development</h6></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p></Col>
          <Col className="text-center " >
            <div className="">
            <Image width="250px" src={Pendiri2} alt="Bima" className="rounded-circle shadow p-0" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  )
}

export default TentangKami