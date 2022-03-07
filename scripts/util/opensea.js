const RPCSubprovider = require('web3-provider-engine/subproviders/rpc')
const Web3ProviderEngine = require('web3-provider-engine')
const KeyWalletSubprovider = require('@0x/subproviders').PrivateKeyWalletSubprovider
const Opensea = require('opensea-js')
const Network = Opensea.Network
const Config = require('../../config')

let netWork = Network.Rinkeby
let API_KEY = ''
let RPC_URL= Config.RPC_URL_rinkeby
let ChainId = 4
let funcNet = (net )=> {
    switch (net) {
        case 0:
            break;
        case 1:
            netWork = Network.Main;
            API_KEY = Config.API_KEY;
            RPC_URL = Config.RPC_URL_main
            ChainId = 1
            break
        default:
            break
    }
}

const keyWalletProvider = new KeyWalletSubprovider(Config.PRIVATE_KEYS[0], ChainId)
const infuraRpc = new RPCSubprovider({rpcUrl:RPC_URL})
const providerEngine = new Web3ProviderEngine()
providerEngine.addProvider(keyWalletProvider)
providerEngine.addProvider(infuraRpc)



let funSeaport = (net)=>{
    funcNet(net)
    return new Opensea.OpenSeaPort(
        providerEngine,
        {
            networkName:netWork ,
            apiKey:API_KEY
        },

        (arg)=>console.log(arg)
    )
}

let isStart = false
module.exports = {
    Wallet : keyWalletProvider,
    funSeaport : funSeaport,
    stop : function () {
        if (!isStart)
            return
        providerEngine.stop()
        isStart = false
    },
    start: ()=>{
        providerEngine.start()
        isStart =true
    }
}