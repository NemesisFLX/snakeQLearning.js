const MAP_SIZE = 4
const VIEW_SIZE = 2* MAP_SIZE - 1
const WORLD_SIZE = 3 * MAP_SIZE - 2 
const WORLD = Array(WORLD_SIZE).fill(-1).map(() => Array(WORLD_SIZE).fill(-1))
const MAP = Array(MAP_SIZE).fill(-1).map(() => Array(MAP_SIZE).fill(-1))
const VIEW = Array(VIEW_SIZE).fill(-1).map(() => Array(VIEW_SIZE).fill(-1))

main()
console.log(WORLD)
function main(){
    init()
    // while(true){
    //     playGame()
    // }
}

function init(){
    for(let i = 0; i < WORLD.length; i++){
        for(let j = 0; j < WORLD[i].length; j++){
            WORLD[i][j] = 1
        }
    }
}