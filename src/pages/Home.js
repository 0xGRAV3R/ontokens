import React, { useEffect } from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import TweetInFeed from "../components/TweetInFeed";
import Layout from "../components/layout";
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis";
import { Token_address2 } from '../constants';
import { toast } from "react-toastify";


const Home = () => {

  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  async function maticTweet() {
    if (!tweet) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      chain: "0x1",
      address: account,
      token_address: Token_address2
    };

    const Token2Data = await Web3Api.account.getNFTsForContract(options);
    if (Token2Data.total === 0) {
      return toast.error("Bummer! you don't have the Q-PASS to post quark yet.");
    }
    
    options = {
      contractAddress: "0x8E452D8573e2B1e8341D3f4aCC07939247cf99c6",
      functionName: "addTweet",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tweetTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tweetImg",
            "type": "string"
          }
        ],
        "name": "addTweet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveTweet() {
    if(!tweet) return;

    let options = {
      chain: "0x1",
      address: account,
      token_address: Token_address2
    };

    const Token2Data = await Web3Api.account.getNFTsForContract(options);
     if (Token2Data.total === 0) {
       return toast.error("Bummer! you don't have the 'Q' PASS to post quarks yet.");
     }

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();
  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <Layout title="Home">
      <div className="mainContent">
        <div className="profileTweet">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="tweetBox">
            <TextArea
              label="what's quarking?"
              name="tweetTxtArea"
              value=""
              type="text"
              onChange={(e) => setTweet(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#7db434" size={20} svg="image"></Icon>
                <div className="maxSize">2MB max</div>
              </div>
              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>!Quark</div>
                {/*<div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>*/}
                  <div className="tweet" style={{ backgroundColor: "#00563f" }}>
                  <Icon fill="#ffffff" size={20} svg="eth" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed ethAddress={false}/>
      </div>
    </Layout>
  );
};

export default Home;
