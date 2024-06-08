export class Shader {
    constructor(rnd, name) {
        this.rnd = rnd;
        this.name = name;
        this.prg = null;
        this._init();
    }

    async _init() {
        this.shaders =
            [
                {
                    id: null,
                    type: this.rnd.gl.VERTEX_SHADER,
                    name: "vert",
                    src: "",
                },
                {
                    id: null,
                    type: this.rnd.gl.FRAGMENT_SHADER,
                    name: "frag",
                    src: "",
                }
            ];
        for (const s of this.shaders) {
            let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
            let src = await response.text();
            if (typeof src == "string" && src != "")
                s.src = src;
        }
        // recompile shaders
        this.updateShadersSource();
    }

    updateShadersSource() {
        this.shaders[0].id = null;
        this.shaders[1].id = null;

        if (this.shaders[0].src == "" || this.shaders[1].src == "")
            return;
        this.shaders.forEach(s => {
            s.id = this.rnd.gl.createShader(s.type);
            this.rnd.gl.shaderSource(s.id, s.src);
            this.rnd.gl.compileShader(s.id);
            if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
                let buf = this.rnd.gl.getShaderInfoLog(s.id);
                console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
            }
        });
        this.prg = this.rnd.gl.createProgram();
        this.shaders.forEach(s => {
            if (s.id != null)
                this.rnd.gl.attachShader(this.prg, s.id);
        });
        this.rnd.gl.linkProgram(this.prg);
        if (!this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.LINK_STATUS)) {
            let buf = this.rnd.gl.getProgramInfoLog(this.prg);
            console.log(`Shader program ${this.name} link fail: ${buf}`);
        }
        this.updateShaderData();
    }

    updateShaderData() {
        this.timeLoc = this.rnd.gl.getUniformLocation(this.prg, "Time");
        this.matrProjLoc = this.rnd.gl.getUniformLocation(this.prg, "MatrProj");
        this.matrWLoc = this.rnd.gl.getUniformLocation(this.prg, "MatrW");
        this.posLoc = this.rnd.gl.getAttribLocation(this.prg, "InPosition");
        this.normLoc = this.rnd.gl.getAttribLocation(this.prg, "InNormal");
    }

    apply() {
        if (this.prg != null) {
            this.rnd.gl.useProgram(this.prg);
            return true;
        }
        return false;
    }
}