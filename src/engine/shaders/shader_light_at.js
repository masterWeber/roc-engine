'use strict'

import * as glSys from '../core/gl.js'

class ShaderLightAt {
  mColorRef
  mPosRef
  mNearRef
  mFarRef
  mIntensityRef
  /** @type { WebGLUniformLocation | null} */
  mIsOnRef

  constructor (shader, index) {
    this._setShaderReferences(shader, index)
  }

  /**
   *
   * @param {Camera} aCamera
   * @param {Light} aLight
   */
  loadToShader (aCamera, aLight) {
    const gl = glSys.get()
    gl.uniform1i(this.mIsOnRef, aLight.isLightOn())

    if (aLight.isLightOn()) {
      const position = aCamera.wcPosToPixel(aLight.getPosition())
      const near = aCamera.wcSizeToPixel(aLight.getNear())
      const far = aCamera.wcSizeToPixel(aLight.getFar())
      const color = aLight.getColor()
      gl.uniform4fv(this.mColorRef, color)
      gl.uniform3fv(this.mPosRef, vec3.fromValues(position[0], position[1], position[2]))
      gl.uniform1f(this.mNearRef, near)
      gl.uniform1f(this.mFarRef, far)
      gl.uniform1f(this.mIntensityRef, aLight.getIntensity())
    }
  }

  switchOffLight () {
    let gl = glSys.get()
    gl.uniform1i(this.mIsOnRef, false)
  }

  /**
   * @param {WebGLProgram} aLightShader
   * @param {string} index
   */
  _setShaderReferences (aLightShader, index) {
    let gl = glSys.get()
    this.mColorRef = gl.getUniformLocation(aLightShader, 'uLights[' + index + '].Color')
    this.mPosRef = gl.getUniformLocation(aLightShader, 'uLights[' + index + '].Position')
    this.mNearRef = gl.getUniformLocation(aLightShader, 'uLights[' + index + '].Near')
    this.mFarRef = gl.getUniformLocation(aLightShader, 'uLights[' + index + '].Far')
    this.mIntensityRef = gl.getUniformLocation(aLightShader, 'uLights[' + index + '].Intensity')
    this.mIsOnRef = gl.getUniformLocation(aLightShader, 'uLights[' + index + '].IsOn')
  }

}

export default ShaderLightAt