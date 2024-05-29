'use strict'

import LightShader from './light_shader.js'
import * as glSys from '../core/gl.js'

class IllumShader extends LightShader {
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    const gl = glSys.get()
    this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, 'uNormalSampler')
  }

  activate (pixelColor, trsMatrix, cameraMatrix) {
    super.activate(pixelColor, trsMatrix, cameraMatrix)
    const gl = glSys.get()
    gl.uniform1i(this.mNormalSamplerRef, 1)
  }
}

export default IllumShader