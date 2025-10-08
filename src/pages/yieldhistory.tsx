import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import NavBar from '../../Components/Navbar'; 
import Image from 'next/image';
import Head from 'next/head';
import { firestore } from '../../firebaseconfig'; 
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../../firebaseconfig';

interface YieldEntry {
    answers: string[]; 
    result: string;   
}

const YieldHistoryPage: React.FC = () => {
    const [yieldHistory, setYieldHistory] = useState<YieldEntry[]>([]); // Use the defined interface

    useEffect(() => {
        const fetchYieldHistory = async () => {
            try {
                const user = auth.currentUser; // Get current user
                if (user) {
                    const userDocRef = doc(firestore, 'yield_prediction', user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        // Assuming the data structure has an 'entries' array
                        const entries = docSnap.data()?.entries || [];
                        setYieldHistory(entries); // Set the entries array from the user's document
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching yield history:", error);
            }
        };

        fetchYieldHistory(); // Call the function to fetch data
    }, []); // Empty dependency array to run only once on mount

    return (
        <>
            <Head>
                <title>Yield Prediction History | TeaLeaf Guard</title>
                <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans&family=Poppins:wght@600&display=swap" rel="stylesheet" />
                <style>{`
                    body {
                        background-color: white;
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        font-family: 'Poppins', sans-serif;
                    }
                    h1 {
                        font-family: 'Playpen Sans', sans-serif;
                        font-weight: 600;
                        font-size: 35px;
                        color: black;
                    }
                    .custom-card {
                        background-color: #f0f8f0;
                        border-radius: 15px;
                        padding: 20px;
                        margin-bottom: 15px;
                        font-family: 'Poppins', sans-serif;
                    }
                    .view-more-btn {
                        background-color: #BD913B;
                        border-color: #BD913B;
                        color: white;
                        padding: 10px 30px;
                        font-family: 'Poppins', sans-serif;
                    }
                    .image-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .table-header {
                       
                        border-color: #BD913B;
                        
                        
                `}</style>
            </Head>

            <NavBar /> {/* Assuming you have a NavBar component */}

            <Container className="mt-5">
                {/* Image aligned to the right */}
                <div className="image-wrapper">
                    <h1 style={{ fontFamily: 'Playpen Sans, sans-serif', fontWeight: '600', fontSize: '35px', color: 'black' }}>
                        Yield Prediction History
                    </h1>
                    <Image
                        src="/assets/ho2.jpeg"
                        alt="Yield Prediction"
                        width={190}
                        height={100}
                    />
                </div>

                {/* Table to display yield history */}
                <Row className="mt-4">
                    <Col xs={12}>
                        <Table striped bordered hover>
                            <thead className="table-header" style={{ fontFamily: 'Playpen Sans, sans-serif' }}>
                                <tr>
                                    <th>Soil type</th>
                                    <th>Soil PH</th>
                                    <th>Humidity</th>
                                    <th>Temperature</th>
                                    <th>Sunlight hours</th>
                                    <th>Current month</th>
                                    <th>Plant age</th>
                                    <th>Prediction Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yieldHistory.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.answers[0]}</td>
                                        <td>{item.answers[1]}</td>
                                        <td>{item.answers[2]}</td>
                                        <td>{item.answers[3]}</td>
                                        <td>{item.answers[4]}</td>
                                        <td>{item.answers[5]}</td>
                                        <td>{item.answers[6]}</td>
                                        <td>{item.result}</td> {/* Display the result */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default YieldHistoryPage;
