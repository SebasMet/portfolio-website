import { NgModule }      from '@angular/core';
import { PhaserGame } from '../game/phaser-game.component';

@NgModule({
  declarations: [ PhaserGame, ],
  exports: [PhaserGame]
})
export class GameModule { }