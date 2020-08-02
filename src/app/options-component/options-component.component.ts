import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options-component.component.html',
  styleUrls: ['./options-component.component.css']
})
export class OptionsComponentComponent implements OnInit {

  public gameDifficulty : string = "normal";
  public gameSize = "16";

  @Output() public settingsEmitter = new EventEmitter();

  constructor() { }
test(){
  console.log('Works');
}
  sendSettings(){
    this.settingsEmitter.emit([this.gameSize, this.gameDifficulty]);
  }

  ngOnInit(): void {
  }

}
