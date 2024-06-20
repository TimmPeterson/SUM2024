import { vec3 } from "../../mth/vec3.js"
import { UniformBuffer } from "./buf.js"
import { Prim } from "./prim.js";

// Class for holding material properties of primitive.
export class Material {
    constructor(shd, Ka, Kd, Ks, Ph, Trans) {
        this.shd = shd;
        this.Ka = Ka;
        this.Kd = Kd;
        this.Ks = Ks;
        this.Ph = Ph;
        this.Trans = Trans;
        this.textures = [null, null, null, null];

        this.UBO = new UniformBuffer(this.shd.rnd, "u_material", 16 * 4, 3);
        //this.UBO.update(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        this.update();
    }

    update() {
        let tex_flags = [0, 0, 0, 0];
        let data = this.Ka.linearize().concat([0], this.Kd.linearize(), [this.Trans], this.Ks.linearize(), [this.Ph])

        for (let t = 0; t < 4; t++)
            if (this.textures[t] != null)
                tex_flags[t] = 1;

        data = data.concat(tex_flags);

        this.UBO.update(new Float32Array(data));
    }

    apply() {
        if (this.shd.apply()) {
            this.UBO.apply(this.shd);

            for (let t = 0; t < 4; t++) {
                if (this.textures[t] != null)
                    this.textures[t].apply(t);
            }
            return true;
        }

        return false;
    }

    attachTexture(texture, num) {
        if (num > 3 || num < 0)
            return;

        this.textures[num] = texture;
    }

    newPrimitive(vertexes, indicies) {
        return new Prim(this, vertexes, indicies);
    }
};

