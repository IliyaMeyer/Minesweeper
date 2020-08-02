import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield-component.component.html',
  styleUrls: ['./minefield-component.component.css']
})
export class MinefieldComponentComponent implements OnInit {

  public board = [[]];
  public gameStarted = false;
  public totalBombs
  @Input() public gameSettings = [];

  constructor() { }

  ngOnInit(): void {
  }

  repeatNTimes(n : Number){
    return Array(n);
  }

  onClick(event){
    
  }
  //happens when the user hits the 'New Game' button
  newGame(){

    

  }

}
