import { vec3 } from "../mth/vec3.js"
import { mat4, matrFrustum, matrView } from "../mth/mat4.js"
import { UniformBuffer } from "./res/buf.js"
import { Timer } from "../timer/timer.js"
import { Shader } from "./res/shd.js"
import { Texture } from "./res/tex.js"

// General class for rendering.
// One render per canvas.
export class Render {
    transparents = [];

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
        this.updateMatrixes();
    }

    updateMatrixes() {
        this.matrixUBO.update(new Float32Array(this.matrProj.linearize().concat(this.matrView.linearize())));
    }

    renderStart() {
        this.timer.response();
        //this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }

    renderEnd() {
        if (this.transparents.length != 0) {
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

            for (let p of this.transparents) {
                p.prim.renderNow(p.world);
            }
            this.gl.disable(this.gl.BLEND);
            this.transparents = [];
        }
    }

    constructor(canvas) {
        this.canvas = canvas;

        // Default camera properties
        this.projSize = 0.3;
        this.projDist = 0.1;
        this.farClip = 300;

        // Evaluating canvas size
        let rect = canvas.getBoundingClientRect();
        this.width = rect.right - rect.left + 1;
        this.height = rect.bottom - rect.top + 1;

        // Getting GL context
        this.gl = canvas.getContext("webgl2", {
            premultipliedAlpha: false,
            alpha: false
        });
        this.gl.clearColor(0.9, 0.9, 0.9, 1);
        this.gl.enable(this.gl.DEPTH_TEST);

        // Initializing camera
        this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2, 0);
        this.setFrustum();
        this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
        this.updateMatrixes();

        // Initializing prim ubo
        this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

        // Initializing timer
        this.timer = new Timer();
        this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
    }

    newShader(fileName) {
        return new Shader(this, fileName);
    }

    newTexture(fileName) {
        return new Texture(this, fileName);
    }

    newUniformBuffer(bufferName, bufferSize, binding) {
        return new UniformBuffer(this, bufferName, bufferSize, binding);
    }
}

