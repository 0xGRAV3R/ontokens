import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {toast} from 'react-toastify';

const Site = () => {
  const { id } = useParams();
  const { Moralis, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [account, setAccount] = useState({});
  const [tokenGate, setTokenGate] = useState(false);

  useEffect(() => {
    async function getSite() {
      console.log("okay")
      try {
        const Sites = Moralis.Object.extend("Sites");
        const query = new Moralis.Query(Sites);
        if (id) {
          query.equalTo("owner", id);
        }
        const results = await query.first();
        if (results) {
          let options = {
            chain: "0x1",
            address: id,
            token_address: results.attributes.siteTokenAddress
          };
      
          const Token2Data = await Web3Api.account.getNFTsForContract(options);
          if (Token2Data.total === 0) {
            setTokenGate(false)
            return toast.error("Bummer! you don't have the NFT yet.");
          } else {
            setTokenGate(true)
            setAccount(results);
          }
        }

      } catch (error) {
        console.error(error);
      }
    }
    getSite();
  }, [id]);

  return (
    <>
    {account.attributes && tokenGate && (
      <div className='my-3 container'>
        <img className='w-100' src={account.attributes.siteBanner}></img>
        <h1>{account.attributes.siteTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: account.attributes.siteContent }} />
        {/* {account.attributes.siteContent} */}
      </div>
    )}
    {!account.attributes && (
      <h2 className='text-center mt-5'>No content</h2>
    )}
    {/* {!tokenGate && (
      <h2 className='text-center mt-5'>you don't have {account.attributes.siteTokenAddress} NFT</h2>
    )} */}
    </>
  )
}

export default Site;