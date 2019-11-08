const MAP_SIZE = 20
const VIEW_SIZE = 2 * MAP_SIZE - 1
const WORLD_SIZE = 3 * MAP_SIZE - 2
const BORDER_SIZE = MAP_SIZE - 1
const WORLD = Array(WORLD_SIZE).fill(-1).map(() => Array(WORLD_SIZE).fill(-1))
const MAP = Array(MAP_SIZE).fill(-1).map(() => Array(MAP_SIZE).fill(-1))
const VIEW = Array(VIEW_SIZE).fill(-1).map(() => Array(VIEW_SIZE).fill(-1))
let SNAKE
let APPLE = {}
WORLD.update = () => {
    for (let y = 0; y < MAP_SIZE; y++) {
        for (let x = 0; x < MAP_SIZE; x++) {
            WORLD[x + BORDER_SIZE][y + BORDER_SIZE] = state.grass
        }
    }
    WORLD[APPLE.x][APPLE.y] = state.apple
    WORLD[SNAKE.xHead][SNAKE.yHead] = state.snakeHead
    for (let i = 0; i <= SNAKE.xBody.length - 1; i++) {
        WORLD[SNAKE.xBody[i]][SNAKE.yBody[i]] = state.snakeBody
    }
}

class Snake {
    constructor(xHead, yHead, xBody, yBody) {
        this.xHead = xHead
        this.yHead = yHead
        this.xBody = []
        this.yBody = []
        this.xBody.push(xBody)
        this.yBody.push(yBody)
        this.dead = false
        this.movesMade = 0
        this.newBodyPartX = 0
        this.newBodyPartY = 0

        this.getDirectionWithoutInput = () => {
            let xDir = this.xHead - this.xBody[0]
            switch (xDir) {
                case 1:
                    return "E"
                case -1:
                    return "W"
            }
            let yDir = this.yHead - this.yBody[0]
            switch (yDir) {
                case 1:
                    return "N"
                case -1:
                    return "S"
            }
        }

        this.turn = (direction) => {
            if (direction === "N" || direction === "E" || direction === "S" || direction === "W")
                if (!(direction === "N" && this.headDirection === "S"))
                    if (!(direction === "E" && this.headDirection === "W"))
                        if (!(direction === "S" && this.headDirection === "N"))
                            if (!(direction === "W" && this.headDirection === "E"))
                                this.headDirection = direction
        }


        this.move = () => {
            this.movesMade = this.movesMade + 1
            let yOldHead = this.yHead
            let xOldHead = this.xHead
            this.newBodyPartX = this.xBody[this.xBody.length - 1]
            this.newBodyPartY = this.yBody[this.yBody.length - 1]
            switch (this.headDirection) {
                case "N":
                    this.yHead = this.yHead + 1
                    break
                case "S":
                    this.yHead = this.yHead - 1
                    break
                case "E":
                    this.xHead = this.xHead + 1
                    break
                case "W":
                    this.xHead = this.xHead - 1
                    break
            }
            for (let x = this.xBody.length - 1; x > 0; x--) {
                this.xBody[x] = this.xBody[x - 1]
            }
            for (let y = this.yBody.length - 1; y > 0; y--) {
                this.yBody[y] = this.yBody[y - 1]
            }
            this.xBody[0] = xOldHead
            this.yBody[0] = yOldHead
        }

        this.grow = () => {
            this.xBody.push(this.newBodyPartX)
            this.yBody.push(this.newBodyPartY)
        }

        this.headDirection = this.getDirectionWithoutInput()
    }
}



// State of the World
var state = {
    "border": "\u25A1",
    "grass": "\u25A0",
    "apple": "\uD83C\uDF4E",
    "snakeBody": "\uD83D\uDC0D",
    "snakeHead": "\uD83D\uDC0C",
}
Object.freeze(state)

main()

function main() {
    if (MAP_SIZE > 3) {
        init()
        console.log(SNAKE)
        printWorld()
        do {
            SNAKE.turn(action())
            //console.log(SNAKE)
            step()
            for (let x = 0; x <= 1; x++) {

            }
            printWorld()
        } while (!SNAKE.dead)
        console.log("Your score is: " + SNAKE.xBody.length + " | With: " + SNAKE.movesMade + " moves made.")
    } else {
        console.log("Map too small")
    }
}

function step() {
    SNAKE.move()
    if (WORLD[SNAKE.xHead][SNAKE.yHead] === state.apple) {
        SNAKE.grow()
        createApple()
    } else if ((WORLD[SNAKE.xHead][SNAKE.yHead] === state.snakeBody) || (WORLD[SNAKE.xHead][SNAKE.yHead] === state.border)) {
        SNAKE.dead = true
    }
    if (!SNAKE.dead) {
        WORLD.update()
    }
}

function action(){
    switch (getRandomInt(4)) {
        case 0:
            return "N"
        case 1:
            return "W"
        case 2:
            return "E"
        case 3:
            return "S"
    }
}
function init() {
    drawBorder()
    createApple()
    createSnake()
}

function drawBorder() {
    for (let i = 0; i < WORLD.length; i++) {
        for (let j = 0; j < WORLD[i].length; j++) {
            if (i % (WORLD_SIZE - MAP_SIZE + 1) < BORDER_SIZE || j % (WORLD_SIZE - MAP_SIZE + 1) < BORDER_SIZE) {
                WORLD[i][j] = state.border
            } else {
                WORLD[i][j] = state.grass
            }
        }
    }
}

function createApple() {
    let x, y
    do {
        x = getRandomInt(MAP_SIZE) + BORDER_SIZE
        y = getRandomInt(MAP_SIZE) + BORDER_SIZE
    } while (WORLD[x][y] === state.snakeHead || WORLD[x][y] === state.snakeBody || SNAKE ? (SNAKE.xBody.length + 1 === MAP_SIZE * MAP_SIZE) : 0)
    WORLD[x][y] = state.apple
    APPLE.x = x
    APPLE.y = y
}

function createSnake() {
    let x, y, xHead, yHead
    do {
        xHead = getRandomInt(MAP_SIZE) + BORDER_SIZE
        yHead = getRandomInt(MAP_SIZE) + BORDER_SIZE
    } while (checkForApple(xHead, yHead))
    WORLD[xHead][yHead] = state.snakeHead
    do {
        switch (getRandomInt(4)) {
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

    } while (WORLD[xHead - x][yHead - y] !== state.grass)
    WORLD[xHead - x][yHead - y] = state.snakeBody
    SNAKE = new Snake(xHead, yHead, xHead - x, yHead - y)
}

function checkForApple(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (WORLD[x + i][y + j] === state.apple) {
                return true
            }
        }
    }
    return false
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function checkForEnd() {
    return false
}

function printWorld() {
    console.clear()
    for (let y = -2; y < MAP_SIZE; y++) {
        let worldRow = ""
        for (let x = -2; x < MAP_SIZE; x++) {
            worldRow = worldRow + ' ' + WORLD[x + BORDER_SIZE + 1][y + BORDER_SIZE + 1]
        }
        console.log(worldRow)
    }
}