'use strict'

import TextureRenderable from './texture_renderable.js'
import * as shaderResources from '../core/shader_resources.js'
import * as texture from '../resources/texture.js'

const eTexCoordArrayIndex = Object.freeze({
  eLeft: 2,
  eRight: 0,
  eTop: 1,
  eBottom: 5
})

class SpriteRenderable extends TextureRenderable {
  mElmLeft
  mElmRight
  mElmTop
  mElmBottom

  constructor (myTexture) {
    super(myTexture)
    super._setShader(shaderResources.getSpriteShader())

    this.mElmLeft = 0.0
    this.mElmRight = 1.0
    this.mElmTop = 1.0
    this.mElmBottom = 0.0
  }

  setElementUVCoordinate (left, right, bottom, top) {
    this.mElmLeft = left
    this.mElmRight = right
    this.mElmBottom = bottom
    this.mElmTop = top
  }

  setElementPixelPositions (left, right, bottom, top) {
    let texInfo = texture.get(this.mTexture)
    let imageW = texInfo.mWidth
    let imageH = texInfo.mHeight

    this.mElmLeft = left / imageW
    this.mElmRight = right / imageW
    this.mElmBottom = bottom / imageH
    this.mElmTop = top / imageH
  }

  getElementUVCoordinateArray () {
    return [
      this.mElmRight, this.mElmTop,
      this.mElmLeft, this.mElmTop,
      this.mElmRight, this.mElmBottom,
      this.mElmLeft, this.mElmBottom
    ]
  }

  draw (camera) {
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray())
    super.draw(camera)
  }
}

export default SpriteRenderable
export { eTexCoordArrayIndex }