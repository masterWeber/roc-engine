precision mediump float;

uniform sampler2D uSampler;

uniform vec4 uPixelColor;
uniform vec4 uGlobalAmbientColor; // this is shared globally
uniform float uGlobalAmbientIntensity;

#define kGLSLuLightArraySize 4

struct Light {
    vec3 Position;
    vec4 Color;
    float Near;
    float Far;
    float Intensity;
    bool IsOn;
};
uniform Light uLights[kGLSLuLightArraySize];

varying vec2 vTexCoord;


vec4 LightEffect(Light lgt)
{
    vec4 result = vec4(0);
    float strength = 0.0;
    float dist = length(lgt.Position.xyz - gl_FragCoord.xyz);
    if (dist <= lgt.Far) {
        if (dist <= lgt.Near)
        strength = 1.0;
        else {
            float n = dist - lgt.Near;
            float d = lgt.Far - lgt.Near;
            strength = smoothstep(0.0, 1.0, 1.0 - (n * n) / (d * d));
        }
    }
    result = strength * lgt.Intensity * lgt.Color;
    return result;
}

void main(void) {
    vec4 textureMapColor = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));
    vec4 lgtResults = uGlobalAmbientIntensity * uGlobalAmbientColor;

    if (textureMapColor.a > 0.0) {
        for (int i = 0; i < kGLSLuLightArraySize; i++) {
            if (uLights[i].IsOn) {
                lgtResults += LightEffect(uLights[i]);
            }
        }
    }
    lgtResults *= textureMapColor;

    vec3 r = vec3(lgtResults) * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, textureMapColor.a);

    gl_FragColor = result;
}