import React from "react";
import { Link } from "react-router-dom";
import { checkUser } from '../Utils/AuthContext';

import { Container, Row, Col, Image, Button } from "react-bootstrap";

const Banner = () => {
    return (
        <section className="bg-light overflow-hidden">
            <div
                className="position-relative bg-auto bg-no-repeat"
                style={{ backgroundImage: "url('/images/banner-map.png')", backgroundPosition: 'top right' }}
            >
                <div>
                    {/* <Image
                        className="position-absolute start-0 bottom-0 animate-ripple2"
                        style={{ width: '20%', height: 'auto' }}
                        src="/images/banner-box.png"
                        alt=""
                    /> */}
                    <Image
                        className="d-none d-md-block position-absolute start-0 top-0"
                        style={{ width: '15%', height: 'auto' }}
                        src="/images/banner-clock.png"
                        alt=""
                    />
                    <Image
                        className="position-absolute"
                        style={{ width: '10%', height: 'auto', left: '48%', bottom: '12%' }}
                        src="/images/banner-rocket.png"
                        alt=""
                    />
                    <Image
                        className="position-absolute end-0 bottom-0 animate-ripple"
                        style={{ width: '10%', height: 'auto' }}
                        src="/images/banner-human.png"
                        alt=""
                    />
                </div>

                <div className="pt-5 pb-5">
                    <Container className="pt-5">
                        <Row className="align-items-center">
                            <Col md={6} className="mb-5 mb-md-0">
                                <Image
                                    src="/images/banner-wallet.png"
                                    className="d-none d-lg-block position-absolute animate-ripple"
                                    style={{ width: '11%', top: '3%', left: '47%' }}
                                    alt=""
                                />
                                <h5 className="fw-bold text-primary mb-3">
                                    Send, request and receive money anywhere, anytime!
                                </h5>
                                <h1 className="display-4 fw-bold text-dark">
                                    Send, Receive,
                                    <br /> Anywhere
                                </h1>
                                <p className="lead text-dark my-4">
                                    Quickly and easily send, receive and
                                    request money online with Instapay.
                                    
                                </p>

                                <div className="d-flex">
                                    {!checkUser() && (
                                        <Button as={Link} to="/signup" variant="primary" className="me-3">
                                            Sign Up 
                                        </Button>
                                    )}
                                </div>
                            </Col>

                            <Col md={6}>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
};

export default Banner;
