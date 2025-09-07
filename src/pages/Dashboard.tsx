import Sidebar from "../components/Sidebar";
import "../css/report.css";
import { Chart } from "react-google-charts";

export default function Dashboard() {
  // Example data
  const locationData = [
    { location: "Mabolo", users: 40 },
    { location: "Consolacion", users: 20 },
    { location: "Mandaue", users: 90 },
    { location: "Liloan", users: 30 },
    { location: "Banilad", users: 10 },
    { location: "Talamban", users: 5 },
  ];

  const totalUsers = 556;
  const online = 65; // %
  const offline = 35; // %

  const pieData = [
    ["Status", "Percentage"],
    ["Offline", offline],
    ["Online", online],
  ];

  const pieOptions = {
    pieHole: 0.6,
    pieSliceText: "none",
    slices: {
      0: { color: "red" },
      1: { color: "green" },
    },
    legend: "none",
  };

  return (
    <div className="reports-container">
      <Sidebar />

      <div className="reports-main">
        <div className="dashboard">
          {/* Users by location */}
          <div className="card">
            <h3>Users by location</h3>
            <div className="bar-list">
              {locationData.map((loc) => (
                <div className="bar-row" key={loc.location}>
                  <span className="bar-label">{loc.location}</span>
                  <div className="bar">
                    <div
                      className="bar-fill"
                      style={{ width: `${loc.users}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total users */}
          <div className="card">
            <h3>Total users</h3>
            <div className="donut-container">
              <Chart
                chartType="PieChart"
                data={pieData}
                options={pieOptions}
                width={"200px"}
                height={"200px"}
              />
              <p className="total-text">{totalUsers} total users</p>
            </div>
            <div className="legend">
              <div className="legend-item">
                <span className="dot red"></span> Offline
              </div>
              <div className="legend-item">
                <span className="dot green"></span> Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
