import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseconfig'; // Adjust the import according to your Firebase setup
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const auth = getAuth(app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setLoading(true);
    setProgress(20); // Start progress

    // Validation
    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      setProgress(50); // Update progress
      await signInWithEmailAndPassword(auth, email, password);
      setProgress(100); // Complete progress
      // Redirect to the home page after successful login
      router.push('/home');
    } catch (err) {
      setProgress(0); // Reset progress on error
      if (err instanceof Error) {
        setError(err.message); // Capture Firebase errors
      } else {
        setError('An unknown error occurred.');
      }
      setLoading(false);
    }

    setLoading(false);
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
            <div style={{ position: 'relative', height: '100%' }}>
              <Image
                src="/assets/login.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </Col>

          {/* Right Side - Login Form */}
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'white' }}>
            <div className="p-4" style={{ maxWidth: '400px', width: '100%', }}>
              {/* Logo and Company Name */}
              <div className="text-center mb-4">
                <img src="/assets/log1.png" alt="Company Logo" width="100" height="100" />
                <h2 style={{ fontFamily: 'Lemonada, sans-serif', fontWeight: 'bold', color: '#2f9e44' }}>
                  TeaLeaf Guard
                </h2>
              </div>

              {/* Login Header */}
              <h3 className="text-center mb-4" style={{ color: 'black' }}>Login</h3>
              <p className="text-center text-muted" style={{ color: 'black' }}>
                Please enter your login details to sign in.
              </p>

              {/* Progress Bar */}
              {loading && (
                <ProgressBar now={progress} label={`${progress}%`} />
              )}
              
              {/* Error Alert */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Login Form */}
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

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label={<span style={{ color: 'black' }}>Keep me logged in</span>}
                    style={{ color: '#008014' }}
                  />
                </Form.Group>

                {/* Login Button */}
                <Button
                  style={{ backgroundColor: '#008014', borderColor: '#008014' }}
                  type="submit"
                  className="w-100 text-white"
                  disabled={loading} // Disable button during loading
                >
                  Log In
                </Button>
              </Form>

              {/* Sign Up Link */}
              <div className="text-center mt-3">
                <p style={{ color: 'black' }}>
                  Don’t you have an account?{' '}
                  <Link href="/register" passHref>
                    <span className="text-success" style={{ cursor: 'pointer' }}>Sign Up</span>
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

export default LoginPage;
