const hi="hello world"

const test = document.getElementById("dawg")
const gevondenKaarten = document.getElementById("gevondenKaarten")
const startGame = document.getElementById("startgame")

//kleuren
let kaartKleur = "#ff7f50"
let openKleur = "#1ec5e5"
let gevondenKleur = "#7af153"
let karakter = "*";

document.getElementById("kaartkleur").value = kaartKleur
document.getElementById("openkleur").value =  openKleur
document.getElementById("gevondenkleur").value = gevondenKleur
document.getElementById("karakter").value = karakter


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
]

let gameTileValues=[]

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
    removeTiles()
    tiles()
}






startGame.addEventListener("click", function () {
    kaartKleur = document.getElementById("kaartkleur").value
    openKleur =  document.getElementById("openkleur").value
    gevondenKleur =  document.getElementById("gevondenkleur").value
    karakter =  document.getElementById("karakter").value
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
}

function openTile(obj) {
    if(!openTiles.includes(obj) && !correctTiles.includes(obj)){
        openTiles[openTiles.length] = obj
        if (openTiles.length===2){
            obj.style.backgroundColor = openKleur;

            const tile = gameTileValues.find(tile => tile[0] === obj);
            obj.innerText = tile[1];


            checkTiles()
            openTiles = [];

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
    gameTileValues.push([this, allTiles[i]]);
    openTile(this);
}

const handlers = [];


function tiles(){
    shuffleArray(allTiles);
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


