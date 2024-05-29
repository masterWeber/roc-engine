'use strict'

import * as texture from '../resources/texture.js'
import * as glSys from '../core/gl.js'
import LightRenderable from './light_renderable.js'
import * as defaultShaders from '../core/shader_resources.js'

class IllumRenderable extends LightRenderable {
  mNormalMap

  /**
   * @param {string} myTexture
   * @param {string} myNormalMap
   */
  constructor (myTexture, myNormalMap) {
    super(myTexture)
    super._setShader(defaultShaders.getIllumShader())

    this.mNormalMap = myNormalMap
  }

  draw (camera) {
    texture.activate(this.mNormalMap, glSys.get().TEXTURE1)
    super.draw(camera)
  }
}

export default IllumRenderable