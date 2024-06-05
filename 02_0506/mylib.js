let
  canvas,
  gl,
  timeLoc;    

 let
   MxLoc,
   MyLoc;

// OpenGL initialization function  
export function initGL() {
  canvas = document.getElementById("myCan");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.30, 0.47, 0.8, 1);

  // Shader creation
  let vs_txt =
  `#version 300 es
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

  let fs_txt =
  `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;
  uniform float Mx;
  uniform float My;

  vec2 CmplMulCmpl( vec2 A, vec2 B )
  {
    return vec2(A.x * B.x - A.y * B.y, A.x * B.y + A.x * B.y);
  }

  void main( void )
  {
    vec2 M = vec2(-Mx, My);

    vec2 Start = vec2(-1.0, -1.0) + M, End = vec2(1.0, 1.0) + M;

    vec2 DrawPos0 = (1.0 + DrawPos) / 2.0 * vec2(End.x - Start.x, End.y - Start.y) + vec2(Start.x, Start.y);

    vec2 Z0 = 2.0 * vec2(0.35 + 0.02 * sin(Time * 0.5), 0.38 + 0.02 * sin((Time * 0.1 + 1.0) / 300.0)), Z = DrawPos0.xy;
    int n = 0;    

    while (n < 80 && dot(Z, Z) < 4.0)
    {
      Z = CmplMulCmpl(CmplMulCmpl(Z, Z), Z);//vec2(Z.x * Z.x - Z.y * Z.y, Z.x * Z.y + Z.x * Z.y);
      Z = Z + Z0;
      n++;
    }

    OutColor = vec4(3.0 * vec3(float(n) / 80.0), 1.0);

  }
  `;
  let
    vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log('Shader program link fail: ' + buf);
  }                                            
 
  // Vertex buffer creation
  const size = 1;
  const vertexes = [-size, size, 0, -size, -size, 0, size, size, 0, size, -size, 0];
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

  MxLoc = gl.getUniformLocation(prg, "Mx");
  MyLoc = gl.getUniformLocation(prg, "My");
 
  gl.useProgram(prg);
}  // End of 'initGL' function               
 
// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log('Shader compile fail: ' + buf);
  }                                            
  return shader;
} // End of 'loadShader' function
  
let x = 1;                    
 
// Main render frame function
export function render() {
  // console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);
                                               
  if (timeLoc != -1) {
    const date = new Date();
    let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;
 
    gl.uniform1f(timeLoc, t);
    gl.uniform1f(MxLoc, Mx);
    gl.uniform1f(MyLoc, My);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function
 
console.log("CGSG forever!!! mylib.js imported");

let Mx = 0, My = 0;

export function onClick(event)
{
  Mx = event.clientX / 1000.0;
  My = event.clientY / 1000.0;
  console.log(`${Mx} : ${My}`);
}