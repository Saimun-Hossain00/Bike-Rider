import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import facebookIcon from './fb.png';
import googleIcon from './google.png';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import 'firebase/auth';
import './Login.css';
import   firebase from 'firebase/app';


import {initializeLoginFramework, handleGoogleSignIn, handleFbSignIn,resetPassword, createUserWithEmailAndPassword, signInWithEmailAndPassword,} from './LoginManager';


const Login = () => {
 
  initializeLoginFramework();

  
  const [newUser, SetNewUSer] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    success: false,
  });

const [error, setError] = useState("")

 
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);


  const history = useHistory();
  const location = useLocation();


  const { from } = location.state || {
    from: { pathname: '/' },
  };

  
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => handleResponse(res, true));
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => handleResponse(res, true));
  };

 

  const handleResponse = (res, redirect) => { 
    if (res.error) {
      newUser && setError(res.error)
      !newUser && setError(res.error)
    } else {
        setUser(res);
        setLoggedInUser(res);
        storeAuthToken();
        redirect && history.replace(from);
        newUser && setError("")
        !newUser && setError("")
    }
}

const storeAuthToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem('token', idToken);
      history.replace(from);
    })
    .catch(function (error) {
    });
};



  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };


  const handleUserSubmit = () => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
  }

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <div>
    <div className='container d-flex justify-content-center mt-1'>
      <div className="row">
        <div className="col-sm-12">
          {!newUser ? (
            <form
              onSubmit={handleSubmit(handleUserSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >

              
              <h4 className='font-weight-bold mb-4'>Login with your account</h4>

              <div className='customUser'>

              <div className='form-group' controlId='formEmail'>
                <input className="form-control"
                  onBlur={handleBlur} name='email' type='email' placeholder='Email' ref={register({ required: true })} />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </div>
              
              <div className="form-group" controlId='formPassword'>
                <input className="form-control" onBlur={handleBlur} name='password' type='password' placeholder='Password' ref={register({ required: true })} />
                {errors.password && (
                  <span className='error'>Password is required</span>
                )}
              </div>

              <div className='form-group row mt-3 text-center'>
                <div className="form-group col form-check" id='formGridCheckbox'>
                 
                  <input className="form-check-input" type='checkbox' label='Remember me' />
                  <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                </div>
                <div className="form-group col" id='formForget'>
                  <span style={{ cursor: 'pointer', color: 'darkgray' }} onClick={() => resetPassword(user.email ? user.email : alert("please type your email"))} >
                    Forgot Password? <br/>
                    <b id="resPass"></b>
                  </span>
                </div>
              </div>

              {user != null && (
                <p align="center" className='text-danger'>
                  {error}
                </p>
              )}

              <div className="form-group">
                <button className="btn btn-dark" style={{ width: '100%' }} variant='warning'  type='submit' >Login</button>
              </div>

              <div className='form-group col' id='formForget' className='text-center mt-3'>
                <span>Don't have an account?</span>{' '}
                <span style={{ cursor: 'pointer', color: 'darkgray' }} onClick={() => SetNewUSer(true)} >Create an account</span>
              </div>
              </div>

              <p className='another'> or </p>
              <div className='social-login'>
                <button className="btn btn-light" onClick={fbSignIn}>
                  <img align="left" src={facebookIcon} alt='facebook icon' />{' '}
                  <span>Continue with Facebook</span>
                </button>
                <button className ="btn btn-light" onClick={googleSignIn}>
                  <img align="left" src={googleIcon} alt='google icon' />{' '}
                  <span>Continue with Google</span>
                </button>

              </div>
            </form>

          ) : (

            <form
              onSubmit={handleSubmit(handleUserSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >
              <h4 className='font-weight-bold mb-4'>Create an Account</h4>

              <div className='customUser'>

              <div className="form-group" controlId='formFirstName'>
                <input className="form-control" onBlur={handleBlur} name='name'  type='text' placeholder='Name'  ref={register({ required: true })} />
                {errors.email && (
                  <span className='error'>Name is required</span>
                )}
              </div>

              <div className="form-group" controlId='formEmail'>
                <input className="form-control" onBlur={handleBlur} name='email' type='email' placeholder='Email' ref={register({ required: true })} />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </div>

              <div className="form-group" controlId='formPassword'>
                <input className="form-control" onBlur={handleBlur} name='password' type='password' placeholder='Password' ref={register({ required: true, minLength: 6 })} />
                {errors.password && (
                  <span className='error'>
                    6 character with at least 1 digit is required
                  </span>
                )}
              </div>

              <div className="form-group" controlId='formConfirmPassword'>
                <input className="form-control"  onBlur={handleBlur} name='confirmPassword' type='password' placeholder='Confirm Password'
                  ref={register({
                    validate: (value) => value === watch('password'),
                  })}
                />
                {errors.confirmPassword && (
                  <span className='error'>Password don't match</span>
                )}
              </div>

              {user != null && (
                <p align="center" className='text-danger'>
                  {error}
                </p>
              )}

              <div className="form-group">
                <button className="btn btn-dark w-100" variant='primary' type='submit' >  Sign Up </button>

                <div className="form-group text-center mt-3" style={{ color: 'green' }} >
                  {user.success && (
                    <p>
                      User Created Successfully. A verification email sent in
                      your email.
                    </p>
                  )}
                </div>
              </div>

              <div className="form-group col" id='formForget' className='text-center mt-2'>
                <span>Already have an account?</span>{' '}
                <span
                  style={{ cursor: 'pointer', color: 'darkgray' }}
                  onClick={() => SetNewUSer(false)}
                >
                  Login
                </span>
              </div>
              </div>


              <p className='another'> or </p>
              <div className='social-login'>
                <button className="btn btn-light" onClick={fbSignIn}>
                  <img align="left" src={facebookIcon} alt='facebook icon' />{' '}
                  <span>Continue with Facebook</span>
                </button>
                <button className="btn btn-light"  onClick={googleSignIn}>
                  <img align="left" src={googleIcon} alt='google icon' />{' '}
                  <span>Continue with Google</span>
                </button>
              </div>
            </form>
          )}
        
        </div>
      
      </div>
      
    </div>
    </div>
  );
};

export default Login;