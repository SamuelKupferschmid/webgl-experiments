precision highp float;
uniform vec4 uColor;

varying vec4 vColorFade;

void main() {
    gl_FragColor  = vColorFade;
}