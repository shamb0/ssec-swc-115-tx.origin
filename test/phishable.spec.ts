import { expect } from './setup'

/* External Imports */
import { ethers } from '@nomiclabs/buidler'
import { readArtifact } from '@nomiclabs/buidler/plugins'

import { Contract, ContractFactory, Signer, BigNumber, utils, providers } from 'ethers'
import {
  getContractFactory, sleep, sendLT, getBalanceLT, ContractDeployOptions, deployContract, linkBytecode
} from './test-utils'

import { getLogger } from './test-utils'

import { GAS_LIMIT } from './test-helpers'
import { Artifact } from '@nomiclabs/buidler/types'

const log = getLogger('Phisable-Test')

function getRandomNumberBetween( min:number , max:number ){

  return Math.floor( Math.random() * (max-min+1) + min );
}

describe('EtherGame Attack Test', () => {
  let wallet: Signer
  // let usr1: Signer
  // let usr2: Signer
  // let usr3: Signer

  before(async () => {
    // ;[wallet, usr1, usr2, usr3] = await ethers.getSigners()
    ;[wallet] = await ethers.getSigners()

    log.info(`Admin :: ${await wallet.getAddress()}`)
    // log.info(`Usr1 :: ${await usr1.getAddress()}`)
    // log.info(`Usr2 :: ${await usr2.getAddress()}`)
    // log.info(`Usr3 :: ${await usr3.getAddress()}`)
  })

  let phisablefact: ContractFactory
  let phisableinst: Contract
  before(async () => {

    phisablefact = getContractFactory( "Phishable", wallet )

    log.debug( `Network Gas price @ ${await ethers.provider.getGasPrice()}`)

    log.debug(`S1-Ent wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

    // Deploy the contract
    let deploycfg: ContractDeployOptions = {
      factory: phisablefact,
      params: [ await wallet.getAddress() ],
      signer: wallet
    }

    phisableinst = await deployContract( deploycfg )

    const transamount = ethers.utils.parseUnits( "1.5", 18 );

    const receipt = await wallet.sendTransaction({
      to: phisableinst.address,
      value: transamount,
      gasLimit: GAS_LIMIT,
    })

    await phisableinst.provider.waitForTransaction( receipt.hash )

    log.debug( `Phishable @ ${phisableinst.address}`)

    const bal = await phisableinst.provider.getBalance( phisableinst.address );

    log.debug(`Phishable balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S1-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

  let phishableattackfact: ContractFactory
  let phishableattackinst: Contract
  before(async () => {

    try {

      log.debug(`S2-Ent wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

      phishableattackfact = getContractFactory( "PhishableAttackContract", wallet )

      log.debug( `Network Gas price @ ${await ethers.provider.getGasPrice()}`)

      let deploycfg: ContractDeployOptions = {
        factory: phishableattackfact,
        params: [ phisableinst.address, await wallet.getAddress() ],
        signer: wallet
      }

      // Deploy the contract
      phishableattackinst = await deployContract( deploycfg )

      log.debug( `PhishableAttack @ ${phisableinst.address}`)

      const bal = await phishableattackinst.provider.getBalance( phishableattackinst.address );

      log.debug(`Phishable balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

      log.debug(`S2-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

    }
    catch( err ){

      log.error(`Exception Err ${err}`)
    }

  })


  it("tst-item-001-run-attack", async () => {

    try {

      log.debug(`S3-Ent :: ${ethers.utils.formatUnits( await wallet.getBalance(), "ether")}`)

      // log.debug(`b4 attack Usr1 Bal :: ${ethers.utils.formatUnits( await usr1.getBalance(), "ether")}`)

      const transamount = ethers.utils.parseUnits( "0.0", 18 );

      const receipt = await wallet.sendTransaction({
        to: phishableattackinst.address,
        value: transamount,
        gasLimit: GAS_LIMIT,
      })

      await phishableattackinst.provider.waitForTransaction( receipt.hash )

      // log.debug(`after attack Usr1 Bal :: ${ethers.utils.formatUnits( await usr1.getBalance(), "ether")}`)

      log.debug(`S3-Ext :: ${ethers.utils.formatUnits( await wallet.getBalance(), "ether")}`)
    }
    catch( err ){

      log.error(`Exception Err ${err}`)

    }
  })

  afterEach("Test-Case End Contract Status", async () => {

    let bal = await phisableinst.provider.getBalance( phisableinst.address );

    log.debug(`Phishable balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    bal = await phishableattackinst.provider.getBalance( phishableattackinst.address );

    log.debug(`PhishableAttack balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S4-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

  after("Test Done Cleanup", async () => {

    // await phishableattackinst.closeContract( await wallet.getAddress() )

    let bal = await phisableinst.provider.getBalance( phisableinst.address );

    log.debug(`Phishable balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    bal = await phishableattackinst.provider.getBalance( phishableattackinst.address );

    log.debug(`PhishableAttack balance :: ${ethers.utils.formatUnits( bal , "ether" )}`)

    log.debug(`S5-Ext wallet bal :: ${ethers.utils.formatUnits(await wallet.getBalance(), "ether")}`)

  })

})
