const Web3 = require('web3')
const opensea = require('opensea-js')
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const OrderSide = require('opensea-js/lib/types')

const TestKey = 'f26c1057b2758ef14b15c1cbafc466d5d7f093b6f6a49fc73c538ce0e3a5e3b1'
const rpcUrl = 'https://rinkeby.infura.io/v3/59cc19bcf4a740bba9f19e162c9441ba'

const RPCSubprovider = require('web3-provider-engine/subproviders/rpc')
const Web3ProviderEngine = require('web3-provider-engine')
const KeyWalletSubprovider = require('@0x/subproviders').PrivateKeyWalletSubprovider
var HDWalletProvider = require("truffle-hdwallet-provider");

const keyWalletProvider = new KeyWalletSubprovider(TestKey, 4)
const infuraRpc = new RPCSubprovider({
    rpcUrl:'https://rinkeby.infura.io/v3/59cc19bcf4a740bba9f19e162c9441ba'
})
const providerEngine = new Web3ProviderEngine()
providerEngine.addProvider(keyWalletProvider)
providerEngine.addProvider(infuraRpc)
providerEngine.start()

const web3Provider = new Web3.providers.HttpProvider(rpcUrl)
const seaport = new OpenSeaPort(providerEngine, {
    networkName:Network.Rinkeby,
    apiKey: ""
});




const tokenId = "0"
const AccountAddress = "0x123250e30975b82886dd96309ffa2582d502bcb9"
const AccountAddress2 = "0x4Ac3a7A0c1CC11BC8f3bEB70CF48dfc023a9D942"
const ContractAddress = '0xf8AC06B1cdF1c663a2ac86C78a61a1A95F1bd734'

var query = {
    asset_contract_address: ContractAddress,
    token_id: tokenId,
    side: OrderSide.OrderSide.Buy
}

let getSellOrder = async  (contractAddress, tokenId)=> {
    const params ={
        asset_contract_address: contractAddress,
        token_id: tokenId,
        side:1,
    }
    const result =  await seaport.api.getOrder(params)
    return result
}


let getAssert = async (query)=>{
    const res = await seaport.api.getAsset(query)
    return res
}

let fullOrder = async (order, address) =>{
    return  await seaport.fulfillOrder({
        order:order,
        accountAddress: address,
        recipientAddress: address,
        referrerAddress: address
    })
    // if (hx) {
    //     console.log(hx)
    // }
    //return hx
}

//let r = getAssert()
query = {
    tokenAddress:"0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38",
    tokenId:"3387"
}
query = {
    tokenAddress: "0xf8AC06B1cdF1c663a2ac86C78a61a1A95F1bd734",
    tokenId: "0",
    //side: OrderSide.OrderSide.Buy
}

async function web3(){
    try {
        let r= await seaport.web3.eth.getBalance(AccountAddress)
        console.log(r.toString())
    }catch (e){
        console.log(e)
    }
}

//web3()

async function main(){
    var order
    try {
        let r = await getAssert(query)
        console.log(r.tokenId)
        order = r.sellOrders[0]
        //const  order = await getSellOrder(ContractAddress, "0")
        if (order){
            console.log(order.hash)
            console.log(order.currentPrice.toNumber()/1e18)
            console.log(order)
        }
        //let tx = await fullOrder(order, AccountAddress)
        console.log(tx,"====")
        console.log("end ...")
    }
    catch (e) {
        console.log(e.message)
        //process.exit(0)
    }
    console.log("main end...")
}

main()


providerEngine.stop()


