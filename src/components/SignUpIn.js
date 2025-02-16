import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Netflix_Logo_PMS from '../assets/Netflix_Logo_PMS.png'
import IN_BACKGROUND_CDN from '../assets/IN_BACKGROUND_CDN.jpg'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/userSlice'
import linkedIn from '../assets/linkedIn.svg'
import x from '../assets/x.svg'
import gitHub from '../assets/gitHub.svg'

const SighUpIn = () => {

  const[isSignInForm, setIsSignInForm] = useState(true)
  const[errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null)

  const handleButtonClick = () => {
    // Validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message)
    if (message) return;
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
        }).then(() => {
          // Profile updated!

          const {uid, email, displayName} = auth.currentUser;
          dispatch(addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            // photoUrl: photoURL
          }));

          navigate("/browse");
        }).catch((error) => {
          // An error occurred
          setErrorMessage(error.message)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage)
      });
    }
  } 
  const toggelSignInUpForm = () =>{
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div className='w-full relative overflow-y-auto'>
      <div className="absolute inset-0 bg-gradient-to-top max-sm:bg-black"></div>
      <div className='absolute bg-gradient-to-b from-black w-full z-10'>
        <img
            className='w-52 max-sm:w-[75px] max-sm:m-4'
            src={Netflix_Logo_PMS}
            alt='Logo'
        />
      </div>
      <div className='w-full'>
          <img
            src={IN_BACKGROUND_CDN}
            alt='' 
            className='w-full h-screen object-center object-cover'
          />
      </div>
      <div className='absolute top-0 bottom-0 flex justify-center items-center w-full overflow-hidden z-10'>
        <form 
            className='bg-black bg-opacity-80 p-16 max-sm:p-6 rounded '
            onSubmit={(e) => e.preventDefault()}
         >
          <div className='flex flex-col space-y-6 w-[314px] max-sm:w-full mb-8'>
            <label className='text-white text-4xl font-semibold'>
              {isSignInForm ? "Sign In" : "Sign Up"}
            </label>
            <div className='flex flex-col space-y-4 text-white'>

              {!isSignInForm &&( 
                <input 
                  ref={name}
                  className='p-4 rounded bg-[#666] outline-none' 
                  type='text' 
                  placeholder='Full Name'
                />
              )}
              <input 
                ref={email}
                className='p-4 rounded bg-[#666] outline-none' 
                type='email' 
                placeholder='Email or Phone number'
              />
              <input 
                ref={password}
                className='p-4 rounded bg-[#666] outline-none'  
                type='password' 
                placeholder='Password'
              />
              <p className='text-netflix-red'>{errorMessage}</p>
            </div>
            
            <button className='p-4 rounded bg-netflix-red text-white' onClick={handleButtonClick}>
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            {isSignInForm && (
              <div className='flex justify-between items-center'>
                <div>
                  <input type='checkbox'/>
                  <span className='ml-3 text-[#B3B3B3]'>Remember me</span>
                </div>
                <Link className='text-[#666]'>Need help?</Link>
              </div>
            )}
            <div className='space-y-2'>
              <h3 onClick={toggelSignInUpForm} className='text-[#737373] text-sm max-sm:text-base cursor-pointer'>
                {isSignInForm ? 'New to Netflix?' : 'Restart your membership.'} 
                <span className='text-white ml-2'>
                  {isSignInForm ? 'Sign up now.' : 'Sign in now.'}
                </span>
              </h3>
                <div className='text-[#8C8C8C] text-xs max-sm:text-base'>Cloned By <span className='font-bold'>©</span> 
                  <span className='text-blue-600 text-xs max-sm:text-base font-semibold'> Vaibhav Saroj</span>
                  <div className='flex mt-2 space-x-2'>
                    <Link to={'https://www.linkedin.com/in/vaibhav-saroj-b456b0221/'}>
                      <img
                        className='w-6'
                        src={linkedIn}
                        alt="linkedIn logo"
                      />
                    </Link>
                    <Link to={'https://twitter.com/Vaibhav_1281'}>
                      <img
                        className='w-6'
                        src={x}
                        alt="twitter logo"
                      />
                    </Link>
                    <Link to={'https://github.com/vaibhav1281?tab=repositories'}>
                      <img
                        className='w-6'
                        src={gitHub}
                        alt="gitHub logo"
                      />
                    </Link>
                  </div>
                </div>
              
            </div>
          </div>
        </form>
      </div>
      
    </div>
  ) 
}
export default SighUpIn