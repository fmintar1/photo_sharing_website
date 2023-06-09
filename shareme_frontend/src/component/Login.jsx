import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
// IMPORT GAPI WILL DISABLE POPUP_CLOSED_BY_USER ERROR
import { gapi } from 'gapi-script'
import { client } from '../client'

const Login = () => {
  const navigate = useNavigate();
  const clientId = "982692063566-gth7cn08sjfh31beivqa2qplfgo2d0vk.apps.googleusercontent.com";

  // MIGHT OR MIGHT NOT BE NEEDED
  // useEffect(() => {
  //   gapi.load("client:auth2",() => {
  //     gapi.auth2.init({clientId:clientId})
  //   })
  // },[])

  const responseGoogle = (response) => {
    // console.log(response);
    // profileObj can be obtained from Console inspection
    localStorage.setItem('user', JSON.stringify(response.profileObj))
    const { name, googleId, imageUrl } = response.profileObj;

    // create new sanity doc for user & user will be saved in DB
    const doc = {
      // underscore properties is for sanity to know what document is being created
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }

    // create new documents if it doesn't already exist in DB
    client.createIfNotExists(doc)
      // what happens after new user is made
      .then(() => {
        navigate('/', { replace: true })
      })
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video 
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button type="button" className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login