import React from 'react'

export default function UserDetails({ user, show, handleHide }) {
    return (
        <div className='detailDiv'>
            <p onClick={handleHide}>&#x274C;</p>
            <img src={user.photoURL} alt="ProfilePic" className='detailImg' />
            <h1>Name: {user.displayName}</h1>
            <h2>Email: {user.email}</h2>
        </div>

    )
}
