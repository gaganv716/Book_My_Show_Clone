import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const LoginModal =  ({ show, handleClose, handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  // ✅ Email validation
  const isValidEmail = email.trim().length > 0 && email.includes("@");

  // ✅ Password validation (at least 6 characters)
  const isValidPassword = password.length >= 6;

  const navigate = useNavigate(); // Initialize useNavigate

  // ✅ Reset form and submission state
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  };

  // ✅ Close modal and reset form
  const handleCloseAndReset = () => {
    resetForm();
    handleClose();
  };

  // ✅ Switch to SignUp modal
  const handleSwitchToSignUp = () => {
    resetForm();
    handleClose();      // Close current modal
    handleSignUp();     // Open sign-up modal
  };

  // ✅ Handle Login submission
  // Replace your current handleSubmit with this:
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isValidEmail || !isValidPassword) return;

  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store name and user ID in session storage
    sessionStorage.setItem("username", data.name);
    sessionStorage.setItem("userId", data._id);

    // ✅ Optionally store token for authenticated routes
    sessionStorage.setItem("token", data.token);

    // ✅ Alert the user
    alert(`Welcome back, ${data.name}!`);

    // ✅ Redirect to dashboard
    navigate("/dashboard");

    // ✅ Close modal and reset
    handleCloseAndReset();
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed: " + error.message);
  } finally {
    setIsSubmitting(false);
  }
};


  // Optional: Reset form when modal is closed manually
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

          {/* ✅ Password Input */}
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

          {/* ✅ Forgot Password Link */}
          <p
            className="text-end mt-1"
            style={{ color: "#9c1c1c", cursor: "pointer", fontSize: "0.9rem" }}
          >
            Forgot Password?
          </p>

          {/* ✅ Login Button */}
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

        {/* ✅ Sign Up Button (Switch Modals) */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            style={{ color: "#9c1c1c", cursor: "pointer", fontWeight: "bold" }}
            onClick={handleSwitchToSignUp}
          >
            Sign Up
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
