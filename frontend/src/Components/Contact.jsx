import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      <div>
        <h1>Contact Us</h1>
        <Row>
          <Col md={6}>
            <h2>Our Details</h2>
            <p>
              <strong>Address:</strong> ParkLake Mall, Șoseaua Liviu Rebreanu
              nr. 4, Sector 3, București, România
            </p>
            <p>
              <strong>Phone:</strong> +40 123 456 789
            </p>
            <p>
              <strong>Email:</strong> info@thenecessary.com
            </p>
          </Col>
          <Col md={6}>
            <h2>Our Location</h2>
            <div
              style={{ height: "400px", width: "100%", marginBottom: "20px" }}
            >
              <iframe
                title="ParkLake Mall Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.398046679674!2d26.145503315830496!3d44.42433217910284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f5d9a1537aa5%3A0x46481d3a42b22b11!2sParkLake%20Shopping%20Center!5e0!3m2!1sen!2sro!4v1637692838209!5m2!1sen!2sro"
                style={{
                  border: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contact;
