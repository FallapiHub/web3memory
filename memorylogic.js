const test = document.getElementById("dawg")
const gevondenKaarten = document.getElementById("gevondenKaarten")
const startGame = document.getElementById("startgame")

//kleuren
let kaartKleur = "#ff7f50"
let openKleur = "#1ec5e5"
let gevondenKleur = "#7af153"
let karakter = "*";
let grootte = "6";

document.getElementById("kaartkleur").value = kaartKleur
document.getElementById("openkleur").value =  openKleur
document.getElementById("gevondenkleur").value = gevondenKleur
document.getElementById("karakter").value = karakter
document.getElementById("grootte").value = grootte


let countTiles = 0
let openTiles = []
let correctTiles = []
let allTiles= [
    'a',    'a',
    'b',    'b',
    'c',    'c',
    'd',    'd',
    'e',    'e',
    'f',    'f',
    'g',    'g',
    'h',    'h',
    'i',    'i',
    'j',    'j',
    'k',    'k',
    'l',    'l',
    'm',    'm',
    'n',    'n',
    'o',    'o',
    'p',    'p',
    'q',    'q',
    'r',    'r',
    's',    's',
    't',    't',
    'u',    'u',
    'v',    'v',
    'w',    'w',
    'x',    'x',
    'y',    'y',
    'z',    'z',
]
let boardTiles = []

let gameTileValues=[]

function boardTileSlice(size){
    size=size**2;
    boardTiles = allTiles.slice(0, size);

}

function boardCreator(size){
    size = parseInt(size, 10)
    const board = document.getElementById("board");

    if(size===2){
        board.style.gridTemplateColumns = "1fr 1fr";
    }
    else if(size===4){
        board.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    }
    else if(size===6){
        board.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
    }

    board.innerHTML = "";
    size=size**2;
    for(let i = 0; i < size; i++){
        const tileDiv = document.createElement("div");
        tileDiv.classList.add("tile");
        tileDiv.innerText = "zazaza";
        tileDiv.style.backgroundColor = kaartKleur;
        board.appendChild(tileDiv);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }

    test.innerText = array;

    return array;
}

function reset(){
    countTiles = 0
    openTiles = []
    correctTiles = []
    gameTileValues = []
    boardTiles = []
    gevondenKaarten.innerText = "Gevonden kaarten: " + countTiles
    removeTiles()
    tiles()
}






startGame.addEventListener("click", function () {
    kaartKleur = document.getElementById("kaartkleur").value
    openKleur =  document.getElementById("openkleur").value
    gevondenKleur =  document.getElementById("gevondenkleur").value
    karakter =  document.getElementById("karakter").value
    grootte =  document.getElementById("grootte").value
    for  (let i = 0; i < tile.length; i++) {
        tile[i].style.backgroundColor = kaartKleur
    }
    reset();
})







function checkTiles(){
    let TileA = openTiles[0]
    let TileB = openTiles[1]

    if(TileA.innerText == TileB.innerText){
        correctTiles.push(TileA)
        correctTiles.push(TileB)
        TileA.style.backgroundColor = gevondenKleur
        TileB.style.backgroundColor = gevondenKleur
        countTiles = countTiles + 2
        gevondenKaarten.innerText = "Gevonden kaarten: " + countTiles
    }
    else{

        TileA.style.backgroundColor = kaartKleur
        TileB.style.backgroundColor = kaartKleur
        TileA.innerText = karakter
        TileB.innerText = karakter
    }
    openTiles.shift();
    openTiles.shift();

}

function openTile(obj) {
    if(!openTiles.includes(obj) && !correctTiles.includes(obj)){
        openTiles[openTiles.length] = obj
        if (openTiles.length===2){
            obj.style.backgroundColor = openKleur;

            const tile = gameTileValues.find(tile => tile[0] === obj);
            obj.innerText = tile[1];


            setTimeout(checkTiles, 1000)

        }
        else{
            obj.style.backgroundColor = openKleur;

            const tile = gameTileValues.find(tile => tile[0] === obj);
            obj.innerText = tile[1];

        }

    }

}

const tile = document.getElementsByClassName("tile");

function clickHandler(i){
    gameTileValues.push([this, boardTiles[i]]);
    openTile(this);
}
const handlers = [];


function tiles(){
    boardTileSlice(grootte)
    boardCreator(grootte)
    shuffleArray(boardTiles);
    for  (let i = 0; i < tile.length; i++) {
        const handler = clickHandler.bind(tile[i], i);

        handlers[i] = handler;

        tile[i].addEventListener("click", handler);

        tile[i].innerText = karakter;
        tile[i].style.backgroundColor = kaartKleur
    }
}

function removeTiles(){
    for  (let i = 0; i < tile.length; i++) {
        tile[i].removeEventListener("click", handlers[i]);
    }
    handlers.length = 0;
}

tiles()


