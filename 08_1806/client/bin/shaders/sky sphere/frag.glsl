#version 300 es
precision highp float;

out vec4 OutColor;

in vec3 DrawPos;
in vec3 DrawNormal;
in vec2 DrawTexCoord;

uniform sampler2D uTex;

// Uniform buffer for camera.
// Updates only on camera update
uniform u_camera {
    mat4 MatrProj; // projection matrix
    mat4 MatrView; // camera view matrix
    vec4 Forward4;
    vec4 Right4;
    vec4 Up4;
    vec4 FrameWFrameHProjSizeProjDist;
};

#define Forward Forward4.xyz
#define Right Right4.xyz
#define Up Up4.xyz
#define FrameW FrameWFrameHProjSizeProjDist.x
#define FrameH FrameWFrameHProjSizeProjDist.y
#define ProjSize FrameWFrameHProjSizeProjDist.z
#define ProjDist FrameWFrameHProjSizeProjDist.w

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
    float Wp, Hp;

    Wp = Hp = ProjSize;

    if(FrameW > FrameH)
        Wp *= FrameW / FrameH;
    else
        Hp *= FrameH / FrameW;

    float xp = (gl_FragCoord.x) * Wp / FrameW - Wp / 2.0f;
    float yp = (gl_FragCoord.y) * Hp / FrameH - Hp / 2.0f;

    vec3 D = Forward * ProjDist + Right * xp + Up * yp;

    D = normalize(D);

    float theta = acos(D.y) / acos(-1.0f), phi = atan(D.x, D.z) * 0.5f / acos(-1.0f);

    OutColor = vec4(texture(uTex, vec2(phi, theta)).rgb, 1.0f);
    //OutColor = vec4(texture(uTex, gl_FragCoord.xy / vec2(1920, 1080)).rgb, 1.0f);
}