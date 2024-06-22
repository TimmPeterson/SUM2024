import { sendObject } from "./ws";

let textArea;
let buttonApply;
let shader;
let codeArea;

export function shaderUpdateInit(_shader) {
  codeArea = document.getElementById("codeArea");
  textArea = document.getElementById("textArea");
  buttonApply = document.getElementById("apply");
  buttonApply.onclick = onApply;
  shader = _shader;
}

function onApply() {
  const source = textArea.value;
  shader.update(source, "frag");
  sendObject({ type: "shader", source: textArea.value });
}

`#version 300 es
precision highp float;

out vec4 OutColor;

in vec3 DrawPos;
in vec3 DrawNormal;
in vec2 DrawTexCoord;

uniform sampler2D uTex;

uniform u_material {
    vec4 Ka4;
    vec4 KdTrans;
    vec4 KsPh;
    vec4 TexFlags;
};

#define Ka Ka4.xyz
#define Kd KdTrans.xyz
#define Trans KdTrans.w
#define Ks KsPh.xyz
#define Ph KsPh.w

uniform float Time;

vec2 CmplMulCmpl( vec2 A, vec2 B )
{
  return vec2(A.x * B.x - A.y * B.y, A.x * B.y + A.y * B.x);
}

void main(void) {
    int n = 0;  
    vec2 Z, Z0;

    Z = (DrawTexCoord - 0.5) * 2.0;
    Z0 = Z;

    while (n < 255 && dot(Z, Z) < 4.0)
    {
      Z = CmplMulCmpl(Z, Z); 
      Z = Z + Z0;
      n++;
    }
    vec3 color = vec3(vec3(vec3(float(n) / 250.0, float(n) / 230.0, float(n) / 240.0)));
    
    vec3 L = -normalize(vec3(0.5f, 0.7f, 0.3f));
    vec3 N = normalize(DrawNormal);
    vec2 t = DrawTexCoord;

    N = faceforward(N, normalize(DrawPos), N);

    float k = dot(L, normalize(N));

    vec3 R, V = vec3(0, 0, -1);

    R = reflect(V, N);
    color += Ks * max(0.01f, pow(dot(R, L), Ph));

    //OutColor = vec4(Ka, 1.0f);
    OutColor = vec4(color, 1.0);
    //if(TexFlags.x != 0.0f)
    //    OutColor = vec4(texture(uTex, gl_FragCoord.xy / vec2(400.0f, 400.0f)).rgb, 1.0f);
    //OutColor = vec4(N, 1.0);
}`