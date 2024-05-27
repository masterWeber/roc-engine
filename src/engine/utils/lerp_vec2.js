'use strict'

import Lerp from './lerp.js'

class LerpVec2 extends Lerp {
  /**
   * @param {number|vec2} value
   * @param {number} cycle
   * @param {number} rate
   */
  constructor (value, cycle, rate) {
    super(value, cycle, rate)
  }

  _interpolateValue () {
    vec2.lerp(this.mCurrentValue, this.mCurrentValue, this.mFinalValue, this.mRate)
  }
}

export default LerpVec2