'use strict'

const eLightType = Object.freeze({
  ePointLight: 0, eDirectionalLight: 1, eSpotLight: 2
})

class Light {
  /** @type {vec4} */
  mColor
  /** @type {vec3} */
  mPosition
  /** @type {number} */
  mRadius = 10
  /** @type {vec3} */
  mDirection
  /** @type {number} */
  mNear = 5
  /** @type {number} */
  mFar = 10
  /** @type {number} */
  mInner = 0.1
  /** @type {number} */
  mOuter = 0.3
  /** @type {number} */
  mIntensity = 1
  /** @type {number} */
  mDropOff = 1
  /** @type {number} */
  mLightType = eLightType.ePointLight
  /** @type {boolean} */
  mIsOn = true

  constructor () {
    this.mColor = vec4.fromValues(0.1, 0.1, 0.1, 1)
    this.mPosition = vec3.fromValues(0, 0, 5)
    this.mDirection = vec3.fromValues(0, 0, -1)
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

  setDirection (d) {
    this.mDirection = vec3.clone(d)
  }

  getDirection () {
    return this.mDirection
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

  setInner (r) {
    this.mInner = r
  }

  getInner () {
    return this.mInner
  }

  setOuter (r) {
    this.mOuter = r
  }

  getOuter () {
    return this.mOuter
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

  setDropOff (d) {
    this.mDropOff = d
  }

  getDropOff () {
    return this.mDropOff
  }

  setLightType (t) {
    this.mLightType = t
  }

  getLightType () {
    return this.mLightType
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

export { eLightType }
export default Light