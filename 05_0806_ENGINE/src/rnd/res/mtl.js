import { vec3 } from "../../mth/vec3.js"
import { UniformBuffer } from "./buf.js"

// Class for holding material properties of primitive.
export class Material {
    constructor(shd, Ka, Kd, Ks, Ph) {
        this.shd = shd;
        this.Ka = Ka;
        this.Kd = Kd;
        this.Ks = Ks;
        this.Ph = Ph;

        this.UBO = new UniformBuffer(this.shd.rnd, "u_material", 16 * 3, 3);
        //this.UBO.update(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        this.UBO.update(new Float32Array(this.Ka.linearize().concat([0], this.Kd.linearize(), [0], this.Ks.linearize(), [Ph])));
    }

    apply() {
        if (this.shd.apply()) {
            this.UBO.apply(this.shd);
            return true;
        }
        return false;
    }
};

