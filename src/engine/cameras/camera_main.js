'use strict'

import * as glSys from '../core/gl.js'
import BoundingBox, { eBoundCollideStatus } from '../utils/bounding_box.js'
import CameraState from './camera_state.js'

const eViewport = Object.freeze({
  eOrgX: 0, eOrgY: 1, eWidth: 2, eHeight: 3
})

class Camera {
  mViewport = []
  mCameraMatrix
  mBGColor
  mViewportBound = 0
  mScissorBound = []

  /** @type {CameraState} */
  mCameraState
  /** @type {CameraShake | null} */
  mCameraShake = null

  /**
   * @param {vec2} wcCenter
   * @param {number} wcWidth
   * @param {number[]} viewportArray x, y, width, height
   * @param {number} bound
   */
  constructor (wcCenter, wcWidth, viewportArray, bound) {
    this.mCameraState = new CameraState(wcCenter, wcWidth)

    if (bound !== undefined) {
      this.mViewportBound = bound
    }

    this.setViewport(viewportArray, this.mViewportBound)

    this.mCameraMatrix = mat4.create()
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
    let p = vec2.fromValues(xPos, yPos)
    this.mCameraState.setCenter(p)
  }

  getWCCenter () {
    return this.mCameraState.getCenter()
  }

  /**
   * @param {number} width
   */
  setWCWidth (width) {
    this.mCameraState.setWidth(width)
  }

  getWCWidth () {
    return this.mCameraState.getWidth()
  }

  /**
   * @param {number[]} viewportArray x, y, width, height
   * @param {number|undfined} bound
   */
  setViewport (viewportArray, bound) {
    if (bound === undefined) {
      bound = this.mViewportBound
    }

    this.mViewport[0] = viewportArray[0] + bound
    this.mViewport[1] = viewportArray[1] + bound
    this.mViewport[2] = viewportArray[2] - (2 * bound)
    this.mViewport[3] = viewportArray[3] - (2 * bound)
    this.mScissorBound[0] = viewportArray[0]
    this.mScissorBound[1] = viewportArray[1]
    this.mScissorBound[2] = viewportArray[2]
    this.mScissorBound[3] = viewportArray[3]
  }

  getViewport () {
    const out = []
    out[0] = this.mScissorBound[0]
    out[1] = this.mScissorBound[1]
    out[2] = this.mScissorBound[2]
    out[3] = this.mScissorBound[3]

    return out
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
      this.mScissorBound[eViewport.eOrgX],
      this.mScissorBound[eViewport.eOrgY],
      this.mScissorBound[eViewport.eWidth],
      this.mScissorBound[eViewport.eHeight]
    )

    gl.clearColor(
      this.mBGColor[0],
      this.mBGColor[1],
      this.mBGColor[2],
      this.mBGColor[3],
    )

    gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3])
    gl.enable(gl.SCISSOR_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.SCISSOR_TEST)

    let center = []
    if (this.mCameraShake !== null) {
      center = this.mCameraShake.getCenter()
    } else {
      center = this.getWCCenter()
    }

    // following the translation, scale to: (-1, -1) to (1, 1): a 2x2 square at origin
    mat4.scale(this.mCameraMatrix, mat4.create(), vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0))

    // first operation to perform is to translate camera center to the origin
    mat4.translate(this.mCameraMatrix, this.mCameraMatrix, vec3.fromValues(-center[0], -center[1], 0))
  }

  getCameraMatrix () {
    return this.mCameraMatrix
  }

  /**
   * @param {Transform} aXform
   * @param {number} zone
   */
  collideWCBound (aXform, zone) {
    const bbox = new BoundingBox(
      aXform.getPosition(),
      aXform.getWidth(),
      aXform.getHeight()
    )

    const w = zone * this.getWCWidth()
    const h = zone * this.getWCHeight()

    const cameraBound = new BoundingBox(this.getWCCenter(), w, h)
    return cameraBound.boundCollideStatus(bbox)
  }

  /**
   * @param {Transform} aXform
   * @param {number} zone
   */
  clampAtBoundary (aXform, zone) {
    let status = this.collideWCBound(aXform, zone)
    if (status !== eBoundCollideStatus.eInside) {
      let pos = aXform.getPosition()
      if ((status & eBoundCollideStatus.eCollideTop) !== 0) {
        pos[1] = (this.getWCCenter())[1] + (zone * this.getWCHeight() / 2) - (aXform.getHeight() / 2)
      }
      if ((status & eBoundCollideStatus.eCollideBottom) !== 0) {
        pos[1] = (this.getWCCenter())[1] - (zone * this.getWCHeight() / 2) + (aXform.getHeight() / 2)
      }
      if ((status & eBoundCollideStatus.eCollideRight) !== 0) {
        pos[0] = (this.getWCCenter())[0] + (zone * this.getWCWidth() / 2) - (aXform.getWidth() / 2)
      }
      if ((status & eBoundCollideStatus.eCollideLeft) !== 0) {
        pos[0] = (this.getWCCenter())[0] - (zone * this.getWCWidth() / 2) + (aXform.getWidth() / 2)
      }
    }

    return status
  }
}

export default Camera