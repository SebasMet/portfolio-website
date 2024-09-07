import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Player } from '../player/Player';

import Phaser from 'phaser';
import { Router } from '@angular/router';

export class TiledLevel extends Phaser.Scene {
    private router: Router;
  

    private player: Player;

    constructor() {
        super('TiledLevel');
        // Bind resizeGameView to ensure we use the same reference for adding and removing listeners
        this.resizeGameView = this.resizeGameView.bind(this);
    }

    init() {
        this.router = (this.game as any).router;
    }

    preload() {
        this.load.image('player', 'assets/player.png')

        this.load.tilemapTiledJSON('my-map', 'assets/project_clean.json');
        this.load.image('Grass', 'assets/TileSetImages/Grass.png');
        this.load.image('Hills', 'assets/TileSetImages/Hills.png');
        this.load.image('WoodenHouse', 'assets/TileSetImages/WoodenHouse.png');
        this.load.image('Water', 'assets/TileSetImages/Water.png');
        this.load.image('WoodBridge', 'assets/TileSetImages/WoodBridge.png');
        this.load.image('Basic_Grass_Biom_things', 'assets/TileSetImages/Basic_Grass_Biom_things.png');
        this.load.image('Paths', 'assets/TileSetImages/Paths.png');
    }

    create() {
        const map = this.make.tilemap({ key: 'my-map' });

        const tilesetGrass = map.addTilesetImage('Grass', 'Grass');
        const tilesetHills = map.addTilesetImage('Hills', 'Hills');
        const tilesetWoodenHouse = map.addTilesetImage('WoodenHouse', 'WoodenHouse');
        const tilesetWater = map.addTilesetImage('Water', 'Water');
        const tilesetWoodBridge = map.addTilesetImage('WoodBridge', 'WoodBridge');
        const tilesetGrassBiomObjects = map.addTilesetImage('Basic_Grass_Biom_things', 'Basic_Grass_Biom_things')
        const tilesetPaths = map.addTilesetImage('Paths', 'Paths')

        if (!tilesetGrass || !tilesetHills || !tilesetWoodenHouse || !tilesetWater || !tilesetWoodBridge || !tilesetGrassBiomObjects || !tilesetPaths) {
            console.error('One or more tilesets are missing');
            return;
        }

        // Create layers
        const waterLayer = map.createLayer('Water', [tilesetWater], 0, 0);
        const tileLayer1 = map.createLayer('Tile Layer 1', [tilesetGrass, tilesetHills, tilesetWoodenHouse], 0, 0);
        const tileLayer2 = map.createLayer('Tile Layer 2', [tilesetWoodBridge, tilesetHills, tilesetGrass, tilesetWoodenHouse, tilesetGrassBiomObjects, tilesetPaths], 0, 0);
        const borderLayer = map.createLayer('Border Layer', [tilesetWoodenHouse], 0, 0);
        const triggerLayer = map.getObjectLayer('TriggerLayer');


        this.player = new Player(this, 30, 60, 'player');


        if (borderLayer) {
            borderLayer.setVisible(false);
            borderLayer.setCollisionByExclusion([-1]);
            this.physics.add.collider(this.player, borderLayer, () => {
                console.log('Collision occurred!');
            });
        }

        this.setupTriggers(triggerLayer)

        // Initialize the map scale and position
        this.resizeGameView();

        // Listen to resize events
        window.addEventListener('resize', this.resizeGameView);
    }

    override update(time: number, delta: number) {
        this.player.update();
    }

    private setupTriggers(triggerLayer: any): void {
        console.log("1");
        
        if (triggerLayer && triggerLayer.objects) {
            console.log("2");
            triggerLayer.objects.forEach((triggerObject: Phaser.Types.Tilemaps.TiledObject) => {
                const trigger = this.add.rectangle(
                    (triggerObject.x || 0) + (triggerObject.width || 0) / 2,
                    (triggerObject.y || 0) + (triggerObject.height || 0) / 2,
                    triggerObject.width,
                    triggerObject.height
                );

                console.log("3");
                
                const triggerType = triggerObject.properties?.find((p: { name: string; }) => p.name === 'triggerType')?.value;
                console.log(triggerType)
                console.log("4");
                trigger.setData('triggerType', triggerType);
                
                this.physics.add.existing(trigger, true);
                this.physics.add.overlap(this.player, trigger, this.handleTrigger, undefined, this);
            });
        }
    }

    private handleTrigger(player: Phaser.GameObjects.GameObject | Phaser.Tilemaps.Tile, trigger: Phaser.GameObjects.GameObject | Phaser.Tilemaps.Tile): void {
        if (!(trigger instanceof Phaser.GameObjects.Rectangle)) {
            return;
        }
    
        // Now TypeScript knows that trigger is a Rectangle
        const triggerType = trigger.getData('triggerType') as string;
        switch(triggerType) {
            case 'resume':
                EventBus.emit("switch")
                console.log('Test trigger activated!');
                this.router.navigate(['/resume']);
                break;
            case 'contact':
                EventBus.emit("switch")
                console.log('Test trigger activated!');
                this.router.navigate(['/contact']);
                break;
            default:
                console.log('Unknown trigger type:', triggerType);
        }
    }






    resizeGameView() {
        const gameWidth = window.innerWidth;
        const gameHeight = window.innerHeight;

        // Get the map dimensions
        const map = this.make.tilemap({ key: 'my-map' });
        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        console.log('Map Size:', mapWidth, mapHeight, 'Window Size:', gameWidth, gameHeight);

        // Calculate the scale needed to fit the map to the screen
        const scaleX = gameWidth / mapWidth;
        const scaleY = gameHeight / mapHeight;
        const scale = Math.max(scaleX, scaleY);
        console.log(scale)

        this.cameras.main.setZoom(scale * 0.9);
        this.cameras.main.centerOn(mapWidth / 2, mapHeight / 2);
    }

    shutdown() {
        window.removeEventListener('resize', this.resizeGameView);
    }
}
