import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import rumah1 from "./../image/carousel1.webp";
import rumah2 from "./../image/carousel2.webp";
import rumah3 from "./../image/carousel3.webp";
import rumah4 from "./../image/carousel4.webp";
import rumah5 from "./../image/carousel5.webp";
import { Card, CardImg } from "react-bootstrap";

const Banner = () => {
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sliderSettings = {
    infinite: true,
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: windowWidth >= 768 ? 3 : 1,
    slidesToScroll: windowWidth >= 768 ? 1 : 1,
  };
   const fixedImageStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div>
        <Slider {...sliderSettings}>
          <div>
            <Card className="mb-3" style={{ margin: "10px" }}>
              <CardImg style={fixedImageStyle} variant="top" src={rumah1} />
            </Card>
          </div>
          <div>
            <Card className="mb-3" style={{ margin: "10px" }}>
              <CardImg style={fixedImageStyle} variant="top" src={rumah2} />
            </Card>
          </div>
          <div>
            <Card className="mb-3" style={{ margin: "10px" }}>
              <CardImg style={{ width: "100%", height: "auto" }} variant="top" src={rumah3} />
            </Card>
          </div>
          <div>
            <Card className="mb-3" style={{ margin: "10px" }}>
              <CardImg variant="top" src={rumah4} />
            </Card>
          </div>
          <div>
            <Card className="mb-3" style={{ margin: "10px" }}>
              <CardImg variant="top" src={rumah5} />
            </Card>
          </div>
          <div>
            <Card className="mb-3" style={{ margin: "10px" }}>
              <CardImg variant="top" src={rumah3} />
            </Card>
          </div>
        </Slider>
      </div>
  )
}

export default Banner
