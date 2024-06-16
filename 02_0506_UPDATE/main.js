//const { Pane } = require("./node_modules/tweakpane/dist/tweakpane.js");

let canvas, gl, timeLoc;

let MxLoc, MyLoc, MzLoc, rLoc, gLoc, bLoc, dxLoc, dyLoc;

// OpenGL initialization function
function initGL() {
  canvas = document.getElementById("myCan");
  canvas.addEventListener("mousemove", (e) => onMouseMove(e));
  canvas.addEventListener("wheel", (e) => onScroll(e));

  gl = canvas.getContext("webgl2");
  gl.clearColor(0.3, 0.47, 0.8, 1);

  // Shader creation
  let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;
    
  out vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    DrawPos = InPosition.xy;
  }
  `;

  let fs_txt = `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;
  uniform float Mx;
  uniform float My;
  uniform float Mz;
  uniform float R;
  uniform float G;
  uniform float B;
  uniform float dX;
  uniform float dY;
  uniform float StartX;
  uniform float StartY;
  uniform float EndX;
  uniform float EndY;


  vec2 CmplMulCmpl( vec2 A, vec2 B )
  {
    return vec2(A.x * B.x - A.y * B.y, A.x * B.y + A.x * B.y);
  }

  vec2 f( vec2 Z ) 
  {
    return CmplMulCmpl(Z, Z);//CmplMulCmpl(CmplMulCmpl(Z, Z), Z);
  }

  void main( void )
  {
    int n = 0;  
    vec2 Z, Z0;
    //vec2 m = (vec2(1000.0 - Mx, My) / vec2(1000.0) - 0.5) * 2.0;

    Z = (gl_FragCoord.xy / vec2(2000.0) - 0.5) * 2.0;
    Z.x = (Z.x + 1.0) / 2.0 * (EndX - StartX) + StartX;
    Z.y = (Z.y + 1.0) / 2.0 * (EndY - StartY) + StartY;
    Z0 = Z;//vec2(0.5, 0.32);

    while (n < 255 && dot(Z, Z) < 4.0)
    {
      Z = f(Z);
      Z = Z + Z0;
      n++;
    }
    OutColor = vec4(vec3(3.0 * vec3(float(n) / 250.0, float(n) / 230.0, float(n) / 240.0)) * vec3(R, G, B) / 255.0, 1.0);
  }
  `;
  let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log("Shader program link fail: " + buf);
  }

  // Vertex buffer creation
  const size = 1;
  const vertexes = [
    -size,
    size,
    0,
    -size,
    -size,
    0,
    size,
    size,
    0,
    size,
    -size,
    0,
  ];
  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }

  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");

  // Getting location from shader
  MxLoc = gl.getUniformLocation(prg, "Mx");
  MyLoc = gl.getUniformLocation(prg, "My");
  MzLoc = gl.getUniformLocation(prg, "Mz");
  rLoc = gl.getUniformLocation(prg, "R");
  gLoc = gl.getUniformLocation(prg, "G");
  bLoc = gl.getUniformLocation(prg, "B");
  dxLoc = gl.getUniformLocation(prg, "dX");
  dyLoc = gl.getUniformLocation(prg, "dY");
  LocEx = gl.getUniformLocation(prg, "EndX");
  LocSx = gl.getUniformLocation(prg, "StartX");
  LocEy = gl.getUniformLocation(prg, "EndY");
  LocSy = gl.getUniformLocation(prg, "StartY");

  gl.useProgram(prg);

  //const pane = new Pane();
  //pane.addBinding(PARAMS, "background");
} // End of 'initGL' function

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log("Shader compile fail: " + buf);
  }
  return shader;
} // End of 'loadShader' function

let x = 1;

// 
let LocSx, LocSy, LocEx, LocEy;
let StartX = -1, StartY = -1, EndX = 1, EndY = 1;

// Main render frame function
function render() {
  // console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (timeLoc != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    gl.uniform1f(timeLoc, t);
    gl.uniform1f(MxLoc, Mx);
    gl.uniform1f(MyLoc, My);
    gl.uniform1f(MzLoc, Mz);
    gl.uniform1f(rLoc, PARAMS.background.r);
    gl.uniform1f(gLoc, PARAMS.background.g);
    gl.uniform1f(bLoc, PARAMS.background.b);
    gl.uniform1f(dxLoc, dx);
    gl.uniform1f(dyLoc, dy);
    gl.uniform1f(LocSx, StartX);
    gl.uniform1f(LocSy, StartY);
    gl.uniform1f(LocEx, EndX);
    gl.uniform1f(LocEy, EndY);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function

console.log("CGSG forever!!! mylib.js imported");

let Mx = 0,
  My = 0,
  Mz = 1,
  dx = 0, dy = 0;
const PARAMS = {
  //key: "#ff0055ff",
  background: { r: 255.0, g: 255.0, b: 255.0 },
};
let pane;
let paneR, paneG, paneB;

function onClick(event) {
  let speed = 30,
    sz = 0.04;

  if (event.key == "ArrowLeft") dx += speed;
  if (event.key == "ArrowRight") dx -= speed;
  if (event.key == "ArrowUp") dy += speed;
  if (event.key == "ArrowDown") dy -= speed;
  if (event.key == "PageUp") Mz -= sz;
  if (event.key == "PageDown") Mz += sz;
}

function onScroll(event) {
  let sz = 0.001;

  event.preventDefault();
  Mz += event.deltaY * sz;

  let mx = (Mx / 2000.0 - 0.5) * 2;
  let my = (1.0 - My / 2000.0 - 0.5) * 2;
  let NewStartX, NewEndX, NewStartY, NewEndY;

  // NewStartX = StartX - ((mx + 1.0) / 2.0 * (EndX - StartX)) * sz * event.deltaY;
  // NewStartY = StartY - ((my + 1.0) / 2.0 * (EndY - StartY)) * sz * event.deltaY;
  // NewEndX =   EndX + ((2.0 - (mx + 1.0) / 2.0) * (EndX - StartX)) * sz * event.deltaY;
  // NewEndY =   EndY + ((2.0 - (my + 1.0) / 2.0) * (EndY - StartY)) * sz * event.deltaY;
  // StartX = NewStartX;
  // StartY = NewStartY;
  // EndX = NewEndX;
  // EndY = NewEndY;


  let f;
  //
  if (event.deltaY < 0)
    f = 0.99;
  else
    f = 1.01;

  NewStartX = mx - f * (mx - StartX);
  NewEndX = mx - f * (mx - EndX);
  
  NewStartY = my - f * (my - StartY);
  NewEndY = my - f * (my - EndY);
  
  StartX = NewStartX;
  StartY = NewStartY;
  EndX = NewEndX;
  EndY = NewEndY;
}

function onMouseMove(event) {
  if (event.buttons == 1) {
    StartX -= event.movementX / 2000.0 * (EndX - StartX);
    EndX -= event.movementX / 2000.0 * (EndX - StartX);
    StartY += event.movementY / 2000.0 * (EndY - StartY);
    EndY += event.movementY / 2000.0 * (EndY - StartY);
  }

  Mx = event.clientX;
  My = event.clientY;

  event.preventDefault();
}


window.addEventListener("load", () => {
  initGL();
  const draw = () => {
    // drawing
    render();

    // animation register
    window.requestAnimationFrame(draw);
  };
  draw();
});
