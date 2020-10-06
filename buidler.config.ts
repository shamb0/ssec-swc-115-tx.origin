import fs from "fs"
import * as dotenv from "dotenv"

import { usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config"

import { newKit } from "@celo/contractkit"

import {
  DEFAULT_ACCOUNTS_BUIDLER,
  GAS_LIMIT,
} from "./test/test-helpers/constants"

usePlugin("@nomiclabs/buidler-ethers")
usePlugin("@nomiclabs/buidler-waffle")
usePlugin("solidity-coverage")
usePlugin("@nomiclabs/buidler-ganache")

console.log(`$(process.argv.length)`)

const envfile = `./.env.shamb0.lab1`
const envfilestate = fs.existsSync(envfile)

if (envfilestate === false) {
  console.log(`File :: ${envfile} not exist`)
} else {
  const result = dotenv.config({ path: envfile })

  if (result.error) {
    throw result.error
  }

  // console.log(process.env.INFURA_PROJECT_ID)
  // console.log(process.env.KOVAN_PRIVATE_KEY)
  // console.log( result.parsed )
}

// Connect to the desired network
const kit = newKit('https://alfajores-forno.celo-testnet.org')
// const kit = Kit.newKit('https://forno.celo.org') // mainnet endpoint

async function awaitWrapper(){
  kit.addAccount(`0x${process.env.CELO_ALFAJORES_PRIVATE_KEY_OWNER1}`)
}

awaitWrapper()

const config: BuidlerConfig = {
  defaultNetwork: "buidlerevm",
  networks: {
    buidlerevm: {
      accounts: DEFAULT_ACCOUNTS_BUIDLER,
      blockGasLimit: GAS_LIMIT * 2,
      allowUnlimitedContractSize: true, // TEMPORARY: Will be fixed by AddressResolver PR.
    },
    ganache: {
      url: "http://localhost:7545",
      gasLimit: 6000000000,
      defaultBalanceEther: 100,
    } as any,
    coverage: {
      url: "http://localhost:8555",
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      gas: "auto",
      gasPrice: "auto",
      accounts: [
        `0x${process.env.KOVAN_PRIVATE_KEY_WALLET}`,
        `0x${process.env.KOVAN_PRIVATE_KEY_OWNER1}`,
        `0x${process.env.KOVAN_PRIVATE_KEY_OWNER2}`,
      ],
    },
    alfajores: {
      url: `https://alfajores-forno.celo-testnet.org`,
      gas: "auto",
      gasPrice: "auto",
      provider: kit.web3.currentProvider,
      network_id: 44787,
      accounts: [
        `0x${process.env.CELO_ALFAJORES_PRIVATE_KEY_OWNER1}`,
      ],
    } as any,
  },
  mocha: {
    timeout: 5000000,
  },
  solc: {
    version: "0.6.0",
    // version: "0.5.1",
    optimizer: { enabled: true, runs: 200 },
  }
}

export default config
