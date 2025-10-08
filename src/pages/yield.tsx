import React, { useState } from 'react';
import NavBar from '../../Components/Navbar';
import Image from 'next/image';
import { Container, Row, Col, Dropdown, Button, Modal, Form, ProgressBar, Alert, Card } from 'react-bootstrap';
import Head from 'next/head';
import styles from '../styles/YieldPage.module.css';
import { getFirestore, doc, setDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const YieldPage: React.FC = () => {
    const [questions] = useState([
        { id: 1, question: 'What type of soil is the tea plant grown in?', type: 'dropdown', options: ['Loamy', 'Sandy Loam', 'Clay'], answer: '' },
        { id: 2, question: 'What is the soil pH level?', type: 'input', hint: 'e.g. 6.5', answer: '' },
        { id: 3, question: 'What is the humidity percentage?', type: 'input', hint: 'e.g. 60', answer: '' },
        { id: 4, question: 'What is the temperature (°C)?', type: 'input', hint: 'e.g. 25', answer: '' },
        { id: 5, question: 'How many sunlight hours does the plant receive daily?', type: 'input', hint: 'e.g. 5', answer: '' },
        { id: 6, question: 'What is the current month?', type: 'dropdown', options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], answer: '' },
        { id: 7, question: 'What is the age of the tea plant (in years)?', type: 'input', hint: 'e.g. 3', answer: '' }
    ]);
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));
    const [validationErrors, setValidationErrors] = useState<string[]>(Array(questions.length).fill('')); // Validation errors state
    const [showModal, setShowModal] = useState(false);
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
        if (!validateAnswers()) {
            setShowErrorAlert(true); // Show error alert if there are validation errors
            return;
        }
        setLoading(true);
        const payload = {
            soil_type_input: answers[0],
            soil_pH_input: parseFloat(answers[1]),
            humidity_input: parseFloat(answers[2]),
            temperature_input: parseFloat(answers[3]),
            sunlight_hours_input: parseFloat(answers[4]),
            month_input: answers[5],
            plant_age_input: parseFloat(answers[6]),
        };
        console.log(answers)
        console.log(payload)
        try {
            const response = await fetch('https://us-central1-tea-factory-management-system.cloudfunctions.net/yieldprediction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setResult(data.label);
            setLoading(false);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching the result:', error);
            setLoading(false);
        }
    };
    const handleSave = async () => {
        setSaving(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(firestore, 'yield_prediction', user.uid);
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
    const handleClose = () => setShowModal(false);
    return (
        <>
            <Head>
                <title>Yield Prediction | TeaLeaf Guard</title>
                <meta name="description" content="AI Solutions for Yield Prediction" />
                <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans&family=Poppins:wght@600&display=swap" rel="stylesheet" />
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
                    <h1 style={{ fontFamily: 'Playpen Sans, sans-serif', fontWeight: '600', fontSize: '35px', color: 'black', marginBottom: '35px', marginTop: "30px" }}>
                            AI Solutions for Yield Prediction
                        </h1>
                        <h2 style={{ color: '#BD913B', fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '22px', marginBottom: '15px' }}>
                            AI offers cutting-edge solutions for predicting tea crop yields
                        </h2>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#4A4747' }}>
                            To predict yield, TeaYield AI analyzes a combination of critical factors including weather patterns, soil health, plant growth stages, and historical data, providing accurate projections to help you plan for optimal harvest and resource management.
                        </p>
                        <Image
                            src="/assets/ho2.jpeg"
                            alt="Yield Prediction"
                            width={500}
                            height={300}
                            className={styles.image}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className={`${styles.card} p-3`}>
                            <Card.Body>
                                {questions.map((item, index) => (
                                    <div key={item.id} className="mb-3">
                                        <h6 className={styles.question}>{item.question}</h6>
                                        {item.type === 'dropdown' ? (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" id={`dropdown-${index}`} className={styles['custom-dropdown-toggle']}>
                                                    {answers[index] || "Select answer"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className={styles['custom-dropdown-menu']}>
                                                    {item.options?.map((option, optIndex) => (
                                                        <Dropdown.Item key={optIndex} onClick={() => handleAnswerChange(index, option)}>
                                                            {option}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : (
                                            <Form.Control
                                                type="text"
                                                placeholder={item.hint}
                                                value={answers[index]}
                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            />
                                        )}
                                        {validationErrors[index] && <small className="text-danger">{validationErrors[index]}</small>}
                                    </div>
                                ))}
                                {loading && <ProgressBar animated now={100} label="Submitting..." style={{ height: '10px', marginBottom: '20px' }} />}
                                <Button variant="primary" onClick={handleSubmit} style={{ width: '100%', backgroundColor: '#0E4F18' }}>
                                        Submit
                                    </Button>
                                {result !== null && (
                                    <div className="mt-3">
                                        <h5>The predicted yield is: {result} kg/ha</h5>
                                        <Button className={styles.saveButton} onClick={handleSave} disabled={saving}>
                                            {saving ? 'Saving...' : 'Save'}
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default YieldPage;
