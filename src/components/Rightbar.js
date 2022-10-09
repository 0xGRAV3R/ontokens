import React from "react";
import './Rightbar.css';
import spaceshooter from "../images/spaceshooter.jpeg";
import queen from "../images/queen.png";
import academy from "../images/academy.png";
import maxpepe from "../images/G4KUbryx.jpeg";
import youtube from "../images/youtube.png";
import scam from "../images/scam-pepe.png";
import profile from "../images/profile.jpg";
import settings from "../images/settings.jpg";
import js from "../images/js.png";
import { Input } from "web3uikit";


const Rightbar = () => {
  const trends = [
    {
      img: queen,
      text: "Queen Elizabeth II has died aged 96",
      link: "https://twitter.com/i/events/1567846420421353472",
    },
    {
      img: maxpepe,
      text: "MAXPEPE TWEETS",
      link: "https://twitter.com/search?q=maxpepe&src=typed_query&f=top",
    },
    {
      img: js,
      text: "Ethereum's 'Merge' Is a Big Deal for Crypto—and the Planet",
      link: "https://www.wired.com/story/ethereum-merge-big-deal-crypto-environment/",
    },
    {
      img: scam,
      text: "What are wallet drainers and how to avoid them?",
      link: "https://medium.com/@ycopyart.xyz/what-are-wallet-drainers-how-to-avoid-them-102aec46c153",
    },
    {/*{
      img: profile,
      text: "Profile",
      link: "/profile",
    },
    {
      img: settings,
      text: "Settings",
      link: "/settings",
    },*/}
    
  ];

  return (
    <>
    <div className="rightbarContent">
      {/*<Input
        label="Search Quark.wtf"
        name ="Search Quark.wtf"
        prefixIcon="search"
        labelBgColor="#141d26" 
        >
      </Input>*/}

    <div className="trends">
      Worth quarking about
      {trends.map((e) => {
          return(
            <>
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} className="trendImg"></img>
              <div className="trendText">{e.text}</div>
            </div>
            </>
          )
      })}

    
     
    </div>
    
    </div>
    <div className="notcopy">
      <sub><small>✨<i><u>not coded by 🐸xpaste</u></i>✨</small></sub> 
    </div>
    
    </>
  );
};

export default Rightbar;

