import React from 'react'
import RestaurantCard from '../../components/user-components/RestaurantCard'

const mockRestaurants = [
  {
    id: 1,
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200&q=80&auto=format&fit=crop',
    rating: '4.6',
    cuisine: 'Indian',
    address: 'Downtown',
    description: 'Authentic home-style Indian dishes with fresh spices.'
  },
  {
    id: 2,
    name: 'Pasta Fresca',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80&auto=format&fit=crop',
    rating: '4.4',
    cuisine: 'Italian',
    address: 'Riverside',
    description: 'Fresh pasta and wood-fired pizzas.'
  },
  {
    id: 3,
    name: 'Sushi House',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop',
    rating: '4.8',
    cuisine: 'Japanese',
    address: 'Harbor',
    description: 'Omakase and seasonal sushi selections.'
  },
  {
    id: 4,
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1547592180-4b2b6f7d4d61?w=1200&q=80&auto=format&fit=crop',
    rating: '4.2',
    cuisine: 'Vegan',
    address: 'Uptown',
    description: 'Healthy bowls, smoothies, and plant-based options.'
  }
]

function Restaurants() {
  return (
    <div style={{ padding: 20 }}>
      {/* Hero / image section */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop"
            alt="restaurants-hero"
            style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <img
            src="https://images.unsplash.com/photo-1541542684-4b7c6f1a2c51?w=800&q=80&auto=format&fit=crop"
            alt="dish-1"
            style={{ width: '100%', height: 126, objectFit: 'cover', borderRadius: 8 }}
          />
          <img
            src="https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80&auto=format&fit=crop"
            alt="dish-2"
            style={{ width: '100%', height: 126, objectFit: 'cover', borderRadius: 8 }}
          />
        </div>
      </div>

      {/* Restaurants grid */}
      <h2 style={{ margin: '8px 0 16px' }}>Nearby Restaurants</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16
      }}>
        {mockRestaurants.map(r => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  )
}

export default Restaurants