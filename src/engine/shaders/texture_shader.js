'use strict'

import * as glSys from '../core/gl.js'
import * as vertexBuffer from '../core/vertex_buffer.js'
import SimpleShader from './simple_shader.js'

class TextureShader extends SimpleShader {
  mTextureCoordinateRef
  mSamplerRef

  /**
   * @param {string} vertexShaderPath
   * @param {string} fragmentShaderPath
   */
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    const gl = glSys.get()
    this.mTextureCoordinateRef = gl.getAttribLocation(this.mCompiledShader, 'aTextureCoordinate')
    this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader, 'uSampler')
  }

  activate (pixelColor, trsMatrix, cameraMatrix) {
    super.activate(pixelColor, trsMatrix, cameraMatrix)

    const gl = glSys.get()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer())
    gl.vertexAttribPointer(this.mTextureCoordinateRef, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(this.mTextureCoordinateRef)

    gl.uniform1i(this.mSamplerRef, 0)
  }

  _getTexCoordBuffer () {
    return vertexBuffer.getTexCoord()
  }
}

export default TextureShader