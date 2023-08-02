import React, { useEffect } from "react";
import Nav2 from "../components/Nav2";
import { Col, Container, Image, Row } from "react-bootstrap";
import Pendiri1 from "./../image/Levi.jpg";
import Pendiri2 from "./../image/Bima.jpeg";
import Hero from "./../image/hero.jpg";
import { Link } from "react-scroll";
import Footer2 from "../components/Footer2";
import "./../css/footer.css";
import { useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const TentangKami = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div>
      <Nav2 />
      <Container className="mt-2 rounded shadow" style={{ maxWidth: "1100px" }}>
        <Image className="mt-5 pt-2" src={Hero} width={1350} />
        <div className="mt-2">
          <ul class="nav justify-content-center">
            <li>
              <Link
                className="mx-2 text-dark"
                style={{ textDecoration: "none" }}
                to="tentangkos"
                spy={true}
                smooth={true}
                offset={-90}
                duration={500}
              >
                Tentang Kos
              </Link>
            </li>
            <li>
              <Link
                className="mx-2 "
                style={{ textDecoration: "none" }}
                to="kisahpendiri"
                spy={true}
                smooth={true}
                offset={-90}
                duration={500}
              >
                Kisah Pendiri
              </Link>
            </li>
            <li>
              <Link
                className="mx-2 "
                style={{ textDecoration: "none" }}
                to="pendiri"
                spy={true}
                smooth={true}
                offset={-90}
                duration={500}
              >
                Pendiri
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-5">
          <section id="tentangkos" className="mt-5 padding-scroll">
            <div className="text-center ">
              <h4>
                <strong>TENTANG KOS</strong>
              </h4>
              <p>
                Selamat datang di halaman kami! Dengan bangga kami
                mempersembahkan Aplikasi Pencarian Kost berbasis web dan mobile
                yang kami kembangkan sebagai bagian dari tugas akhir kami dalam
                program D3 Teknik Informatika. Aplikasi ini kami rancang dengan
                tujuan untuk memudahkan mahasiswa yang melanjutkan studi di
                Politeknik Negeri Bengkalis dalam mencari informasi detail
                tentang kost di sekitar kampus. Kami menyadari bahwa menemukan
                tempat tinggal yang nyaman dan sesuai dengan kebutuhan mahasiswa
                baru adalah hal yang penting. <br />
                Aplikasi Pencarian Kost yang kami rancang bertujuan untuk
                memberikan kemudahan bagi para mahasiswa Politeknik Negeri
                Bengkalis dalam mencari kost yang terdekat dengan kampus. Dengan
                fitur pencarian yang canggih, kami berharap para pengguna dapat
                menemukan kost yang sesuai dengan kebutuhan mereka dengan mudah
                dan cepat.
              </p>
            </div>
          </section>
          <section id="kisahpendiri" className="my-5">
            <div className="text-center">
              <h4>
                <strong>KISAH PENDIRI</strong>
              </h4>
              <p>
                Aplikasi Pencarian Kost ini didirikan oleh dua individu berbakat
                dengan pengalaman lebih dari 5 tahun di bidang teknologi
                informasi dan perfilman. Salah satu pendiri adalah seorang
                fullstack web developer dan pemilik bisnis jasa videografi,
                Studio Artinema. Pendiri lainnya adalah seorang fullstack mobile
                developer yang juga ahli di bidang editing dan videografi.
                Selain itu, kami memiliki tim IT yang berdedikasi tinggi dalam
                pengembangan aplikasi web dan mobile, menggunakan teknologi
                terkini seperti ReactJS, ExpressJS, dan Flutter. Dengan semangat
                inovasi dan ketekunan dalam mencari solusi teknologi, kami
                berusaha memberikan aplikasi Pencarian Kost yang canggih,
                user-friendly, dan memberikan manfaat bagi para mahasiswa
                Politeknik Negeri Bengkalis serta pemilik kost.
              </p>
            </div>
          </section>
          <section id="pendiri">
            <h4 className="text-center">
              <strong>PENDIRI</strong>
            </h4>
            <Row className="mb-5 pt-3">
              <Col xs={12} md={4} className="text-center mb-4">
                <Image
                  width="250px"
                  src={Pendiri1}
                  alt="Levi"
                  className="rounded-circle shadow pt-0"
                />
              </Col>
              <Col xs={12} md={7}>
                <div>
                  <h6>
                    <strong>Muhammad Syah Reza Pahlevi</strong>
                  </h6>
                </div>
                <div className="text-secondary">
                  <h6>Fullstack Web Development</h6>
                </div>
                <p>
                  Sebagai seorang fullstack web developer, Muhammad Syah Reza
                  Pahlevi adalah salah satu pendiri dari aplikasi ini. Dia
                  memiliki pengalaman luas dalam mengembangkan solusi web yang
                  inovatif dan user-friendly. Dengan keahliannya dalam ReactJS
                  dan ExpressJS, Levi berperan penting dalam merancang tampilan
                  dan fungsionalitas aplikasi berbasis web.
                </p>
              </Col>
            </Row>
            <Row className="mb-5 pb-2">
              <Col xs={12} md={4} className="text-center mb-4">
                <div className="">
                  <Image
                    width="250px"
                    src={Pendiri2}
                    alt="Bima"
                    className="rounded-circle shadow p-0"
                  />
                </div>
              </Col>
              <Col xs={12} md={7}>
                <div>
                  <h6>
                    <strong>Bima Fadi Lana</strong>
                  </h6>
                </div>
                <div className="text-secondary">
                  <h6>Fullstack Mobile Development</h6>
                </div>
                <p>
                  Bima Fadi Lana adalah seorang fullstack mobile developer yang
                  juga merupakan salah satu pendiri dari aplikasi pencarian kost
                  ini. Dengan dedikasi tinggi dalam memahami kebutuhan pengguna,
                  Bima berfokus pada pengembangan aplikasi mobile yang responsif
                  dan mudah digunakan. Ia menggunakan Flutter sebagai kerangka
                  kerja utama untuk menghasilkan aplikasi mobile yang canggih
                  dan dapat dijalankan di berbagai platform.
                </p>
              </Col>
            </Row>
          </section>
        </div>
      </Container>
      <Footer2 />
    </div>
  );
};

export default TentangKami;
