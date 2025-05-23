// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Contact Section */}
      <div className="footer-top">
        <div className="footer-contact-text">
          <p className="footer-heading">List your Show</p>
          <p className="footer-subtext">
            Got a show, event, activity or a great experience? Partner with us & get listed on GAP_InfoTech
          </p>
        </div>
        <button className="footer-btn">Contact today!</button>
      </div>

      {/* Icons Section */}
      <div className="footer-icons">
        <div className="footer-icon-box">
          <div className="icon">👤</div>
          <p>24/7 CUSTOMER CARE</p>
        </div>
        <div className="footer-icon-box">
          <div className="icon">🎟️</div>
          <p>RESEND BOOKING CONFIRMATION</p>
        </div>
        <div className="footer-icon-box">
          <div className="icon">📧</div>
          <p>SUBSCRIBE TO THE NEWSLETTER</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="footer-grid">
        <div className="footer-block">
          <h3 className="footer-subheading">MOVIES NOW SHOWING IN BENGALURU</h3>
          <p className="footer-text">
            Good Bad Ugly | Sikandar | L2: Empuraan | Mad Square | A Minecraft Movie | Vaamana | Veera Dheera Sooran - Part 2 | Vidyapati | Jack | Manada Kadalu
          </p>
        </div>

        <div className="footer-block">
          <h3 className="footer-subheading">UPCOMING MOVIES IN BENGALURU</h3>
          <p className="footer-text">
            Ashi Hi Jamva Jamvi | Kaiju No.8: Mission Recon | Akaal | The Amateur | Killbill Society | Jay Bhim Panther | Dustbin | Premaku Jai (True Love Never Ends) | Akkada Ammayi Ikkada Abbayi | Puratawn - The Ancient
          </p>
        </div>

        <div className="footer-block">
          <h3 className="footer-subheading">MOVIES BY GENRE</h3>
          <p className="footer-text">
            Drama Movies | Action Movies | Thriller Movies | Comedy Movies | Romantic Movies | Family Movies | Adventure Movies | Sports Movies | Musical Movies | Crime Movies
          </p>
        </div>

        <div className="footer-block">
          <h3 className="footer-subheading">MOVIES BY LANGUAGE</h3>
          <p className="footer-text">
            Movies in English | Movies in Kannada | Movies in Hindi | Movies in Telugu | Movies in Tamil | Movies in Malayalam
          </p>
        </div>
      </div>

      {/* Bottom Divider & Social Icons */}
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <h1 className="footer-logo">
          <span className="text-red-500">GAP<sup>^</sup></span>InfoTech
        </h1>

        <div className="footer-social-icons">
          <span className="social-icon"><FaFacebookF /></span>
          <span className="social-icon"><FaTwitter /></span>
          <span className="social-icon"><FaInstagram /></span>
          <span className="social-icon"><FaYoutube /></span>
          <span className="social-icon"><FaPinterestP /></span>
          <span className="social-icon"><FaLinkedinIn /></span>
        </div>

        <p className="footer-copy">
          Copyright &copy; 2025 GAP^InfoTech Pvt. Ltd. All Rights Reserved.
        </p>
        <p className="footer-disclaimer">
          The content and images used on this site are copyright protected and copyrights vest with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
