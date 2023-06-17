import React from "react";
import { Container } from "react-bootstrap";
import DetailsKost from "../components/DetailsKost";
import Nav2 from "../components/Nav2";

const DetailKost = () => {
  return (
    <div>
      <Nav2 />
      <Container className="mt-5 pt-5">
        <DetailsKost />
      </Container>
    </div>
  );
};

export default DetailKost;
