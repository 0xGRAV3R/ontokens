import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Site from './pages/Site';
import Settings from "./pages/Settings";
import Mint from "./pages/Mint";
import CreateSite from './pages/CreateSite';

import "./App.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { ConnectButton } from "web3uikit";
import frog from "../src/images/ontokens-logo.png";
import { Token_address } from './constants';

const App = () => {
  const { isAuthenticated, account } = useMoralis();
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
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/user/:id" element={<Profile/>} />
        <Route path="/create-sites" element={<CreateSite />} />
        <Route path="/sites/:id" element={<Site/>} />
      </Routes>
    ) : (
      <div className="loginPage">
        {/* <Icon fill="#ffffff" size={40} svg="plug" /> */}
        <img src={frog} width={80} alt="frog"/>
        <ConnectButton />
      </div>  
    )}
      <ToastContainer position="top-center" autoClose={10000}/>
    </>
  );
};

export default App;
