export const MintNFTAddress = '0x1b5F2B2264680B1f0a56F83586eB4689225AD246';

export const MintNFTABI = [{
  "inputs": [],
  "name": "mint",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}];

export const MintWhitelistABI = [{
  "inputs": [],
  "name": "mintWhitelist",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}]

export const BurnNFTABI = [{
  "inputs": [
    {
      "internalType": "uint256[]",
      "name": "tokenIds",
      "type": "uint256[]"
    }
  ],
  "name": "burn",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];

export const whitelistedUsersABI = [{
  "inputs": [],
  "name": "whitelistedUsers",
  "outputs": [
    {
      "internalType": "address[]",
      "name": "",
      "type": "address[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}];