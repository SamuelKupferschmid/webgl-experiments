attribute vec4 aPosition;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

varying vec4 v_color;

void main() {
    gl_Position = uProjection * uView * uModel * aPosition;
    v_color = gl_Position;
}