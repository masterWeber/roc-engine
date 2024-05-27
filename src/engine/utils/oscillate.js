'use strict'

class Oscillate {
  mMag
  mCycles
  mOmega
  mNumCyclesLeft

  /**
   *
   * @param {number} delta
   * @param {number} frequency
   * @param {number} duration
   */
  constructor (delta, frequency, duration) {
    this.mMag = delta
    this.mCycles = duration
    this.mOmega = frequency * 2 * Math.PI
    this.mNumCyclesLeft = duration
  }

  _nextDampedHarmonic () {
    const frac = this.mNumCyclesLeft / this.mCycles
    return frac * frac * Math.cos((1 - frac) * this.mOmega)
  }

  _nextValue () {
    return this._nextDampedHarmonic()
  }

  done () {
    return (this.mNumCyclesLeft <= 0)
  }

  reStart () {
    this.mNumCyclesLeft = this.mCycles
  }

  getNext () {
    this.mNumCyclesLeft--

    let v = 0
    if (!this.done()) {
      v = this._nextValue()
    }

    return v * this.mMag
  }
}

export default Oscillate