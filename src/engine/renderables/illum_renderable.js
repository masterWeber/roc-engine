'use strict'

import * as texture from '../resources/texture.js'
import * as glSys from '../core/gl.js'
import LightRenderable from './light_renderable.js'
import * as defaultShaders from '../core/shader_resources.js'
import Material from '../material.js'

class IllumRenderable extends LightRenderable {
  mNormalMap
  mShader

  /**
   * @param {string} myTexture
   * @param {string} myNormalMap
   */
  constructor (myTexture, myNormalMap) {
    super(myTexture)
    super._setShader(defaultShaders.getIllumShader())

    this.mNormalMap = myNormalMap

    this.mMaterial = new Material()
  }

  draw (camera) {
    texture.activate(this.mNormalMap, glSys.get().TEXTURE1)

    this.mShader.setMaterialAndCameraPos(this.mMaterial, camera.getWCCenterInPixelSpace())
    super.draw(camera)
  }

  getMaterial () { return this.mMaterial }
}

export default IllumRenderable