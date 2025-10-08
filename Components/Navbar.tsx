import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, Nav, Image, Modal, Button } from 'react-bootstrap';
import { app } from '../firebaseconfig'; 
import { getAuth, signOut } from 'firebase/auth';

const NavBar: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [logoutConfirmed, setLogoutConfirmed] = useState(false); // State to track if logout is confirmed
  const auth = getAuth(app); // Initialize Firebase Auth

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogoutConfirmation = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleLogoutCancel = () => {
    setShowModal(false); // Close the modal without logging out
  };

  const handleLogoutConfirm = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        window.location.href = '/'; // Redirect after logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <>
      <Navbar fixed="top" style={{ backgroundColor: '#0E4F18' }} variant="dark" expand="lg">
        <Navbar.Brand style={{ fontFamily: 'Lemonada', color: 'white', fontSize: '28px', marginLeft: '30px' }}>
          TeaLeaf Guard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Link href="/home" passHref>
              <div style={{ color: 'white', fontFamily: 'Playpen Sans', fontSize: '20px', marginRight: '28px' }}>
                Home
              </div>
            </Link>
            <Link href="/forecasting" passHref>
              <div style={{ color: 'white', fontFamily: 'Playpen Sans', fontSize: '20px', marginRight: '28px' }}>
                Demand Forecasting
              </div>
            </Link>
            <Link href="/yield" passHref>
              <div style={{ color: 'white', fontFamily: 'Playpen Sans', fontSize: '20px', marginRight: '28px' }}>
                Yield Prediction
              </div>
            </Link>
            <Link href="/teadisease" passHref>
              <div style={{ color: 'white', fontFamily: 'Playpen Sans', fontSize: '20px', marginRight: '28px' }}>
                Tea disease
              </div>
            </Link>
            <Link href="/teagrading" passHref>
              <div style={{ color: 'white', fontFamily: 'Playpen Sans', fontSize: '20px', marginRight: '30px' }}>
               Tea grading
              </div>
            </Link>

            {/* Logout Button */}
            <div onClick={handleLogoutConfirmation} style={{ cursor: 'pointer' }}>
              <Image
                src="/assets/logout1.png" 
                alt="Logout"
                width={40}
                height={45}
                style={{ marginRight: '20px' }}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal for Logout Confirmation */}
      <Modal show={showModal} onHide={handleLogoutCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogoutCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogoutConfirm}>
            Confirm Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
