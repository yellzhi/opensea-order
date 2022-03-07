const Order = require('./util/order').Order
const stop = require('./util/opensea').stop
const Config = require('../config')
const wallet = require('./util/opensea').Wallet
const GetId = require('./util/tokenId')
const {start} = require("./util/opensea");

let account = undefined
const getAccount = async ()=>{
    let accounts =await wallet.getAccountsAsync()
    if(accounts.length === 0){
        throw 'fail account'
    }
    console.log('wallet account:', accounts[0])
    return accounts[0]
}

const mainLoop = async (contractAddress, tokenId, account)=>{
    if (!account){
        throw 'fail account not to buy item'
    }
    let order = undefined;
    while (true) {
        try {
            order = await Order.getOrder(contractAddress, tokenId, 1)
        }catch (e){
            console.warn(e.message)
            order= undefined
            setTimeout(() => {}, 1000) //ms
        }
        if (!order) {
            console.log('not get order fetch next get ...')
            setTimeout(() => {}, 300) //ms
            continue
        }
        console.log('get order success , price:', order.currentPrice.toNumber() / 1e18, 'order type:', order.side)
        break
    }
    try {
        await start()
        console.log('start buy...')
        let txh = await Order.fullOrder(order, account)
        console.log(txh)
    } catch (e) {
        console.log(e)
    }

}
process.on('SIGILL', function (){
    process.exit()
})

let main = async ()=>{
    try {
        account =  await getAccount()
        await mainLoop(Config.NFT.ContractAddress, Config.NFT.TokenId, account)
    }catch (e){
        console.error(e.message)
    }
    stop()
}

main()