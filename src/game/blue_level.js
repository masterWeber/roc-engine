/*
 * This is the logic of our game. 
 */

// Engine Core stuff
import engine from '../engine/index.js'

// Local stuff
import Game from './game.js'
import SceneFileParser from './util/scene_file_parser.js'

class BlueLevel extends engine.Scene {
  mSceneFile = 'assets/blue_level.xml'
  mBackgroundAudio = 'assets/sounds/bg_clip.mp3'
  mCue = 'assets/sounds/blue_level_cue.wav'
  kPortal = 'assets/minion_portal.jpg'
  kCollector = 'assets/minion_collector.jpg'
  mSQSet = []
  mCamera = null

  init () {
    let sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile))

    this.mCamera = sceneParser.parseCamera()

    sceneParser.parseSquares(this.mSQSet)
    sceneParser.parseTextureSquares(this.mSQSet)
    engine.audio.playBackground(this.mBackgroundAudio, 0.5)
  }

  draw () {
    this.mCamera.setViewAndCameraMatrix()
    for (let i = 0; i < this.mSQSet.length; i++) {
      this.mSQSet[i].draw(this.mCamera)
    }
  }

  update () {
    let xform = this.mSQSet[1].getXform()
    let deltaX = 0.05

    if (engine.input.isKeyPressed(engine.input.keys.Right)) {
      engine.audio.playCue(this.mCue, 0.5)
      xform.incXPosBy(deltaX)
      if (xform.getXPos() > 30) { // this is the right-bound of the window
        xform.setPosition(12, 60)
      }
    }

    if (engine.input.isKeyPressed(engine.input.keys.Left)) {
      engine.audio.playCue(this.mCue, 1.0)
      xform.incXPosBy(-deltaX)
      if (xform.getXPos() < 11) {
        this.next()
      }
    }

    if (engine.input.isKeyPressed(engine.input.keys.Q))
      this.stop()  // Quit the game

    let c = this.mSQSet[1].getColor()
    let ca = c[3] + deltaX
    if (ca > 1) {
      ca = 0
    }
    c[3] = ca
  }

  next () {
    super.next()
    let nextLevel = new Game()
    nextLevel.start()
  }

  load () {
    engine.xml.load(this.mSceneFile)
    engine.texture.load(this.kPortal)
    engine.texture.load(this.kCollector)

    engine.audio.load(this.mBackgroundAudio)
    engine.audio.load(this.mCue)
  }

  unload () {
    engine.audio.stopBackground()
    engine.xml.unload(this.mSceneFile)
    engine.audio.unload(this.mBackgroundAudio)
    engine.audio.unload(this.mCue)
    engine.texture.unload(this.kPortal)
    engine.texture.unload(this.kCollector)
  }
}

export default BlueLevel