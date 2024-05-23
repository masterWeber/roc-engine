'use strict'

import * as glSys from './core/gl.js'

const eViewport = Object.freeze({
  eOrgX: 0, eOrgY: 1, eWidth: 2, eHeight: 3
})

class Camera {
  mWCCenter
  mWCWidth
  mViewport
  mCameraMatrix
  mBGColor

  /**
   * @param {vec2} wcCenter
   * @param {number} wcWidth
   * @param {number[]} viewportArray x, y, width, height
   */
  constructor (wcCenter, wcWidth, viewportArray) {
    this.mWCCenter = wcCenter
    this.mWCWidth = wcWidth
    this.mViewport = viewportArray

    // Camera transform operator
    this.mCameraMatrix = mat4.create()

    // RGB and Alpha
    this.mBGColor = [0.8, 0.8, 0.8, 1]
  }

  getWCHeight () {
    const ratio = this.mViewport[eViewport.eHeight] / this.mViewport[eViewport.eWidth]
    return this.getWCWidth() * ratio
  }

  /**
   * @param {number} xPos
   * @param {number} yPos
   */
  setWCCenter (xPos, yPos) {
    this.mWCCenter[0] = xPos
    this.mWCCenter[1] = yPos
  }

  getWCCenter () {
    return this.mWCCenter
  }

  /**
   * @param {number} width
   */
  setWCWidth (width) {
    this.mWCWidth = width
  }

  getWCWidth () {
    return this.mWCWidth
  }

  /**
   * @param {number[]} viewportArray x, y, width, height
   */
  setViewport (viewportArray) {
    this.mViewport = viewportArray
  }

  getViewport () {
    return this.mViewport
  }

  /**
   * @param {number[]} newColor RGB and Alpha
   */
  setBackgroundColor (newColor) {
    this.mBGColor = newColor
  }

  getBackgroundColor () {
    return this.mBGColor
  }

  setViewAndCameraMatrix () {
    const gl = glSys.get()

    gl.viewport(
      this.mViewport[eViewport.eOrgX],
      this.mViewport[eViewport.eOrgY],
      this.mViewport[eViewport.eWidth],
      this.mViewport[eViewport.eHeight]
    )

    gl.scissor(
      this.mViewport[eViewport.eOrgX],
      this.mViewport[eViewport.eOrgY],
      this.mViewport[eViewport.eWidth],
      this.mViewport[eViewport.eHeight]
    )

    gl.clearColor(
      this.mBGColor[0],
      this.mBGColor[1],
      this.mBGColor[2],
      this.mBGColor[3],
    )

    gl.enable(gl.SCISSOR_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.SCISSOR_TEST)

    const center = this.getWCCenter()

    // following the translation, scale to: (-1, -1) to (1, 1): a 2x2 square at origin
    mat4.scale(this.mCameraMatrix, mat4.create(), vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0))

    // first operation to perform is to translate camera center to the origin
    mat4.translate(this.mCameraMatrix, this.mCameraMatrix, vec3.fromValues(-center[0], -center[1], 0))
  }

  getCameraMatrix () {
    return this.mCameraMatrix
  }
}

export default Camera