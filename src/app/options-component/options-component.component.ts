import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options-component.component.html',
  styleUrls: ['./options-component.component.css']
})
export class OptionsComponentComponent implements OnInit {

  public setDifficulty : string = "Normal";
  public setSize : string = "Small";

  constructor() { }

  ngOnInit(): void {
  }

}
