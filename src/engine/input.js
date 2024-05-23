'use strict'

const keys = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,

  Space: 32,

  Zero: 48,
  One: 49,
  Two: 50,
  Three: 51,
  Four: 52,
  Five: 53,
  Six: 54,
  Seven: 55,
  Eight: 56,
  Nine: 57,

  A: 65,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  Q: 81,
  R: 82,
  S: 83,
  W: 87,

  LastKeyCode: 222
}

/** @type {boolean[]} */
const mKeyPreviousState = []

/** @type {boolean[]} */
const mIsKeyPressed = []

/** @type {boolean[]} */
const mIsKeyClicked = []

/**
 * @type {KeyboardEvent} event
 */
function onKeyDown (event) {
  mIsKeyPressed[event.keyCode] = true
}

/**
 * @type {KeyboardEvent} event
 */
function onKeyUp (event) {
  mIsKeyPressed[event.keyCode] = false
}

function init () {
  for (let i = 0; i < keys.LastKeyCode; i++) {
    mIsKeyPressed[i] = false
    mKeyPreviousState[i] = false
    mIsKeyClicked[i] = false
  }

  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('keydown', onKeyDown)
}

function update () {
  for (let i = 0; i < keys.LastKeyCode; i++) {
    mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i]
    mKeyPreviousState[i] = mIsKeyPressed[i]
  }
}

/**
 * @param {number} keyCode
 */
function isKeyPressed (keyCode) {
  return mIsKeyPressed[keyCode]
}

/**
 * @param {number} keyCode
 */
function isKeyClicked (keyCode) {
  return mIsKeyClicked[keyCode]
}

function cleanUp () {}

export {
  keys,
  init,
  update,
  isKeyClicked,
  isKeyPressed,
  cleanUp
}