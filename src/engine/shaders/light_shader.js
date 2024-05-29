'use strict'

import SpriteShader from './sprite_shader.js'
import ShaderLightAt from './shader_light_at.js'

class LightShader extends SpriteShader {
  /** @type { Light[] | null} */
  mLights = null
  /** @type { Camera | null} */
  mCamera = null
  /** @type { number} */
  kGLSLuLightArraySize = 4
  /** @type { ShaderLightAt[] } */
  mShaderLights = []

  /**
   * @param {string} vertexShaderPath
   * @param {string} fragmentShaderPath
   */
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    for (let i = 0; i < this.kGLSLuLightArraySize; i++) {
      const ls = new ShaderLightAt(this.mCompiledShader, i)
      this.mShaderLights.push(ls)
    }
  }

  activate (pixelColor, trsMatrix, cameraMatrix) {
    super.activate(pixelColor, trsMatrix, cameraMatrix)

    let numLight = 0
    if (this.mLights !== null) {
      while (numLight < this.mLights.length) {
        this.mShaderLights[numLight].loadToShader(
          this.mCamera, this.mLights[numLight])
        numLight++
      }
    }

    while (numLight < this.kGLSLuLightArraySize) {
      this.mShaderLights[numLight].switchOffLight() // off the un-use
      numLight++
    }
  }

  /**
   * @param {Camera} c
   * @param {Light[]} l
   */
  setCameraAndLights (c, l) {
    this.mCamera = c
    this.mLights = l
    if (this.mLights.length > this.kGLSLuLightArraySize)
      throw new Error(
        'Error: ' + this.mLights.length
        + ' lights requested. Current max light source supported is: '
        + this.kGLSLuLightArraySize + ' update kGLSLuLightArraySize variable in light_shader.js  AND  light_fs.glsl to the proper number.'
      )
  }
}

export default LightShader