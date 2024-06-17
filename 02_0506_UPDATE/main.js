//const { Pane } = require("./node_modules/tweakpane/dist/tweakpane.js");

let canvas, gl, timeLoc;

let MxLoc, MyLoc, MzLoc, rLoc, gLoc, bLoc, dxLoc, dyLoc;

let typeOfFractal = 0, typeLoc;

// OpenGL initialization function
function initGL() {
  canvas = document.getElementById("myCan");
  canvas.addEventListener("mousemove", (e) => onMouseMove(e));
  canvas.addEventListener("wheel", (e) => onScroll(e));
  canvas.addEventListener("touchstart", (e) => onTouchStart(e));
  canvas.addEventListener("touchmove", (e) => onTouchMove(e));
  canvas.addEventListener("touchend", (e) => onTouchEnd(e));

  canvas.hm = Hammer(canvas);
  canvas.hm.get("tap").set({ enable: true });
  canvas.hm.on("tap", () => {
    if (typeOfFractal == 0)
      typeOfFractal = 1;
    else
      typeOfFractal = 0;
    StartX = StartY = -2;
    EndX = EndY = 2;
  });

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
  uniform float TypeOfFractal;

  vec2 CmplMulCmpl( vec2 A, vec2 B )
  {
    return vec2(A.x * B.x - A.y * B.y, A.x * B.y + A.y * B.x);
  }

  vec2 CmplDivCmpl( vec2 A, vec2 B )
  {
    return vec2(dot(A, B), (A.y * B.x - A.x * B.y)) / dot(B, B);
  }

  vec2 f( vec2 Z ) 
  {
    return CmplMulCmpl(Z, Z);//CmplMulCmpl(CmplMulCmpl(Z, Z), Z);
  }

  void main( void )
  {
    int n = 0;  
    vec2 Z, Z0;

    Z = (gl_FragCoord.xy / vec2(2000.0) - 0.5) * 2.0;
    Z.x = (Z.x + 1.0) / 2.0 * (EndX - StartX) + StartX;
    Z.y = (Z.y + 1.0) / 2.0 * (EndY - StartY) + StartY;
    Z0 = Z;//vec2(0.5, 0.32);

    while (n < 255 && dot(Z, Z) < 4.0)
    {
      if (TypeOfFractal == 0.0)
      {
        Z = f(Z); Z = Z + Z0;
      }
      else
        Z = Z - CmplDivCmpl(CmplMulCmpl(Z, CmplMulCmpl(Z, Z)) - .1, 3.0 * CmplMulCmpl(Z, Z)); //f(Z);
      n++;
    }
    OutColor = vec4(vec3(vec3(float(n) / 250.0, float(n) / 230.0, float(n) / 240.0)), 1.0);
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
  typeLoc = gl.getUniformLocation(prg, "TypeOfFractal");

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
let StartX = -2, StartY = -2, EndX = 2, EndY = 2;

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
    gl.uniform1f(typeLoc, typeOfFractal);
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

  let f;
  if (event.deltaY < 0)
    f = 0.9;
  else
    f = 1 / .9;

  let nmx = (mx + 1) / 2 * (EndX - StartX) + StartX;
  let nmy = (my + 1) / 2 * (EndY - StartY) + StartY;

  NewStartX = nmx - f * (nmx - StartX);
  NewEndX = nmx - f * (nmx - EndX);

  NewStartY = nmy - f * (nmy - StartY);
  NewEndY = nmy - f * (nmy - EndY);

  StartX = NewStartX;
  StartY = NewStartY;
  EndX = NewEndX;
  EndY = NewEndY;
}

function onMouseMove(event) {
  if (event.buttons == 1) {
    let dx = EndX - StartX;
    let dy = EndY - StartY;
    StartX -= event.movementX / 2000.0 * dx;
    EndX -= event.movementX / 2000.0 * dx;
    StartY += event.movementY / 2000.0 * dy;
    EndY += event.movementY / 2000.0 * dy;
  }
  Mx = event.offsetX;
  My = event.offsetY;
  event.preventDefault();
}

let scaling = false;
let prev_dist = 0;
function onTouchStart(e) {
  if (e.touches.length === 2) {
    scaling = true;
    prev_dist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY);
    pinchStart(e);
  }
}

function onTouchMove(e) {
  e.preventDefault();
  if (scaling) {
    let NewStartX, NewEndX, NewStartY, NewEndY;

    let dist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY);
    let delta = dist - prev_dist;
    prev_dist = dist;

    let center = {
      X: (e.touches[0].pageX + e.touches[1].pageX) / 2.0,
      Y: (e.touches[0].pageY + e.touches[1].pageY) / 2.0,
    };

    let mx = (center.X / 2000.0 - 0.5) * 2;
    let my = (1.0 - center.Y / 2000.0 - 0.5) * 2;

    let f;
    if (delta > 0)
      f = 0.95;
    else
      f = 1 / .95;

    let nmx = (mx + 1) / 2 * (EndX - StartX) + StartX;
    let nmy = (my + 1) / 2 * (EndY - StartY) + StartY;

    NewStartX = nmx - f * (nmx - StartX);
    NewEndX = nmx - f * (nmx - EndX);

    NewStartY = nmy - f * (nmy - StartY);
    NewEndY = nmy - f * (nmy - EndY);

    StartX = NewStartX;
    StartY = NewStartY;
    EndX = NewEndX;
    EndY = NewEndY;
  }
}

function onTouchEnd(e) {
  if (scaling) {
    pinchEnd(e);
    scaling = false;
  }
}

window.addEventListener("load", () => {
  initGL();
  const draw = () => {
    render();
    window.requestAnimationFrame(draw);
  };
  draw();
});
