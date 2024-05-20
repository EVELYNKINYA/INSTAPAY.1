import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './about.css';
import Banner from './Shared/Banner';



const About = () => {
  return (
    <div>
      <Banner /> {/* Render the Banner component */}
      <Container className="about-section">
        <Row>
          <Col>
          <h1 className="about-heading">About InstaPay</h1>
          <p className="about-description">
            InstaPay is a revolutionary money transfer app that aims to simplify and streamline the process of sending and receiving funds, both domestically and internationally. Our platform is designed to address the common challenges faced by traditional money transfer services, such as high transaction fees, complex onboarding processes, limited accessibility for unbanked populations, and security concerns.
          </p>
          <p className="about-description">
            At InstaPay, we believe that financial inclusion and accessibility should be a fundamental right for everyone, regardless of their socioeconomic status or geographical location. Our app is built on cutting-edge technology, ensuring secure and efficient transactions while providing a user-friendly experience.
          </p>
          <h2 className="about-subheading">Our Mission</h2>
          <p className="about-description">
            Our mission is to empower individuals and communities by providing a seamless and cost-effective way to transfer money. We strive to bridge the gap between the banked and unbanked populations, enabling financial freedom and economic empowerment for all.
          </p>
          <h2 className="about-subheading">Key Features</h2>
          <ul className="about-features">
            <li>Low transaction fees</li>
            <li>Simplified onboarding process</li>
            <li>Accessible to unbanked and underbanked populations</li>
            <li>Robust security measures</li>
            <li>Interoperability for international transfers</li>
          </ul>
          <p className="about-description">
            Join the InstaPay community today and experience the future of money transfers. Together, we can create a more inclusive and connected world, where financial boundaries are no longer a barrier.
          </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;