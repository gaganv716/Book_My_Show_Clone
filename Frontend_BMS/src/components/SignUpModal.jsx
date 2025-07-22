import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignUpModal = ({ show, handleClose, handleLogin }) => {
  const [name, setName] = useState(""); // New field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidName = name.trim().length > 0;
  const isValidEmail = email.trim().length > 0 && email.includes("@");
  const isValidPassword = password.length >= 6;
  const passwordsMatch = password === confirmPassword;

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidName || !isValidEmail || !isValidPassword || !passwordsMatch) return;

    setIsSubmitting(true);

    try {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  console.log("Registration successful:", data);

  resetForm();
  alert("🎉 Registration successful! You can now log in.");
  handleClose();
  setTimeout(() => {
    handleLogin();
  }, 300);
} catch (error) {
  console.error("Signup failed:", error.message);
  alert("Signup failed: " + error.message);
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
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
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
              cursor:
                isValidName && isValidEmail && isValidPassword && passwordsMatch
                  ? "pointer"
                  : "not-allowed",
              opacity:
                isValidName && isValidEmail && isValidPassword && passwordsMatch
                  ? 1
                  : 0.7,
            }}
            disabled={
              !isValidName ||
              !isValidEmail ||
              !isValidPassword ||
              !passwordsMatch ||
              isSubmitting
            }
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ color: "#9c1c1c", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              handleClose();
              handleLogin();
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
