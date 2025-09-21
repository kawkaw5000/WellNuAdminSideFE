import { useState, useEffect } from 'react'

interface NutrientLog {
  id: number
  userId: number
  foodCategoryId: number
  foodId: number
  calories: number
  protein: number
  fat: number
  carbs: number
  updatedAt: string
}

export default function NutrientLogs() {
  const [nutrientLogs, setNutrientLogs] = useState<NutrientLog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data based on your database
  useEffect(() => {
    setTimeout(() => {
      setNutrientLogs([
        { id: 21, userId: 1, foodCategoryId: 1, foodId: 10, calories: 506, protein: 26.2, fat: 35.8, carbs: 19, updatedAt: '2025-09-16 06:37:53.600' },
        { id: 22, userId: 1, foodCategoryId: 1, foodId: 6, calories: 40, protein: 0, fat: 0, carbs: 10, updatedAt: '2025-09-17 14:40:39.287' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredLogs = nutrientLogs.filter(log => 
    log.userId.toString().includes(searchTerm) ||
    log.foodId.toString().includes(searchTerm)
  )

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
        Loading nutrient logs...
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>
          Nutrient Logs ({nutrientLogs.length})
        </h2>
        
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search by User ID or Food ID"
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
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Log ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>User ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Food ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Calories</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Protein (g)</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Fat (g)</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Carbs (g)</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', color: '#666' }}>{log.id}</td>
                <td style={{ padding: '12px' }}>{log.userId}</td>
                <td style={{ padding: '12px' }}>{log.foodId}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{log.calories}</td>
                <td style={{ padding: '12px' }}>{log.protein}</td>
                <td style={{ padding: '12px' }}>{log.fat}</td>
                <td style={{ padding: '12px' }}>{log.carbs}</td>
                <td style={{ padding: '12px', color: '#666', fontSize: '12px' }}>
                  {new Date(log.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No logs found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}
