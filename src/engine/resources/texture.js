'use strict'

import * as glSys from '../core/gl.js'
import * as map from '../core/resource_map.js'

const has = map.has
const get = map.get

class TextureInfo {
  mWidth
  mHeight
  mGLTexID
  mColorArray = null

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

function getColorArray (textureName) {
  const gl = glSys.get()

  const texInfo = get(textureName)
  if (texInfo.mColorArray === null) {
    // create a framebuffer bind it to the texture, and read the color content
    // Hint from: http://stackoverflow.com/questions/13626606/read-pixels-from-a-webgl-texture
    const framebuffer = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texInfo.mGLTexID, 0)
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
      let pixels = new Uint8Array(texInfo.mWidth * texInfo.mHeight * 4)
      gl.readPixels(0, 0, texInfo.mWidth, texInfo.mHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
      texInfo.mColorArray = pixels
    } else {
      throw new Error('WARNING: Engine.Textures.getColorArray() failed!')
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.deleteFramebuffer(framebuffer)
  }

  return texInfo.mColorArray
}

export {
  has,
  get,
  load,
  unload,
  getColorArray,
  TextureInfo,
  activate,
  deactivate
}