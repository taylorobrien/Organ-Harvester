var P2Game = {};

//this.state2 = 'A';
var organ = 0;

P2Game.StateA = function (game) {

    this.player;
    this.block;
    this.tetris1;
    this.changeTimer;
    this.facing = 'left';
    this.cursors;
    this.bg;
    this.door;
    this.door2;
    this.jumpButton;
    this.grandpa;
    this.grandface = 'alive';
    this.score = 0;
    this.newroom;
    this.map;
    this.layer;
    this.littleboy;
    this.deadgrandpa = false;
    this.deadboy = false;
    this.alarmgroup;
    this.sprite
    this.alarmset = false;


    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateA.prototype = {

    preload: function () {
	this.load.spritesheet('littleboy','assets/boy-AD.png', 270,400,2);
        this.load.spritesheet('ninja', 'assets/ninja-sprite.png', 42.5,
81, 15);
        this.load.spritesheet('grandpa', 'assets/grandpa.png', 238, 333, 2);
	this.load.image('background', 'assets/tilebackground2.jpg');
	this.load.image('door', 'assets/hospital-door.png');
	this.load.image('newroom', 'assets/Hospital-Room.png');
 	this.load.tilemap('hospital', 'assets/trynumber2.json', null,
Phaser.Tilemap.TILED_JSON);
 	this.load.tilemap('hospital-stageB', 'assets/hospital-stageB.json',
null, Phaser.Tilemap.TILED_JSON);
	this.load.image('alarm', 'assets/alarm.png');


	this.load.image('hosp2-1', 'assets/hosp2-1.png');
    	
    },

    create: function () {

	this.bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        //this.game.stage.backgroundColor = '#806000';


	this.map = this.game.add.tilemap('hospital');
	this.map.addTilesetImage('hosp2-1');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	//this.game.physics.p2.convertTilemap(this.alarmgroup, this.layer);

	this.door = game.add.sprite(0, 0, 'door');
    	this.door.scale.set(.18,.18);
        this.game.physics.arcade.enable(this.door);	

	this.door2 = game.add.sprite(550, 520, 'door');
    	this.door2.scale.set(.18,.18);
        this.game.physics.arcade.enable(this.door2);	
	
	this.grandpa = game.add.sprite(5,100,'grandpa');
	this.grandpa.scale.set(.15,.15);
        this.game.physics.arcade.enable(this.grandpa);	
    	this.grandpa.animations.add('alive', [0], 1, true);
    	this.grandpa.animations.add('dead', [1], 1, true);
	this.grandpa.animations.play('alive');

	this.littleboy = game.add.sprite(525,130,'littleboy');
	this.littleboy.scale.set(.15,.15);
        this.game.physics.arcade.enable(this.littleboy);
    	this.littleboy.animations.add('alive', [0], 1, true);
    	this.littleboy.animations.add('dead', [1], 1, true);
	this.littleboy.animations.play('alive');

        this.player = this.add.sprite(400, 250, 'ninja');
	this.player.scale.set(.65,.65);
        this.game.physics.arcade.enable(this.player);
     	this.player.animations.add('left', [5,6,7,8,9,10], 6, true);
    //player.animations.add('turn', [4], 20, true);
    	this.player.animations.add('right', [12,13,14,15], 4, true);
    	this.player.animations.add('idle', [11], 1, true);
    	this.player.animations.add('swordleft', [0,1], 2, true);
    	this.player.animations.add('swordright', [3,4], 2, true);
	this.player.body.collideWorldBounds = true;
    	



	this.alarmgroup = game.add.group();
	this.alarmgroup.scale.set(.3,.3);
    	this.alarmgroup.enableBody = true;
    	this.alarmgroup.physicsBodyType = Phaser.Physics.ARCADE;
	//this.alarmgroup.body.collideWorldBounds = true;



    	for (var i = 0; i < 6; i++)
    	{
        this.sprite = this.alarmgroup.create(this.game.world.randomX *
3, this.game.world.randomY * 3, 'alarm');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.velocity.x = -100;
    this.sprite.body.bounce.set(1);

    }


        this.cursors = this.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },


    gotoStateB: function () {

        this.state.start('StateB');

    },

    gotoStateC: function () {

        this.state.start('StateC');

    },

    killgrandpa: function () {
	if (this.jumpButton.isDown && this.deadgrandpa == false){
	this.grandpa.animations.play('dead');
	this.deadgrandpa = true;
	organ ++;}


    },

    cameraShake: function() {
	this.game.world.setBounds(-20, -20, this.game.width+20,
this.game.height+2);
        var min = -20;
        var max = 20;
        this.game.camera.x+= Math.floor(Math.random() * (max - min + 1))
+ min;
        this.game.camera.y+= Math.floor(Math.random() * (max - min + 1))
+ min;
	this.alarmset = true;
    },


    killboy: function () {
	if (this.jumpButton.isDown && this.deadboy == false){
	this.littleboy.animations.play('dead');
	this.deadboy = true;
	organ ++;}

    },

    nothing: function () {
	alert('hit');

    },

    update: function () {
    this.game.physics.arcade.collide(this.alarmgroup, this.layer);
    this.game.physics.arcade.collide(this.layer, this.player);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

this.game.physics.arcade.overlap(this.alarmgroup, this.player,
this.cameraShake,null, this);

    this.game.physics.arcade.collide(this.door, this.player,
this.gotoStateB,null, this);

    this.game.physics.arcade.collide(this.door2, this.player,
this.gotoStateC,null, this);

    this.game.physics.arcade.overlap(this.grandpa, this.player,
this.killgrandpa,null, this);

    this.game.physics.arcade.overlap(this.littleboy, this.player,
this.killboy,null, this);

if(this.alarmset == true){
	this.cameraShake();
}

if (this.jumpButton.isDown){
	this.player.animations.play('swordleft');
}

if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -100;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 100;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -100;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 100;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();
            this.facing = 'idle';
        }
    }



    },

    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' +
