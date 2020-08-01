import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OptionsComponentComponent } from './options-component/options-component.component';
import { FormsModule } from '@angular/forms';
import { MinefieldComponentComponent } from './minefield-component/minefield-component.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponentComponent,
    MinefieldComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
