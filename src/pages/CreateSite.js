import React, { useEffect, useState, useRef } from "react";
import Collapse from '../images/collapse.webp';
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis";
import { MintNFTABI, BurnNFTABI, MintWhitelistABI, whitelistedUsersABI, MintNFTAddress } from "../contract/constants";
import { Input } from "web3uikit";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { defaultImgs } from "../defaultimgs";
import './Mint.css';
import Layout from "../components/layout";
import Site from "./Site";

const CreateSite = () => {
  const { Moralis, account, user } = useMoralis();
  const inputFile = useRef(null);

  const [selectedFile, setSelectedFile] = useState(user.get("siteBanner") ? user.get("siteBanner") : defaultImgs[1]);

  const [title, setTitle] = useState(user.get("siteTitle") ? user.get("siteTitle") : '');
  const [theFile, setTheFile] = useState();
  const [content, setContent] = useState(user.get("siteContent") ? user.get("siteContent") : '');
  const [tokenAddress, setTokenAddress] = useState(user.get("siteTokenAddress") ? user.get("siteTokenAddress") : '');
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const createSite = async () => {
    const Sites = Moralis.Object.extend("Sites");
    const query = new Moralis.Query(Sites);
    let results = await query.equalTo("owner", account).first();
    console.log(results)
    let myDetails = {};
    if (results === undefined) {
      myDetails = new Sites();
    } else {
      myDetails = results;
    }
    try {
      if (title){
        myDetails.set("siteTitle", title);
      }
  
      if (content){
        myDetails.set("siteContent", content);
      }
  
      if (tokenAddress){
        myDetails.set("siteTokenAddress", tokenAddress);
      }

      myDetails.set("owner", account);
  
      if (theFile) {
        const data = theFile;
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();
        myDetails.set("siteBanner", file.ipfs());
      }
      await myDetails.save();
      toast("You created new site");
    } catch(e) {
      console.log(e)
    }

    // window.location.reload();
  }

  return (
    <Layout title="Create user's Page">
      
      <div className="create-site container">
        
        <div className="pfp">
          <p className="text-white">Profile Banner</p>
          <div className="pfpOptions">
            <img
              src={selectedFile}
              onClick={onBannerClick}
              className="banner"
            ></img>
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="my-4">
          <p className="text-white">Title</p>
          <Input
            name="TitleChange"
            width="100%"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            defaultValue={title}
          />
        </div>
        <div className="mb-4">
          <p className="text-white">Content</p>
          <ReactQuill 
            // theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            formats={formats}
            style={{ background: 'white' }}
          />
        </div>

        <div className="my-4">
          <p className="text-white">Token Address</p>
          <Input
            name="TokenAddress"
            width="100%"
            onChange={(e)=> setTokenAddress(e.target.value)}
            value={tokenAddress}
          />
        </div>
        
        <div className="my-4">
          <p className="text-white">Site Link</p>
          <a className="text-white" href={`${process.env.REACT_APP_PUBLIC_URL}/${user.get("ethAddress")}`}>{process.env.REACT_APP_PUBLIC_URL}/{user.get("ethAddress")}</a>
        </div>

        <button className="btn btn-primary w-100" style={{ marginTop: 20, marginBottom: 20 }} onClick={createSite}>Create Site</button>
      </div>

    </Layout>
  );
};

export default CreateSite;

