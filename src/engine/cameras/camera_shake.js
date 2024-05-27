'use strict'

import ShakeVec2 from '../utils/shake_vec2.js'

class CameraShake {
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

  getCenter () { return this.mShakeCenter }

  setRefCenter (c) {
    this.mOrgCenter[0] = c[0]
    this.mOrgCenter[1] = c[1]
  }
}

export default CameraShake