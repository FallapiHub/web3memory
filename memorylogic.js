const hi="hello world"

const text = document.getElementById("dawg")
const gevondenKaarten = document.getElementById("gevondenKaarten")
const startGame = document.getElementById("startgame")

//kleuren
let kaartKleur = "#ff7f50"
let openKleur = "#1ec5e5"
let gevondenKleur = "#7af153"
document.getElementById("kaartkleur").value = kaartKleur
document.getElementById("openkleur").value =  openKleur
document.getElementById("gevondenkleur").value = gevondenKleur



let countTiles = 0
let openTiles = []
let correctTiles = []

startGame.addEventListener("click", function () {
    kaartKleur = document.getElementById("kaartkleur").value
    openKleur =  document.getElementById("openkleur").value
    gevondenKleur =  document.getElementById("gevondenkleur").value
    for  (let i = 0; i < tile.length; i++) {
        tile[i].style.backgroundColor = kaartKleur
    }
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
        // TileA.style.backgroundColor = "#FF7F50FF"
        // TileB.style.backgroundColor = "#FF7F50FF"
        TileA.style.backgroundColor = kaartKleur
        TileB.style.backgroundColor = kaartKleur
    }
}

function openTile(obj) {
    if(!openTiles.includes(obj) && !correctTiles.includes(obj)){
        openTiles[openTiles.length] = obj
        if (openTiles.length==2){

            checkTiles()
            openTiles = [];

        }
        else{
            //obj.style.backgroundColor = "#1ec5e5";
            obj.style.backgroundColor = openKleur;
        }

        text.innerText = openTiles;
    }

}

const tile = document.getElementsByClassName("tile");
for  (let i = 0; i < tile.length; i++) {
    tile[i].addEventListener("click", function() {
            openTile(this);
    });
    tile[i].style.backgroundColor = kaartKleur
}

