'use strict'

import SpriteShader from './sprite_shader.js'
import * as glSys from '../core/gl.js'

class LightShader extends SpriteShader {
  mColorRef = null
  mPosRef = null
  mRadiusRef = null
  mIsOnRef = null

  mLight = null
  mCamera = null

  /**
   * @param {string} vertexShaderPath
   * @param {string} fragmentShaderPath
   */
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    const shader = this.mCompiledShader
    const gl = glSys.get()
    this.mColorRef = gl.getUniformLocation(shader, 'uLightColor')
    this.mPosRef = gl.getUniformLocation(shader, 'uLightPosition')
    this.mRadiusRef = gl.getUniformLocation(shader, 'uLightRadius')
    this.mIsOnRef = gl.getUniformLocation(shader, 'uLightOn')
  }

  activate (pixelColor, trsMatrix, cameraMatrix) {
    super.activate(pixelColor, trsMatrix, cameraMatrix)

    if (this.mLight !== null) {
      this._loadToShader()
    } else {
      glSys.get().uniform1i(this.mIsOnRef, false)
    }
  }

  setCameraAndLight (c, l) {
    this.mCamera = c
    this.mLight = l
  }

  _loadToShader () {
    let gl = glSys.get()
    gl.uniform1i(this.mIsOnRef, this.mLight.isLightOn())
    if (this.mLight.isLightOn()) {
      let p = this.mCamera.wcPosToPixel(this.mLight.getPosition())
      let r = this.mCamera.wcSizeToPixel(this.mLight.getRadius())
      let c = this.mLight.getColor()

      gl.uniform4fv(this.mColorRef, c)
      gl.uniform3fv(this.mPosRef, vec3.fromValues(p[0], p[1], p[2]))
      gl.uniform1f(this.mRadiusRef, r)
    }
  }
}

export default LightShader