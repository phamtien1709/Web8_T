class EnemyController {
  constructor(x,y,spriteName,configs){
    this.sprite = Nakama.enemyGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    this.configs = configs;
    this.timeSinceSpawn = 0;
    this.configs.centerX = (this.configs.minX + this.configs.maxX)/2;
    this.configs.movementDistance = (this.configs.maxX - this.configs.minX)/2;
  }

  update(){
    this.timeSinceSpawn += Nakama.game.time.physicsElapsed;
    this.sprite.position.x =
      this.configs.centerX
      + this.configs.movementDistance
      * Math.sin(Math.PI*2*this.timeSinceSpawn/this.configs.tweenTime);
  }
}
