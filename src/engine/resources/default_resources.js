'use strict'

import * as font from './font.js'
import * as map from '../core/resource_map.js'

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
  getDefaultFontName
}