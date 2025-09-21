import { useState, useEffect } from 'react'

interface DailyIntake {
  id: number
  userId: number
  calorieIntake: number
  updatedAt: string
}

export default function DailyIntakeLogs() {
  const [dailyIntakes, setDailyIntakes] = useState<DailyIntake[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data based on your database
  useEffect(() => {
    setTimeout(() => {
      setDailyIntakes([
        { id: 1, userId: 1, calorieIntake: 1494, updatedAt: '2025-09-16 06:37:53.610' },
        { id: 2, userId: 1, calorieIntake: 40, updatedAt: '2025-09-17 14:40:39.637' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredIntakes = dailyIntakes.filter(intake => 
    intake.userId.toString().includes(searchTerm) ||
    intake.calorieIntake.toString().includes(searchTerm)
  )

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
        Loading daily intake logs...
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>
          Daily Intake Logs ({dailyIntakes.length})
        </h2>
        
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search by User ID or Calorie Intake"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            🔍
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Daily Intake ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>User ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Calorie Intake</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {filteredIntakes.map((intake) => (
              <tr key={intake.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', color: '#666' }}>{intake.id}</td>
                <td style={{ padding: '12px' }}>{intake.userId}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{intake.calorieIntake} cal</td>
                <td style={{ padding: '12px', color: '#666', fontSize: '12px' }}>
                  {new Date(intake.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredIntakes.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No intake logs found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}
