import { Material } from "./mtl";

export class Shader {
  constructor(rnd, name) {
    this.rnd = rnd;
    this.name = name;
    this.prg = null;
    this.tmpSourse = { vert: null, frag: null };
    this._init();
  }

  async _init() {
    this.shaders = [
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
      },
    ];
    for (const s of this.shaders) {
      let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
      let src = await response.text();
      if (typeof src == "string" && src != "") s.src = src;
    }
    // recompile shaders
    this.updateShadersSource();
  }

  updateShadersSource() {
    this.shaders[0].id = null;
    this.shaders[1].id = null;

    if (this.shaders[0].src == "" || this.shaders[1].src == "") return;
    this.shaders.forEach((s) => {
      s.id = this.rnd.gl.createShader(s.type);
      this.rnd.gl.shaderSource(s.id, s.src);
      this.rnd.gl.compileShader(s.id);
      if (!this.rnd.gl.getShaderParameter(s.id, this.rnd.gl.COMPILE_STATUS)) {
        let buf = this.rnd.gl.getShaderInfoLog(s.id);
        console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
      }
    });
    this.prg = this.rnd.gl.createProgram();
    this.shaders.forEach((s) => {
      if (s.id != null) this.rnd.gl.attachShader(this.prg, s.id);
    });
    this.rnd.gl.linkProgram(this.prg);
    if (!this.rnd.gl.getProgramParameter(this.prg, this.rnd.gl.LINK_STATUS)) {
      let buf = this.rnd.gl.getProgramInfoLog(this.prg);
      console.log(`Shader program ${this.name} link fail: ${buf}`);
    }
    if (this.tmpSourse["vert"] != null) {
      this.update(this.tmpSourse["vert"], "vert");
      this.tmpSourse["vert"] = null;
    }
    if (this.tmpSourse["frag"] != null) {
      this.update(this.tmpSourse["frag"], "frag");
      this.tmpSourse["frag"] = null;
    }
    this.updateShaderData();
  }

  updateShaderData() {
    this.posLoc = this.rnd.gl.getAttribLocation(this.prg, "InPosition");
    this.normLoc = this.rnd.gl.getAttribLocation(this.prg, "InNormal");
    this.texLoc = this.rnd.gl.getAttribLocation(this.prg, "InTexCoord");

    // Shader uniforms
    this.uniforms = {};
    const countUniforms = this.rnd.gl.getProgramParameter(
      this.prg,
      this.rnd.gl.ACTIVE_UNIFORMS
    );
    for (let i = 0; i < countUniforms; i++) {
      const info = this.rnd.gl.getActiveUniform(this.prg, i);
      this.uniforms[info.name] = {
        name: info.name,
        type: info.type,
        size: info.size,
        loc: this.rnd.gl.getUniformLocation(this.prg, info.name),
      };
    }

    // Shader uniform blocks
    this.uniformBlocks = {};
    const countUniformBlocks = this.rnd.gl.getProgramParameter(
      this.prg,
      this.rnd.gl.ACTIVE_UNIFORM_BLOCKS
    );
    for (let i = 0; i < countUniformBlocks; i++) {
      const block_name = this.rnd.gl.getActiveUniformBlockName(this.prg, i);
      const index = this.rnd.gl.getUniformBlockIndex(this.prg, block_name);
      this.uniformBlocks[block_name] = {
        name: block_name,
        index: index,
        size: this.rnd.gl.getActiveUniformBlockParameter(
          this.prg,
          index,
          this.rnd.gl.UNIFORM_BLOCK_DATA_SIZE
        ),
        bind: this.rnd.gl.getActiveUniformBlockParameter(
          this.prg,
          index,
          this.rnd.gl.UNIFORM_BLOCK_BINDING
        ),
      };
    }

    this.rnd.matrixUBO.apply(this);
    this.rnd.primUBO.apply(this);
    this.rnd.timeUBO.apply(this);
  }

  apply() {
    if (this.prg != null) {
      this.rnd.gl.useProgram(this.prg);
      return true;
    }
    return false;
  }

  // type: "vert" or "frag"
  update(source, type) {
    let n;
    if (type == "vert") n = 0;
    else if (type == "frag") n = 1;
    else return;

    if (this.shaders[n].id == null) {
      this.tmpSourse[type] = source;
    } else {
      this.rnd.gl.shaderSource(this.shaders[n].id, source);
      this.rnd.gl.compileShader(this.shaders[n].id);
      this.rnd.gl.linkProgram(this.prg);
      this.updateShaderData();
    }
  }

  newMaterial(ambient, diffuse, specular, phong, trans) {
    return new Material(this, ambient, diffuse, specular, phong, trans);
  }
}
