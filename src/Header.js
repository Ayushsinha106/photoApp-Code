import React from 'react'
import { logOut } from './firebase'

export default function Header({ url, handleClick }) {
  const handleLogout = async () => {
    try {
      await logOut()
      // Successful logout, handle navigation or other logic here
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="userLogoDiv">
      <img
        src={url}
        alt="Logo"
        className="userLogo"
        onClick={() => {
          handleClick()
        }}
      />
      <button onClick={handleLogout} className="logOutBtn">
        Log Out
      </button>
    </div>
  )
}
