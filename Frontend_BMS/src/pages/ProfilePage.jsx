import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch profile on load
useEffect(() => {
  console.log("Fetching profile...");
  console.log("GET URL:", `${import.meta.env.VITE_API_BASE_URL}/users/profile`);

  axios.get(`http://localhost:5000/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
})

    .then((res) => {
      console.log("Profile fetched:", res.data);  // ✅ Add this
      setProfile(res.data);
    })
    .catch((err) => {
      console.error("Profile fetch failed:", err);
      alert("Session expired or unauthorized. Please login again.");
      navigate("/login");
    });
}, [navigate]);


  // Update profile
  const handleUpdate = () => {
  axios
    .put(`http://localhost:5000/api/users/profile`, profile, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setProfile(res.data);
      setEditMode(false);
    })
    .catch(console.error);
};


  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <nav className="profile-navbar">
        <div className="nav-left">
          <span className="nav-logo">SmartResidence</span>
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="profile-box">
        <h2 className="profile-title">Your Profile</h2>
        <div className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!editMode}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={profile.email || ""} disabled />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              disabled={!editMode}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={profile.dob || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              disabled={!editMode}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              value={profile.gender || ""}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              disabled={!editMode}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              rows={2}
              value={profile.address || ""}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              disabled={!editMode}
            />
          </div>

          <div className="profile-actions">
            {editMode ? (
              <>
                <button onClick={handleUpdate} className="save-btn">
                  Save
                </button>
                <button onClick={() => setEditMode(false)} className="cancel-btn">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setEditMode(true)} className="edit-btn">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
