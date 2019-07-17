const MAP_SIZE = 5
const VIEW_SIZE = 2* MAP_SIZE - 1
const WORLD_SIZE = 3 * MAP_SIZE - 2 
const BORDER_SIZE = MAP_SIZE - 1
const WORLD = Array(WORLD_SIZE).fill(-1).map(() => Array(WORLD_SIZE).fill(-1))
const MAP = Array(MAP_SIZE).fill(-1).map(() => Array(MAP_SIZE).fill(-1))
const VIEW = Array(VIEW_SIZE).fill(-1).map(() => Array(VIEW_SIZE).fill(-1))
let SNAKE 

class Snake {
    constructor(xHead, yHead, xBody , yBody) {
      this.xHead = xHead
      this.yHead = yHead
      this.xBody = []
      this.yBody = []
      this.xBody.push(xBody)
      this.yBody.push(yBody)
    }
  }

// State of the World
var state = {
    "border" : 1, //"\u25A1",
    "grass" : 2, //"\u25A0",
    "apple" : 3, //"\uD83C\uDF4E",
    "snakeBody" : 4, //"\uD83D\uDC0D",
    "snakeHead" : 5, //"\uD83D\uDC0D",
}
Object.freeze(state)

main()

function main(){
    if(MAP_SIZE > 3){
        init()
        console.log(SNAKE)
        console.log(WORLD)
        //do{
        //    step()
        //}while(!checkForEnd())
    }else {
        console.log("Map too small")
    }
    // while(true){
    //     playGame()
    // }
}

function init(){
    drawBorder()
    createApple()
    createSnake()
}

function drawBorder(){
    for(let i = 0; i < WORLD.length; i++){
        for(let j = 0; j < WORLD[i].length; j++){
            if(i % (WORLD_SIZE - MAP_SIZE + 1) < BORDER_SIZE || j % (WORLD_SIZE - MAP_SIZE + 1) < BORDER_SIZE){
                WORLD[i][j] = state.border 
            } else {
                WORLD[i][j] = state.grass 
            }
        }
    }
}

function createApple(){
    let x,y
    do{
        x = getRandomInt(MAP_SIZE) + BORDER_SIZE
        y = getRandomInt(MAP_SIZE) + BORDER_SIZE
    }while(WORLD[x][y] === state.snakeHead || WORLD[x][y] === state.snakeBody)
    WORLD[x][y] = state.apple
}

function createSnake(){
    let x,y, xHead, yHead
    do{
        xHead = getRandomInt(MAP_SIZE) + BORDER_SIZE
        yHead = getRandomInt(MAP_SIZE) + BORDER_SIZE
    }while(checkForApple(xHead,yHead))
    WORLD[xHead][yHead] = state.snakeHead
    do{
        switch(getRandomInt(4)){
            case 0:
                x = -1
                y = 0
                break
            case 1:
                x = 0 
                y = -1
                break
            case 2:
                x = 1
                y = 0
                break
            case 3:
                x = 0 
                y = 1
                break
        }
        
    }while(WORLD[xHead - x][yHead - y] !== state.grass)
    WORLD[xHead - x][yHead - y] = state.snakeBody
    SNAKE = new Snake(xHead, yHead, xHead - x, yHead - y)
}

function checkForApple(x, y){
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(WORLD[x + i][y + j] === state.apple){
                return true
            }
        }
    }
    return false
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function checkForEnd(){
    return false
}

