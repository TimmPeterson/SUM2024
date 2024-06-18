import { matrRotate } from "../mth/mat4";
import { vec3 } from "../mth/vec3";

export class Control {
    constructor(render) {
        this.forward = vec3(0, 0, 1);
        this.right = vec3(1, 0, 0);
        this.up = vec3(0, 1, 0);
        this.position = vec3(0);
        this.moveSpeed = 6.0;
        this.sense = 0.003;

        this.render = render;
        render.canvas.onmousemove = (e) => {
            if (e.buttons == 1) {

            }
        };
        window.onkeydown = (e) => {
            console.log("hello");
            if (e.code == "KeyA") {
                this.position = this.position.add(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } else if (e.code == "KeyD") {
                this.position = this.position.sub(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } else if (e.code == "KeyW") {
                this.position = this.position.add(this.forward.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } else if (e.code == "KeyS") {
                this.position = this.position.sub(this.forward.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } else if (e.code == "ShiftLeft") {
                this.position = this.position.sub(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            } else if (e.code == "Space") {
                this.position = this.position.add(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
            }
        };
        window.onmousemove = async (e) => {
            console.log("hello");
            this.forward = this.forward.mulmatr(matrRotate(-e.movementX * this.sense, this.up));
            this.right = this.right.mulmatr(matrRotate(-e.movementX * this.sense, this.up));
            this.forward = this.forward.mulmatr(matrRotate(e.movementY * this.sense, this.right));
            //this.up = this.up.mulmatr(matrRotate(-e.movementY * this.sense, this.right));
        }
    }
    response() {
        this.render.setCam(this.position, this.position.add(this.forward), this.up);
    }
}