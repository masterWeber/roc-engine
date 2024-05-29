'use strict'

class Light {
  /** @type {vec4} */
  mColor
  /** @type {vec3} */
  mPosition
  /** @type {number} */
  mRadius = 10
  /** @type {number} */
  mNear = 5
  /** @type {number} */
  mFar = 10
  /** @type {number} */
  mIntensity = 1
  /** @type {boolean} */
  mIsOn = true

  constructor () {
    this.mColor = vec4.fromValues(0.1, 0.1, 0.1, 1)
    this.mPosition = vec3.fromValues(0, 0, 5)
  }

  /**
   * @param {number[]|vec4} c
   */
  setColor (c) {
    this.mColor = vec4.clone(c)
  }

  getColor () {
    return this.mColor
  }

  /**
   * @param {number[]} p
   */
  set2DPosition (p) {
    this.mPosition = vec3.fromValues(p[0], p[1], this.mPosition[2])
  }

  /**
   * @param {number} x
   */
  setXPos (x) {
    this.mPosition[0] = x
  }

  /**
   * @param {number}y
   */
  setYPos (y) {
    this.mPosition[1] = y
  }

  /**
   * @param {number} z
   */
  setZPos (z) {
    this.mPosition[2] = z
  }

  getPosition () {
    return this.mPosition
  }

  /**
   * @param {number} r
   */
  setRadius (r) {
    this.mRadius = r
  }

  getRadius () {
    return this.mRadius
  }

  /**
   * @param {number} n
   */
  setNear (n) {
    this.mNear = n
  }

  getNear () {
    return this.mNear
  }

  /**
   * @param {number} f
   */
  setFar (f) {
    this.mFar = f
  }

  getFar () {
    return this.mFar
  }

  /**
   * @param {number} i
   */
  setIntensity (i) {
    this.mIntensity = i
  }

  getIntensity () {
    return this.mIntensity
  }

  /**
   * @param {boolean} on
   */
  setLightTo (on) {
    this.mIsOn = on
  }

  isLightOn () {
    return this.mIsOn
  }
}

export default Light