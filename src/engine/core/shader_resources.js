'use strict'

import SimpleShader from '../simple_shader.js'
import * as text from '../resources/text.js'
import * as map from './resource_map.js'

let kSimpleVS = '/src/glsl_shaders/simple_vs.glsl'
let kSimpleFS = '/src/glsl_shaders/simple_fs.glsl'
let mConstColorShader = null

function createShaders () {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS)
}

function init () {
  let loadPromise = new Promise(
    async function (resolve) {
      await Promise.all([
        text.load(kSimpleFS),
        text.load(kSimpleVS)
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
  text.unload(kSimpleVS)
  text.unload(kSimpleFS)
}

export { init, getConstColorShader, cleanUp }