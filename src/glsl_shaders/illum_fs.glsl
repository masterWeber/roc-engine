precision mediump float;

uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;

uniform vec4 uPixelColor;
uniform vec4 uGlobalAmbientColor;
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

vec4 LightEffect(Light lgt, vec3 N) {
    vec4 result = vec4(0);
    float strength = 0.0;
    vec3 L = lgt.Position.xyz - gl_FragCoord.xyz;
    float dist = length(L);
    if (dist <= lgt.Far) {
        if (dist <= lgt.Near)
        strength = 1.0;
        else {
            float n = dist - lgt.Near;
            float d = lgt.Far - lgt.Near;
            strength = smoothstep(0.0, 1.0, 1.0 - (n * n) / (d * d));
        }
        L = L / dist;
        float NdotL = max(0.0, dot(N, L));
        strength *= NdotL;
    }
    result = strength * lgt.Intensity * lgt.Color;
    return result;
}

void main(void) {
    vec4 textureMapColor = texture2D(uSampler, vTexCoord);
    vec4 normal = texture2D(uNormalSampler, vTexCoord);
    vec4 normalMap = (2.0 * normal) - 1.0;

    vec3 N = normalize(normalMap.xyz);

    vec4 lgtResult = uGlobalAmbientColor * uGlobalAmbientIntensity;

    if (textureMapColor.a > 0.0) {
        for (int i = 0; i < kGLSLuLightArraySize; i++) {
            if (uLights[i].IsOn) {
                lgtResult += LightEffect(uLights[i], N);
            }
        }
    }
    lgtResult *= textureMapColor;

    vec3 r = vec3(lgtResult) * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, textureMapColor.a);

    gl_FragColor = result;
}
        