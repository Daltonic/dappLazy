// import abi from '../abis/src/contracts/Payroll.sol/Payroll.json'
// import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
// import { ethers } from 'ethers'

// const { ethereum } = window
// const ContractAddress = address.address
// const ContractAbi = abi.abi
// let tx

// const toWei = (num) => ethers.utils.parseEther(num.toString())
// const fromWei = (num) => ethers.utils.formatEther(num)

// const getEthereumContract = async () => {
//   const connectedAccount = getGlobalState('connectedAccount')
//   const provider = connectedAccount
//     ? new ethers.providers.Web3Provider(ethereum)
//     : new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)
//   const signer = provider.getSigner()

//   const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
//   return contract
// }

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

const reportError = (error) => {
  console.log(error)
}

export { isWallectConnected, connectWallet }
