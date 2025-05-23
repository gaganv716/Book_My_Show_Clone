import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/users/profile", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((res) => setProfile(res.data))
      .catch(console.error);
  }, []);

  const handleUpdate = () => {
    axios
      .put("/api/users/profile", profile, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((res) => {
        setProfile(res.data);
        setEditMode(false);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-wrapper">
      {/* Navbar */}
      <div className="custom-navbar">
        <span className="brand">GAP^InfoTech</span>
        <div className="nav-actions">
          <button className="nav-button" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <h2>Your Profile</h2>

        <div className="profile-form-group">
          <label>Name</label>
          <input
            value={profile.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!editMode}
          />
        </div>

        <div className="profile-form-group">
          <label>Email</label>
          <input value={profile.email || ""} disabled />
        </div>

        <div className="profile-form-group">
          <label>Phone</label>
          <input
            value={profile.phone || ""}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            disabled={!editMode}
          />
        </div>

        <div className="profile-form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            disabled={!editMode}
          />
        </div>

        <div className="profile-form-group">
          <label>Gender</label>
          <select
            value={profile.gender || ""}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            disabled={!editMode}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="profile-form-group">
          <label>Address</label>
          <textarea
            rows="2"
            value={profile.address || ""}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            disabled={!editMode}
          ></textarea>
        </div>

        <div className="profile-buttons">
          {editMode ? (
            <>
              <button onClick={handleUpdate} className="btn-brick">Save</button>
              <button onClick={() => setEditMode(false)} className="btn-gray">Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="btn-brick">Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
