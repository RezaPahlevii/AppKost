import React, { Component } from "react";
import Slider from "react-slick";
import rumah1 from "./../image/carousel1.jpg";
import rumah2 from "./../image/carousel2.svg";
import rumah3 from "./../image/carousel3.jpg";
import rumah4 from "./../image/carousel4.jpg";
import { Card, CardImg } from "react-bootstrap";

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Card className="mb-3">
              <CardImg style={{ width: "100%", height: "auto" }} variant="top" src={rumah1} />
            </Card>
          </div>
          <div>
            <Card className="mb-3">
              <CardImg style={{ width: "100%", height: "auto" }} variant="top" src={rumah2} />
            </Card>
          </div>
          <div>
            <Card className="mb-3">
              <CardImg style={{ width: "100%", height: "auto" }} variant="top" src={rumah3} />
            </Card>
          </div>
          <div>
            <Card className="mb-3">
              <CardImg variant="top" src={rumah4} />
            </Card>
          </div>
          <div>
            <Card className="mb-3">
              <CardImg variant="top" src={rumah2} />
            </Card>
          </div>
          <div>
            <Card className="mb-3">
              <CardImg variant="top" src={rumah3} />
            </Card>
          </div>
        </Slider>
      </div>
    );
  }
}
