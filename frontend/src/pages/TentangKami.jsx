import React from 'react'
import Nav from '../components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'

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
        <Row>
          <Col> <div><h6><strong>Muhammad Syah Reza Pahlevi</strong></h6></div>
        <div className="text-secondary"><h6>Fullstack Web Development</h6></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p></Col>
          <Col className="text-center">Gambar</Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  )
}

export default TentangKami