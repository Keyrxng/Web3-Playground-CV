import React from 'react'

function ListContainer({ children }) {
  return (
    <ul
      style={{ display: 'flex', flexDirection: 'column', margin: '25px 15px' }}
    >
      {children}
    </ul>
  )
}

export default ListContainer
