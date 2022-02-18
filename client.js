const Order = require('./order').Order
const stop = require('./opensea').stop

const AccountAddress = "0x123250e30975b82886dd96309ffa2582d502bcb9"
const AccountAddress2 = "0x4Ac3a7A0c1CC11BC8f3bEB70CF48dfc023a9D942"
const ContractAddress = '0xf8AC06B1cdF1c663a2ac86C78a61a1A95F1bd734'

const main = async ()=>{
    try {
        let order =await Order.getOrder(ContractAddress, 0, 1)
        if (!order){
            console.log("can not got order")
        }
        let txh =await Order.fullOrder(order, AccountAddress)
        console.log(txh)
    }catch (e){
        console.log(e)
    }

}

main()
stop()