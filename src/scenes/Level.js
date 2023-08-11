
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(5760, 540, 5760, 1080, "Full-BG");
		background.setOrigin(1, 0.5);

		// plateform
		const plateform = this.add.container(0, 0);

		// rectangle
		const rectangle = this.add.rectangle(0, 661, 700, 50);
		rectangle.setOrigin(0, 0.5);
		rectangle.isFilled = true;
		plateform.add(rectangle);

		// p1
		const p1 = this.add.image(948, 660, "P1");
		p1.scaleX = 0.5;
		p1.scaleY = 0.5;
		plateform.add(p1);

		// p2
		const p2 = this.add.image(1330, 650, "P2");
		p2.scaleX = 0.5;
		p2.scaleY = 0.5;
		plateform.add(p2);

		// p3
		const p3 = this.add.image(1819, 630, "P3");
		p3.scaleX = 0.5;
		p3.scaleY = 0.5;
		plateform.add(p3);

		// p
		const p = this.add.image(2245, 654, "P1");
		p.scaleX = 0.5;
		p.scaleY = 0.5;
		plateform.add(p);

		// p_1
		const p_1 = this.add.image(2612, 659, "P2");
		p_1.scaleX = 0.5;
		p_1.scaleY = 0.5;
		plateform.add(p_1);

		// p_2
		const p_2 = this.add.image(3054, 650, "P3");
		p_2.scaleX = 0.5;
		p_2.scaleY = 0.5;
		plateform.add(p_2);

		// p_3
		const p_3 = this.add.image(3493, 685, "P1");
		p_3.scaleX = 0.5;
		p_3.scaleY = 0.5;
		plateform.add(p_3);

		// p_4
		const p_4 = this.add.image(3834, 678, "P2");
		p_4.scaleX = 0.5;
		p_4.scaleY = 0.5;
		plateform.add(p_4);

		// p_5
		const p_5 = this.add.image(4292, 679, "P3");
		p_5.scaleX = 0.5;
		p_5.scaleY = 0.5;
		plateform.add(p_5);

		this.background = background;
		this.plateform = plateform;
		this.rectangle = rectangle;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Container} */
	plateform;
	/** @type {Phaser.GameObjects.Rectangle} */
	rectangle;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.player = this.physics.add.sprite(195, 510, "character").setScale(0.2, 0.2);
		this.player.body.setSize(350, 60);
		this.player.body.setOffset(250, 670);
		this.player.setGravityY(900);
		// this.player.anims.play("run")
		this.plateformGroup = this.add.group();

		this.plateform.getAll().forEach((plane) => {
			if (plane.type == "Image") {
				if (plane.texture.key == "P1") {
					plane = this.physics.add.existing(plane, true);
					plane.body.setSize(193, 5);
					plane.body.setOffset(0, 8);
				} else if (plane.texture.key == "P2") {
					plane = this.physics.add.existing(plane, true);
					plane.body.setSize(285, 5);
					plane.body.setOffset(0, 28);
				} else if (plane.texture.key == "P3") {
					plane = this.physics.add.existing(plane, true);
					plane.body.setSize(390, 5);
					plane.body.setOffset(0, 58);
				}
			} else {
				plane = this.physics.add.existing(plane, true);
			}
			this.plateformGroup.add(plane);
		})
		this.input.on("pointerdown", this.jump, this);

		this.physics.add.collider(this.player, this.plateformGroup, () => {
			this.player.anims.play("run", true);
			this.player.setVelocityY(0);
		});
	}

	jump() {
		this.player.anims.stop("run");
		if (this.player.body.touching.down) {
			this.player.anims.play("jump", false);	
			this.player.setVelocityY(-500);
		}
	}

	update() {
		if(this.player.y > this.game.scale.height){
			this.scene.restart("Level");
		}
		this.background.tilePositionX += 3;
		this.plateform.getAll().forEach((plane) => {
			if (plane.x <= -200 && plane.type != "Rectangle") {
				plane.x += 3800;
				plane.body.x += 3800;
			}
			plane.x -= 3;
			plane.body.x -= 3;
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
