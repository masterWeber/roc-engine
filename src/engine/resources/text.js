'use strict'

import * as map from '../core/resource_map.js'

const unload = map.unload
const has = map.has
const get = map.get

/**
 * @param {Response} data
 */
function decodeText (data) {
  return data.text()
}

/**
 * @param {string} text
 */
function parseText (text) {
  return text
}

/**
 * @param {string} path
 */
function load (path) {
  return map.loadDecodeParse(path, decodeText, parseText)
}

export { has, get, load, unload }