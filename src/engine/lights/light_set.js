'use strict'

class LightSet {
  /** @type {Light[]} */
  mSet = []

  numLights () {
    return this.mSet.length
  }

  getLightAt (index) {
    return this.mSet[index]
  }

  /**
   * @param {Light} light
   */
  addToSet (light) {
    this.mSet.push(light)
  }
}

export default LightSet