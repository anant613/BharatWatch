import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import Navbar from "../../components/Navbar/navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // clear error for this field on change
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    // simple email regex (not exhaustive)
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter a valid email";
    if (formData.password.length < 6) err.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call - replace this with your real signup API
      await new Promise((res) => setTimeout(res, 900));

      // On success, navigate to login (or dashboard if you auto-login)
      navigate("/login");
    } catch (error) {
      // handle & show server error
      setErrors({ server: "Signup failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>BharatWatch</h1>
            <h2>Create Account</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                aria-label="Password"
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                aria-label="Confirm Password"
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                aria-label="Full Name"
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-label="Email Address"
              />
            </div>

            <button type="submit" className="auth-btn primary" disabled={submitting}>
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-auth">
            <button className="auth-btn google" type="button" onClick={() => alert("Google OAuth flow")}>
              {/* Google SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button className="auth-btn zoho" type="button" onClick={() => alert("Zoho OAuth flow")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1976D2" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Continue with Zoho
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link-btn">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
