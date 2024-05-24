'use strict'

import TextureShader from './texture_shader.js'
import * as glSys from '../core/gl.js'

class SpriteShader extends TextureShader {
  mTexCoordBuffer

  /**
   * @param {string} vertexShaderPath
   * @param {string} fragmentShaderPath
   */
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    const initTexCoord = [
      1.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      0.0, 0.0
    ]

    const gl = glSys.get()
    this.mTexCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW)
  }

  /**
   * @param {number[]} texCoord
   */
  setTextureCoordinate (texCoord) {
    const gl = glSys.get()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.DYNAMIC_DRAW)
  }

  _getTexCoordBuffer () {
    return this.mTexCoordBuffer
  }
}

export default SpriteShader