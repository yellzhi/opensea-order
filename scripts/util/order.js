const Seaport = require("./opensea").Seaport;

let getOrder = async (contract_address, token_id, side)=>{
    let res;
    try {
        let r = await Seaport.api.getAsset({
            tokenAddress: contract_address,
            tokenId : token_id
        })
        if (r){
            if (side=== 0){
                res = r.buyOrders[0]
            }else {
                res = r.sellOrders[0]
            }
            console.log('get item:', r.tokenAddress, "  Id:", r.tokenId)
        }else {
            console.warn(contract_address, " Id:", token_id, ' can not get ...')
        }
        //console.log(r)
    }catch (e){
        throw e
    }
    return res
}

let fullOrder = async (order, accountAddress)=>{
    if (!order){
        throw 'failOrder'
    }
    //console.log('get order success , price:', order.currentPrice.toNumber() / 1e18, 'order type:', order.side)
    //Seaport.createSellOrder()
    let  txh = await Seaport.fulfillOrder({
        order:order,
        accountAddress : accountAddress
    })
    console.log(txh)
    return txh
}

//get(ContractAddress, 0, 1)

exports.Order = {getOrder, fullOrder}
