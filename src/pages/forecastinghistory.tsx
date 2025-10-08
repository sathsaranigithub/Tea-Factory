import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import NavBar from '../../Components/Navbar'; // Assuming you have a NavBar component
import Image from 'next/image';
import Head from 'next/head';

const ForecastingHistoryPage = () => {
    // Sample list of yield predictions
    const yieldHistory = [
        { id: 1, title: 'List view 1', description: 'To predict yield, TeaYield AI analyzes a combination of critical factors including weather patterns, soil health, plant growth stages, and historical data, providing accurate projections to help you plan for optimal harvest and resource management.' },
        { id: 2, title: 'List view 2', description: 'To predict yield, TeaYield AI analyzes a combination of critical factors including weather patterns, soil health, plant growth stages, and historical data, providing accurate projections to help you plan for optimal harvest and resource management.' }
    ];

    return (
        <>
            <Head>
                <title>Forecasting History | TeaLeaf Guard</title>
                <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans&family=Poppins:wght@600&display=swap" rel="stylesheet" />
                <style>{`
                    body {
                        background-color: white;
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        font-family: 'Poppins, sans-serif';
                    }
                    h1 {
                        font-family: 'Playpen Sans, sans-serif';
                        font-weight: 600;
                        font-size: 35px;
                        color: black;
                    }
                    .custom-card {
                        background-color: #f0f8f0;
                        border-radius: 15px;
                        padding: 20px;
                        margin-bottom: 15px;
                        font-family: 'Poppins, sans-serif';
                    }
                    .view-more-btn {
                        background-color: #BD913B;
                        border-color: #BD913B;
                        color: white;
                        padding: 10px 30px;
                        font-family: 'Poppins, sans-serif';
                    }
                    .image-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                `}</style>
            </Head>

            <NavBar /> {/* Assuming you have a NavBar component */}

            <Container className="mt-5">
                {/* Image aligned to the right */}
                <div className="image-wrapper">
                    <h1 style={{ fontFamily: 'Playpen Sans, sans-serif', fontWeight: '600', fontSize: '35px', color: 'black' }}>
                    Demand Forecasting History
                    </h1>
                    <Image
                        src="/assets/ho3.png"
                        alt="Yield Prediction"
                        width={190}
                        height={100}
                    />
                </div>

                <Row className="mt-4">
                    {yieldHistory.map((item) => (
                        <Col xs={12} key={item.id}>
                            <div className="custom-card">
                                <h5 style={{ fontFamily: 'Playpen Sans, sans-serif', color: 'black' }}>{item.title}</h5>
                                <p style={{ fontFamily: 'Playpen Sans, sans-serif', color: 'black' }}>{item.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>

                <div className="text-center mt-4">
                    <Button className="view-more-btn" style={{ fontFamily: 'Playpen Sans, sans-serif', color: 'white' }}>View More</Button>
                </div>
            </Container>
        </>
    );
};

export default ForecastingHistoryPage;
