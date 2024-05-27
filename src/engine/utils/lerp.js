'use strict'

class Lerp {
  /** @type {number|vec2} */
  mCurrentValue
  /** @type {number|vec2} */
  mFinalValue
  /** @type {number} */
  mCycles
  /** @type {number} */
  mRate
  /** @type {number} */
  mCyclesLeft = 0

  /**
   * @param {number|vec2} value
   * @param {number} cycles
   * @param {number} rate
   */
  constructor (value, cycles, rate) {
    this.mCurrentValue = value
    this.mFinalValue = value
    this.mCycles = cycles
    this.mRate = rate
  }

  _interpolateValue () {
    this.mCurrentValue = this.mCurrentValue + this.mRate
      * (this.mFinalValue - this.mCurrentValue)
  }

  /**
   * @param {number} stiffness
   * @param {number} duration
   */
  config (stiffness, duration) {
    this.mRate = stiffness
    this.mCycles = duration
  }

  get () {
    return this.mCurrentValue
  }

  /**
   * @param {number} v
   */
  setFinal (v) {
    this.mFinalValue = v
    this.mCyclesLeft = this.mCycles
  }

  update () {
    if (this.mCyclesLeft <= 0) {
      return
    }
    this.mCyclesLeft--

    if (this.mCyclesLeft === 0) {
      this.mCurrentValue = this.mFinalValue
    } else {
      this._interpolateValue()
    }
  }
}

export default Lerp