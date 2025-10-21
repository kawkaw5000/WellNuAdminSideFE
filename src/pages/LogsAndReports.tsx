
import { useEffect, useState } from 'react';
import { apiService, type UserStats } from '../services/apiService';
import './LogsAndReports.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
interface FoodLog {
  id: number;
  foodName: string;
  foodCategoryId: number;
  categoryName: string;
}

const CHART_COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'];

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

export default function LogsAndReports() {
  // Food logs state
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [foodLogsLoading, setFoodLogsLoading] = useState(true);
  const [foodLogsError, setFoodLogsError] = useState('');
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

  // Date range selection state
  const [startDate, setStartDate] = useState<string>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  });

  useEffect(() => {
    const fetchAllData = async () => {
      // Food logs
      try {
        setFoodLogsLoading(true);
        const response = await apiService.getFoodLogs();
        setFoodLogs(response.foodLogs || []);
        setFoodLogsError('');
      } catch (error) {
        setFoodLogsError(`Failed to load food logs: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setFoodLogs([]);
      } finally {
        setFoodLogsLoading(false);
      }

      // Nutrient logs
      try {
        setNutrientLoading(true);
        const response = await apiService.getNutrientLogs();
        setNutrientLogs(response.nutrientLogs || []);
        setNutrientError('');
      } catch (error) {
        setNutrientError(`Failed to load nutrient logs: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setNutrientLogs([]);
      } finally {
        setNutrientLoading(false);
      }

      // Daily intake logs
      try {
        setDailyIntakeLoading(true);
        const response = await apiService.getDailyIntakeLogs();
        setDailyIntakeLogs(response.dailyIntakeLogs || []);
        setDailyIntakeError('');
      } catch (error) {
        setDailyIntakeError(`Failed to load daily intake logs: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setDailyIntakeLogs([]);
      } finally {
        setDailyIntakeLoading(false);
      }

      // User stats
      try {
        setStatsLoading(true);
        const stats = await apiService.getUserStats();
        setUserStats(stats);
        setStatsError('');
      } catch (error) {
        setStatsError(`Failed to load user stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setUserStats(null);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Date range filtering functions
  const getFilteredFoodLogs = (logs: FoodLog[]): FoodLog[] => {
    // Note: FoodLog doesn't have date fields, so return all logs for now
    // You can add date filtering if FoodLog gets timestamp fields in the future
    return logs;
  };

  const getFilteredNutrientLogs = (logs: NutrientLog[]): NutrientLog[] => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    return logs.filter(log => {
      const logDate = new Date(log.updatedAt);
      return logDate >= start && logDate <= end;
    });
  };

  const getFilteredDailyIntakeLogs = (logs: DailyIntakeLog[]): DailyIntakeLog[] => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    return logs.filter(log => {
      const logDate = new Date(log.updatedAt);
      return logDate >= start && logDate <= end;
    });
  };

  // Get filtered data based on selected date range
  const filteredFoodLogs = getFilteredFoodLogs(foodLogs);
  const filteredNutrientLogs = getFilteredNutrientLogs(nutrientLogs);
  const filteredDailyIntakeLogs = getFilteredDailyIntakeLogs(dailyIntakeLogs);

  const getPeriodLabel = () => {
    const start = new Date(startDate).toLocaleDateString();
    const end = new Date(endDate).toLocaleDateString();
    if (startDate === endDate) {
      return start;
    }
    return `${start} - ${end}`;
  };

  // Quick date preset functions
  const setToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  };

  const setThisWeek = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);
    setStartDate(weekStart.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  };

  const setThisMonth = () => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(monthStart.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="logs-reports-container" data-testid="logs-reports-container">
      <div className="logs-reports-content">
        {/* Date Range Selector */}
        <div className="logs-reports-box" data-testid="date-range-selector">
          <h3>📅 Date Range Selection</h3>
          
          {/* Quick Preset Buttons */}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={setToday}
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px', 
                border: '1px solid #007bff', 
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Today
            </button>
            <button 
              onClick={setThisWeek}
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px', 
                border: '1px solid #28a745', 
                borderRadius: '4px',
                backgroundColor: '#28a745',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Last 7 Days
            </button>
            <button 
              onClick={setThisMonth}
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px', 
                border: '1px solid #17a2b8', 
                borderRadius: '4px',
                backgroundColor: '#17a2b8',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              This Month
            </button>
          </div>

          {/* Custom Date Inputs */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            alignItems: 'center', 
            marginBottom: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontWeight: 'bold', minWidth: '70px' }}>From:</label>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  fontSize: '14px', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#333'
                }}
                data-testid="start-date-input"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontWeight: 'bold', minWidth: '70px' }}>To:</label>
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  fontSize: '14px', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#333'
                }}
                data-testid="end-date-input"
              />
            </div>
          </div>

          {/* Status Display */}
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #e9ecef', 
            borderRadius: '4px',
            fontSize: '14px',
            color: '#495057',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Currently showing:</strong> {getPeriodLabel()} data
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px',
              fontSize: '13px',
              color: '#6c757d'
            }}>
              <span>Food Logs: {filteredFoodLogs.length} items</span>
              <span>•</span>
              <span>Nutrient Logs: {filteredNutrientLogs.length} entries</span>
              <span>•</span>
              <span>Daily Intake: {filteredDailyIntakeLogs.length} records</span>
            </div>
          </div>
        </div>

        {/* Food Table now shows table first for immediate visibility, charts below */}
        <div className="logs-reports-box" data-testid="food-logs-section">
          <h3>🍎 Food Table</h3>
          {foodLogsLoading && <div className="loading-text">Loading food logs...</div>}
          {foodLogsError && !foodLogsLoading && <div className="error-text">{foodLogsError}</div>}
          {!foodLogsLoading && !foodLogsError && (
            filteredFoodLogs.length === 0 ? (
              <div className="no-data-text">No food logs found for {getPeriodLabel().toLowerCase()}.</div>
            ) : (
              <>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table className="food-table" aria-label="Food logs table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Food Name</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFoodLogs.map((food) => (
                        <tr key={food.id}>
                          <td>{food.id}</td>
                          <td>{food.foodName}</td>
                          <td>{food.categoryName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {/* Pie Chart by Category */}
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <h4 style={{ marginTop: 0 }}>Pie: Food Items</h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={Object.values(filteredFoodLogs.reduce((acc, food) => {
                            acc[food.foodName] = acc[food.foodName] || { foodName: food.foodName, count: 0 };
                            acc[food.foodName].count++;
                            return acc;
                          }, {} as Record<string, { foodName: string; count: number }>))}
                          dataKey="count"
                          nameKey="foodName"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {Object.keys(filteredFoodLogs.reduce((acc, food) => {
                            acc[food.foodName] = true; return acc;
                          }, {} as Record<string, boolean>)).map((name, idx) => (
                            <Cell key={name} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Bar Chart by Meal Type (categoryName) with zero placeholders */}
                  <div style={{ flex: 1, minWidth: 250 }} data-testid="meal-type-bar-wrapper">
                    <h4 style={{ marginTop: 0 }}>Bar: Meal Types</h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={["Breakfast","Lunch","Dinner"].map(cat => {
                          const counts = filteredFoodLogs.reduce((acc, food) => {
                            acc[food.categoryName] = (acc[food.categoryName] || 0) + 1; return acc;
                          }, {} as Record<string, number>);
                          return { categoryName: cat, count: counts[cat] || 0 };
                        })}
                        data-testid="meal-type-bar-chart"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoryName" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3498db">
                          { ["Breakfast","Lunch","Dinner"].map((cat)=>{
                            const counts = filteredFoodLogs.reduce((acc, food) => { acc[food.categoryName] = (acc[food.categoryName]||0)+1; return acc; }, {} as Record<string, number>);
                            const val = counts[cat] || 0;
                            return <Cell key={cat} fill={val === 0 ? 'rgba(52,152,219,0.15)' : '#3498db'} data-testid={`meal-bar-${cat.toLowerCase()}`} />
                          }) }
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )
          )}
        </div>
        {/* (Removed accidental duplicate mini charts block) */}
        <div className="logs-reports-box" data-testid="nutrient-logs-section">
          <h3>🥗 Nutrient Logs</h3>
          {nutrientLoading ? (
            <div className="loading-text" data-testid="nutrient-loading">Loading nutrient logs...</div>
          ) : nutrientError ? (
            <div className="error-text" data-testid="nutrient-error">{nutrientError}</div>
          ) : filteredNutrientLogs.length === 0 ? (
            <div className="no-data-text" data-testid="nutrient-no-data">No nutrient logs found for {getPeriodLabel().toLowerCase()}.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table data-testid="nutrient-logs-table">
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
                  {filteredNutrientLogs.map((log) => (
                    <tr key={log.id} data-testid={`nutrient-log-${log.id}`}>
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

        {/* Daily Intake Table (original) */}
        <div className="logs-reports-box" data-testid="daily-intake-section">
          <h3>📅 Daily Intake Logs</h3>
          {dailyIntakeLoading ? (
            <div className="loading-text" data-testid="daily-intake-loading">Loading daily intake logs...</div>
          ) : dailyIntakeError ? (
            <div className="error-text" data-testid="daily-intake-error">{dailyIntakeError}</div>
          ) : filteredDailyIntakeLogs.length === 0 ? (
            <div className="no-data-text" data-testid="daily-intake-no-data">No daily intake logs found for {getPeriodLabel().toLowerCase()}.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table data-testid="daily-intake-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Calorie Intake</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDailyIntakeLogs.map((log) => (
                    <tr key={log.id} data-testid={`daily-intake-log-${log.id}`}>
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

        {/* User Stats */}
        <div className="logs-reports-box" data-testid="analytics-section">
          <h3>📊 Reports & Analytics</h3>
          {statsLoading && <div className="loading-text" data-testid="stats-loading">Loading user stats...</div>}
          {statsError && !statsLoading && <div className="error-text" data-testid="stats-error">{statsError}</div>}
          {!statsLoading && !statsError && (
            userStats ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="user-stats">
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 180px', minWidth: 180 }}>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Active', value: userStats.active },
                            { name: 'Inactive', value: userStats.inactive }
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          <Cell key="active" fill="#2ecc71" />
                          <Cell key="inactive" fill="#e74c3c" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ flex: '1 1 200px', minWidth: 200, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div data-testid="total-users"><strong>Total Users:</strong> {userStats.total}</div>
                    <div data-testid="active-users"><strong>Active Users:</strong> {userStats.active}</div>
                    <div data-testid="inactive-users"><strong>Inactive Users:</strong> {userStats.inactive}</div>
                    <div data-testid="active-rate"><strong>Active Rate:</strong> {userStats.total > 0 ? Math.round((userStats.active / userStats.total) * 100) : 0}%</div>
                    <div style={{ fontSize: 12, color: '#666' }}>Snapshot of current user engagement.</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-data-text" data-testid="stats-no-data">No user statistics available.</div>
            )
          )}
        </div>
      </div>

      {/* Printable Summary Panel */}
      <div className="printable-summary" data-testid="printable-summary">
        <button className="print-button" onClick={handlePrint} data-testid="print-button">
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
        <div className="summary-section" data-testid="summary-user-stats">
          <h4>📊 User Statistics</h4>
          {userStats ? (
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 160px', minWidth: 160 }}>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={[
                      { name: 'Active', value: userStats.active },
                      { name: 'Inactive', value: userStats.inactive }
                    ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                      <Cell key="active" fill="#2ecc71" />
                      <Cell key="inactive" fill="#e74c3c" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: '2 1 180px', minWidth: 180 }}>
              <p><strong>Total Users:</strong> {userStats.total}</p>
              <p><strong>Active Users:</strong> {userStats.active}</p>
              <p><strong>Inactive Users:</strong> {userStats.inactive}</p>
              <p><strong>Activity Rate:</strong> {userStats.total > 0 ? Math.round((userStats.active / userStats.total) * 100) : 0}%</p>
              </div>
            </div>
          ) : (
            <p className="error-text">Statistics unavailable</p>
          )}
        </div>

        {/* Food Table Summary */}
        <div className="summary-section" data-testid="summary-food-table">
          <h4>🍎 Food Table ({getPeriodLabel()})</h4>
          {filteredFoodLogs.length > 0 ? (
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoodLogs.slice(0, 15).map((food) => (
                  <tr key={food.id}>
                    <td>{food.foodName}</td>
                    <td>{food.categoryName}</td>
                  </tr>
                ))}
                {filteredFoodLogs.length > 15 && (
                  <tr>
                    <td colSpan={2} style={{ fontStyle: 'italic', textAlign: 'center' }}>
                      ...and {filteredFoodLogs.length - 15} more items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className="no-data-text">No food data available for {getPeriodLabel().toLowerCase()}</p>
          )}
          {filteredFoodLogs.length > 0 && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
              <div style={{ flex: '1 1 140px', minWidth: 140 }} aria-label="Food items distribution chart" data-testid="summary-food-items-pie">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={Object.values(filteredFoodLogs.reduce((acc, food) => {
                      acc[food.foodName] = acc[food.foodName] || { foodName: food.foodName, count: 0 };
                      acc[food.foodName].count++;
                      return acc;
                    }, {} as Record<string, { foodName: string; count: number }>))} dataKey="count" nameKey="foodName" cx="50%" cy="50%" outerRadius={55}>
                      {Object.keys(filteredFoodLogs.reduce((acc, food) => { acc[food.foodName] = true; return acc; }, {} as Record<string, boolean>)).map((n, idx) => (
                        <Cell key={n} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <ul style={{ listStyle:'none', padding:0, margin:'4px 0 0', display:'flex', flexWrap:'wrap', gap:4, fontSize:10 }}>
                  {Object.keys(filteredFoodLogs.reduce((acc, food) => { acc[food.foodName]=true; return acc; }, {} as Record<string, boolean>)).slice(0,6).map((n, idx)=>(
                    <li key={n} style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <span style={{ width:10, height:10, background:CHART_COLORS[idx % CHART_COLORS.length], display:'inline-block', borderRadius:2 }} /> {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: '1 1 160px', minWidth: 160 }} aria-label="Meal type distribution chart" data-testid="summary-meal-type-bar">
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={["Breakfast","Lunch","Dinner"].map(cat => {
                    const counts = filteredFoodLogs.reduce((acc, food) => { acc[food.categoryName] = (acc[food.categoryName]||0)+1; return acc; }, {} as Record<string, number>);
                    return { categoryName: cat, count: counts[cat] || 0 };
                  })}>
                    <XAxis dataKey="categoryName" hide />
                    <YAxis hide />
                    <Bar dataKey="count" fill="#3498db">
                      { ["Breakfast","Lunch","Dinner"].map(cat => {
                        const counts = filteredFoodLogs.reduce((acc, food) => { acc[food.categoryName] = (acc[food.categoryName]||0)+1; return acc; }, {} as Record<string, number>);
                        const val = counts[cat] || 0;
                        return <Cell key={cat} fill={val===0? 'rgba(52,152,219,0.15)' : '#3498db'} />
                      }) }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display:'flex', justifyContent:'space-around', fontSize:10, marginTop:4 }}>
                  {['Breakfast','Lunch','Dinner'].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>

  {/* Removed Food History and Category Stats summaries as those variables are not defined or fetched. Only showing summaries for user stats, food logs, nutrient logs, and daily intake logs. */}

        {/* Nutrient Logs Summary */}
        <div className="summary-section" data-testid="summary-nutrient-logs">
          <h4>🥗 Nutrient Logs Summary ({getPeriodLabel()})</h4>
          {filteredNutrientLogs.length > 0 ? (
            <>
              <p><strong>Total Nutrient Entries:</strong> {filteredNutrientLogs.length}</p>
              <p><strong>Average Calories:</strong> {Math.round(filteredNutrientLogs.reduce((sum, log) => sum + log.calories, 0) / filteredNutrientLogs.length)}</p>
              <p><strong>Average Protein:</strong> {Math.round(filteredNutrientLogs.reduce((sum, log) => sum + log.protein, 0) / filteredNutrientLogs.length)}g</p>
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
                  {filteredNutrientLogs.slice(0, 10).map((log) => (
                    <tr key={log.id}>
                      <td>{log.userId}</td>
                      <td>{log.calories}</td>
                      <td>{log.protein}g</td>
                      <td>{log.updatedAt ? new Date(log.updatedAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                  {filteredNutrientLogs.length > 10 && (
                    <tr>
                      <td colSpan={4} style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        ...and {filteredNutrientLogs.length - 10} more entries
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="no-data-text">No nutrient logs available for {getPeriodLabel().toLowerCase()}</p>
          )}
        </div>

        {/* Daily Intake Summary (with user info) */}
        <div className="summary-section" data-testid="summary-daily-intake">
          <h4>📅 Daily Intake Summary ({getPeriodLabel()})</h4>
          {filteredDailyIntakeLogs.length > 0 ? (
            <>
              <p><strong>Total Daily Records:</strong> {filteredDailyIntakeLogs.length}</p>
              <p><strong>Average Daily Intake:</strong> {Math.round(filteredDailyIntakeLogs.reduce((sum, log) => sum + log.calorieIntake, 0) / filteredDailyIntakeLogs.length)} calories</p>
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Calorie Intake</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDailyIntakeLogs.slice(0, 10).map((log) => (
                    <tr key={log.id}>
                      <td>{log.userId}</td>
                      <td>{log.calorieIntake}</td>
                      <td>{log.updatedAt ? new Date(log.updatedAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                  {filteredDailyIntakeLogs.length > 10 && (
                    <tr>
                      <td colSpan={3} style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        ...and {filteredDailyIntakeLogs.length - 10} more records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="no-data-text">No daily intake logs available for {getPeriodLabel().toLowerCase()}</p>
          )}
        </div>
      </div>
    </div>
  );
}
