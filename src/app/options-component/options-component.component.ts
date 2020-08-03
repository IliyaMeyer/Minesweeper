import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options-component.component.html',
  styleUrls: ['./options-component.component.css']
})
export class OptionsComponentComponent implements OnInit {

  public gameDifficulty : string = "normal";

  //sets the number of tiles for each size
  public largeGameSize = "32";
  public mediumGameSize = "16";
  public smallGameSize = "8";

  //sets the default tile size
  public defaultGameSize = this.mediumGameSize;
  public gameSize = this.defaultGameSize;

  @Output() public settingsEmitter = new EventEmitter();

  constructor() { }

  //sends the game-settings to the app-component
  //called when the 'New Game' button is pressed
  sendSettings(){
    this.settingsEmitter.emit([parseInt(this.gameSize), this.gameDifficulty]);
  }

  ngOnInit(): void {
  }

}
