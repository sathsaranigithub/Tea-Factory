import React, { useState } from 'react';
import NavBar from '../../Components/Navbar';
import Image from 'next/image';
import { Container, Row, Col, Button, Card, Form, ProgressBar, Spinner, Modal } from 'react-bootstrap';
import Head from 'next/head';
import axios from 'axios';

const teadisease: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
            setResponse(null);
        }
    };
const handleSubmit = async () => {
        if (!selectedImage) {
            alert('Please select an image first!');
            return;
        }

    setLoading(true);
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const res = await axios.post(
                'https://us-central1-tea-factory-management-system.cloudfunctions.net/teadiseasedetection',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (res.data.error === "Enter a valid Image") {
                setShowModal(true); // Show modal if the response contains an error
            } else {
                setResponse(res.data.class);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderDiseaseInfo = () => {
        switch(response) {
            case "Blister Blight":
                return (
                    <>
                        <h4>Blister Blight Disease</h4>
                        <p>Blister Blight is a fungal disease caused by *Exobasidium vexans*. It primarily affects young tea leaves, leading to the development of water-soaked spots which eventually form blisters. The disease thrives in humid and cool conditions and can significantly reduce tea yields if not managed.</p>
                        <p><strong>Treatment:</strong></p>
                        <ul>
                            <li>Prune affected leaves regularly.</li>
                            <li>Apply copper-based fungicides.</li>
                            <li>Ensure proper air circulation by spacing plants.</li>
                            <li>Monitor weather conditions to predict disease outbreaks.</li>
                        </ul>
                    </>
                );
                case "Red rust":
                    return (
                        <>
                            <h4>Red rust Diseases</h4>
                            <p>Red Rust is caused by algae from the genus Cephaleuros. It creates reddish-orange patches on the upper side of leaves, which eventually turn rust-colored. The affected leaves often become brittle and fall off. This disease mainly affects the yield and quality of tea leaves.</p>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Remove and destroy affected leaves.</li>
                                <li>Apply copper fungicides to prevent the spread.</li>
                                <li>Ensure good drainage and avoid waterlogging.</li>
                                <li>Regularly monitor the field to detect early symptoms.</li>
                            </ul>
                        </>
                    );    
                    case "Gray blight":
                        return (
                            <>
                                <h4>Gray blight</h4>
                                <p>Gray Blight is a fungal disease caused by Pestalotiopsis species. It affects tea leaves, creating gray or brown lesions, often surrounded by a yellow halo. Severe infections can cause significant defoliation, impacting both the quantity and quality of the tea harvest.</p>
                                <p><strong>Treatment:</strong></p>
                                <ul>
                                    <li>Apply appropriate fungicides, such as Mancozeb.</li>
                                    <li>Remove infected leaves and plant debris.</li>
                                    <li>Avoid overhead irrigation to reduce leaf wetness.</li>
                                    <li>Improve air circulation by proper pruning.</li>
                                </ul>
                            </>
                        ); 
                        case "Brown Blight":
                        return (
                            <>
                                <h4>Brown Blight</h4>
                                <p>Brown Blight is caused by the fungus Colletotrichum camelliae. It forms brown or dark lesions on leaves and stems, particularly during rainy seasons. The disease can weaken tea plants, reducing leaf quality and yield.</p>
                                <p><strong>Treatment:</strong></p>
                                <ul>
                                    <li>Apply fungicides such as Carbendazim.</li>
                                    <li>Remove and destroy infected plant parts.</li>
                                    <li>Maintain proper plant spacing for air circulation.</li>
                                    <li>Ensure balanced fertilization to improve plant resistance.</li>
                                </ul>
                            </>
                        );    
                
            default:
                return (
                    <>
                        <h4>No treatment available</h4>
                        <p>Please upload valid and clear image.</p>
                        <p>Try again.</p>
                    </>
                );
        }
    };

    return (
        <>
            <Head>
                <title>Tea Disease | TeaLeaf Guard</title>
                <meta name="description" content="AI Solutions for Yield Prediction" />
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
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                         {/* Head Topic */}
                         <h1 style={{ fontFamily: 'Playpen Sans, sans-serif', fontWeight: '600', fontSize: '35px', color: 'black', marginBottom: '30px', marginTop: "30px" }}>
                         Upload an Image for Disease Detection
                        </h1>

                        {/* Sub Topic */}
                        <h2 style={{ color: '#BD913B', fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '22px', marginBottom: '10px' }}>
                            AI Disease Detection offers cutting-edge solutions for detect tea leaves diseases
                        </h2>
                        {/* Paragraph */}
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#4A4747' }}>
                        AI Disease Detection provides innovative and cutting-edge solutions to identify and analyze tea leaf diseases with unparalleled accuracy and efficiency. Leveraging advanced machine learning and image processing techniques, it empowers tea growers to detect diseases early, minimizing crop loss and improving yield quality</p>
                        {/* Image */}
                        <Image
                            src="/assets/tead.png"
                            alt="Yield Prediction"
                            width={500}
                            height={300}
                        />
                    </Col>
                    <Col md={6}>
                        {/* Right-hand side: Card */}
                        <Card className="p-3">
                            <Card.Body>
                                
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Select Image</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                                </Form.Group>
                                {previewImage && (
                                    <div className="text-center mb-3">
                                        <Image src={previewImage} alt="Preview" width={200} height={200} />
                                    </div>
                                )}
                                <Button
                                    variant="success" 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-100"
                                >
                                    {loading ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
                                </Button>
                                {loading && <ProgressBar animated now={100} className="mt-3" />} 
                                {response && (
                                    <div className="mt-3">
                                        {renderDiseaseInfo()}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Invalid Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter valid images</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
    
};
export default teadisease;
