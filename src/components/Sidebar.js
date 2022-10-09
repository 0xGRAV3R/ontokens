import React, { useEffect } from "react";
import "./Sidebar.css";
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
import frog from "../images/ontokens-logo.png";

const Sidebar = ({showMenu}) => {

  const { Moralis} = useMoralis();
  const user = Moralis.User.current();

  useEffect(() => {
    console.log(showMenu)
  }, [showMenu])

  return (
    <>
      <div className="siderContent">
        <div className="menu">
          <div className="details">
            {/* <Icon fill="#ffffff" size={33} svg="plug" /> */}
            <img src={frog} width={50} />
          </div>

          <Link to="/" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="grid" />
              Home
            </div>
          </Link>

          <Link to="/create-sites" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="server" />
              Sites
            </div>
          </Link>
       

          <Link to={`/user/${user.attributes.ethAddress}`} className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="user" />
              Profile
            </div>
          </Link>

          <Link to="/settings" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="server" />
              Settings
            </div>
          </Link>

        </div>



        <div className="details">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="profile">
            <div className="who">
              {user.attributes.username.slice(0, 6)}
            </div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
