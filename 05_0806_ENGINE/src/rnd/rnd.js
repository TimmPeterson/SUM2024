import { vec3 } from "../mth/vec3.js"
import { mat4, matrFrustum, matrView } from "../mth/mat4.js"
import { UniformBuffer } from "./res/buf.js"
import { Timer } from "../timer/timer.js"

export class Render {

    setFrustum() {
        let m = mat4(1);
        let rx = this.projSize, ry = this.projSize;

        /* Correct aspect ratio */
        if (this.width >= this.height)
            rx *= this.width / this.height;
        else
            ry *= this.height / this.width;

        this.matrProj = matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.farClip);
    }

    setCam(loc, at, up) {
        this.matrView = matrView(loc, at, up);
    }

    updateMatrixes() {
        this.matrixUBO.update(new Float32Array(this.matrProj.linearize().concat(this.matrView.linearize())));
    }

    renderStart() {
        this.timer.response();
        this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    } // End of 'render' function

    constructor(canvas) {
        this.canvas = canvas;

        this.projSize = 0.1;
        this.projDist = 0.1;
        this.farClip = 300;

        let rect = canvas.getBoundingClientRect();
        this.width = rect.right - rect.left + 1;
        this.height = rect.bottom - rect.top + 1;

        this.gl = canvas.getContext("webgl2");
        this.gl.clearColor(0.9, 0.9, 0.9, 1);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.setFrustum();
        this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
        this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2, 0);
        this.updateMatrixes();

        this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

        this.timer = new Timer();
        this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
    }
}

