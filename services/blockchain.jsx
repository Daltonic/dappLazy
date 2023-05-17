import address from '@/artifacts/contractAddress.json'
import abi from '@/artifacts/contracts/Lazy.sol/Lazy.json'
import { getGlobalState, setGlobalState } from '@/store'
import { ethers } from 'ethers'

const ContractAddress = address.address
const ContractAbi = abi.abi
let tx, ethereum

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')
  const provider = connectedAccount
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)
  const signer = provider.getSigner()

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const ssrEthereumContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_APP_RPC_URL)
  const wallet = ethers.Wallet.createRandom()
  const signer = provider.getSigner(wallet.address)
  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      reportError('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const mintNft = async ({ name, description, imageUrl, price }) => {
  if (!ethereum) return reportError('Please install Metamask')
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.mint(name, description, imageUrl, toWei(price), {
        value: toWei(0.02),
      })

      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const loadNFTs = async () => {
  const contract = await getEthereumContract()
  const nfts = await contract.getNFTs()
  return structuredNFTs(nfts)
}

const structuredNFTs = (nfts) =>
  nfts
    .map((nft) => ({
      tokenId: nft.tokenId.toNumber(),
      owner: nft.owner.toLowerCase(),
      name: nft.name,
      description: nft.description,
      imageUrl: nft.imageUrl,
      price: fromWei(nft.price),
    }))
    .reverse()

const reportError = (error) => {
  console.log(error)
}

export { isWallectConnected, connectWallet, mintNft, loadNFTs }
