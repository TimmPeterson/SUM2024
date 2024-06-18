#version 300 es
precision highp float;

in vec3 InPosition;
in vec3 InNormal;
in vec2 InTexCoord;

out vec3 DrawPos;
out vec3 DrawNormal;
out vec2 DrawTexCoord;

// Uniform buffer for camera.
// Updates only on camera update
uniform u_camera {
    mat4 MatrProj; // projection matrix
    mat4 MatrView; // camera view matrix
};

// Uniform buffer for primitive.
// Updates on each primitive rendering
uniform u_primitive {
    mat4 MatrWorld; // world transform matrix 
};

// Uniform bufffer for time sync.
// Updates on each single frame
uniform u_time {
    vec4 LocalTimeLocalDeltaTimeGlobalTimeGlobalDeltaTime;
};

#define LocalTime LocalTimeLocalDeltaTimeGlobalTimeGlobalDeltaTime.x 
#define LocalDeltaTime LocalTimeLocalDeltaTimeGlobalTimeGlobalDeltaTime.y 
#define GlobalTime LocalTimeLocalDeltaTimeGlobalTimeGlobalDeltaTime.z
#define GlobalDeltaTime LocalTimeLocalDeltaTimeGlobalTimeGlobalDeltaTime.w 

void main(void) {
    gl_Position = MatrProj * MatrView * MatrWorld * vec4(InPosition, 1);
    DrawPos = vec3(MatrWorld * vec4(InPosition.xyz, 1.0f));
    DrawNormal = mat3(transpose(inverse(MatrWorld))) * InNormal;
    DrawTexCoord = InTexCoord;
}