class Tarjeta extends Phaser.GameObjects.Container{
	constructor(scene, x, y, pedido) {
		var imagenes = new Array();
		
		if(pedido.destinatario){
			imagenes.push(scene.add.image(0, 0, 'cielo' /*+ pedido.numObjetos*/).setInteractive());
		}else{
			imagenes.push(scene.add.image(0, 0, 'infierno' /*+ pedido.numObjetos*/).setInteractive());
		}
		
		for(var i = 0; i < pedido.numObjetos; i++){
			imagenes.push(scene.add.image(-100 + i * 64, 75, pedido.objetos[i]));
		}
		/*
		this.imagenes.push(scene.add.image(0, 0, 'persona' + pedido.persona));
		*/
		
		imagenes.push(scene.add.text(50, -100, pedido.nombre));
		imagenes.push(scene.add.text(50, -50, pedido.causaDeMuerte));
        super(scene, x, y, imagenes);
        
		this.imagenes = imagenes;
		
        scene.add.existing(this);
    }
}