import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { GameModule } from '../game/game.module';
import { AppComponent }  from './app.component';
import { routes } from './app.routes';

@NgModule({
  imports:      [ BrowserModule, CommonModule, RouterOutlet, GameModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent, ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }