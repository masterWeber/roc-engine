'use strict'

class GameObject {
  mRenderComponent
  mVisible = true
  mCurrentFrontDir
  mSpeed = 0

  /**
   * @param {Renderable} renderable
   */
  constructor (renderable) {
    this.mRenderComponent = renderable
    this.mCurrentFrontDir = vec2.fromValues(0, 1)
  }

  getXform () {
    return this.mRenderComponent.getXform()
  }

  setVisibility (f) {
    this.mVisible = f
  }

  isVisible () {
    return this.mVisible
  }

  setSpeed (s) {
    this.mSpeed = s
  }

  getSpeed () {
    return this.mSpeed
  }

  incSpeedBy (delta) {
    this.mSpeed += delta
  }

  setCurrentFrontDir (f) {
    vec2.normalize(this.mCurrentFrontDir, f)
  }

  getCurrentFrontDir () {
    return this.mCurrentFrontDir
  }

  getRenderable () {
    return this.mRenderComponent
  }

  rotateObjPointTo (p, rate) {
    let dir = []
    vec2.sub(dir, p, this.getXform().getPosition())
    let len = vec2.length(dir)
    if (len < Number.MIN_VALUE) {
      return
    }
    vec2.scale(dir, dir, 1 / len)

    let fdir = this.getCurrentFrontDir()
    let cosTheta = vec2.dot(dir, fdir)

    if (cosTheta > 0.999999) {
      return
    }

    if (cosTheta > 1) {
      cosTheta = 1
    } else {
      if (cosTheta < -1) {
        cosTheta = -1
      }
    }

    let dir3d = vec3.fromValues(dir[0], dir[1], 0)
    let f3d = vec3.fromValues(fdir[0], fdir[1], 0)
    let r3d = []
    vec3.cross(r3d, f3d, dir3d)

    let rad = Math.acos(cosTheta)
    if (r3d[2] < 0) {
      rad = -rad
    }

    rad *= rate
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad)
    this.getXform().incRotationByRad(rad)
  }

  update () {
    let pos = this.getXform().getPosition()
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed())
  }

  draw (aCamera) {
    if (this.isVisible()) {
      this.mRenderComponent.draw(aCamera)
    }
  }
}

export default GameObject