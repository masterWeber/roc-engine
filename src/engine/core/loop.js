'use strict'

import * as input from '../input.js'
import * as map from './resource_map.js'

const kUPS = 60
const kMPF = 1000 / kUPS

let mPrevTime
let mLagTime

let mLoopRunning = false
let mCurrentScene = null
let mFrameID = -1

function loopOnce () {
  if (mLoopRunning) {
    mFrameID = requestAnimationFrame(loopOnce)

    mCurrentScene.draw()

    let currentTime = performance.now()
    let elapsedTime = currentTime - mPrevTime

    mPrevTime = currentTime
    mLagTime += elapsedTime

    while ((mLagTime >= kMPF) && mLoopRunning) {
      input.update()
      mCurrentScene.update()
      mLagTime -= kMPF
    }
  }
}

/**
 * @param {Scene} scene
 */
async function start (scene) {
  if (mLoopRunning) {
    throw new Error('loop already running')
  }
  mCurrentScene = scene
  mCurrentScene.load()

  await map.waitOnPromises()

  mCurrentScene.init()

  mPrevTime = performance.now()
  mLagTime = 0.0
  mLoopRunning = true
  mFrameID = requestAnimationFrame(loopOnce)
}

function stop () {
  mLoopRunning = false
  cancelAnimationFrame(mFrameID)
}

function cleanUp () {
  if (mLoopRunning) {
    stop()
    mCurrentScene.unload()
    mCurrentScene = null
  }
}

export { start, stop, cleanUp }