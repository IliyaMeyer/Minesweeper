import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield-component.component.html',
  styleUrls: ['./minefield-component.component.css']
})
export class MinefieldComponentComponent implements OnInit {

  public board = [[]];

  constructor() { }

  ngOnInit(): void {
  }

  //there's probably a better way to do this
  buildBoard(boardSize : String, boardDifficulty : String){

    let startX = 0;
    let startY = 0;
    let size = 0;
    let bombs = 0;

    //determines the board's size
    switch (boardSize) {

      case 'large': 
        size = 32;
        break;
      
      case 'medium':
        size = 16;
        break;

      case 'small':
        size = 8;
        break;

    }

    bombs = size * size;

    //determines the number of bombs from the size of the board and the difficulty
    switch (boardDifficulty){

      case 'hard':
        bombs *= 0.75;
        break;
      
      case 'normal':
        bombs *= 0.50;
        break;

      case 'easy':
        bombs *= 0.25;
        break;

    }

    //plants mines around the board
    while (bombs != 0){

      //generates random coordinates on the board
      let x = Math.floor(Math.random() * size);
      let y = Math.floor(Math.random() * size);

      //makes sure that a bomb does not already exist in the desired spot
      //and that said spot was not the first tile clicked
      if (this.board[y][x] != "bomb" && (x != startX && y != startY)){
        this.board[y][x] = "bomb";
        bombs--;
      }

    }

  }

}
