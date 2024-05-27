'use strict'

import Oscillate from './oscillate.js'

class Shake extends Oscillate {
  /**
   * @param {number} delta
   * @param {number} frequency
   * @param {number} duration
   */
  constructor (delta, frequency, duration) {
    super(delta, frequency, duration)
  }

  _nextValue () {
    let v = this._nextDampedHarmonic()
    return (Math.random() > 0.5) ? -v : v
  }
}

export default Shake