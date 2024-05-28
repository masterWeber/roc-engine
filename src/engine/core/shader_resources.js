'use strict'

import SimpleShader from '../shaders/simple_shader.js'
import TextureShader from '../shaders/texture_shader.js'
import SpriteShader from '../shaders/sprite_shader.js'
import LineShader from '../shaders/line_shader.js'
import * as text from '../resources/text.js'
import * as map from './resource_map.js'
import LightShader from '../shaders/light_shader.js'

let kSimpleVS = '/src/glsl_shaders/simple_vs.glsl'
let kSimpleFS = '/src/glsl_shaders/simple_fs.glsl'
let mConstColorShader = null

function getConstColorShader () {
  return mConstColorShader
}

let kTextureVS = '/src/glsl_shaders/texture_vs.glsl'
let kTextureFS = '/src/glsl_shaders/texture_fs.glsl'
let mTextureShader = null

function getTextureShader () {
  return mTextureShader
}

let kLineFS = 'src/glsl_shaders/line_fs.glsl'
let mLineShader = null

function getLineShader () {
  return mLineShader
}

let kLightFS = 'src/glsl_shaders/light_fs.glsl'
let mLightShader = null

function getLightShader () {
  return mLightShader
}

let mSpriteShader = null

function getSpriteShader () {
  return mSpriteShader
}

function createShaders () {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS)
  mTextureShader = new TextureShader(kTextureVS, kTextureFS)
  mSpriteShader = new SpriteShader(kTextureVS, kTextureFS)
  mLineShader = new LineShader(kSimpleVS, kLineFS)
  mLightShader = new LightShader(kTextureVS, kLightFS)
}

function init () {
  let loadPromise = new Promise(
    async function (resolve) {
      await Promise.all([
        text.load(kSimpleFS),
        text.load(kSimpleVS),
        text.load(kTextureFS),
        text.load(kTextureVS),
        text.load(kLineFS),
        text.load(kLightFS)
      ])
      resolve()
    }).then(
    function resolve () {
      createShaders()
    }
  )
  map.pushPromise(loadPromise)
}

function cleanUp () {
  mConstColorShader.cleanUp()
  mTextureShader.cleanUp()
  mSpriteShader.cleanUp()
  mLineShader.cleanUp()
  mLightShader.cleanUp()
  text.unload(kSimpleVS)
  text.unload(kSimpleFS)
  text.unload(kTextureVS)
  text.unload(kTextureFS)
  text.unload(kLineFS)
  text.unload(kLightFS)
}

export {
  init,
  getConstColorShader,
  cleanUp,
  getTextureShader,
  getSpriteShader,
  getLineShader,
  getLightShader
}