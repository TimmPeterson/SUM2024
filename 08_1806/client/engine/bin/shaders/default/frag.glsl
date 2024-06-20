#version 300 es
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

void main(void) {
    vec3 L = -normalize(vec3(0.5f, 0.7f, 0.3f));
    vec3 N = normalize(DrawNormal);
    vec2 t = DrawTexCoord;

    N = faceforward(N, normalize(DrawPos), N);

    float k = dot(L, normalize(N));

    vec3 color = TexFlags[0] != 0.0f ? k * texture(uTex, t).rgb : k * Kd;//vec3(0.0f, 0.7f, 0.7f);
    vec3 R, V = vec3(0, 0, -1);

    R = reflect(V, N);
    color += Ks * max(0.01f, pow(dot(R, L), Ph));

    //OutColor = vec4(Ka, 1.0f);
    OutColor = vec4(color, Trans);
    //if(TexFlags.x != 0.0f)
    //    OutColor = vec4(texture(uTex, gl_FragCoord.xy / vec2(400.0f, 400.0f)).rgb, 1.0f);
    //OutColor = vec4(N, 1.0);
}