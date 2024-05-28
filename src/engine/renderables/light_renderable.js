'use strict'

import SpriteAnimateRenderable from './sprite_animate_renderable.js'
import * as defaultShaders from '../core/shader_resources.js'

class LightRenderable extends SpriteAnimateRenderable {
  mLight = null
  /** @type {LightShader} */
  mShader

  constructor (myTexture) {
    super(myTexture)
    super._setShader(defaultShaders.getLightShader())
  }

  draw (camera) {
    this.mShader.setCameraAndLight(camera, this.mLight)
    super.draw(camera)
  }

  getLight () {
    return this.mLight
  }

  addLight (l) {
    this.mLight = l
  }
}

export default LightRenderable