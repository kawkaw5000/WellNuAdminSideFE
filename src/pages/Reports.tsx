import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/report.css"; 
import "../css/modal.css"; 
import Profile from '../images/Ellipse 26.svg';
import arrowBtn from '../assets/arrowhead 3.svg';
import Header from "../components/Profile";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [showRestrictModal, setShowRestrictModal] = useState(false);


  const reports = [
    {
      id: 1,
      name: "Joe Goldberg",
      email: "joegoldberg123@gmail.com",
      date: "5/20/2025",
      avatar: Profile,
      feedbackReport: [],
    },
    {
      id: 2,
      name: "Sample User",
      email: "sample123@gmail.com",
      date: "10/10/1010",
      avatar: null,
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
      date: "10/10/1010",
      avatar: null,
      feedbackReport: [
        {
          dateReported: "01/01/2025",
          reports: ["Harassment", "Bullying"]
        }
      ],
    },
    {
      id: 4,
      name: "Sample User",
      email: "sample123@gmail.com",
      date: "10/10/1010",
      avatar: null,
      feedbackReport: [],
    },
  ];

  const filteredReports = reports.filter((r) =>
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
          <h2 className="reports-title">Reports</h2>

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
                  <th>Date reported</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td className="name-cell">
                      {report.avatar ? (
                        <img
                          src={report.avatar}
                          alt={report.name}
                          className="user-avatar"
                        />
                      ) : (
                        <div className="user-placeholder">👤</div>
                      )}
                      {report.name}
                    </td>
                    <td>{report.email}</td>
                    <td>{report.date}</td>
                    <td className="arrow-cell">
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer"
                        }}
                        onClick={() => setSelectedReport(report)}
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

      {/* Modal for feedback reports */}
      {selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content-report">
            <div className="modal-close-cont">
              <button
                className="modal-close-report"
                onClick={() => setSelectedReport(null)}
              >
                ✖
              </button>
            </div>  
            {/* Post section */}
            <div className="post-card">
              <div className="post-header">
                {selectedReport.avatar ? (
                  <img
                    src={selectedReport.avatar}
                    alt={selectedReport.name}
                    className="post-avatar"
                  />
                ) : (
                  <div className="post-placeholder">👤</div>
                )}
                <div>
                  <h4 className="post-user">{selectedReport.name}</h4>
                  <span className="post-time">30m</span>
                </div>
              </div>
              <p className="post-text">This app sucks!</p>
            </div>

            {/* Report section */}
            {selectedReport.feedbackReport && selectedReport.feedbackReport.length > 0 ? (
              selectedReport.feedbackReport.map((fr: any, idx: number) => (
                <div key={idx} className="report-card">
                  <p><strong>Report :</strong> {fr.reports.join(", ")}</p>
                  <p><strong>Num of reports :</strong> {fr.reports.length}</p>
                  <div className="report-actions">
                    <button className="delete-btn">Delete post</button>
                    <button 
                      className="restrict-btn" 
                      onClick={() => setShowRestrictModal(true)}
                    >
                      Restrict user
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No feedback reports for this user.</p>
            )}
          </div>
        </div>
      )}

      {/* Restrict User Modal */}
      {showRestrictModal && (
        <div className="modal-overlay">
          <div className="modal-content-restrict">
            <div className="modal-close-cont">
              <button
                className="modal-close-report"
                onClick={() => setShowRestrictModal(false)}
              >
                ✖
              </button>
            </div>

            <h3 className="restrict-title">
              How many days do u want the user to be restricted?
            </h3>

            <div className="restrict-options">
              <button className="restrict-option">3 days</button>
              <button className="restrict-option">7 days</button>
              <button className="restrict-option">14 days</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
