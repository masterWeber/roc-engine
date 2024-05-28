'use strict'

import ShakeVec2 from '../utils/shake_vec2.js'

class CameraShake {
  /** @type {vec2} */
  mOrgCenter
  /** @type {vec2} */
  mShakeCenter
  /** @type {ShakeVec2} */
  mShake

  /**
   * @param {CameraState} state
   * @param {number[]} deltas
   * @param {number[]} freqs
   * @param {number} shakeDuration
   */
  constructor (state, deltas, freqs, shakeDuration) {
    this.mOrgCenter = vec2.clone(state.getCenter())
    this.mShakeCenter = vec2.clone(this.mOrgCenter)
    this.mShake = new ShakeVec2(deltas, freqs, shakeDuration)
  }

  update () {
    const delta = this.mShake.getNext()
    vec2.add(this.mShakeCenter, this.mOrgCenter, delta)
  }

  done () {
    return this.mShake.done()
  }

  reShake () {
    this.mShake.reStart()
  }

  getCenter () {
    return this.mShakeCenter
  }

  /**
   * @param {vec2} c
   */
  setRefCenter (c) {
    this.mOrgCenter[0] = c[0]
    this.mOrgCenter[1] = c[1]
  }
}

export default CameraShake