import React, { useEffect, useState, useRef } from "react";
import Collapse from '../images/collapse.webp';
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis";
import { MintNFTABI, BurnNFTABI, MintWhitelistABI, whitelistedUsersABI, MintNFTAddress } from "../contract/constants";
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { defaultImgs } from "../defaultimgs";
import './Mint.css';
import Layout from "../components/layout";

const Mint = () => {
  const { Moralis, account, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const inputFile = useRef(null);

  const [tokenIds, setTokenIds] = useState("");
  const [userNFTs, setUserNFTs] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState([]);

  const getNFTs = async() => {
    let options = {
      chain: "0x4",
      address: account,
      token_address: MintNFTAddress
    };

    const Token2Data = await Web3Api.account.getNFTsForContract(options);
    let tmpTokenIds = [];
    Token2Data.result.map(item => {
      tmpTokenIds.push(item.token_id);
    })
    setUserNFTs(tmpTokenIds);
  }
  

  const mint = async () => {
    let options = {
      contractAddress: MintNFTAddress,
      functionName: "mint",
      abi: MintNFTABI,
      params: {},
      msgValue: Moralis.Units.ETH(0),
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        toast.success("You minted NFT successfully");
      },
      onError: (e) => {
        if (e.error)
          toast.error(e.error.message);
        else
          toast.error(e.message);
      },
    });
  }

  const mintWhitelist = async () => {
    let options = {
      contractAddress: MintNFTAddress,
      functionName: "mintWhitelist",
      abi: MintWhitelistABI,
      params: {},
      msgValue: Moralis.Units.ETH(0),
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        toast.success("You minted NFT successfully");
      },
      onError: (e) => {
        if (e.error)
          toast.error(e.error.message);
        else
          toast.error(e.message);
      },
    });
  }

  const burn = async () => {
    // const message = await Moralis.executeFunction(options);
    // console.log(message);
    const tokens = [...selectedNFTs];
    const tokenIdArr = [];
    tokens.map(token => {
      tokenIdArr.push(Number(token))
    })
    let options = {
      contractAddress: MintNFTAddress,
      functionName: "burn",
      abi: BurnNFTABI,
      params: {tokenIds: tokenIdArr}
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        toast.success("You burned NFTs successfully");
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });
  }

  const selectNFT = async (tokenId) => {
    let array = [...selectedNFTs];
    let index = array.indexOf(tokenId);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(tokenId);
    }
    setSelectedNFTs(array);
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <Layout title="Mint">
      
      <div className="mint-page container">
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary w-100" style={{ marginTop: 20, marginBottom: 20 }} onClick={mint}>mint</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary w-100" style={{ marginTop: 20 }} onClick={mintWhitelist}>Mint Whitelist</button>
          </div>
        </div>
        <div className="row nft-list">
          {userNFTs.map((nft, index) => {
            return (
              <div className={`col-md-3 item ${selectedNFTs.includes(nft) ? 'selected' : ''}`} key={index} onClick={() => selectNFT(nft)}>
                <h2 className="text-white text-center mt-10 mb-10">{nft}</h2>
              </div>
            )
          })}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary w-100" style={{ marginTop: 20 }} onClick={burn}>burn</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mint;

