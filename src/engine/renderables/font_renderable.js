'use strict'

import Transform from '../utils/transform.js'
import SpriteRenderable from './sprite_renderable.js'
import * as defaultResources from '../resources/default_resources.js'
import * as font from '../resources/font.js'

class FontRenderable {
  mFontName
  mOneChar
  mXform
  mText

  constructor (aString) {
    this.mFontName = defaultResources.getDefaultFontName()
    this.mOneChar = new SpriteRenderable(font.imageName(this.mFontName))
    this.mXform = new Transform()
    this.mText = aString
  }

  draw (camera) {
    const widthOfOneChar = this.mXform.getWidth() / this.mText.length
    const heightOfOneChar = this.mXform.getHeight()
    const yPos = this.mXform.getYPos()

    let xPos = this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5)

    for (let charIndex = 0; charIndex < this.mText.length; charIndex++) {
      const aChar = this.mText.charCodeAt(charIndex)
      const charInfo = font.getCharInfo(this.mFontName, aChar)

      this.mOneChar.setElementUVCoordinate(
        charInfo.mTexCoordLeft,
        charInfo.mTexCoordRight,
        charInfo.mTexCoordBottom,
        charInfo.mTexCoordTop
      )

      const xSize = widthOfOneChar * charInfo.mCharWidth
      const ySize = heightOfOneChar * charInfo.mCharHeight
      this.mOneChar.getXform().setSize(xSize, ySize)

      const xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5
      const yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5

      this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset)

      this.mOneChar.draw(camera)

      xPos += widthOfOneChar
    }
  }

  getXform () {
    return this.mXform
  }

  getText () {
    return this.mText
  }

  setText (t) {
    this.mText = t
    this.setTextHeight(this.getXform().getHeight())
  }

  setTextHeight (h) {
    const charInfo = font.getCharInfo(this.mFontName, 'A'.charCodeAt(0))
    const w = h * charInfo.mCharAspectRatio
    this.getXform().setSize(w * this.mText.length, h)
  }

  getFontName () {
    return this.mFontName
  }

  setFontName (f) {
    this.mFontName = f
    this.mOneChar.setTexture(font.imageName(this.mFontName))
  }

  setColor (c) {
    this.mOneChar.setColor(c)
  }

  getColor () {
    return this.mOneChar.getColor()
  }

  update () {}
}

export default FontRenderable