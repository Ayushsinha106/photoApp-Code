import React, { useState } from 'react'
import { signUp, signUpWithProfilePic } from './firebase'

function SignUp({ handleShow }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const user = await signUpWithProfilePic(name, email, password, profilePic)
      console.log(`Done signing up with ${user.email}`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setProfilePic(e.target.files[0])
              const imageUrl = URL.createObjectURL(e.target.files[0])
              setPreviewImage(imageUrl)
            }}
            required
          />
          {profilePic && (
            <img src={previewImage} alt="Preview" className="imgPreview" />
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="signUpBtn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
