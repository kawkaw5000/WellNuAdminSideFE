
import { useEffect, useState } from 'react';
import { apiService, type UserStats } from '../services/apiService';
import './LogsAndReports.css';

interface FoodLog {
  id: number;
  foodName: string;
  foodCategoryId: number;
  categoryName: string;
}
interface NutrientLog {
  id: number;
  userId: number;
  foodCategoryId: number;
  foodId: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  updatedAt: string;
}
interface DailyIntakeLog {
  id: number;
  userId: number;
  calorieIntake: number;
  updatedAt: string;
}


const LogsAndReports = () => {
  // Food logs state
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [foodLoading, setFoodLoading] = useState(true);
  const [foodError, setFoodError] = useState('');

  // Nutrient logs state
  const [nutrientLogs, setNutrientLogs] = useState<NutrientLog[]>([]);
  const [nutrientLoading, setNutrientLoading] = useState(true);
  const [nutrientError, setNutrientError] = useState('');

  // Daily intake logs state
  const [dailyIntakeLogs, setDailyIntakeLogs] = useState<DailyIntakeLog[]>([]);
  const [dailyIntakeLoading, setDailyIntakeLoading] = useState(true);
  const [dailyIntakeError, setDailyIntakeError] = useState('');

  // User stats state for Reports & Analytics
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    // Fetch food logs
    const fetchFoodLogs = async () => {
      try {
        setFoodLoading(true);
        setFoodError('');
        const data = await apiService.getFoodLogs();
        setFoodLogs(data.foodLogs || []);
      } catch (err) {
        setFoodError('Failed to fetch food logs. Make sure the backend is running.');
      } finally {
        setFoodLoading(false);
      }
    };
    fetchFoodLogs();

    // Fetch nutrient logs
    const fetchNutrientLogs = async () => {
      try {
        setNutrientLoading(true);
        setNutrientError('');
        const data = await apiService.getNutrientLogs();
        setNutrientLogs(data.nutrientLogs || []);
      } catch (err) {
        setNutrientError('Failed to fetch nutrient logs. Make sure the backend is running.');
      } finally {
        setNutrientLoading(false);
      }
    };
    fetchNutrientLogs();

    // Fetch daily intake logs
    const fetchDailyIntakeLogs = async () => {
      try {
        setDailyIntakeLoading(true);
        setDailyIntakeError('');
        const data = await apiService.getDailyIntakeLogs();
        setDailyIntakeLogs(data.dailyIntakeLogs || []);
      } catch (err) {
        setDailyIntakeError('Failed to fetch daily intake logs. Make sure the backend is running.');
      } finally {
        setDailyIntakeLoading(false);
      }
    };
    fetchDailyIntakeLogs();

    // Fetch user stats
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError('');
        const stats = await apiService.getUserStats();
        setUserStats(stats);
      } catch (err) {
        setStatsError('Failed to fetch user stats. Make sure the backend is running.');
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="logs-reports-container">
      <div className="logs-reports-content">
        <div className="logs-reports-box">
          <h3>Food Logs</h3>
          {foodLoading ? (
            <div className="loading-text">Loading food logs...</div>
          ) : foodError ? (
            <div className="error-text">{foodError}</div>
          ) : foodLogs.length === 0 ? (
            <div className="no-data-text">No food logs found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Food Name</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {foodLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td style={{ fontWeight: '500' }}>{log.foodName}</td>
                      <td>{log.categoryName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="logs-reports-box">
          <h3>Nutrient Logs</h3>
          {nutrientLoading ? (
            <div className="loading-text">Loading nutrient logs...</div>
          ) : nutrientError ? (
            <div className="error-text">{nutrientError}</div>
          ) : nutrientLogs.length === 0 ? (
            <div className="no-data-text">No nutrient logs found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Food ID</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Fat</th>
                    <th>Carbs</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrientLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.userId}</td>
                      <td>{log.foodId}</td>
                      <td>{log.calories}</td>
                      <td>{log.protein}</td>
                      <td>{log.fat}</td>
                      <td>{log.carbs}</td>
                      <td style={{ fontSize: '12px' }}>{log.updatedAt ? new Date(log.updatedAt).toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="logs-reports-box">
          <h3>Daily Intake Logs</h3>
          {dailyIntakeLoading ? (
            <div className="loading-text">Loading daily intake logs...</div>
          ) : dailyIntakeError ? (
            <div className="error-text">{dailyIntakeError}</div>
          ) : dailyIntakeLogs.length === 0 ? (
            <div className="no-data-text">No daily intake logs found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Calorie Intake</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyIntakeLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.userId}</td>
                      <td>{log.calorieIntake}</td>
                      <td style={{ fontSize: '12px' }}>{log.updatedAt ? new Date(log.updatedAt).toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="logs-reports-box">
          <h3>Reports & Analytics</h3>
          {statsLoading ? (
            <div className="loading-text">Loading user stats...</div>
          ) : statsError ? (
            <div className="error-text">{statsError}</div>
          ) : userStats ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div><strong>Total Users:</strong> {userStats.total}</div>
              <div><strong>Active Users:</strong> {userStats.active}</div>
              <div><strong>Inactive Users:</strong> {userStats.inactive}</div>
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Printable Summary Panel */}
      <div className="printable-summary">
        <button className="print-button" onClick={handlePrint}>
          🖨️ Print Summary Report
        </button>
        
        <h2>WellNu Admin Summary Report</h2>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '24px' }}>
          Generated on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>

        {/* User Statistics Summary */}
        <div className="summary-section">
          <h4>📊 User Statistics</h4>
          {userStats ? (
            <div>
              <p><strong>Total Users:</strong> {userStats.total}</p>
              <p><strong>Active Users:</strong> {userStats.active}</p>
              <p><strong>Inactive Users:</strong> {userStats.inactive}</p>
              <p><strong>Activity Rate:</strong> {userStats.total > 0 ? Math.round((userStats.active / userStats.total) * 100) : 0}%</p>
            </div>
          ) : (
            <p className="error-text">Statistics unavailable</p>
          )}
        </div>

        {/* Food Logs Summary */}
        <div className="summary-section">
          <h4>🍎 Food Logs Summary</h4>
          {foodLogs.length > 0 ? (
            <>
              <p><strong>Total Food Items:</strong> {foodLogs.length}</p>
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {foodLogs.slice(0, 5).map((log) => (
                    <tr key={log.id}>
                      <td>{log.foodName}</td>
                      <td>{log.categoryName}</td>
                    </tr>
                  ))}
                  {foodLogs.length > 5 && (
                    <tr>
                      <td colSpan={2} style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        ...and {foodLogs.length - 5} more items
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="no-data-text">No food logs available</p>
          )}
        </div>

        {/* Nutrient Logs Summary */}
        <div className="summary-section">
          <h4>🥗 Nutrient Logs Summary</h4>
          {nutrientLogs.length > 0 ? (
            <>
              <p><strong>Total Nutrient Entries:</strong> {nutrientLogs.length}</p>
              <p><strong>Average Calories:</strong> {Math.round(nutrientLogs.reduce((sum, log) => sum + log.calories, 0) / nutrientLogs.length)}</p>
              <p><strong>Average Protein:</strong> {Math.round(nutrientLogs.reduce((sum, log) => sum + log.protein, 0) / nutrientLogs.length)}g</p>
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrientLogs.slice(0, 5).map((log) => (
                    <tr key={log.id}>
                      <td>{log.userId}</td>
                      <td>{log.calories}</td>
                      <td>{log.protein}g</td>
                      <td>{log.updatedAt ? new Date(log.updatedAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                  {nutrientLogs.length > 5 && (
                    <tr>
                      <td colSpan={4} style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        ...and {nutrientLogs.length - 5} more entries
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="no-data-text">No nutrient logs available</p>
          )}
        </div>

        {/* Daily Intake Summary */}
        <div className="summary-section">
          <h4>📅 Daily Intake Summary</h4>
          {dailyIntakeLogs.length > 0 ? (
            <>
              <p><strong>Total Daily Records:</strong> {dailyIntakeLogs.length}</p>
              <p><strong>Average Daily Intake:</strong> {Math.round(dailyIntakeLogs.reduce((sum, log) => sum + log.calorieIntake, 0) / dailyIntakeLogs.length)} calories</p>
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Calorie Intake</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyIntakeLogs.slice(0, 5).map((log) => (
                    <tr key={log.id}>
                      <td>{log.userId}</td>
                      <td>{log.calorieIntake}</td>
                      <td>{log.updatedAt ? new Date(log.updatedAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                  {dailyIntakeLogs.length > 5 && (
                    <tr>
                      <td colSpan={3} style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        ...and {dailyIntakeLogs.length - 5} more records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="no-data-text">No daily intake logs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogsAndReports;
