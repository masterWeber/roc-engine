'use strict'

import * as map from '../core/resource_map.js'

const unload = map.unload
const has = map.has
const get = map.get

const mParser = new DOMParser()

/**
 * @param {Response} data
 */
function decodeXML (data) {
  return data.text()
}

/**
 * @param {string} text
 */
function parseXML (text) {
  return mParser.parseFromString(text, 'text/xml')
}

/**
 * @param {string} path
 */
function load (path) {
  return map.loadDecodeParse(path, decodeXML, parseXML)
}

export { has, get, load, unload }