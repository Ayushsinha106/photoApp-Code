import React, { useState } from 'react'
import { logIn, resetPassword } from './firebase'

function LogIn({ handleShow }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await logIn(email, password)
      console.log(`Done logging in with ${user.email}`)
      // Successful login, handle navigation or other logic here
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  const handleResetPassword = async (email) => {
    try {
      resetPassword(email)
      console.log('Password reset email sent')
    } catch (error) {
      console.error('Error sending password reset email:', error)
    }
  }

  return (
    <div className="signup-container">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="signUpBtn">
          Log In
        </button>
        <button
          onClick={() => {
            handleResetPassword(email)
          }}
        >
          Forgot password
        </button>
      </form>
    </div>
  )
}

export default LogIn
