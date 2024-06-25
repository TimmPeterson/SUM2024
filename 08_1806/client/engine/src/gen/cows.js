import { mat4, matrTranslate, matrRotate, matrScale } from "../mth/mat4";
import { vec2 } from "../mth/vec2";
import { vec3 } from "../mth/vec3";

export class Cows {
    constructor(lab) {
        this.lab = lab;
        this.poses = [];
        for (let i = 0; i < 10; i++) {
            let rx = (Math.floor(Math.random() * 4) * 2) * 10 + 10 - 5.5;
            let ry = (Math.floor(Math.random() * 4) * 2 + 1) * 10 + 10 - 5.5;
            this.poses.push(vec3(rx, 0, ry));
        }
        let shd = this.lab.rnd.newShader("default");
        let mtl = shd.newMaterial(
            vec3(0.1),
            vec3(1, 0.8, 0),
            vec3(0.3),
            90,
            0.5
        );
        this.cow = mtl.newPrimitive("cow");
    }

    render() {
        for (let i in this.poses) {
            let d = this.poses[i].sub(this.lab.rnd.control.position).len();
            if (d < 3) {
                let rx = (Math.floor(Math.random() * 4) * 2) * 10 - 5.5;
                let ry = (Math.floor(Math.random() * 4) * 2 + 1) * 10 - 5.5;
                this.poses[i] = vec3(rx, 0, ry);
            }
            this.cow.render(matrScale(vec3(0.05)).mul(matrRotate(this.lab.rnd.timer.globalTime, vec3(0, 1, 0)).mul(matrTranslate(vec3(this.poses[i].x, 1.3, this.poses[i].z)))));
        }
    }
}