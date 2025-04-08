import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";


const SignUpModal = ({ show, handleClose, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Email validation
  const isValidEmail = email.trim().length > 0 && email.includes("@");

  // ✅ Password validation (at least 6 characters)
  const isValidPassword = password.length >= 6;
  
  // ✅ Confirm password validation
  const passwordsMatch = password === confirmPassword;

  // ✅ Handle Sign Up Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail || !isValidPassword || !passwordsMatch) return;

    setIsSubmitting(true);

    try {
      // Simulate API call (replace with real backend request)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Account created:", { email });

      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      handleClose(); // Close Sign Up modal
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-3"
            style={{
              backgroundColor: "#9c1c1c",
              borderColor: "#9c1c1c",
              color: "#fff",
              cursor: isValidEmail && isValidPassword && passwordsMatch ? "pointer" : "not-allowed",
              opacity: isValidEmail && isValidPassword && passwordsMatch ? 1 : 0.7,
            }}
            disabled={!isValidEmail || !isValidPassword || !passwordsMatch || isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>

        {/* ✅ Already Registered? Go to Login */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ color: "#9c1c1c", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              handleClose(); // Close Sign Up modal
              handleLogin(); // Open Login modal
            }}
          >
            Login
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
