import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { TiledLevel } from './scenes/TiledLevel';  
import { Router } from '@angular/router';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: '100%',
    height: '100%',
    parent: 'game-container',
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 }, // Adjust gravity to your needs
            debug: true      // Set to true to see physics boundaries
        }
    },
    scene: [
        Boot,
        Preloader,
        MainGame,
        GameOver,
        TiledLevel
    ]
};

const StartGame = (parent: string, router: Router) => {

    const game = new Game({ ...config, parent });

    (game as any).router = router;

    return game;

}

export default StartGame;
