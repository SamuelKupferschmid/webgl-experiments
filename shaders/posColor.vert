attribute vec4 aPosition;
uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

varying vec4 vColorFade;


void main() {
    vColorFade = aPosition;
    gl_Position = uProjection * uView * uModel * aPosition;
}