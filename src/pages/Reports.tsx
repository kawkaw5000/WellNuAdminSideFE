import { useState } from 'react'

export default function Reports() {
  const [reportType, setReportType] = useState('user-activity')

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    alert('Export functionality coming soon!')
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
          Reports & Analytics
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🖨️ Print Report
          </button>
          <button
            onClick={handleExport}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📊 Export to Excel
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Select Report Type:
        </label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '200px'
          }}
        >
          <option value="user-activity">User Activity Report</option>
          <option value="food-consumption">Food Consumption Report</option>
          <option value="nutrition-analysis">Nutrition Analysis Report</option>
          <option value="user-engagement">User Engagement Report</option>
        </select>
      </div>

      {/* Report Content */}
      <div className="printable-report" style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '8px' }}>
        {reportType === 'user-activity' && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
              WellNu Admin Panel - User Activity Report
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Report Period:</strong> September 2025</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Users</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>8</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Active Users</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>6</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Inactive Users</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f44336' }}>2</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>New Registrations</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF9800' }}>3</div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>User Role</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Count</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Admin</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>2</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>25%</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Moderator</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>3</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>37.5%</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>User</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>3</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>37.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'food-consumption' && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
              WellNu Admin Panel - Food Consumption Report
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Report Period:</strong> September 2025</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Food Item</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Times Logged</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Avg Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fried Chicken</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fast Food</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>15</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>506 cal</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Banana</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fruits</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>8</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>40 cal</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Chicken Adobo</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>Poultry</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>12</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>350 cal</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'nutrition-analysis' && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
              WellNu Admin Panel - Nutrition Analysis Report
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Analysis Period:</strong> September 2025</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg Daily Calories</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF5722' }}>1,847</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg Protein (g)</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>68.2</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg Carbs (g)</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>142.5</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg Fat (g)</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF9800' }}>45.8</div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'user-engagement' && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
              WellNu Admin Panel - User Engagement Report
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Report Period:</strong> September 2025</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Daily Active Users</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>4.2</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Food Logs/Day</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>6.8</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg Session Time</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF9800' }}>8.5m</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @media print {
            .printable-report {
              border: none !important;
              box-shadow: none !important;
            }
            button {
              display: none !important;
            }
            select {
              display: none !important;
            }
            label {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  )
}
