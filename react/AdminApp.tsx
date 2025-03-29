import React from 'react'

const AdminApp: React.FC = () => {
  const handleClick = () => {
    alert('¡Hola desde la Admin App!')
  }

  return (
    <div>
      <h2>Bienvenido a la Admin App</h2>
      <button onClick={handleClick}>Presióname</button>
    </div>
  )
}

export default AdminApp
