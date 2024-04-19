import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Verificăm dacă utilizatorul se află pe paginile de autentificare sau înregistrare
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Dacă suntem pe o pagină de autentificare sau înregistrare, nu afișăm footer-ul
  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={5} className="mb-4">
            <img
              src={logo}
              alt="TheNecessary"
              style={{ width: "100px", marginBottom: "1rem" }}
            />
            <p>
              "Indulge in the art of minimalism and redefine your personal style
              with TheNecessary. Embrace simplicity without compromising on
              luxury. Explore our range and experience the essence of premium
              minimalist fashion."
            </p>
            <div className="social-icons">
              <a href="https://www.facebook.com">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com">
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Products</a>
              </li>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            <h5>Contact Us</h5>
            <p>
              Address: ParkLake Mall First Floor <br />
              Email: info@thenecessary.com <br />
              Phone: +123 456 7890
            </p>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-4">
        <p>&copy; {currentYear} TheNecessary. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
