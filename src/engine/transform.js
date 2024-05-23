'use strict'

class Transform {
  mPosition
  mScale
  mRotationInRad

  constructor () {
    this.mPosition = vec2.fromValues(0, 0)
    this.mScale = vec2.fromValues(1, 1)
    this.mRotationInRad = 0.0
  }

  /**
   * @param {Number} xPos
   * @param {Number} yPos
   */
  setPosition (xPos, yPos) {
    this.setXPos(xPos)
    this.setYPos(yPos)
  }

  getPosition () {
    return this.mPosition
  }

  getXPos () {
    return this.mPosition[0]
  }

  /**
   * @param {Number} xPos
   */
  setXPos (xPos) {
    this.mPosition[0] = xPos
  }

  incXPosBy (delta) {
    this.mPosition[0] += delta
  }

  getYPos () {
    return this.mPosition[1]
  }

  /**
   * @param {Number} yPos
   */
  setYPos (yPos) {
    this.mPosition[1] = yPos
  }

  incYPosBy (delta) {
    this.mPosition[1] += delta
  }

  /**
   * @param {Number} width
   * @param {Number} height
   */
  setSize (width, height) {
    this.setWidth(width)
    this.setHeight(height)
  }

  getSize () {
    return this.mScale
  }

  incSizeBy (delta) {
    this.incWidthBy(delta)
    this.incHeightBy(delta)
  }

  getWidth () {
    return this.mScale[0]
  }

  /**
   * @param {Number} width
   */
  setWidth (width) {
    this.mScale[0] = width
  }

  incWidthBy (delta) {
    this.mScale[0] += delta
  }

  getHeight () {
    return this.mScale[1]
  }

  /**
   * @param {Number} height
   */
  setHeight (height) {
    this.mScale[1] = height
  }

  incHeightBy (delta) {
    this.mScale[1] += delta
  }

  /**
   * @param {Number} rotationInRadians
   */
  setRotationInRad (rotationInRadians) {
    this.mRotationInRad = rotationInRadians
    while (this.mRotationInRad > (2 * Math.PI)) {
      this.mRotationInRad -= (2 * Math.PI)
    }
  }

  /**
   * @param {Number} rotationInDegree
   */
  setRotationInDegree (rotationInDegree) {
    this.setRotationInRad(rotationInDegree * Math.PI / 180.0)
  }

  /**
   * @param {Number} deltaDegree
   */
  incRotationByDegree (deltaDegree) {
    this.incRotationByRad(deltaDegree * Math.PI / 180.0)
  }

  /**
   * @param {Number} deltaRad
   */
  incRotationByRad (deltaRad) {
    this.setRotationInRad(this.mRotationInRad + deltaRad)
  }

  getRotationInRad () {
    return this.mRotationInRad
  }

  getRotationInDegree () {
    return this.mRotationInRad * 180.0 / Math.PI
  }

  getTRSMatrix () {
    let matrix = mat4.create()

    // The matrices that WebGL uses are transposed, thus the typical matrix
    // operations must be in reverse.
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0))
    mat4.rotateZ(matrix, matrix, this.getRotationInRad())
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0))

    return matrix
  }
}

export default Transform