import { matrRotate } from "../mth/mat4";
import { vec3 } from "../mth/vec3";

export class Control {
    constructor(render) {
        this.forward = vec3(0, 0, 1);
        this.right = vec3(1, 0, 0);
        this.up = vec3(0, 1, 0);
        this.position = vec3(0);
        this.moveSpeed = 3.0;
        this.sense = 0.0022;
        this.render = render;
        this.keyTab = {};

        render.canvas.onmousemove = (e) => {
            if (e.buttons == 1) {

            }
        };
        window.onkeydown = e => {
            if (e.code == "KeyA") {
                this.keyTab["KeyA"] = true;
            } else if (e.code == "KeyD") {
                this.keyTab["KeyD"] = true;
            } else if (e.code == "KeyW") {
                this.keyTab["KeyW"] = true;
            } else if (e.code == "KeyS") {
                this.keyTab["KeyS"] = true;
            } else if (e.code == "ShiftLeft") {
                this.keyTab["ShiftLeft"] = true;
            } else if (e.code == "Space") {
                this.keyTab["Space"] = true;
            }
        };
        window.onkeyup = e => {
            if (e.code == "KeyA") {
                this.keyTab["KeyA"] = false;
            } else if (e.code == "KeyD") {
                this.keyTab["KeyD"] = false;
            } else if (e.code == "KeyW") {
                this.keyTab["KeyW"] = false;
            } else if (e.code == "KeyS") {
                this.keyTab["KeyS"] = false;
            } else if (e.code == "ShiftLeft") {
                this.keyTab["ShiftLeft"] = false;
            } else if (e.code == "Space") {
                this.keyTab["Space"] = false;
            }
        };

        window.onmousemove = async (e) => {
            this.forward = this.forward.mulmatr(matrRotate(-e.movementX * this.sense, this.up));
            this.right = this.right.mulmatr(matrRotate(-e.movementX * this.sense, this.up));
            this.forward = this.forward.mulmatr(matrRotate(e.movementY * this.sense, this.right));
        }
    }
    response() {
        if (this.keyTab["KeyA"]) {
            this.position = this.position.add(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        } if (this.keyTab["KeyD"]) {
            this.position = this.position.sub(this.right.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        } if (this.keyTab["KeyW"]) {
            this.position = this.position.add(this.forward.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        } if (this.keyTab["KeyS"]) {
            this.position = this.position.sub(this.forward.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        } if (this.keyTab["ShiftLeft"]) {
            this.position = this.position.sub(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        } if (this.keyTab["Space"]) {
            this.position = this.position.add(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        }
        this.render.setCam(this.position, this.position.add(this.forward), this.up);
    }
}