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

//console.log(getId(-203, -30))

module.exports={
    getId : getId
}