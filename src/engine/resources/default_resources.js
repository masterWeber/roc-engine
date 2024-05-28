'use strict'

import * as font from './font.js'
import * as map from '../core/resource_map.js'

let mGlobalAmbientColor = [0.3, 0.3, 0.3, 1]

/** @type {number} */
let mGlobalAmbientIntensity = 1

function getGlobalAmbientIntensity () {
  return mGlobalAmbientIntensity
}

/**
 * @param {number} v
 */
function setGlobalAmbientIntensity (v) {
  mGlobalAmbientIntensity = v
}

function getGlobalAmbientColor () {
  return mGlobalAmbientColor
}

/**
 * @param {number[] | vec4} v
 * */
function setGlobalAmbientColor (v) {
  mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3])
}

let kDefaultFont = 'assets/fonts/system_default_font'

function cleanUp () {
  font.unload(kDefaultFont)
}

function init () {
  let loadPromise = new Promise(
    async function (resolve) {
      await Promise.all([
        font.load(kDefaultFont)
      ])
      resolve()
    }).then(
    function resolve () { }
  )
  map.pushPromise(loadPromise)
}

function getDefaultFontName () {
  return kDefaultFont
}

export {
  init,
  cleanUp,
  getDefaultFontName,
  getGlobalAmbientColor,
  setGlobalAmbientColor,
  getGlobalAmbientIntensity,
  setGlobalAmbientIntensity
}