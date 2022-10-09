import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Site from '../pages/Site';
import Settings from "../pages/Settings";
import Mint from "../pages/Mint";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
import { Token_address } from '../constants';
import { ConnectButton, Icon } from "web3uikit";
import frog from "../../src/images/LOGO-QUARK.PNG";

const ProtectedRoute = () => {
  const { isAuthenticated, Moralis , account } = useMoralis();
  const [ isChecked, setChecked ] = useState(false);
  const [ showMenu, setShowMenu ] = useState(true);

  const Web3Api = useMoralisWeb3Api();
  
  useEffect(() => {
    const checkHasToken = async () => {
      const options = {
        chain: "0x1",
        address: account,
        token_address: Token_address
      };
      const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
      if (polygonNFTs.total > 0) {
        setChecked(true);
      } else {
        setChecked(true);
        // Moralis.User.logOut().then(() => {
        // //    window.location.reload();
        // });
        // toast.error("Sorry you can't enter, you must have a MAXPEPE nft to login 🐸");
      }
    }
    if (isAuthenticated) {
      checkHasToken();
    }
  }, [ isAuthenticated ])
  return (
    <>
    {isChecked ? (
      <div className="page">
        <div className={`sideBar ${showMenu ? 'show' : ''}`}>
          <Sidebar showMenu={showMenu}/>
          <div
              className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              Logout
            </div>
        </div>
        <div className="mainWindow">
            <Route path="" element={<Home showMenu={showMenu} setShowMenu={setShowMenu}/>} />
            {/* <Route path="/profile" element={<Profile showMenu={showMenu} setShowMenu={setShowMenu} />} /> */}
            <Route path="settings" element={<Settings showMenu={showMenu} setShowMenu={setShowMenu}/>} />
            <Route path="user/:id" element={<Profile showMenu={showMenu} setShowMenu={setShowMenu}/>} />
            <Route path="sites/:id" element={<Site showMenu={showMenu} setShowMenu={setShowMenu}/>} />
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
      ) : (
      <div className="loginPage">
        {/* <Icon fill="#ffffff" size={40} svg="plug" /> */}
        <img src={frog} width={80} alt="frog"/>
        <ConnectButton />
      </div>

    )}
    </>
  )
}

export default ProtectedRoute;