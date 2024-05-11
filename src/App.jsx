import React from 'react';
import './App.css';
import PhotosList from './PhotosList';
import NewPost from './NewPost';
import SignUp from './signUp';
import LogIn from './Login';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Header from './Header';
import UserDetails from './UserDetails';
import UploadBtn from './UploadBtn';

function App() {

  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)
  const [newPostShow, setNewPostShow] = useState(false)
  const [showList, setShowList] = useState(true)

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  if (auth.currentUser) {
    console.log(user.photoURL)
  } else {
    console.log("no user")
  }

  // user login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const userId = auth.currentUser.uid
        console.log(userId)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  //userInfo
  const userInfo = () => {
    setShow(true)
    setShowList(false)
  }

  const handleHide = () => {
    setShow(false)
    setShowList(true)
  }

  const handleNewPostHide = () => {
    setNewPostShow(false)
    setShowList(true)
  }

  const showNewPost = () => {
    setNewPostShow(true)
    setShowList(false)
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest('.Upload')) {
      console.log(true);
      setNewPostShow(false)
    }
  };
  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="App">
      {user ? (
        <>
          {(showList && <> <Header url={user.photoURL} handleClick={userInfo} />
            <UploadBtn handleClick={showNewPost} />
            <PhotosList />
          </>)}
          {newPostShow && <NewPost user={user} handleClickOutside={handleClickOutside} handleHide={handleNewPostHide} />}
          {show && <UserDetails user={user} show={show} handleHide={handleHide} />}
        </>
      ) : (
        <div>
          {showLogin ? <LogIn /> : <SignUp />}
          <p>
            {showLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleForm} className='logInBtn'>
              {showLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
