'use strict'
import * as glSys from './gl.js'

/** @type {WebGLBuffer | null} */
let mGLVertexBuffer = null

function get () { return mGLVertexBuffer }

const mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0,
]

function init () {
  let gl = glSys.get()
  mGLVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW)
}

function cleanUp () {
  if (mGLVertexBuffer !== null) {
    glSys.get().deleteBuffer(mGLVertexBuffer)
    mGLVertexBuffer = null
  }
}

export { init, get, cleanUp }