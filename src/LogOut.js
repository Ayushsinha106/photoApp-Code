import React from 'react'
import { logOut } from './firebase'
import { Button } from 'react-bootstrap'

function LogOut() {
  const handleLogout = async () => {
    try {
      await logOut()
      // Successful logout, handle navigation or other logic here
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div>
      <Button onClick={handleLogout} variant="Button-secondary">
        Log Out
      </Button>
    </div>
  )
}

export default LogOut
