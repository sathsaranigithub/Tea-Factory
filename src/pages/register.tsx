import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseconfig'; // Adjust the import according to your Firebase setup
import { useRouter } from 'next/router'; // Import useRouter

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth(app); // Initialize Firebase Authentication
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (!email || !password || !confirmPassword) {
      setError('Email, password, and confirm password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Registration successful! You can now log in.');
      setError(''); // Clear any previous error messages
      setEmail(''); // Clear the email input
      setPassword(''); // Clear the password input
      setConfirmPassword(''); // Clear the confirm password input
      setTermsAccepted(false); // Reset the checkbox

      // Redirect to the home page after successful registration
      router.push('/home');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Capture any errors from Firebase
      } else {
        setError('An unknown error occurred.'); // Handle unexpected errors
      }
      setSuccess(''); // Clear success message if there's an error
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lemonada:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container fluid className="vh-100">
        <Row className="h-100">
          {/* Left Side - Image */}
          <Col xs={12} md={6} className="d-none d-md-block p-0">
            <div
              style={{
                backgroundImage: "url('/assets/login.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
              }}
            />
          </Col>

          {/* Right Side - Registration Form */}
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'white' }}>
            <div className="p-4" style={{ maxWidth: '400px', width: '100%' }}>
              {/* Logo and Company Name */}
              <div className="text-center mb-4">
                <img src="/assets/log1.png" alt="Company Logo" width="100" height="100" />
                <h2 style={{ fontFamily: 'Lemonada, sans-serif', fontWeight: 'bold', color: '#2f9e44' }}>
                  TeaLeaf Guard
                </h2>
              </div>

              {/* Register Header */}
              <h3 className="text-center mb-4" style={{ color: 'black' }}>Register</h3>
              <p className="text-center text-muted">Please enter your details to create an account.</p>

              {/* Display error or success message */}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {/* Registration Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: 'black' }}>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="agroinfo@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: 'black' }}>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label style={{ color: 'black' }}>Confirm Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span style={{ color: '#008014' }}>
                        I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
                      </span>
                    }
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                </Form.Group>

                {/* Register Button */}
                <Button variant="success" type="submit" className="w-100" style={{ backgroundColor: '#008014' }}>
                  Register
                </Button>
              </Form>

              {/* Already have an account? */}
              <div className="text-center mt-3">
                <p style={{ color: 'black' }}>
                  Already have an account?{' '}
                  <Link href="/" passHref>
                    <span className="text-success" style={{ cursor: 'pointer' }}>Log In</span>
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
 