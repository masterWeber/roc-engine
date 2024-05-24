'use strict'

import SimpleShader from '../shaders/simple_shader.js'
import TextureShader from '../shaders/texture_shader.js'
import SpriteShader from '../shaders/sprite_shader.js'
import * as text from '../resources/text.js'
import * as map from './resource_map.js'

let kSimpleVS = '/src/glsl_shaders/simple_vs.glsl'
let kSimpleFS = '/src/glsl_shaders/simple_fs.glsl'
let mConstColorShader = null

let kTextureVS = '/src/glsl_shaders/texture_vs.glsl'
let kTextureFS = '/src/glsl_shaders/texture_fs.glsl'
let mTextureShader = null

function getTextureShader () {
  return mTextureShader
}

let mSpriteShader = null

function getSpriteShader () {
  return mSpriteShader
}

function createShaders () {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS)
  mTextureShader = new TextureShader(kTextureVS, kTextureFS)
  mSpriteShader = new SpriteShader(kTextureVS, kTextureFS)
}

function init () {
  let loadPromise = new Promise(
    async function (resolve) {
      await Promise.all([
        text.load(kSimpleFS),
        text.load(kSimpleVS),
        text.load(kTextureFS),
        text.load(kTextureVS)
      ])
      resolve()
    }).then(
    function resolve () {
      createShaders()
    }
  )
  map.pushPromise(loadPromise)
}

function getConstColorShader () {
  return mConstColorShader
}

function cleanUp () {
  mConstColorShader.cleanUp()
  mTextureShader.cleanUp()
  mSpriteShader.cleanUp()
  text.unload(kSimpleVS)
  text.unload(kSimpleFS)
  text.unload(kTextureVS)
  text.unload(kTextureFS)
}

export { init, getConstColorShader, cleanUp, getTextureShader, getSpriteShader }