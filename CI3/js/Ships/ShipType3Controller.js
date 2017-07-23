class ShipType3Controller extends ShipController{
  constructor(x, y, configs){
    configs.cooldown = 0.3;
    configs.health = 5;
    configs.frameNameDefault = "Spaceship3-Player.png";
    configs.frameNameLeft   = "Spaceship3Left-Player.png";
    configs.frameNameRight   = "Spaceship3Left-Player.png";
    super(x, y, "Spaceship3-Player.png", configs);
  }
  fire(){
    if(!this.sprite.alive) return;

    this.createBullet(new Phaser.Point(-1, -10));
    this.createBullet(new Phaser.Point(1, -10));
  }

  createBullet(direction){
    new PlayerBulletType2Controller(
      this.sprite.position,
      direction
    );
  }
}
