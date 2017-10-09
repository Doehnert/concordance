class Vehicle {
    constructor(x, y) {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.target = createVector(x, y);
        this.maxforce = 0.5;
        this.maxspeed = 5;
        this.r = 5;
    }

    setTarget(x, y) {
        var pos = createVector(x, y);
        this.target = pos;
    }

    behaviour() {
        var force = this.seek(this.target);
        this.applyForce(force);

        var mouse = createVector(mouseX, mouseY);
        var flee = this.repel(mouse);

        flee.mult(5);
        this.applyForce(flee);
    }

    seek(target) {
        var desired = p5.Vector.sub(target, this.position);

        var d = desired.mag();

        var speed = this.maxspeed;

        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);

        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        return steer;
    }

    repel(target) {
        var desired = p5.Vector.sub(target, this.position);
        var d = desired.mag();

        if (d < 50) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    applyForce(f) {
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        var angle = this.velocity.heading() + PI / 2;
        fill(255);
        strokeWeight(3);
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);

        // beginShape();
        // vertex(0, 0);
        // vertex(this.r / 2, this.r);
        // vertex(-this.r / 2, this.r);
        // endShape(CLOSE);
        noStroke();
        fill('orange');
        ellipse(0, 0, this.r * 2);

        pop();
    }
}