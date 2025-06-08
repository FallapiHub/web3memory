const test = document.getElementById("dawg")
const gevondenKaarten = document.getElementById("gevondenKaarten")
const startGame = document.getElementById("startgame")
let grootte = "4";


let cats = [];

function getCatApi(){
    cats = [];
    const random = Math.floor(Math.random() * (50));
    const limit = (grootte**2)/2;
    fetch('https://cataas.com/api/cats?limit='+limit+'&skip=' + random)
        .then(response => response.json())
        .then(data => {
            data.forEach((cat) => {
                cats.push(`https://cataas.com/cat/${cat.id}?type=square`)
                cats.push(`https://cataas.com/cat/${cat.id}?type=square`)
            })
            //test.innerHTML = cats;
            test.innerHTML = random;
            tiles()
        })
        .catch(error => console.log(error));
}




//kleuren
let kaartKleur = "#ff7f50"
let karakter = "*";

document.getElementById("kaartkleur").value = kaartKleur
document.getElementById("karakter").value = karakter
document.getElementById("grootte").value = grootte


let countTiles = 0
let openTiles = []
let correctTiles = []
let gameTileValues=[]



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
        tileDiv.style.backgroundColor = kaartKleur;
        board.appendChild(tileDiv);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
}

function reset(){
    countTiles = 0
    openTiles = []
    correctTiles = []
    gameTileValues = []
    gevondenKaarten.innerText = "Gevonden kaarten: " + countTiles
    removeTiles()
    getCatApi()
}

startGame.addEventListener("click", function () {
    const tile = document.getElementsByClassName("tile");
    kaartKleur = document.getElementById("kaartkleur").value
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

    const A = gameTileValues.find(tile => tile[0] === TileA);
    const B = gameTileValues.find(tile => tile[0] === TileB);



    if(A[1] === B[1]){
        correctTiles.push(TileA)
        correctTiles.push(TileB)
        countTiles = countTiles + 2
        gevondenKaarten.innerText = "Gevonden kaarten: " + countTiles
    }
    else{

        TileA.style.backgroundColor = kaartKleur
        TileB.style.backgroundColor = kaartKleur
        TileA.style.backgroundImage = null;
        TileB.style.backgroundImage = null;
        TileA.innerText = karakter
        TileB.innerText = karakter
    }
    openTiles.shift();
    openTiles.shift();

}

function openTile(obj){
    const tile = document.getElementsByClassName("tile");
    if(!openTiles.includes(obj) && !correctTiles.includes(obj)){
        openTiles[openTiles.length] = obj
        if (openTiles.length===2){
            const tile = gameTileValues.find(tile => tile[0] === obj);
            obj.innerText = "";
            obj.style.backgroundImage = "url(" + tile[1] + ")";




            setTimeout(checkTiles, 1000)

        }
        else{

            obj.innerText = "";
            const tile = gameTileValues.find(tile => tile[0] === obj);
            obj.style.backgroundImage = "url(" + tile[1] + ")";



        }

    }

}


function clickHandler(i){
    gameTileValues.push([this, cats[i]]);
    openTile(this);
}
const handlers = [];


function tiles(){
    boardCreator(grootte)
    const tile = document.getElementsByClassName("tile");
    shuffleArray(cats);
    for  (let i = 0; i < tile.length; i++) {
        const handler = clickHandler.bind(tile[i], i);

        handlers[i] = handler;

        tile[i].addEventListener("click", handler);

        tile[i].innerText = karakter;
        tile[i].style.backgroundColor = kaartKleur
    }
}

function removeTiles(){
    const tile = document.getElementsByClassName("tile");
    for  (let i = 0; i < tile.length; i++) {
        tile[i].removeEventListener("click", handlers[i]);
    }
    handlers.length = 0;
}


getCatApi()

