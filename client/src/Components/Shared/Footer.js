import React from "react";
import {
    SlSocialFacebook,
    SlSocialInstagram,
    SlSocialLinkedin,
    SlSocialTwitter
} from "react-icons/sl";
import { Container, Row, Col, Image } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-light py-5 mt-5 border-top border-primary">
            <Container>
                <Row>
                    <Col>
                        <Image
                            src="/images/footer-bg.png"
                            className="w-80 border-bottom"
                            alt="Footer Background"
                            fluid
                        />
                    </Col>
                </Row>
                <Row className="mt-4 align-items-center">
                    <Col xs={12} md={6}>
                        <p className="text-secondary text-uppercase small mb-0">
                            Copyright © 2022 Instapay. All Rights Reserved.
                        </p>
                    </Col>
                    <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
                        <div className="d-inline-flex align-items-center">
                            <span className="bg-white shadow-sm border rounded-circle p-2 mx-1">
                                <SlSocialFacebook className="text-primary" size={24} />
                            </span>
                            <span className="bg-white shadow-sm border rounded-circle p-2 mx-1">
                                <SlSocialTwitter className="text-primary" size={24} />
                            </span>
                            <span className="bg-white shadow-sm border rounded-circle p-2 mx-1">
                                <SlSocialInstagram className="text-primary" size={24} />
                            </span>
                            <span className="bg-white shadow-sm border rounded-circle p-2 mx-1">
                                <SlSocialLinkedin className="text-primary" size={24} />
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