game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State A", 32, 560);

        this.game.debug.text("organs " + organ, 600, 32);

    }

};

//  State B ////////////////////////////////////////////////////////////

P2Game.StateB = function (game) {


    this.player;
    this.block;
    this.tetris1;
    this.changeTimer;
    this.facing = 'left';
    this.cursors;
    this.bg;
    this.door;
    this.door2;
    this.jumpButton;
    this.grandpa;
    this.grandface = 'alive';
    this.score = 0;
    this.newroom;
    this.map;
    this.layer;
    this.littleboy;
    this.deadgrandpa = false;
    this.deadboy = false;


    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateB.prototype = {

     create: function () {

	this.bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        //this.game.stage.backgroundColor = '#806000';


	this.map = this.game.add.tilemap('hospital-stageB');
	this.map.addTilesetImage('hosp2-1');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	//this.game.physics.p2.convertTilemap(this.map, this.layer);

	this.door = game.add.sprite(-100, -100, 'door');
    	this.door.scale.set(.18,.18);
        this.game.physics.arcade.enable(this.door);	

	this.door2 = game.add.sprite(730, 0, 'door');
    	this.door2.scale.set(.18,.18);
        this.game.physics.arcade.enable(this.door2);	
	
	this.grandpa = game.add.sprite(5,100,'grandpa');
	this.grandpa.scale.set(.15,.15);
        this.game.physics.arcade.enable(this.grandpa);	
    	this.grandpa.animations.add('alive', [0], 1, true);
    	this.grandpa.animations.add('dead', [1], 1, true);
	this.grandpa.animations.play('alive');

	this.littleboy = game.add.sprite(525,130,'littleboy');
	this.littleboy.scale.set(.15,.15);
        this.game.physics.arcade.enable(this.littleboy);
    	this.littleboy.animations.add('alive', [0], 1, true);
    	this.littleboy.animations.add('dead', [1], 1, true);
	this.littleboy.animations.play('alive');

        this.player = this.add.sprite(740, 20, 'ninja');
	this.player.scale.set(.65,.65);
        this.game.physics.arcade.enable(this.player);
     	this.player.animations.add('left', [5,6,7,8,9,10], 6, true);
    //player.animations.add('turn', [4], 20, true);
    	this.player.animations.add('right', [12,13,14,15], 4, true);
    	this.player.animations.add('idle', [11], 1, true);
    	this.player.animations.add('swordleft', [0,1], 2, true);
    	this.player.animations.add('swordright', [3,4], 2, true);
	this.player.body.collideWorldBounds = true;
    	


        this.cursors = this.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    killgrandpa: function () {
	if (this.jumpButton.isDown && this.deadgrandpa == false){
	this.grandpa.animations.play('dead');
	this.deadgrandpa = true;
	organ ++;}


    },

    killboy: function () {
	if (this.jumpButton.isDown && this.deadboy == false){
	this.littleboy.animations.play('dead');
	this.deadboy = true;
	organ ++;}

    },

    gotoStateA: function () {

        this.state.start('StateA');

    },

    gotoStateC: function () {

        this.state.start('StateC');

    },

    update: function () {

    this.game.physics.arcade.collide(this.layer, this.player);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    this.game.physics.arcade.collide(this.door, this.player,
this.gotoStateB,null, this);

    this.game.physics.arcade.collide(this.door2, this.player,
this.gotoStateA,null, this);

    this.game.physics.arcade.overlap(this.grandpa, this.player,
this.killgrandpa,null, this);

    this.game.physics.arcade.overlap(this.littleboy, this.player,
this.killboy,null, this);

if (this.jumpButton.isDown){
	this.player.animations.play('swordleft');
}

if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -100;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 100;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -100;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 100;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();
            this.facing = 'idle';
        }
    }
   },


    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' +
game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State B", 32, 560);

        this.game.debug.text("organs " + organ, 600, 32);

    }

};

