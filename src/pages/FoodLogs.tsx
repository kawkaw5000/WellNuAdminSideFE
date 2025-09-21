import { useState, useEffect } from 'react'

interface Food {
  id: number
  foodName: string
  foodCategoryId: number
  categoryName: string
}

export default function FoodLogs() {
  const [foods, setFoods] = useState<Food[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data based on your database
  useEffect(() => {
    setTimeout(() => {
      setFoods([
        { id: 1, foodName: 'Crab', foodCategoryId: 1, categoryName: 'Seafood' },
        { id: 2, foodName: 'Salmon', foodCategoryId: 2, categoryName: 'Fish' },
        { id: 3, foodName: 'Adobong manok', foodCategoryId: 3, categoryName: 'Poultry' },
        { id: 4, foodName: 'Chicken adobo', foodCategoryId: 4, categoryName: 'Poultry' },
        { id: 5, foodName: 'Banana', foodCategoryId: 5, categoryName: 'Fruits' },
        { id: 6, foodName: 'Apple', foodCategoryId: 6, categoryName: 'Fruits' },
        { id: 7, foodName: 'Pork adobo', foodCategoryId: 7, categoryName: 'Meat' },
        { id: 8, foodName: 'Pizza', foodCategoryId: 8, categoryName: 'Fast Food' },
        { id: 9, foodName: 'Gulaman', foodCategoryId: 9, categoryName: 'Dessert' },
        { id: 10, foodName: 'Fried chicken', foodCategoryId: 10, categoryName: 'Fast Food' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredFoods = foods.filter(food => 
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
        Loading food data...
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>
          Food Database ({foods.length})
        </h2>
        
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search foods"
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
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Food ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Food Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Category ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <tr key={food.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', color: '#666' }}>{food.id}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{food.foodName}</td>
                <td style={{ padding: '12px', color: '#666' }}>{food.foodCategoryId}</td>
                <td style={{ padding: '12px' }}>{food.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredFoods.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No foods found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}
