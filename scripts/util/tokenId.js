const GRID_SIZE = 408
const {X, Y} = GRID_SIZE/2


function getId(x, y){
    if (x-X < -GRID_SIZE || x+X > GRID_SIZE)
        throw 'fail:'+x
    if (y-Y < -GRID_SIZE || y+Y > GRID_SIZE)
        throw 'fail:'+y
    x = x+GRID_SIZE/2
    y = y+GRID_SIZE/2
    return  x + y * GRID_SIZE
}
function getIds(x, y , size){

}

function getNTFToken(contractAddress, token){
    return {
        ContractAddress : contractAddress,
        TokenId :token,
    }
}
function getSandBoxByPoint(x, y, size= 1){
    let contractAddress = '0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38'
    let token = getId(x, y)
    return {
        ContractAddress : contractAddress,
        TokenId :token,
    }
}

//console.log(getId(36, -144))

module.exports={
    getId,
    getNTFToken,
    getSandBoxByPoint,
}