import React from 'react';
import NavBar from '../../Components/Navbar';
import Image from 'next/image';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home | TeaLeaf Guard</title>
        <meta name="description" content="Welcome to TeaLeaf Guard" />
        <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans&family=Poppins:wght@600&display=swap" rel="stylesheet" />
        <style>{`
          html, body {
            background-color: white;
            margin: 0;
            padding: 0;
            height: 100%;
          }
        `}</style>
      </Head>
      <NavBar />
      <Container
        fluid
        style={{
          minHeight: '115vh',
          backgroundColor: 'white',
          position: 'relative',
          overflow: 'hidden',
          height: '400px',
        }}
      >
        <Image
          src="/assets/ho1.png"
          alt="Home Image"
          layout="fill"
          objectFit="cover"
        />

        {/* Text Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '350px',
            left: '10px',
            color: '#BD913B',
            width: '550px',
            textAlign: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '50px',
            zIndex: 1,
          }}
        >
          Empowering tea farmers with cutting-edge AI technology
        </div>

        {/* Secondary Text Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '720px',
            right: '100px',
            color: '#000000',
            width: '1200px',
            textAlign: 'center',
            fontFamily: 'Playpen Sans, sans-serif',
            fontWeight: '600',
            fontSize: '45px',
            zIndex: 1,
          }}
        >
          AI Solutions for Yield Prediction & Market Demand
        </div>
      </Container>

      {/* Buttons Section */}
      <Container className="mt-5" style={{ backgroundColor: 'white' }}>
        <Row className="justify-content-center" style={{ backgroundColor: 'white' }}>
          <Col xs={12} md={3} className="text-center" style={{ backgroundColor: 'white' }}>
            <Button
              onClick={() => router.push('/forecasting')}
              style={{
                backgroundColor: '#BDA83B',
                borderColor: '#BDA83B',
                borderRadius: '30px',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                width: '100%',
              }}
            >
              Forecasting
            </Button>
          </Col>
          <Col xs={12} md={3} className="text-center">
            <Button
              onClick={() => router.push('/yield')} // Navigate to the yield.tsx page
              style={{
                backgroundColor: '#BDA83B',
                borderColor: '#BDA83B',
                borderRadius: '30px',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                width: '100%',
              }}
            >
              Yield Prediction
            </Button>
          </Col>
          <Col xs={12} md={3} className="text-center">
            <Button
              onClick={() => router.push('/forecastinghistory')}
              style={{
                backgroundColor: '#BDA83B',
                borderColor: '#BDA83B',
                borderRadius: '30px',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                width: '100%',
              }}
            >
              Forecasting History
            </Button>
          </Col>
          <Col xs={12} md={3} className="text-center">
            <Button
              onClick={() => router.push('/yieldhistory')}
              style={{
                backgroundColor: '#BDA83B',
                borderColor: '#BDA83B',
                borderRadius: '30px',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                width: '100%',
              }}
            >
              Yield History
            </Button>
          </Col>
        </Row>

        {/* Image and Content Section */}
        <Row className="mt-5 align-items-center">
          <Col xs={12} md={6} className="text-center">
            <Image
              src="/assets/ho2.jpeg" // Replace with your image path
              alt="AI Solution"
              width={500}
              height={300} // Adjust the image dimensions as needed
            />
          </Col>
          <Col xs={12} md={6}>
            <h2
              style={{
                fontFamily: 'Playpen Sans, sans-serif',
                fontWeight: '600',
                fontSize: '35px',
                color: 'black',
              }}
            >
              AI Solutions for Yield Prediction
            </h2>
            <h3
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '22px',
                color: '#BDA83B',
              }}
            >
              AI offers cutting-edge solutions for predicting tea crop yields
            </h3>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                color: '#4A4747',
              }}
            >
              Accurately estimate your tea plantation’s output based on various factors such as weather conditions, soil quality, and plant growth stages. Make informed decisions about resource allocation and harvest timing.
            </p>
          </Col>
        </Row>
        {/* Image and Content Section 2 */}
        <Row className="mt-5 align-items-center">
          <Col xs={12} md={6}>
            <h2
              style={{
                fontFamily: 'Playpen Sans, sans-serif',
                fontWeight: '600',
                fontSize: '35px',
                color: 'black',
              }}
            >
              AI Solutions for Demand Forecasting
            </h2>
            <h3
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '22px',
                color: '#BDA83B',
              }}
            >
              TeaYield AI offers cutting-edge solutions for predicting tea crop forecasting
            </h3>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                color: '#4A4747',
              }}
            >
              AI offers cutting-edge solutions for predicting tea crop yields and forecasting market demand, helping tea producers make informed decisions and optimize their production strategies.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <Image
              src="/assets/ho3.png" // Replace with your image path
              alt="Demand Forecasting"
              width={500}
              height={300} // Adjust the image dimensions as needed
            />
          </Col>

        </Row>
        <h2
          style={{
            fontFamily: 'Playpen Sans, sans-serif',
            fontWeight: '600',
            fontSize: '35px',
            color: 'black',
            textAlign: 'center',

          }}
        >
          Understand and Monitor Your Tea Plant's Development
        </h2>
        {/* New Section: Plant Development Monitoring */}
        <Row className="mt-5 align-items-center">
          <Col xs={12} md={6}>
            <Image
              src="/assets/ho4.png"
              alt="Plant Development"
              width={500}
              height={200} // Adjust the image dimensions as needed
            />
          </Col>
          <Col xs={12} md={6} className="text-center">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                color: '#BDA83B',
              }}
            >
              "AI provides detailed insights into the different growth stages of your tea plants, from seeding to maturity. By analyzing various factors such as soil quality, weather conditions, and plant health, AI helps optimize care at every stage. With real-time monitoring and data-driven recommendations, farmers can ensure that each phase of growth is managed effectively. This technology not only enhances yield but also minimizes the risk of diseases, ensuring healthier, more productive tea plants."
            </p>
          </Col>
        </Row>
        {/* New Section: Plant Development Monitoring */}
        <Row className="mt-5 align-items-center">
          <Col xs={12} md={6}>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                color: '#000000',
              }}
            >
              By accurately identifying the current stage, you can implement the right care strategies, optimize resource allocation, and prevent potential diseases. Whether you're nurturing young seedlings or managing mature plants, our AI-powered analysis helps you make data-driven decisions to maximize yield and ensure healthy growth at every stage.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center">

            <Image
              src="/assets/h6.png" // Replace with your image path
              alt="Plant Development"
              width={500}
              height={200} // Adjust the image dimensions as needed
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
