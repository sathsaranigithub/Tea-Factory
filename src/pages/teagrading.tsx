import React, { useState } from 'react';
import NavBar from '../../Components/Navbar';
import Image from 'next/image';
import { Container, Row, Col, Button, Card, Form, ProgressBar, Modal  } from 'react-bootstrap';
import Head from 'next/head';
import axios from 'axios';

const teagrading: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [gradingTitle, setGradingTitle] = useState<string>('');
    const [gradingDescription, setGradingDescription] = useState<string>('');
    const [gradingTreatment, setGradingTreatment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0); 
    const [showModal, setShowModal] = useState(false);

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
            setResponse(null); // Reset response when new image is selected
        }
    };

    // Submit image to the API
    const handleSubmit = async () => {
        if (!selectedImage) {
            alert('Please select an image first!');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedImage);

        setLoading(true);
        setProgress(0); // Reset progress

        try {
            const res = await axios.post(
                'https://us-central1-tea-factory-management-system.cloudfunctions.net/traleafgrading',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setProgress(percent);
                        }
                    }
                }
            );
            const responseMessage = res.data.class;
            if (res.data.error === "Enter a valid Image") {
                setShowModal(true); // Show modal if the response contains an error
            } else{
            setResponse(responseMessage);} // Set the raw response
            
            // Update grading details based on response
            if (responseMessage === "Unknown Class") {
                setGradingTitle("Please upload valid and clear image");
                setGradingDescription("No grading information available.");
                setGradingTreatment("Try again.");
            } else if (responseMessage === "best") {
                setGradingTitle("Best quality");
                setGradingDescription("The tea grading result indicates Best Quality");
                setGradingTreatment("1. This grade signifies that the tea meets the highest standards of quality, with exceptional leaf texture, uniformity, and minimal impurities.\n2. Such tea is prized for its superior flavor, aroma, and appearance, making it ideal for premium markets.\n3. This level of grading ensures that the tea represents excellence in production, processing, and selection, offering a rich and satisfying experience to tea enthusiasts.");
            } else if (responseMessage === "poor") {
                setGradingTitle("Poor quality");
                setGradingDescription("The tea grading result indicates Poor Quality");
                setGradingTreatment("1. This grade suggests significant deviations from quality standards, such as irregular leaf texture, inconsistent color, or the presence of impurities. \n2. Tea graded as poor may lack the desired flavor, aroma, and visual appeal expected in higher-quality batches.\n3. This result highlights the need for improvement in cultivation, harvesting, or processing techniques.\n4. Addressing these issues can enhance the overall quality and marketability of the tea, ensuring it meets the standards required for a more favorable grading in the future.");
        
            } else {
                setGradingTitle("Unclassified");
                setGradingDescription("");
                setGradingTreatment("No additional information available.");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Tea Grading | TeaLeaf Guard</title>
                <meta name="description" content="AI Solutions for Tea Grading" />
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
                         Upload an Image for Grading Detection
                        </h1>

                        {/* Sub Topic */}
                        <h2 style={{ color: '#BD913B', fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '22px', marginBottom: '10px' }}>
                            AI Grading Detection offers cutting-edge solutions for detect tea Grading 
                        </h2>
                        {/* Paragraph */}
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#4A4747' }}>
                        AI Grading Detection provides state-of-the-art solutions for accurately assessing tea grading quality. By leveraging advanced machine learning and image processing technologies, it simplifies the grading process, ensuring precision and consistency. This innovative approach enables tea producers to evaluate the quality of tea leaves efficiently, saving time and reducing manual errors.</p>
                        {/* Image */}
                        <Image
                            src="/assets/grading.jpg"
                            alt="Yield Prediction"
                            width={500}
                            height={300}
                        />
                    </Col>
                    <Col md={6}>
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
                                <Button className="w-100" variant="success" onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </Button>

                                {/* Progress Bar */}
                                {loading && (
                                    <div className="mt-3">
                                        <ProgressBar now={progress} label={`${progress}%`} />
                                    </div>
                                )}

                                {response && (
                                    <div className="mt-3">
                                        <h5>{gradingTitle}</h5>
                                        <p>{gradingDescription}</p>
                                        <p><strong>Description of the result:</strong></p>
                                        <pre>{gradingTreatment}</pre>
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

export default teagrading;
