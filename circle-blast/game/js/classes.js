class Ship extends PIXI.Sprite {
    constructor(texture, x = 0, y = 0) {
        super(texture);
        this.anchor.set(0.5, 0.5);
        this.scale.set(0.1);
        this.x = x;
        this.y = y;
    }
}

class Circle extends PIXI.Graphics {
    constructor(radius, color = 0xff0000, x = 0, y = 0){
        super();
        this.circle(x, y, radius);
        this.fill(color);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fwd = getRandomUnitVector();
        this.speed = 50;
        this.isAlive = true;
    }

    move(dt = 1/60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    }

}

class Bullet extends PIXI.Graphics {
    constructor(color = 0xffffff, x = 0, y = 0) {
        super();
        this.rect(-2, -3, 4, 6);
        this.fill(color);
        this.x = x;
        this.y = y;
        this.fwd = { x:0, y:-1 };
        this.speed = 400;
        this.isAlive = true;
        Object.seal(this);
    }

    move(dt = 1/60) {

        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
}