//  State C //////////////////////////////////////////////////////////

P2Game.StateC = function (game) {

    this.player;

    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateC.prototype = {

    create: function () {

	this.bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        //this.game.stage.backgroundColor = '#806000';

	this.door = game.add.sprite(0, 500, 'door');
    	this.door.scale.set(.25,.25);
        this.game.physics.arcade.enable(this.door);	

        this.player = this.add.sprite(10, 500, 'ninja');
        this.game.physics.arcade.enable(this.player);
     	this.player.animations.add('left', [5,6,7,8,9,10], 6, true);
    //player.animations.add('turn', [4], 20, true);
    	this.player.animations.add('right', [12,13,14,15], 4, true);
    	this.player.animations.add('idle', [11], 1, true);
	this.player.body.collideWorldBounds = true;
    	


        this.cursors = this.input.keyboard.createCursorKeys();


    },


    gotoStateA: function () {

        this.state.start('StateA');

    },

    gotoStateB: function () {

        this.state.start('StateB');

    },

    update: function () {

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.game.physics.arcade.collide(this.door, this.player,
this.gotoStateA,null, this);


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -100;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 100;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -100;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 100;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }



    },


    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' +
game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State C", 32, 560);

    }

};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

game.state.add('StateA', P2Game.StateA);
game.state.add('StateB', P2Game.StateB);
game.state.add('StateC', P2Game.StateC);

game.state.start('StateA');


//http://img.hisupplier.com/var/userImages/2010-08/20/chinadortek_224915946_s.jpg
//http://ec.pond5.com/s3/000679790_prevstill.jpeg
//http://www.wpclipart.com/cartoon/people/kids/kid_cartoons_2/child_smile_and_wave.png
//http://previews.123rf.com/images/vipdesignusa/vipdesignusa1205/vipdesignusa120500089/13659759-Grandpa-sits-in-a-wheelchair--Stock-Vector-cartoon-old-man.jpg
//http://spritedatabase.net/files/snes/2207/Sprite/KnifeArmy.png
//http://previews.123rf.com/images/vipdesignusa/vipdesignusa1205/vipdesignusa120500089/13659759-Grandpa-sits-in-a-wheelchair--Stock-Vector-cartoon-old-man.jpg
