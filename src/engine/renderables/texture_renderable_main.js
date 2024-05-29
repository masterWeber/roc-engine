'use strict'

import Renderable from './renderable.js'
import * as texture from '../resources/texture.js'
import * as shaderResources from '../core/shader_resources.js'

class TextureRenderable extends Renderable {
  mTexture = null
  mTextureInfo = null
  mColorArray = null
  mElmWidthPixels = 0
  mElmHeightPixels = 0
  mElmLeftIndex = 0
  mElmBottomIndex = 0

  /**
   * @param {string} myTexture
   */
  constructor (myTexture) {
    super()
    super.setColor([1, 1, 1, 0])
    super._setShader(shaderResources.getTextureShader())

    this.setTexture(myTexture)
  }

  draw (camera) {
    texture.activate(this.mTexture)
    super.draw(camera)
  }

  getTexture () {
    return this.mTexture
  }

  setTexture (newTexture) {
    this.mTexture = newTexture

    this.mTextureInfo = texture.get(newTexture)
    this.mColorArray = null

    this.mElmWidthPixels = this.mTextureInfo.mWidth
    this.mElmHeightPixels = this.mTextureInfo.mHeight
    this.mElmLeftIndex = 0
    this.mElmBottomIndex = 0
  }
}

export default TextureRenderable