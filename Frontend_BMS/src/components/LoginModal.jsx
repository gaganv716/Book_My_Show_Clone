import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate from react-router-dom

const LoginModal = ({ show, handleClose, handleSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize the navigate function

  const isValidEmail = email.trim().length > 0 && email.includes("@");
  const isValidPassword = password.length >= 6;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  };

  const handleCloseAndReset = () => {
    resetForm();
    handleClose();
  };

  const handleSwitchToSignup = () => {
    resetForm();
    handleClose();
    if (typeof handleSignup === "function") {
      handleSignup(); // Switch to signup modal
    } else {
      console.warn("handleSignup is not a function!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail && isValidPassword) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Login Successful with:", { email, password });
        handleCloseAndReset();

        // ✅ After successful login, navigate to the dashboard
        navigate("/dashboard"); // Redirect to the Dashboard page
      }, 1000);
    }
  };

  useEffect(() => {
    if (!show) resetForm();
  }, [show]);

  return (
    <Modal show={show} onHide={handleCloseAndReset} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <p
            className="text-end mt-1"
            style={{ color: "#9c1c1c", cursor: "pointer", fontSize: "0.9rem" }}
          >
            Forgot Password?
          </p>

          <Button
            type="submit"
            className="w-100 mt-2"
            style={{
              backgroundColor: "#9c1c1c",
              borderColor: "#9c1c1c",
              color: "#fff",
              cursor: isValidEmail && isValidPassword ? "pointer" : "not-allowed",
              opacity: isValidEmail && isValidPassword ? 1 : 0.7,
            }}
            disabled={!isValidEmail || !isValidPassword || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            style={{ color: "#9c1c1c", cursor: "pointer", fontWeight: "bold" }}
            onClick={handleSwitchToSignup}
          >
            Sign Up
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
