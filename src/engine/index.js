'use strict'

import Renderable from './renderables/renderable.js'
import TextureRenderable from './renderables/texture_renderable.js'
import SpriteRenderable, { eTexCoordArrayIndex } from './renderables/sprite_renderable.js'
import SpriteAnimateRenderable, { eAnimationType } from './renderables/sprite_animate_renderable.js'
import FontRenderable from './renderables/font_renderable.js'
import LineRenderable from './renderables/line_renderable.js'
import LightRenderable from './renderables/light_renderable.js'
import IllumRenderable from './renderables/illum_renderable.js'
import Transform from './utils/transform.js'
import Lerp from './utils/lerp.js'
import LerpVec2 from './utils/lerp_vec2.js'
import BoundingBox, { eBoundCollideStatus } from './utils/bounding_box.js'
import Oscillate from './utils/oscillate.js'
import Shake from './utils/shake.js'
import ShakeVec2 from './utils/shake_vec2.js'
import Camera from './cameras/camera.js'
import Scene from './scene.js'
import Light, { eLightType } from './lights/light.js'
import LightSet from './lights/light_set.js'
import GameObject from './game_objects/game_object.js'
import GameObjectSet from './game_objects/game_object_set.js'
import * as loop from './core/loop.js'
import * as input from './input.js'
import * as text from './resources/text.js'
import * as xml from './resources/xml.js'
import * as audio from './resources/audio.js'
import * as texture from './resources/texture.js'
import * as font from './resources/font.js'
import * as defaultResources from './resources/default_resources.js'

import * as glSys from './core/gl.js'
import * as vertexBuffer from './core/vertex_buffer.js'
import * as shaderResources from './core/shader_resources.js'

function init (htmlCanvasID) {
  glSys.init(htmlCanvasID)
  vertexBuffer.init()
  input.init(htmlCanvasID)
  audio.init()
  shaderResources.init()
  defaultResources.init()
}

function clearCanvas (color) {
  let gl = glSys.get()
  gl.clearColor(color[0], color[1], color[2], color[3])
  gl.clear(gl.COLOR_BUFFER_BIT)
}

function cleanUp () {
  loop.cleanUp()
  shaderResources.cleanUp()
  defaultResources.cleanUp()
  audio.cleanUp()
  input.cleanUp()
  vertexBuffer.cleanUp()
  glSys.cleanUp()
}

vec2.rotate = function (out, a, c) {
  const r = []
  // perform rotation
  r[0] = a[0] * Math.cos(c) - a[1] * Math.sin(c)
  r[1] = a[0] * Math.sin(c) + a[1] * Math.cos(c)
  out[0] = r[0]
  out[1] = r[1]

  return r
}

export default {
  audio,
  text,
  xml,
  texture,
  font,
  defaultResources,
  input,
  Lerp,
  LerpVec2,
  Oscillate,
  Shake,
  ShakeVec2,
  Camera,
  Scene,
  Transform,
  BoundingBox,
  Renderable,
  TextureRenderable,
  SpriteRenderable,
  SpriteAnimateRenderable,
  FontRenderable,
  LineRenderable,
  LightRenderable,
  IllumRenderable,
  GameObject,
  GameObjectSet,
  Light,
  eLightType,
  LightSet,
  eTexCoordArrayIndex,
  eAnimationType,
  eBoundCollideStatus,
  init,
  cleanUp,
  clearCanvas
}