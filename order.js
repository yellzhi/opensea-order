const Opensea = require("./opensea").openSea;

let getOrder = async (contract_address, token_id, side)=>{
    var res;
    try {
        // let r =await Opensea.api.getOrder({
        //     asset_contract_address:contract_address,
        //     token_id: token_id,
        //     side : side
        // })
        // console.log(r)
        // return r
        let r = await Opensea.api.getAsset({
            tokenAddress: contract_address,
            tokenId : token_id
        })
        if (r){
            if (side=== 0){
                res = r.buyOrders[0]
            }else {
                res = r.sellOrders[0]
            }
        }
    }catch (e){
        console.log(e)
    }
    console.log(res)
    return res
}

let fullOrder = async (order, accountAddress)=>{
    if (!order){
        return undefined
    }
    let  txh = await Opensea.fulfillOrder({
        order:order,
        accountAddress : accountAddress
    })
    console.log(txh)
    return txh
}

//get(ContractAddress, 0, 1)

exports.Order = {getOrder, fullOrder}
