'use strict'

import TextureRenderable from './texture_renderable_main.js'
import * as texture from '../resources/texture.js'

TextureRenderable.prototype.pixelTouches = function (other, wcTouchPos) {
  let pixelTouch = false
  let xIndex = 0, yIndex
  let otherIndex = [0, 0]

  while ((!pixelTouch) && (xIndex < this.mElmWidthPixels)) {
    yIndex = 0
    while ((!pixelTouch) && (yIndex < this.mElmHeightPixels)) {
      if (this._pixelAlphaValue(xIndex, yIndex) > 0) {
        this._indexToWCPosition(wcTouchPos, xIndex, yIndex)
        other._wcPositionToIndex(otherIndex, wcTouchPos)
        if ((otherIndex[0] >= 0) && (otherIndex[0] < other.mElmWidthPixels) &&
          (otherIndex[1] >= 0) && (otherIndex[1] < other.mElmHeightPixels)) {
          pixelTouch = other._pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0
        }
      }
      yIndex++
    }
    xIndex++
  }
  return pixelTouch
}

TextureRenderable.prototype.setColorArray = function () {
  if (this.mColorArray === null) {
    this.mColorArray = texture.getColorArray(this.mTexture)
  }
}

TextureRenderable.prototype._pixelAlphaValue = function (x, y) {
  y += this.mElmBottomIndex
  x += this.mElmLeftIndex
  x = x * 4
  y = y * 4
  return this.mColorArray[(y * this.mTextureInfo.mWidth) + x + 3]
}

TextureRenderable.prototype._wcPositionToIndex = function (returnIndex, wcPos) {
  let delta = []
  vec2.sub(delta, wcPos, this.mXform.getPosition())
  returnIndex[0] = this.mElmWidthPixels * (delta[0] / this.mXform.getWidth())
  returnIndex[1] = this.mElmHeightPixels * (delta[1] / this.mXform.getHeight())

  returnIndex[0] += this.mElmWidthPixels / 2
  returnIndex[1] += this.mElmHeightPixels / 2

  returnIndex[0] = Math.floor(returnIndex[0])
  returnIndex[1] = Math.floor(returnIndex[1])
}

TextureRenderable.prototype._indexToWCPosition = function (returnWCPos, i, j) {
  let x = i * this.mXform.getWidth() / this.mElmWidthPixels
  let y = j * this.mXform.getHeight() / this.mElmHeightPixels
  returnWCPos[0] = this.mXform.getXPos() + (x - (this.mXform.getWidth() * 0.5))
  returnWCPos[1] = this.mXform.getYPos() + (y - (this.mXform.getHeight() * 0.5))
}

export default TextureRenderable