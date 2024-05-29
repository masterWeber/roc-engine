'use strict'

import SpriteAnimateRenderable from './sprite_animate_renderable.js'
import * as defaultShaders from '../core/shader_resources.js'

class LightRenderable extends SpriteAnimateRenderable {
  /** @type {LightShader} */
  mShader
  /** @type {Light[]} */
  mLights = []

  constructor (myTexture) {
    super(myTexture)
    super._setShader(defaultShaders.getLightShader())
  }

  draw (camera) {
    this.mShader.setCameraAndLights(camera, this.mLights)
    super.draw(camera)
  }

  getLightAt (index) {
    return this.mLights[index]
  }

  /**
   * @param {Light} l
   */
  addLight (l) {
    this.mLights.push(l)
  }
}

export default LightRenderable