'use strict'

import * as glSys from '../core/gl.js'
import * as map from '../core/resource_map.js'

let has = map.has
let get = map.get

class TextureInfo {
  mWidth
  mHeight
  mGLTexID

  /**
   * @param {number} w
   * @param {number} h
   * @param {WebGLTexture} id
   */
  constructor (w, h, id) {
    this.mWidth = w
    this.mHeight = h
    this.mGLTexID = id
  }
}

function processLoadedImage (path, image) {
  let gl = glSys.get()

  let textureID = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, textureID)

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

  gl.generateMipmap(gl.TEXTURE_2D)

  gl.bindTexture(gl.TEXTURE_2D, null)

  let texInfo = new TextureInfo(image.naturalWidth, image.naturalHeight, textureID)
  map.set(path, texInfo)
}

function load (textureName) {
  let texturePromise = null
  if (map.has(textureName)) {
    map.incRef(textureName)
  } else {
    map.loadRequested(textureName)
    let image = new Image()
    texturePromise = new Promise(
      function (resolve) {
        image.onload = resolve
        image.src = textureName
      }).then(
      function resolve () {
        processLoadedImage(textureName, image)
      }
    )
    map.pushPromise(texturePromise)
  }
  return texturePromise
}

function unload (textureName) {
  let texInfo = get(textureName)
  if (map.unload(textureName)) {
    let gl = glSys.get()
    gl.deleteTexture(texInfo.mGLTexID)
  }
}

function activate (textureName) {
  let gl = glSys.get()
  let texInfo = get(textureName)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID)

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
}

function deactivate () {
  let gl = glSys.get()
  gl.bindTexture(gl.TEXTURE_2D, null)
}

export {
  has,
  get,
  load,
  unload,
  TextureInfo,
  activate,
  deactivate
}