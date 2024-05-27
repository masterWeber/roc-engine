'use strict'
import * as glSys from '../core/gl.js'
import * as shaderResources from '../core/shader_resources.js'
import Transform from '../utils/transform.js'

class Renderable {
  constructor () {
    this.mShader = shaderResources.getConstColorShader()
    this.mColor = [1, 1, 1, 1]
    this.mXform = new Transform()
  }

  /**
   * @param {Camera_main} camera
   */
  draw (camera) {
    let gl = glSys.get()
    this.mShader.activate(this.mColor, this.mXform.getTRSMatrix(), camera.getCameraMatrix())
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  setColor (color) {
    this.mColor = color
  }

  getColor () {
    return this.mColor
  }

  getXform () {
    return this.mXform
  }

  _setShader (s) {
    this.mShader = s
  }
}

export default Renderable