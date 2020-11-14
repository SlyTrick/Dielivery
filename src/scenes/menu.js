// JavaScript source code
const separacionBotones = 90;
const jugarPosX = width / 2;
const jugarPosY = 270;
const comoJugarPosX = width / 2;
const comoJugarPosY = jugarPosY + separacionBotones;
const creditosPosX = width / 2;
const creditosPosY = comoJugarPosY + separacionBotones;
const volverPosX = 200;
const volverPosY = 50;
const idiomaPosX = width - 75;
const idiomaPosY = height - 75

var seHaJugado = false;

var valorFade = 200;
class Mainmenu extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
    }
    
	shutdown(){
		this.load.off('progress');
		this.load.off('complete');
    }
    
    preload() {
		// BARRA DE CARGA
		/*var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		
		var progressBar = this.add.graphics(width / 2, height / 2);
		var progressBox = this.add.graphics(width / 2, height / 2);
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(width / 2 - 320 / 2, height / 2, 320, 50);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		this.load.on('progress', function (value) {
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width / 2 - 320 / 2 + 10, height / 2 + 10, 300 * value, 30);

			percentText.setText(parseInt(value * 100) + '%');
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			percentText.destroy();
		});
		this.sys.events.once('shutdown', this.shutdown, this);
		*/
		
		// CARGA
		/*
        this.load.image('fondo', 'assets/Interfaz/Fondo menu principal.jpg');
        this.load.image('tablon', 'assets/Interfaz/Tablon menu principal cartas.png');
        this.load.image('logo', 'assets/logo.png');
        */
		
		// SENSIBLE A IDIOMA
		// ESPAÑOL
		if(idioma.includes("es")){
			this.load.image('jugar', 'assets/Interfaz/Botones/jugar.png');
			this.load.image('jugar_pulsado', 'assets/Interfaz/Botones/jugar_pulsado.png');;
			this.load.image('creditos', 'assets/Interfaz/Botones/creditos.png');
			this.load.image('creditos_pulsado', 'assets/Interfaz/Botones/creditos_pulsado.png');
			this.load.image('ranking', 'assets/Interfaz/Botones/empleado.png');
			this.load.image('ranking_pulsado', 'assets/Interfaz/Botones/empleado_pulsado.png');
			this.load.image('idioma', 'assets/Interfaz/Botones/idioma_espanol.png');
		}
        else{
			// INGLES
			this.load.image('jugar', 'assets/Interfaz/Botones/play.png');
			this.load.image('jugar_pulsado', 'assets/Interfaz/Botones/play_pulsado.png');;
			this.load.image('creditos', 'assets/Interfaz/Botones/credits.png');
			this.load.image('creditos_pulsado', 'assets/Interfaz/Botones/credits_pulsado.png');
			this.load.image('ranking', 'assets/Interfaz/Botones/employee.png');
			this.load.image('ranking_pulsado', 'assets/Interfaz/Botones/employee_pulsado.png');
			this.load.image('idioma', 'assets/Interfaz/Botones/idioma_ingles.png');
		}
		
		
        
        

		
    }
	
    create() {
		this.cameras.main.fadeIn(valorFade);
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		var flipflop = false;
		
        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
        this.tablon = this.add.image(width / 2, height / 2, 'tablon');
        this.add.image(300, 150, 'logo').setScale(0.4);

        this.buttonJugar = this.add.sprite(jugarPosX, jugarPosY, 'jugar').setInteractive();
        this.buttonJugar.on('pointerdown', () => {this.buttonJugar.setTexture("jugar_pulsado");});
        this.buttonJugar.on('pointerup', () => PasarEscena(this, "LevelSelect"));
        this.buttonJugar.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonJugar.setTexture("jugar_pulsado");}});
        this.buttonJugar.on('pointerout', () => {this.buttonJugar.setTexture("jugar");});
		
        this.buttonRanking = this.add.sprite(comoJugarPosX, comoJugarPosY, 'ranking').setInteractive();
		this.buttonRanking.on('pointerdown', () => {this.buttonRanking.setTexture("ranking_pulsado");});
        this.buttonRanking.on('pointerup', () => PasarEscena(this, "Ranking"));
        this.buttonRanking.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonRanking.setTexture("ranking_pulsado");}});
        this.buttonRanking.on('pointerout', () => {this.buttonRanking.setTexture("ranking");});

        this.buttonCreditos = this.add.sprite(creditosPosX, creditosPosY, 'creditos').setInteractive();
		this.buttonCreditos.on('pointerdown', () => {this.buttonCreditos.setTexture("creditos_pulsado");});
        this.buttonCreditos.on('pointerup', () => PasarEscena(this, "creditos"));
        this.buttonCreditos.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonCreditos.setTexture("creditos_pulsado");}});
        this.buttonCreditos.on('pointerout', () => {this.buttonCreditos.setTexture("creditos");});
		
		this.buttonIdioma = this.add.sprite(idiomaPosX, idiomaPosY, 'idioma').setInteractive();
		this.buttonIdioma.on('pointerdown', () => this.CambiarIdioma());

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

	CambiarIdioma(){
		arrayCausaMuerte = new Array();
		if(idioma.includes("es")){
			idioma = "en";
			
			arrayCausaMuerte = arrayCausaMuerteIngles;
			// LO PONGO EN ELSE IF POR SI ACASO AÑADIMOS MÁS IDIOMAS
		}else if(idioma.includes("en")){
			idioma = "es";
			
			arrayCausaMuerte = arrayCausaMuerteEspanol
		}else{ // 
			idioma = "es";
			
			arrayCausaMuerte = arrayCausaMuerteEspanol
		}
		this.textures.remove('jugar');
		this.textures.remove('jugar_pulsado');
		this.textures.remove('ranking');
		this.textures.remove('ranking_pulsado');
		this.textures.remove('creditos');
		this.textures.remove('creditos_pulsado');
		this.textures.remove('idioma');
		this.scene.restart();
	}
	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}

function PasarEscena(that, escena, nivel){
	//this.scale.off('resize');
	that.cameras.main.fadeOut(valorFade);
	if(nivel == "Ranking"){
		seHaJugado = false;
	}
    that.cameras.main.on('camerafadeoutcomplete', () => {that.scene.start(escena, nivel);});
	
	
    //if(nombreJugador == undefined){
      //  console.log('Mete un nombre, bobo');
    //}else{
      //  that.scene.start(escena, nivel);
    //}
}

