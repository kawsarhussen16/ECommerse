import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA-ncSYnklztCoR2C-Rv6bmXF0FJl0J4rs",
  authDomain: "ecommerse-a855f.firebaseapp.com",
  databaseURL: "https://ecommerse-a855f.firebaseio.com",
  projectId: "ecommerse-a855f",
  storageBucket: "ecommerse-a855f.appspot.com",
  messagingSenderId: "413357243256",
  appId: "1:413357243256:web:e3730907504ab83c"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const GoogleLogin = () => auth.signInWithPopup(provider);

export default firebase;
