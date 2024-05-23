'use strict'

import * as loop from './core/loop.js'
import engine from './index.js'

class Scene {
  constructor () {
    if (this.constructor === Scene) {
      throw new Error('Abstract Class')
    }
  }

  async start () {
    await loop.start(this)
  }

  next () {
    loop.stop()
    this.unload()
  }

  stop () {
    loop.stop()
    this.unload()
    engine.cleanUp()
  }

  init () {
  }

  load () {
  }

  unload () {
  }

  draw () {
    throw new Error('Not implemented')
  }

  update () {
    throw new Error('Not implemented')
  }

}

export default Scene