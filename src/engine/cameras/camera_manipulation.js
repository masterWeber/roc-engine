'use strict'

import { eBoundCollideStatus } from '../utils/bounding_box.js'
import Camera from './camera_main.js'
import CameraShake from './camera_shake.js'

Camera.prototype.update = function () {
  if (this.mCameraShake !== null) {
    if (this.mCameraShake.done()) {
      this.mCameraShake = null
    } else {
      this.mCameraShake.setRefCenter(this.getWCCenter())
      this.mCameraShake.update()
    }
  }
  this.mCameraState.update()
}

Camera.prototype.configLerp = function (stiffness, duration) {
  this.mCameraState.config(stiffness, duration)
}

Camera.prototype.shake = function (deltas, freqs, duration) {
  this.mCameraShake = new CameraShake(this.mCameraState, deltas, freqs, duration)
}

Camera.prototype.reShake = function () {
  const success = this.mCameraShake !== null
  if (success) {
    this.mCameraShake.reShake()
  }

  return success
}

Camera.prototype.panWith = function (aXform, zone) {
  let status = this.collideWCBound(aXform, zone)
  if (status !== eBoundCollideStatus.eInside) {
    let pos = aXform.getPosition()
    let newC = vec2.clone(this.getWCCenter())
    if ((status & eBoundCollideStatus.eCollideTop) !== 0) {
      newC[1] = pos[1] + (aXform.getHeight() / 2) - (zone * this.getWCHeight() / 2)
    }
    if ((status & eBoundCollideStatus.eCollideBottom) !== 0) {
      newC[1] = pos[1] - (aXform.getHeight() / 2) + (zone * this.getWCHeight() / 2)
    }
    if ((status & eBoundCollideStatus.eCollideRight) !== 0) {
      newC[0] = pos[0] + (aXform.getWidth() / 2) - (zone * this.getWCWidth() / 2)
    }
    if ((status & eBoundCollideStatus.eCollideLeft) !== 0) {
      newC[0] = pos[0] - (aXform.getWidth() / 2) + (zone * this.getWCWidth() / 2)
    }
    this.mCameraState.setCenter(newC)
  }
}

Camera.prototype.panBy = function (dx, dy) {
  const newC = vec2.clone(this.getWCCenter())
  newC[0] += dx
  newC[1] += dy
  this.mCameraState.setCenter(newC)
}

Camera.prototype.panTo = function (cx, cy) {
  this.setWCCenter(cx, cy)
}

Camera.prototype.zoomBy = function (zoom) {
  if (zoom > 0) {
    this.setWCWidth(this.getWCWidth() * zoom)
  }
}

Camera.prototype.zoomTowards = function (pos, zoom) {
  let delta = []
  let newC = []
  vec2.sub(delta, pos, this.getWCCenter())
  vec2.scale(delta, delta, zoom - 1)
  vec2.sub(newC, this.getWCCenter(), delta)
  this.zoomBy(zoom)
  this.mCameraState.setCenter(newC)
}

export default Camera