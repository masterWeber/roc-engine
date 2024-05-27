'use strict'

import Lerp from '../utils/lerp.js'
import LerpVec2 from '../utils/lerp_vec2.js'

class CameraState {
  /** @type {number} */
  kCycles = 300
  /** @type {number} */
  kRate = 0.1
  /** @type {LerpVec2} */
  mCenter
  /** @type {Lerp} */
  mWidth

  /**
   * @param {vec2} center
   * @param {number} width
   */
  constructor (center, width) {
    this.mCenter = new LerpVec2(center, this.kCycles, this.kRate)
    this.mWidth = new Lerp(width, this.kCycles, this.kRate)
  }

  getCenter () {
    return this.mCenter.get()
  }

  getWidth () {
    return this.mWidth.get()
  }

  /**
   * @param {vec2} c
   */
  setCenter (c) {
    this.mCenter.setFinal(c)
  }

  /**
   * @param {number} w
   */
  setWidth (w) {
    this.mWidth.setFinal(w)
  }

  update () {
    this.mCenter.update()
    this.mWidth.update()
  }

  /**
   * @param {number} stiffness
   * @param {number} duration
   */
  config (stiffness, duration) {
    this.mCenter.config(stiffness, duration)
    this.mWidth.config(stiffness, duration)
  }
}

export default CameraState