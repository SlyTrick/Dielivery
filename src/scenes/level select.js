// JavaScript source code
class LevelSelect extends Phaser.Scene {

    constructor() {
        super("LevelSelect");
    }

    preload() {
        this.load.image('fondo', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('volver', 'assets/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Botones/volver_pulsado.png');
        this.load.image('1', 'assets/Botones/1.png');
        this.load.image('2', 'assets/Botones/2.png');;
        this.load.image('3', 'assets/Botones/3.png');
        
    }

    create() {
		var Nivel1PosX = this.sys.game.canvas.width / 4;
		var Nivel1PosY = this.sys.game.canvas.height / 2;
		var Nivel2PosX = this.sys.game.canvas.width / 4 * 2;
		var Nivel2PosY = this.sys.game.canvas.height / 2;
		var Nivel3PosX = this.sys.game.canvas.width / 4 * 3;
		var Nivel3PosY = this.sys.game.canvas.height / 2;
		var volverPosX = 200;
		var volverPosY = 50;
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		
		
        this.add.image(640, 360, 'fondo');

        this.buttonNivel1 = this.add.sprite(Nivel1PosX, Nivel1PosY, '1').setScale(0.5).setInteractive();
        this.buttonNivel2 = this.add.sprite(Nivel2PosX, Nivel2PosY, '2').setScale(0.5).setInteractive();
		this.buttonNivel3 = this.add.sprite(Nivel3PosX, Nivel3PosY, '3').setScale(0.5).setInteractive();
        
		this.buttonNivel1.on('pointerdown', () => this.clickButtonNivel1());
		this.buttonNivel2.on('pointerdown', () => this.clickButtonNivel2());
		this.buttonNivel3.on('pointerdown', () => this.clickButtonNivel3());
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
		
		var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);
    }

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
	
    clickButtonNivel1(){
		//this.scale.off('resize');
        this.scene.start("Game", "Nivel1");
    }
    clickButtonNivel2(){
		//this.scale.off('resize');
        this.scene.start("Game", "Nivel2");
    }
    clickButtonNivel3(){
		//this.scale.off('resize');
        this.scene.start("Game", "Nivel3");
    }

	clickButtonVolver() {
		//this.scale.off('resize');
        this.scene.start("Mainmenu");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());
    }
    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
    }
}
