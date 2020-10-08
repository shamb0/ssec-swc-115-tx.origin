
import * as path from 'path'
import * as fs from 'fs'
import Web3 from "web3"

// import Web3 = require( "web3" )
// import Web3 = require( "../../../node_modules/@types/web3" )
// import * as Web3 from 'web3'

let web3 = new Web3()

const filePath = path.join(__dirname, '../../../.secret')

export const getCeloAccount = async (): Promise<any> => {

    const resultPromise = new Promise(resolve => {
        if(fs.existsSync(filePath)){
            fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                resolve(web3.eth.accounts.privateKeyToAccount(data))
            })
        } else {
            let randomAccount = web3.eth.accounts.create()

            fs.writeFile(filePath, randomAccount.privateKey, (err) => {
                if(err) {
                    return console.log(err);
                }
            })
            resolve(randomAccount)
        }
    })

    return resultPromise

}


