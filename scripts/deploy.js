const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const Contract = await ethers.getContractFactory('Lazy')
  const contract = await Contract.deploy()

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./artifacts/contractAddress.json', address, 'utf8', (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Deployed contract address: ', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})