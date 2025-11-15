import React from 'react'

function RestaurantCard({ restaurant }) {
  const { name, image, rating, cuisine, address, description } = restaurant

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      background: '#fff'
    }}>
      <div style={{ height: 160, overflow: 'hidden' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>{name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>{cuisine} • {address}</div>
          <div style={{ background: '#10b981', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 13 }}>{rating}</div>
        </div>
        <p style={{ marginTop: 8, fontSize: 13, color: '#374151' }}>{description}</p>
      </div>
    </div>
  )
}

export default RestaurantCard
