import React from "react";
import styles from "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Logo and Description */}
        <div className={styles.section}>
          <h2>BookMyShow</h2>
          <p>Your one-stop destination for movies, events, and entertainment.</p>
        </div>

        {/* Links Section */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className={styles.section}>
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className={styles.section}>
          <h3>Subscribe to Updates</h3>
          <form className={styles.form}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social Media Icons */}
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <div className={styles.icons}>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className={styles.copyRight}>
        <p>© 2025 BookMyShow. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
