'use strict'

import * as glSys from '../core/gl.js'
import * as vertexBuffer from '../core/vertex_buffer.js'
import * as text from '../resources/text.js'
import * as defaultResources from '../resources/default_resources.js'

class SimpleShader {
  mCompiledShader = null
  mVertexPositionRef = null
  mPixelColorRef = null
  mModelMatrixRef = null
  mCameraMatrixRef = null
  mGlobalAmbientColorRef = null
  mGlobalAmbientIntensityRef = null

  /**
   * @param {string} vertexShaderID
   * @param {string} fragmentShaderID
   */
  constructor (vertexShaderID, fragmentShaderID) {
    const gl = glSys.get()

    let vertexShader = compileShader(vertexShaderID, gl.VERTEX_SHADER)
    let fragmentShader = compileShader(fragmentShaderID, gl.FRAGMENT_SHADER)

    this.mCompiledShader = gl.createProgram()
    gl.attachShader(this.mCompiledShader, vertexShader)
    gl.attachShader(this.mCompiledShader, fragmentShader)
    gl.linkProgram(this.mCompiledShader)

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
      throw new Error('Error linking shader')
    }

    this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, 'aVertexPosition')

    this.mPixelColorRef = gl.getUniformLocation(this.mCompiledShader, 'uPixelColor')
    this.mModelMatrixRef = gl.getUniformLocation(this.mCompiledShader, 'uModelXformMatrix')
    this.mCameraMatrixRef = gl.getUniformLocation(this.mCompiledShader, 'uCameraXformMatrix')
    this.mGlobalAmbientColorRef = gl.getUniformLocation(this.mCompiledShader, 'uGlobalAmbientColor')
    this.mGlobalAmbientIntensityRef = gl.getUniformLocation(this.mCompiledShader, 'uGlobalAmbientIntensity')
  }

  /**
   * @param {Float32Array | GLfloat[]} pixelColor
   * @param {Float32Array | GLfloat[]} trsMatrix
   * @param {Float32Array | GLfloat[]} cameraMatrix
   */
  activate (pixelColor, trsMatrix, cameraMatrix) {
    let gl = glSys.get()

    gl.useProgram(this.mCompiledShader)

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get())
    gl.vertexAttribPointer(this.mVertexPositionRef, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(this.mVertexPositionRef)

    gl.uniform4fv(this.mPixelColorRef, pixelColor)
    gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix)
    gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix)
    gl.uniform4fv(this.mGlobalAmbientColorRef, defaultResources.getGlobalAmbientColor())
    gl.uniform1f(this.mGlobalAmbientIntensityRef, defaultResources.getGlobalAmbientIntensity())
  }
}

/**
 * @param {string} filePath
 * @param {GLenum} shaderType
 */
function compileShader (filePath, shaderType) {
  let gl = glSys.get()

  let shaderSource = text.get(filePath)

  if (shaderSource === null) {
    throw new Error('WARNING:' + filePath + ' not loaded!')
  }

  let compiledShader = gl.createShader(shaderType)

  gl.shaderSource(compiledShader, shaderSource)
  gl.compileShader(compiledShader)

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error('Shader [' + filePath + '] compiling error: ' + gl.getShaderInfoLog(compiledShader))
  }

  return compiledShader
}

export default SimpleShader