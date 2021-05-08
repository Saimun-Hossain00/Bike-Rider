import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import jwt_decode from 'jwt-decode';

export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
  }
}

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then( (res) =>{
      const { displayName, email } = res.user;
      const signedInUser = { name: displayName, email: email, success:true };
      return signedInUser;
    })
    .catch(function (error) {
      const errorMessage = error.message;
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function (res) {
      const { displayName, email } = res.user;
      const signedInUser = { name: displayName, email: email };
      return signedInUser;
       })
    .catch(function (error) {
      const errorMessage = error.message;
    });
};


export const handleSignOut = () => {
  return firebase.auth().signOut()
  .then(res => {
    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      error: '',
      success: false
    }
    return signedOutUser;
  }).catch(err => {
    const errorMessage = err.message;
  });
}


export const resetPassword = (email) => {
  let auth = firebase.auth();
  auth
    .sendPasswordResetEmail(email)
    .then(
          document.getElementById("resPass").innerText = "Reset password link has been sent to your email address"
      )
};


export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then( res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
  })
  .catch( error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}


export const signInWithEmailAndPassword = (email, password) =>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
  })
  .catch(function(error) {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}


const updateUserName = name =>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  })
};



export const isLoggedIn = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }
  const decodedToken = jwt_decode(token);
  const currentTime = new Date().getTime() / 1000;
  return decodedToken.exp > currentTime;
};

export const loggedInInfo = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }
  const decodedToken = jwt_decode(token);
  return decodedToken;
};