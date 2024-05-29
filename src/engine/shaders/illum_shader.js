'use strict'

import LightShader from './light_shader.js'
import * as glSys from '../core/gl.js'
import ShaderMaterial from './shader_material.js'

class IllumShader extends LightShader {
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    this.mMaterial = null
    this.mMaterialLoader = new ShaderMaterial(this.mCompiledShader)

    const gl = glSys.get()
    this.mCameraPos = null  // points to a vec3
    this.mCameraPosRef = gl.getUniformLocation(this.mCompiledShader, 'uCameraPosition')

    this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, 'uNormalSampler')
  }

  activate (pixelColor, trsMatrix, cameraMatrix) {
    super.activate(pixelColor, trsMatrix, cameraMatrix)
    const gl = glSys.get()
    gl.uniform1i(this.mNormalSamplerRef, 1)

    this.mMaterialLoader.loadToShader(this.mMaterial)
    gl.uniform3fv(this.mCameraPosRef, this.mCameraPos)
  }

  setMaterialAndCameraPos (m, p) {
    this.mMaterial = m
    this.mCameraPos = p
  }
}

export default IllumShader