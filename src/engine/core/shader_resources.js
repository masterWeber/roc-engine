'use strict'

import SimpleShader from '../shaders/simple_shader.js'
import TextureShader from '../shaders/texture_shader.js'
import SpriteShader from '../shaders/sprite_shader.js'
import LineShader from '../shaders/line_shader.js'
import * as text from '../resources/text.js'
import * as map from './resource_map.js'
import LightShader from '../shaders/light_shader.js'
import IllumShader from '../shaders/illum_shader.js'

const kSimpleVS = '/src/glsl_shaders/simple_vs.glsl'
const kSimpleFS = '/src/glsl_shaders/simple_fs.glsl'
let mConstColorShader = null

function getConstColorShader () {
  return mConstColorShader
}

const kTextureVS = '/src/glsl_shaders/texture_vs.glsl'
const kTextureFS = '/src/glsl_shaders/texture_fs.glsl'
let mTextureShader = null

function getTextureShader () {
  return mTextureShader
}

const kLineFS = 'src/glsl_shaders/line_fs.glsl'
let mLineShader = null

function getLineShader () {
  return mLineShader
}

const kLightFS = 'src/glsl_shaders/light_fs.glsl'
let mLightShader = null

function getLightShader () {
  return mLightShader
}

const kIllumFS = 'src/glsl_shaders/illum_fs.glsl'
let mIllumShader = null

function getIllumShader () {
  return mIllumShader
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
  mIllumShader = new IllumShader(kTextureVS, kIllumFS)
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
        text.load(kLightFS),
        text.load(kIllumFS)
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
  mIllumShader.cleanUp()

  text.unload(kSimpleVS)
  text.unload(kSimpleFS)
  text.unload(kTextureVS)
  text.unload(kTextureFS)
  text.unload(kLineFS)
  text.unload(kLightFS)
  text.unload(kIllumFS)
}

export {
  init,
  getConstColorShader,
  cleanUp,
  getTextureShader,
  getSpriteShader,
  getLineShader,
  getLightShader,
  getIllumShader
}