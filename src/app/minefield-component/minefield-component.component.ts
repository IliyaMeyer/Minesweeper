import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield-component.component.html',
  styleUrls: ['./minefield-component.component.css']
})
export class MinefieldComponentComponent implements OnInit {

  //sets the URLs for various image files
  public unclickedTileURL = "/assets/img/tile-unclicked.png";

  //utility variables
  public minefield = [];
  public gameStarted = false;
  public totalMines; //how many mines are currently on the board
  @Input() public gameSettings = []; //the game's settings - [size, difficulty]

  //constants
  public difficultyRatios = [1/8, 2/8, 3/8]; //sets the ratios of bomb to non-bomb tiles
  public tileWidth = 20; //width of each tile

  constructor() { }

  ngOnInit(): void {
  }

  //specifically used to build the tiles on the board
  tileBuilder(){
    return Array(this.gameSettings[0] * this.gameSettings[0]);
  }

  //occurs whenever the user clicks a tile
  onClick(event){

    //gets the coordinates of the tile which was clicked
    let clickPosition = this.getTile(event.offsetX, event.offsetY);

    //if it is the first move, builds the board, otherwise it treats it as a normal move
    if (this.gameStarted == false)
      this.newGame(clickPosition);
    else {

      //TODO

    }

  }

  //determines what tile to put in the spot
  setTile(position){

  }

  //given the position of a click relative to the board component, returns coordinates of the tile which was clicked
  getTile(offsetX, offsetY){
    return [Math.floor(offsetY / this.tileWidth), Math.floor(offsetX / this.tileWidth)];
  }

  //happens when the user hits the 'New Game' button
  newGame(startPosition){

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
      if (!(dropY == startPosition[0] && dropX == startPosition[0]) && this.minefield[dropY][dropX] != -1){
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

    this.gameStarted = true;

  }

}
