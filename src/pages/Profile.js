import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Profile.css';
import { defaultImgs } from "../defaultimgs";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Collapse from '../images/collapse.webp';
import Layout from "../components/layout";

const Profile = () => {
  const { id } = useParams();
  const { Moralis, user } = useMoralis();
  const [account, setAccount] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const results = await Moralis.Cloud.run("getUser", {address: id});
      setAccount(results[0])
    }
    getUser();
  }, [id])

  return (
    <Layout title="Profile">
    {account && account.attributes ? (
      <>
        <img className="profileBanner" src={account.attributes.banner ? account.attributes.banner : defaultImgs[1]} alt="" />
        <div className="pfpContainer">
          <img className="profilePFP" src={account.attributes.pfp ? account.attributes.pfp : defaultImgs[0]} alt="" />
          <div className="profileName">{account.attributes.username.slice(0, 6)}</div>
          <div className="profileWallet">{`${account.attributes.ethAddress.slice(0, 4)}...
                ${account.attributes.ethAddress.slice(38)}`}</div>
          {user.attributes.ethAddress === id && (
            <Link to="/settings">
                <div className="profileEdit">Edit profile</div>
            </Link>
          )}
          <div className="profileBio">
          {account.attributes.bio}
          </div>
          <div className="profileTabs">
              <div className="profileTab">
              🐸's quarks
              </div>
          </div>
        </div>
        <TweetInFeed ethAddress={id}></TweetInFeed>
      </>
    ) : ''}
    </Layout>
  );
};

export default Profile;

