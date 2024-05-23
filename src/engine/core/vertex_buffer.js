'use strict'
import * as glSys from './gl.js'

/** @type {WebGLBuffer | null} */
let mGLVertexBuffer = null

function get () { return mGLVertexBuffer }

/** @type {WebGLBuffer | null} */
let mGLTextureCoordBuffer = null

function getTexCoord () {
  return mGLTextureCoordBuffer
}

const mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0,
]

let mTextureCoordinates = [
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0
]

function init () {
  let gl = glSys.get()
  mGLVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW)

  mGLTextureCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLTextureCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mTextureCoordinates), gl.STATIC_DRAW)
}

function cleanUp () {
  if (mGLVertexBuffer !== null) {
    glSys.get().deleteBuffer(mGLVertexBuffer)
    mGLVertexBuffer = null
  }
}

export { init, get, cleanUp, getTexCoord }