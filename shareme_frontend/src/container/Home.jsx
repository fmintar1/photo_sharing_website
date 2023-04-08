import React , { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../component';
import { client } from '../client';
import logo from '../assets/logo.png';
import Pins from './Pins';
import { userQuery } from '../utils/data';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null)
  // localStorage.getItem that is user
  // if it is not equal to undefined, parse getItem from storage
  // if it is undefined, set it to clear because something didn't go well
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, []);
  

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
    {/*ALL DISPLAY TYPES WILL BE HIDDEN, IN MD DEVICES, VISIBLE FLEX*/}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        {/*SIDEBAR*/}
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28"/>
        </Link>
        {/*dynamic end-user depending on the user*/}
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28"/>
        </Link>
      </div>
    </div>
  )
}

export default Home