class Escalera extends State{
	enter(delta, scene, jugador){
		//console.log("Estado escalera");
		
		jugador.anims.play("trepar", true);
		
		if(resto.getTileAtWorldXY(jugador.x, jugador.y) && idEnredaderas.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index)){
			jugador.sEnredaderas.play();
		}else{
			jugador.sEscalera.play();
		}
		
		jugador.body.setAllowGravity(false);
		jugador.dashDisponible = true;
		
		
		if(jugador.dirY != 0){
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, jugador.dirY * velEscaleras, aceleracion));
		}else{
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, 0, friccionSuelo));
		}
		if(jugador.dirX != 0){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirY * velEscaleras, aceleracion));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionSuelo));
		}
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(!jugador.enEscalera && !jugador.enSuelo){	
			jugador.sEscalera.stop();
			jugador.sEnredaderas.stop();
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if(jugador.body.blocked.down){
			jugador.sEscalera.stop();
			jugador.sEnredaderas.stop();
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		if(jugador.jumpsquat && jugador.dirY == 0){
			jugador.sEscalera.stop();
			jugador.sEnredaderas.stop();
			jugador.stateMachine.transition(delta, 'salto');
			return;
		}
		
		if(jugador.dirY != 0){
			jugador.anims.play("trepar", true);
			if(!jugador.sEscalera.isPlaying && !jugador.sEnredaderas.isPlaying ){
				if(resto.getTileAtWorldXY(jugador.x, jugador.y) && idEnredaderas.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index)){
					jugador.sEnredaderas.play();
				}else{
					jugador.sEscalera.play();
				}
			}
			
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, jugador.dirY * velEscaleras, aceleracion));
		}else{
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, 0, friccionSuelo));
		}
		if(jugador.dirX != 0){
			jugador.anims.play("trepar", true);
			if(!jugador.sEscalera.isPlaying && !jugador.sEnredaderas.isPlaying ){
				if(resto.getTileAtWorldXY(jugador.x, jugador.y) && idEnredaderas.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index)){
					jugador.sEnredaderas.play();
				}else{
					jugador.sEscalera.play();
				}
			}
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * velEscaleras, aceleracion));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionSuelo));
		}
		if(jugador.dirX == 0 && jugador.dirY == 0){
			jugador.sEscalera.pause();
			jugador.sEnredaderas.pause();
			jugador.anims.stop();
		}
	}
}
