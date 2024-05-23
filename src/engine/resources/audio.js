'use strict'

import * as map from '../core/resource_map.js'

const unload = map.unload
const has = map.has
const get = map.get

/** @type {AudioContext} */
let mAudioContext = null
let mBackgroundAudio = null
let mBackgroundGain = null
let mCueGain = null
let mMasterGain = null
let kDefaultInitGain = 0.1

/**
 * @param {Response} data
 */
function decodeResource (data) {
  return data.arrayBuffer()
}

/**
 * @param {ArrayBuffer} data
 */
function parseResource (data) {
  return mAudioContext.decodeAudioData(data)
}

/**
 * @param {string} path
 */
function load (path) {
  return map.loadDecodeParse(path, decodeResource, parseResource)
}

function init () {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    mAudioContext = new AudioContext()

    mMasterGain = mAudioContext.createGain()
    mMasterGain.connect(mAudioContext.destination)

    mMasterGain.gain.value = kDefaultInitGain

    mBackgroundGain = mAudioContext.createGain()
    mBackgroundGain.connect(mMasterGain)

    mBackgroundGain.gain.value = 1.0

    mCueGain = mAudioContext.createGain()
    mCueGain.connect(mMasterGain)

    mCueGain.gain.value = 1.0
  } catch (e) {
    throw new Error('...')
  }
}

function playCue (path, volume) {
  const source = mAudioContext.createBufferSource()
  source.buffer = map.get(path)
  source.start(0)

  source.connect(mCueGain)
  mCueGain.gain.value = volume
}

function playBackground (path, volume) {
  if (has(path)) {
    stopBackground()
    mBackgroundAudio = mAudioContext.createBufferSource()
    mBackgroundAudio.buffer = map.get(path)
    mBackgroundAudio.loop = true
    mBackgroundAudio.start(0)

    mBackgroundAudio.connect(mBackgroundGain)
    setBackgroundVolume(volume)
  }
}

function stopBackground () {
  if (mBackgroundAudio !== null) {
    mBackgroundAudio.stop(0)
    mBackgroundAudio = null
  }
}

function isBackgroundPlaying () {
  return (mBackgroundAudio !== null)
}

function setBackgroundVolume (volume) {
  if (mBackgroundGain !== null) {
    mBackgroundGain.gain.value = volume
  }
}

function incBackgroundVolume (increment) {
  if (mBackgroundGain !== null) {
    mBackgroundGain.gain.value += increment

    if (mBackgroundGain.gain.value < 0) {
      setBackgroundVolume(0)
    }
  }
}

function setMasterVolume (volume) {
  if (mMasterGain !== null) {
    mMasterGain.gain.value = volume
  }
}

function incMasterVolume (increment) {
  if (mMasterGain !== null) {
    mMasterGain.gain.value += increment

    if (mMasterGain.gain.value < 0) {
      mMasterGain.gain.value = 0
    }
  }
}

function cleanUp () {
  mAudioContext.close()
  mAudioContext = null
}

export {
  init,
  cleanUp,
  has,
  load,
  unload,
  playCue,
  playBackground,
  stopBackground,
  isBackgroundPlaying,
  setBackgroundVolume,
  incBackgroundVolume,
  setMasterVolume,
  incMasterVolume
}