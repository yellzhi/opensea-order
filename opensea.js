const RpcURL= "https://rinkeby.infura.io/v3/59cc19bcf4a740bba9f19e162c9441ba"
const TestKey = 'f26c1057b2758ef14b15c1cbafc466d5d7f093b6f6a49fc73c538ce0e3a5e3b1'

const RPCSubprovider = require('web3-provider-engine/subproviders/rpc')
const Web3ProviderEngine = require('web3-provider-engine')
const KeyWalletSubprovider = require('@0x/subproviders').PrivateKeyWalletSubprovider
const keyWalletProvider = new KeyWalletSubprovider(TestKey, 4)


const infuraRpc = new RPCSubprovider({rpcUrl:RpcURL})
const providerEngine = new Web3ProviderEngine()
providerEngine.addProvider(keyWalletProvider)
providerEngine.addProvider(infuraRpc)
providerEngine.start()

let Seaport = new Opensea.OpenSeaPort(
    providerEngine,
    {
        networkName:Network.Rinkeby
    },
    (arg)=>console.log(arg)
)

exports.openSea = Seaport
exports.stop = function (){
    providerEngine.stop()
}