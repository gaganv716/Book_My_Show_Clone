import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Email validation
  const isValidEmail = email.trim().length > 0 && email.includes("@");

  // ✅ Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail) {
      setIsSubmitting(true);

      // Simulate an async request (like API call)
      setTimeout(() => {
        console.log("Email submitted:", email);
        setIsSubmitting(false);
        handleClose(); // Close the modal after submission
      }, 1000);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login with Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ✅ Email Input */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* ✅ Continue Button (Brick Red + Validation) */}
          <Button
            type="submit"
            className="w-100 mt-3"
            style={{
              backgroundColor: "#9c1c1c", // ✅ Brick red color
              borderColor: "#9c1c1c",
              color: "#fff",
              cursor: isValidEmail ? "pointer" : "not-allowed",
              opacity: isValidEmail ? 1 : 0.7, // Dim the button if invalid
            }}
            disabled={!isValidEmail || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
