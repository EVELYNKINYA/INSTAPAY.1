import React from "react";
import CountUp from "react-countup";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "./Shared/Footer";
//import Navbar from "../Shared/Navbar"

const Home = () => {
    return (
        <div>

            <Container className="text-center mt-5 mb-5">
                <h4 className="font-weight-bold">Send money in a heartbeat</h4>
                <h1 className="display-4 font-weight-bold">
                    Your Finances At Your <br className="d-none d-lg-block" /> Fingertips
                </h1>
                <p className="lead">
                    Sign up to start saving on money transfers and bill payments.
                </p>
            </Container>
            <Container className="mt-5">
                <Row className="bg-white border shadow-lg rounded-lg py-4">
                    {[
                        { end: 10, label: "Supported Currencies" },
                        { end: 3, label: "Available Countries" },
                        { end: 10, label: "Payment Methods" },
                        { end1: 7, end2: 24, label: "Support Team" },
                    ].map((item, index) => (
                        <Col key={index} xs={6} md={3} className="text-center py-4">
                            <h1 className="display-4 text-primary">
                                <CountUp end={item.end || item.end1} />
                                {item.end2 && <>/<CountUp end={item.end2} />+</>}
                                {!item.end2 && "+"}
                            </h1>
                            <p>{item.label}</p>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container className="d-flex flex-column flex-lg-row align-items-center mb-5">
                
            </Container>

            <Container fluid className="text-center text-white py-5" style={{ backgroundImage: "url('/images/our-solutions-bg.png')", backgroundSize: 'cover' }}>
                <h3 className="text-success font-weight-bold">High speeds. Low fees.  No hassle.</h3>
                <h1 className="display-4 font-weight-bold">
                    All Your Payments In <br className="d-none d-lg-block" /> One Place
                </h1>
                <p className="lead text-opacity-80">
                    Get used to zero transaction fees on all  your transactions.
                </p>
            </Container>

            <Container className="mt-n5 mb-5">
                <Row className="g-4">
                    {[
                        { img: "/images/our-solutions-icon-1.png", title: "Send Money", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                        { img: "/images/our-solutions-icon-2.png", title: "Receive Money", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                        { img: "/images/our-solutions-icon-3.png", title: "Request Money", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                        { img: "/images/our-solutions-icon-4.png", title: "Global Account", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." }
                    ].map((item, index) => (
                        <Col md={6} xl={3} key={index} className="d-flex">
                            <Card className="w-75 border rounded-1 p-4 text-center shadow-sm">
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title className="text-primary">{item.title}</Card.Title>
                                    <Card.Text>{item.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                
            </Container>
            <Footer />
            
        </div>
    );
};

export default Home;
