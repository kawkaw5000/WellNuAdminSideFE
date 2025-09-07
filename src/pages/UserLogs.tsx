import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/report.css"; 
import Profile from '../images/Ellipse 26.svg'
import arrowBtn from '../assets/arrowhead 3.svg'
import Header from "../components/Profile";


export default function UserLogs() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const users = [
    {
      id: 1,
      name: "Joe Goldberg",
      email: "joegoldberg123@gmail.com",
      status: true,
      date: "5/20/2025",
      avatar: Profile,
      firstName: "Joe",
      lastName: "Goldberg",
      birthdate: "01/01/1990",
      gender: "Male",
      weight: "70kg",
      height: "180cm",
      goal: "Stay fit",
      feedbackReport: [
        {
          dateReported: "01/01/2025",
          reports: ["Harassment", "Bullying"]
        }
      ],
    },
    {
      id: 2,
      name: "Sample User",
      email: "sample123@gmail.com",
      status: true,
      date: "10/10/1010",
      avatar: null,
      firstName: "Sample",
      lastName: "User",
      birthdate: "02/02/2000",
      gender: "Female",
      weight: "55kg",
      height: "165cm",
      goal: "Lose weight",
      feedbackReport: [
        {
          dateReported: "01/01/2025",
          reports: ["Harassment", "Bullying"]
        }
      ],
    },
    {
      id: 3,
      name: "Sample User",
      email: "sample123@gmail.com",
      status: false,
      date: "10/10/1010",
      avatar: null,
      firstName: "Sample",
      lastName: "User",
      birthdate: "03/03/1995",
      gender: "Male",
      weight: "80kg",
      height: "175cm",
      goal: "Build muscle",
      feedbackReport: [],
    }
  ];

  const filteredUsers = users.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="reports-container">
      <Sidebar />

      <div className="reports-main">
        {/* Profile header */}
        <Header/>
        {/* Reports card */}
        <div className="reports-card">
          <h2 className="reports-title">Users ({filteredUsers.length})</h2>

          {/* Search bar */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((users) => (
                  <tr key={users.id}>
                    <td className="name-cell">
                      {users.avatar ? (
                        <img
                          src={users.avatar}
                          alt={users.name}
                          className="user-avatar"
                        />
                      ) : (
                        <div className="user-placeholder">👤</div>
                      )}
                      {users.name}
                    </td>
                    <td>{users.email}</td>
                    <td>
                      {users.status ? (
                        <span
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#F44336",
                            width: 100,
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                        >
                          Inactive
                        </span>
                      )}
                    </td>
                    <td>{users.date}</td>
                    <td className="arrow-cell">
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedUser(users)}
                      >
                        <img src={arrowBtn} alt="arrow" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedUser && (
        <div className="modal-overlay">
            <div className="modal-content">
            {/* Close button */}
            <button
                className="modal-close"
                onClick={() => setSelectedUser(null)}
            >
                ✖
            </button>

            {/* Avatar */}
            <div className="modal-avatar-container">
                {selectedUser.avatar ? (
                <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="modal-avatar"
                />
                ) : (
                <div className="user-placeholder">👤</div>
                )}
            </div>

            {/* Info Grid */}
            <div className="modal-info-grid">
                <div className="info-field">
                <p className="label">First name</p>
                <p className="value">{selectedUser.firstName}</p>
                </div>
                <div className="info-field">
                <p className="label">Last name</p>
                <p className="value">{selectedUser.lastName}</p>
                </div>
                <div className="info-field">
                <p className="label">Birthdate</p>
                <p className="value">{selectedUser.birthdate}</p>
                </div>
                <div className="info-field">
                <p className="label">Email address</p>
                <p className="value">{selectedUser.email}</p>
                </div>
                <div className="info-field">
                <p className="label">Gender</p>
                <p className="value">{selectedUser.gender}</p>
                </div>
                <div className="info-field">
                <p className="label">Weight</p>
                <p className="value">{selectedUser.weight}</p>
                </div>
                <div className="info-field">
                <p className="label">Height</p>
                <p className="value">{selectedUser.height}</p>
                </div>
                <div className="info-field">
                <p className="label">Goal</p>
                <p className="value">{selectedUser.goal}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
                <button className="delete-btn">Delete Account</button>
                <button className="edit-btn">Edit Info</button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
}
