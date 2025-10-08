import React, { useState } from 'react';
import NavBar from '../../Components/Navbar';
import Image from 'next/image';
import { Container, Row, Col, Dropdown, Button, Modal, Card, Alert } from 'react-bootstrap';
import Head from 'next/head';
import styles from '../styles/YieldPage.module.css'; // Import the CSS Module
import { getFirestore, doc, setDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const forecasting: React.FC = () => {
    // Initialize state for questions and answers
    const [questions] = useState([
        { id: 1, question: 'USD rate?', type: 'input', hint: 'e.g. 300.00', answer: '' },
        { id: 2, question: 'What is the current local price for tea?', type: 'input', hint: 'e.g. 4.89', answer: '' },
        { id: 3, question: 'How much production on competing countries?', type: 'input', hint: 'e.g. 703861', answer: '' },
        { id: 4, question: 'How much tea volume for exporting?', type: 'input', hint: 'e.g. 375735', answer: '' },
        { id: 5, question: 'How much tea consumption in domestic?', type: 'input', hint: 'e.g. 366765', answer: '' }
    ]);
    const [answers, setAnswers] = useState(Array(questions.length).fill('')); // Initialize answers state
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>(Array(questions.length).fill('')); // Validation errors state
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const firestore = getFirestore();
    const auth = getAuth();

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        
        const newValidationErrors = [...validationErrors];
        newValidationErrors[index] = ''; // Reset error message when the user updates the answer
        setValidationErrors(newValidationErrors);
    };
    const validateAnswers = () => {
        const newValidationErrors = [...validationErrors];
        questions.forEach((item, index) => {
            if (answers[index].trim() === '') {
                newValidationErrors[index] = 'This field is required'; // Set error message for empty fields
            }
        });
        setValidationErrors(newValidationErrors);
        return newValidationErrors.every((error) => error === ''); // Returns true if all fields are valid
    };
    const handleSubmit = async () => {
        // setShowModal(true); // Show modal on submit
        if (!validateAnswers()) {
            setShowErrorAlert(true); // Show error alert if there are validation errors
            return;
        }
        setLoading(true);
        const payload = {
            export_destination_demand: parseFloat(answers[0]),
            price_of_tea_local: parseFloat(answers[1]),
            production_competing_countries: parseFloat(answers[2]),
            tea_export_volume: parseFloat(answers[4]),
            domestic_tea_consumption: parseFloat(answers[5]),
        };
        console.log(answers)
        console.log(payload)
        try {
            const response = await fetch('https://us-central1-tea-factory-management-system.cloudfunctions.net/demand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log(data)
            setResult(data["Forecasted tea demand (kg)"]);
            setLoading(false);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching the result:', error);
            setLoading(false);
        }
    };
    const handleSave = async () => {
        console.log('Saving results:', answers); // Handle saving logic
        // setShowModal(false); // Close modal after saving
        setSaving(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(firestore, 'demand_prediction', user.uid);
                const entry = {
                    answers,
                    result,
                    timestamp: new Date().toISOString(),
                };
                await setDoc(userDocRef, {
                    entries: arrayUnion(entry)
                }, { merge: true });
                setSaving(false);
                setShowModal(false);
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            setSaving(false);
        }
    };
    const handleClose = () => setShowModal(false); // Close modal
    return (
        <>
            <Head>
                <title>Demand Forecasting | TeaLeaf Guard</title>
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
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Saved to database successfully!
                </Alert>
            )}
            {showErrorAlert && (
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                    Please fill out all fields before submitting.
                </Alert>
            )}
            <Container className="mt-5">
                <Row>
                    <Col xs={12} md={6}>
                        {/* Head Topic */}
                        <h1 style={{ fontFamily: 'Playpen Sans, sans-serif', fontWeight: '600', fontSize: '35px', color: 'black', marginBottom: '30px', marginTop: "30px" }}>
                            AI Solutions for Demand Forcasting
                        </h1>

                        {/* Sub Topic */}
                        <h2 style={{ color: '#BD913B', fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '22px', marginBottom: '10px' }}>
                            AI forecasting offers cutting-edge solutions for predicting tea crop forecasting
                        </h2>
                        {/* Paragraph */}
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#4A4747' }}>
                            In the dynamic world of tea production, accurate demand forecasting is crucial for optimizing operations and ensuring sustainability. By leveraging advanced AI technologies, our forecasting solutions analyze historical sales data, market trends, and consumer preferences to predict future demand with precision. This proactive approach allows tea factories to streamline production schedules, minimize waste, and make informed decisions about inventory management.   </p>
                        {/* Image */}
                        <Image
                            src="/assets/ho3.png"
                            alt="Yield Prediction"
                            width={500}
                            height={300}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        {/* Card for Questions Section */}
                        <Card className="p-3" style={{ marginTop: "30px" }}>
                            <Card.Body>
                                {/* Questions Section */}
                                {questions.map((item, index) => (
                                    <div key={item.id} className="mb-3">
                                        {/* Display the question in the dropdown toggle */}
                                        <h6 style={{ fontFamily: 'Poppins, sans-serif', color: '#868181' }}>{item.question}</h6>
                                        <input
                                            type="text"
                                            placeholder={item.hint}
                                            value={answers[index]}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            className="form-control"
                                        />
                                        {/* Display validation error */}
                                        {validationErrors[index] && (
                                            <p style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>{validationErrors[index]}</p>
                                        )}
                                    </div>
                                ))}
                                {/* Submit button styled with marginLeft for positioning */}
                                <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
                                    <Button variant="primary" onClick={handleSubmit} style={{ width: '100%', backgroundColor: '#0E4F18' }}>
                                        Submit
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/* Modal for displaying selected answers */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Playpen Sans, sans-serif', fontWeight: '600', fontSize: '35px', color: 'black', marginBottom: '35px' }}>Demand Forecasting Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your selected answers: {answers.join(', ')}</p>
                    <p>Forecasted Tea Demand: {result}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ backgroundColor: '#0E4F18', borderColor: '#0E4F18' }} onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default forecasting;
