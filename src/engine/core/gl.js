'use strict'

/** @type {HTMLCanvasElement | null} */
let mCanvas = null

/** @type {WebGL2RenderingContext | null} */
let mGL = null

function get () {
  return mGL
}

/** @param {string} htmlCanvasID */
function init (htmlCanvasID) {
  mCanvas = document.querySelector(`#${htmlCanvasID}`)

  mGL = mCanvas.getContext('webgl2', { alpha: false })

  if (mGL === null) {
    document.write('<br><b>WebGL 2 is not supported!</b>')
  }

  mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA)
  mGL.enable(mGL.BLEND)
  mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true)
}

function cleanUp () {
  if ((mGL == null) || (mCanvas == null))
    throw new Error('Engine cleanup: system is not initialized.')
  mGL = null

  mCanvas.style.position = 'fixed'
  mCanvas.style.backgroundColor = 'rgba(200, 200, 200, 0.5)'
  mCanvas = null
  document.body.innerHTML +=
    '<br><br><h1>End of Game</h1><h1>GL System Shut Down</h1>'
}

export { init, get, cleanUp }