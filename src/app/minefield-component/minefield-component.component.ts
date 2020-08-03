import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield-component.component.html',
  styleUrls: ['./minefield-component.component.css']
})
export class MinefieldComponentComponent implements OnInit {

  public board = [[]];
  public gameStarted = false;
  public tileWidth = 20; //width of each tile
  public totalBombs;
  @Input() public gameSettings = [];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event){
    console.log((typeof(this.tileWidth)));
    console.log((typeof(this.gameSettings[0])));
  }

  //happens when the user hits the 'New Game' button
  newGame(){

    

  }

}
