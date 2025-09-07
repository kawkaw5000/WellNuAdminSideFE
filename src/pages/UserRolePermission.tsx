import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/report.css"; 
import Profile from '../images/Ellipse 26.svg'
import arrowBtn from '../assets/arrowhead 3.svg'
import Header from "../components/Profile";

export default function UserRolePermission() {
  const [search, setSearch] = useState("");
  // const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const users = [
    {
      id: 1,
      name: "Joe Goldberg",
      email: "joegoldberg123@gmail.com",
      userRole: 'Admin',
      status: true,
      date: "5/20/2025",
      avatar: Profile,
      firstName: "Joe",
      lastName: "Goldberg",
      birthdate: "01/01/1990",
      gender: "Male",
      weight: "70kg",
      height: "180cm",
      goal: "Stay fit"
    },
    {
      id: 2,
      name: "Sample User",
      email: "sample123@gmail.com",
      userRole: 'Moderator',
      status: true,
      date: "10/10/1010",
      avatar: null,
      firstName: "Sample",
      lastName: "User",
      birthdate: "02/02/2000",
      gender: "Female",
      weight: "55kg",
      height: "165cm",
      goal: "Lose weight"
    },
    {
      id: 3,
      name: "Sample User",
      email: "sample123@gmail.com",
      userRole: 'Moderator',
      status: false,
      date: "10/10/1010",
      avatar: null,
      firstName: "Sample",
      lastName: "User",
      birthdate: "03/03/1995",
      gender: "Male",
      weight: "80kg",
      height: "175cm",
      goal: "Build muscle"
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
                  <th>Role</th>
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
                      {users.userRole}
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
                        // onClick={() => setSelectedUser(users)}
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
    </div>
  );
}
