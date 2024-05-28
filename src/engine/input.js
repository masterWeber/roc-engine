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
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,

  LastKeyCode: 222
}

const eMouseButton = Object.freeze({
  eLeft: 0,
  eMiddle: 1,
  eRight: 2
})

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

/** @type {HTMLCanvasElement|null} */
let mCanvas = null

/** @type {boolean[]} */
let mButtonPreviousState = []

/** @type {boolean[]} */
let mIsButtonPressed = []

/** @type {boolean[]} */
let mIsButtonClicked = []

/** @type {number} */
let mMousePosX = -1

/** @type {number} */
let mMousePosY = -1

/**
 * @type {MouseEvent} event
 * @return {boolean}
 */
function onMouseMove (event) {
  let inside = false
  const bBox = mCanvas.getBoundingClientRect()

  const x = Math.round((event.clientX - bBox.left) * (mCanvas.width / bBox.width))
  const y = Math.round((event.clientY - bBox.top) * (mCanvas.height / bBox.height))

  if ((x >= 0) && (x < mCanvas.width)
    && (y >= 0) && (y < mCanvas.height)
  ) {
    mMousePosX = x
    mMousePosY = mCanvas.height - 1 - y
    inside = true
  }

  return inside
}

/**
 * @type {MouseEvent} event
 * @return {void}
 */
function onMouseDown (event) {
  if (onMouseMove(event)) {
    mIsButtonPressed[event.button] = true
  }
}

/**
 * @type {MouseEvent} event
 * @return {void}
 */
function onMouseUp (event) {
  onMouseMove(event)
  mIsButtonPressed[event.button] = false
}

/**
 * @type {string} canvasID
 * @return void
 */
function init (canvasID) {
  for (let i = 0; i < keys.LastKeyCode; i++) {
    mIsKeyPressed[i] = false
    mKeyPreviousState[i] = false
    mIsKeyClicked[i] = false
  }

  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('keydown', onKeyDown)

  for (let i = 0; i < 3; i++) {
    mButtonPreviousState[i] = false
    mIsButtonPressed[i] = false
    mIsButtonClicked[i] = false
  }

  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mousemove', onMouseMove)
  mCanvas = document.querySelector(`#${canvasID}`)
}

function update () {
  for (let i = 0; i < keys.LastKeyCode; i++) {
    mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i]
    mKeyPreviousState[i] = mIsKeyPressed[i]
  }

  for (let i = 0; i < 3; i++) {
    mIsButtonClicked[i] = (!mButtonPreviousState[i]) && mIsButtonPressed[i]
    mButtonPreviousState[i] = mIsButtonPressed[i]
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

function isButtonPressed (button) {
  return mIsButtonPressed[button]
}

function isButtonClicked (button) {
  return mIsButtonClicked[button]
}

function getMousePosX () {
  return mMousePosX
}

function getMousePosY () {
  return mMousePosY
}

function cleanUp () {}

export {
  keys,
  eMouseButton,
  init,
  update,
  isKeyClicked,
  isKeyPressed,
  isButtonClicked,
  isButtonPressed,
  getMousePosX,
  getMousePosY,
  cleanUp
}