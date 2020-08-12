import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield-component.component.html',
  styleUrls: ['./minefield-component.component.css']
})
export class MinefieldComponentComponent implements OnInit {

    //sets the URLs for various image files
    public unclickedTileURL = "/assets/img/tile-unclicked.png";
    public clicked0TileURL = "/assets/img/tile-clicked-0.png";
  
    //holds all the URL's for the various different tiles
    public boxURL = {
      "-1": "/assets/img/tile-clicked-mine.png",
      "0": "/assets/img/tile-clicked-0.png",
      "1": "/assets/img/tile-clicked-1.png",
      "2": "/assets/img/tile-clicked-2.png",
      "3": "/assets/img/tile-clicked-3.png",
      "4": "/assets/img/tile-clicked-4.png",
      "5": "/assets/img/tile-clicked-5.png",
      "6": "/assets/img/tile-clicked-6.png",
      "7": "/assets/img/tile-clicked-7.png",
      "8": "/assets/img/tile-clicked-8.png",
      "9": "/assets/img/tile-clicked-9.png",
      "unc": "/assets/img/tile-unclicked.png"
    }
  
  /*public boxURL = {
    "-1": "/assets/img/tile-clicked-mine.png",
    "0": "https://imgur.com/E8HguTs.png",
    "1": "https://imgur.com/G2PDa0m.png",
    "2": "https://imgur.com/jcoxwVT.png",
    "3": "https://imgur.com/8Ws7okp.png",
    "4": "https://imgur.com/lpo40St.png",
    "5": "https://imgur.com/JzffpPW.png",
    "6": "https://imgur.com/BfxPFKh.png",
    "7": "https://imgur.com/ldCgjda.png",
    "8": "https://imgur.com/5hvA1lL.png",
    "9": "https://imgur.com/NlqXinE.png",
    "unc": "https://imgur.com/lMg0TjQ.png"
  }*/
  
  //utility variables
  public minefield = [];
  public clickfield = []; //stores which mines have been clicked
  public totalMines; //how many mines are currently on the board
  public gameStarted = false; //whether or not the game has started
  public gameFailed = false; //whether or not the user has failed the game
  @Input() public gameSettings = []; //the game's settings - [size, difficulty]

  //constants
  public difficultyRatios = [1/8, 2/8, 3/8]; //sets the ratios of bomb to non-bomb tiles
  public tileWidth = 20; //width of each tile

  constructor() { 

  }

  ngOnInit(): void {
  }

  //ends the game
  public endGame(){
    this.gameStarted = false;
    this.gameFailed = false;
  }

  //specifically used for the ngFor in the html for buidling the tile images
  tileBuilder(){
    return Array(this.gameSettings[0] * this.gameSettings[0]);
  }

  //occurs whenever the user clicks a tile
  onClick(i : number){

    //ignore the click if the user has failed the game
    if (this.gameFailed)
      return;

    //gets the coordinates of the tile which was clicked
    let clickPosition = this.nToXYIndex(i);

    //if it is the first move, builds the board, otherwise it treats it as a normal move
    if (this.gameStarted == false)
      this.newGame(clickPosition);
    else {

      this.revealTile(clickPosition);

    }

  }

  //give an integer n representing the nth tile, converts to a coordinate: y,x
  //this needs a better name
  nToXYIndex(n : number){
    return [Math.floor(n / this.gameSettings[0]), n % this.gameSettings[0]];
  }

  //determines what tile to put in the spot
  setTile(position : number){  
    if (!this.gameStarted)
      return this.boxURL["unc"];
    let cords = this.nToXYIndex(position);
    if (this.clickfield[cords[0]][cords[1]])
      return this.boxURL[this.minefield[cords[0]][cords[1]].toString()];
    else
      return this.boxURL["unc"];
  }

  //given the position of a click relative to the board component, returns coordinates of the tile which was clicked
  getTile(offsetX : number, offsetY : number){
    return [Math.floor(offsetY / this.tileWidth), Math.floor(offsetX / this.tileWidth)];
  }

  //reveals the tile at the position given, ends the game if it is a mine
  revealTile(tilePosition : number[]){

    //TODO - add check for mine!

    if (this.clickfield[tilePosition[0]][tilePosition[1]])
      return;
    else{
      if (this.minefield[tilePosition[0]][tilePosition[1]] == -1){
        this.mineTrip();
        return;
      }
      this.clickfield[tilePosition[0]][tilePosition[1]] = true;
      this.clearAround(tilePosition);
    }

  }

  //clears all the '0' cells next to the cell
  clearAround(tilePosition : number[]){

    if (this.minefield[tilePosition[0]][tilePosition[1]] != 0)
      return;

    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        if (tilePosition[0] + i >= 0 && tilePosition[0] + i < this.gameSettings[0]
          && tilePosition[1] + j >= 0 && tilePosition[1] + j < this.gameSettings[0]
          && !this.clickfield[tilePosition[0] + i][tilePosition[1] + j]){
          this.revealTile([tilePosition[0] + i, tilePosition[1] + j]);
      
      }

  }

  //happens when the user hits the 'New Game' button
  newGame(startPosition : number[]){

    //resizes the clickfield
    this.clickfield = [];
    for (let i = 0; i < this.gameSettings[0]; i++)
    this.clickfield.push(new Array(this.gameSettings[0]).fill(false));

    //initializes all the values in the board to be 0
    this.minefield = [];
    for (let i = 0; i < this.gameSettings[0]; i++)
      this.minefield.push(new Array(this.gameSettings[0]).fill(0));

    //sets the number of mines
    let mines = this.gameSettings[0] * this.gameSettings[0];
    switch(this.gameSettings[1]){
      case "easy":
        mines *= this.difficultyRatios[0];
        break;
      case "normal":
        mines *= this.difficultyRatios[1];
        break;
      case "hard":
        mines *= this.difficultyRatios[2];
        break;
    }
    this.totalMines = mines;

    let mineList = []; //list of the mine positions - used in determining the number of mines which surround non-mine tiles

    //randomly drops the mines
    while (mines){
      
      let dropY = Math.floor((Math.random() * this.gameSettings[0]));
      let dropX = Math.floor((Math.random() * this.gameSettings[0]));

      //makes sure that the mine spot is neither the first tile that was clicked nor already mined before placing the mine
      if (!(dropY >= startPosition[0] - 1 && dropY <= startPosition[0] + 1 && dropX >= startPosition[1] - 1 && dropX <= startPosition[1] + 1) && this.minefield[dropY][dropX] != -1){
        mineList.push([dropY, dropX]);
        this.minefield[dropY][dropX] = -1;
        mines--;
      }
    
    }
  
    //sets the number of mines which surround non-mine tiles
    for (let i = 0; i < mineList.length; i++){
      for (let y = -1; y <= 1; y++)
        for (let x = -1; x <= 1; x++)
          if (mineList[i][0] + y >= 0 && mineList[i][0] + y < this.gameSettings[0]
            && mineList[i][1] + x >= 0 && mineList[i][1] + x < this.gameSettings[0]
            && this.minefield[mineList[i][0] + y][mineList[i][1] + x] != -1) //this if-statement really sucks but whatever
            this.minefield[mineList[i][0] + y][mineList[i][1] + x]++;
    }

    this.revealTile(startPosition);
    this.gameStarted = true;

  }

  //disables the board after revealing all the mines
  mineTrip(){

    for (let i = 0; i < this.gameSettings[0]; i++)
      for (let j = 0; j < this.gameSettings[0]; j++)
        if (this.minefield[i][j] == -1)
          this.clickfield[i][j] = true;

    this.gameFailed = true;

    //this.endGame();

  }

}
