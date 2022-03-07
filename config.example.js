const GetId = require("./scripts/util/tokenId");
const AccountAddress = "0x123250e30975b82886dd96309ffa2582d502bcb9"

const SanBoxId = {
    isId :false,
    id : 0
}
const SandBoxPoint = {
    x:0,
    y:0
}
let Id = ()=> {
    let tokenId = 0
    if (SanBoxId.isId) {
        tokenId = SanBoxId.id
    } else {
        tokenId = GetId.getId(SandBoxPoint.x, SandBoxPoint.y)
    }
    return tokenId
}

let NFT_main_box = {
    ContractAddress : SandBoxAddress,
    TokenId :Id(),
}
let NFT_rinkeby = {
    ContractAddress : ContractAddress2,
    TokenId :ContractAddress2Id,
}

module.exports = {
    RPC_URL_rinkeby : 'xxxxxxx',
    RPC_URL_main : 'xxxxxxx',
    API_KEY : 'xxxxxx',
    // to buy nft address
    PRIVATE_KEYS : ['xxxxxxxx'], //
    // NFT token
    NFT : NFT_rinkeby,
    // 0: RinKeby, // 1: Main
    NetWork : 0,

}

