import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBab98RWO0_4JVrPsH4zbE6GkfIGyB_6WI',
  authDomain: 'crwm-db-fcb45.firebaseapp.com',
  databaseURL: 'https://crwm-db-fcb45.firebaseio.com',
  projectId: 'crwm-db-fcb45',
  storageBucket: 'crwm-db-fcb45.appspot.com',
  messagingSenderId: '932436120000',
  appId: '1:932436120000:web:3b2249afad45120ddb7825',
  measurementId: 'G-Y1CXTPP88C',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
