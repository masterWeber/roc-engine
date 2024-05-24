'use strict'

class GameObjectSet {
  /** @type {GameObject[]} */
  mSet = []

  size () {
    return this.mSet.length
  }

  getObjectAt (index) {
    return this.mSet[index]
  }

  /**
   * @param {GameObject} obj
   */
  addToSet (obj) {
    this.mSet.push(obj)
  }

  /**
   * @param {GameObject} obj
   */
  removeFromSet (obj) {
    const index = this.mSet.indexOf(obj)
    if (index > -1) {
      this.mSet.splice(index, 1)
    }
  }

  update () {
    for (let i = 0; i < this.mSet.length; i++) {
      this.mSet[i].update()
    }
  }

  /**
   * @param {Camera} aCamera
   */
  draw (aCamera) {
    for (let i = 0; i < this.mSet.length; i++) {
      this.mSet[i].draw(aCamera)
    }
  }
}

export default GameObjectSet