'use strict'

import * as texture from './texture.js'
import * as xml from './xml.js'

let kImageExt = '.png'
let kDescExt = '.fnt'

class CharacterInfo {
  mTexCoordLeft = 0
  mTexCoordRight = 1
  mTexCoordBottom = 0
  mTexCoordTop = 0

  mCharWidth = 1
  mCharHeight = 1
  mCharWidthOffset = 0
  mCharHeightOffset = 0

  mCharAspectRatio = 1
}

function imageName (fontName) {
  return fontName + kImageExt
}

function descName (fontName) {
  return fontName + kDescExt
}

function load (fontName) {
  texture.load(imageName(fontName))
  xml.load(descName(fontName))
}

function unload (fontName) {
  texture.unload(imageName(fontName))
  xml.unload(descName(fontName))
}

function has (fontName) {
  return texture.has(imageName(fontName)) && xml.has(descName(fontName))
}

function getCharInfo (fontName, aChar) {
  let returnInfo = null
  let fontInfo = xml.get(descName(fontName))
  let commonPath = 'font/common'
  let commonInfo = fontInfo.evaluate(commonPath, fontInfo, null, XPathResult.ANY_TYPE, null)
  commonInfo = commonInfo.iterateNext()
  if (commonInfo === null) {
    return returnInfo
  }
  let charHeight = commonInfo.getAttribute('base')

  let charPath = 'font/chars/char[@id=' + aChar + ']'
  let charInfo = fontInfo.evaluate(charPath, fontInfo, null, XPathResult.ANY_TYPE, null)
  charInfo = charInfo.iterateNext()

  if (charInfo === null) {
    return returnInfo
  }

  returnInfo = new CharacterInfo()
  let texInfo = texture.get(imageName(fontName))
  let leftPixel = Number(charInfo.getAttribute('x'))
  let rightPixel = leftPixel + Number(charInfo.getAttribute('width')) - 1
  let topPixel = (texInfo.mHeight - 1) - Number(charInfo.getAttribute('y'))
  let bottomPixel = topPixel - Number(charInfo.getAttribute('height')) + 1

  returnInfo.mTexCoordLeft = leftPixel / (texInfo.mWidth - 1)
  returnInfo.mTexCoordTop = topPixel / (texInfo.mHeight - 1)
  returnInfo.mTexCoordRight = rightPixel / (texInfo.mWidth - 1)
  returnInfo.mTexCoordBottom = bottomPixel / (texInfo.mHeight - 1)

  let charWidth = charInfo.getAttribute('xadvance')
  returnInfo.mCharWidth = charInfo.getAttribute('width') / charWidth
  returnInfo.mCharHeight = charInfo.getAttribute('height') / charHeight
  returnInfo.mCharWidthOffset = charInfo.getAttribute('xoffset') / charWidth
  returnInfo.mCharHeightOffset = charInfo.getAttribute('yoffset') / charHeight
  returnInfo.mCharAspectRatio = charWidth / charHeight

  return returnInfo
}

export {
  has,
  load,
  unload,
  imageName,
  descName,
  CharacterInfo,
  getCharInfo
}