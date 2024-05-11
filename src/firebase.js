import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA-fo648HeZTqDOR4eKzI0nOCk2JdCMxmg',
  authDomain: 'photoapp-f9e50.firebaseapp.com',
  databaseURL: 'https://photoapp-f9e50-default-rtdb.firebaseio.com',
  projectId: 'photoapp-f9e50',
  storageBucket: 'photoapp-f9e50.appspot.com',
  messagingSenderId: '16404813897',
  appId: '1:16404813897:web:1349b46969b79ac4660798',
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

const auth = firebase.auth()
const storage = firebase.storage()
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    )
    const user = userCredential.user
    return user
  } catch (error) {
    throw new Error('Error signing up:', error)
  }
}
export const signUpWithProfilePic = async (
  name,
  email,
  password,
  profilePic
) => {
  try {
    //Check if the displayName already exists in the database
    const usersRef = firestore.collection('users')
    const snapshot = await usersRef.where('displayName', '==', name).get()
    if (!snapshot.empty) {
      throw new Error('Username already exists')
    }

    // Create user account with email and password
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    // Upload profile picture to Firebase Storage
    const storageRef = firebase.storage().ref()
    const profilePicRef = storageRef.child(`profile-pics/${user.uid}`)
    await profilePicRef.put(profilePic)

    // Update user profile with name and photoURL
    await user.updateProfile({
      displayName: name,
      photoURL: await profilePicRef.getDownloadURL(),
    })
    await firestore.collection('users').doc(user.uid).set({
      displayName: name,
      email: email,
    })

    return user
  } catch (error) {
    throw error
  }
}
export const logIn = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    )
    const user = userCredential.user
    return user
  } catch (error) {
    throw new Error('Error logging in:', error)
  }
}

export const logOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    throw new Error('Error logging out:', error)
  }
}

export const resetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email)
  } catch (error) {
    throw new Error('Error resetting password:', error)
  }
}

export { storage, firestore, auth }
