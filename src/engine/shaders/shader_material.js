'use strict'

import * as glSys from '../core/gl.js'

class ShaderMaterial {
  /** @type {WebGLUniformLocation | null} */
  mKaRef
  /** @type {WebGLUniformLocation | null} */
  mKdRef
  /** @type {WebGLUniformLocation | null} */
  mKsRef
  /** @type {WebGLUniformLocation | null} */
  mShineRef

  constructor (aIllumShader) {
    const gl = glSys.get()
    this.mKaRef = gl.getUniformLocation(aIllumShader, 'uMaterial.Ka')
    this.mKdRef = gl.getUniformLocation(aIllumShader, 'uMaterial.Kd')
    this.mKsRef = gl.getUniformLocation(aIllumShader, 'uMaterial.Ks')
    this.mShineRef = gl.getUniformLocation(aIllumShader, 'uMaterial.Shininess')
  }

  /**
   * @param {Material} aMaterial
   */
  loadToShader (aMaterial) {
    let gl = glSys.get()

    gl.uniform4fv(this.mKaRef, aMaterial.getAmbient())
    gl.uniform4fv(this.mKdRef, aMaterial.getDiffuse())
    gl.uniform4fv(this.mKsRef, aMaterial.getSpecular())
    gl.uniform1f(this.mShineRef, aMaterial.getShininess())
  }
}

export default ShaderMaterial