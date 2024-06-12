import { vec3 } from "../../mth/vec3.js"

export class Material {
    constructor() {
        this.Ka = vec3(0.1);
        this.Kd = vec3(0, 0.5, 0.5);
        this.Ks = vec3(0);
        this.Ph = 90;

    }
};