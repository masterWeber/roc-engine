'use strict'

import * as glSys from '../core/gl.js'
import * as vertexBuffer from '../core/vertex_buffer.js'
import SimpleShader from './simple_shader.js'

class LineShader extends SimpleShader {
  mPointSizeRef = null
  mPointSize = 1

  /**
   * @param {string} vertexShaderPath
   * @param {string} fragmentShaderPath
   */
  constructor (vertexShaderPath, fragmentShaderPath) {
    super(vertexShaderPath, fragmentShaderPath)

    const gl = glSys.get()
    this.mPointSizeRef = gl.getUniformLocation(this.mCompiledShader, 'uPointSize')
  }

  /**
   * @param {number[]} pixelColor
   * @param {Float32Array|GLfloat[]} trsMatrix
   * @param {*} cameraMatrix
   */
  activate (pixelColor, trsMatrix, cameraMatrix) {
    super.activate(pixelColor, trsMatrix, cameraMatrix)

    const gl = glSys.get()
    gl.uniform1f(this.mPointSizeRef, this.mPointSize)

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.getLineVertexBuffer())
    gl.vertexAttribPointer(
      this.mVertexPositionRef,
      3,
      gl.FLOAT,
      false,
      0,
      0
    )
    gl.enableVertexAttribArray(this.mVertexPositionRef)
  }

  /**
   * @param {number} w
   */
  setPointSize (w) {
    this.mPointSize = w
  }
}

export default LineShader