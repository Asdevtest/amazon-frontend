import {makePersistable} from 'mobx-persist-store'

import {getModelNameWithotPostfix} from './text'

export const makePersistableModel = (modelInstance, {properties}) =>
  makePersistable(modelInstance, {
    name: getModelNameWithotPostfix(modelInstance.constructor.name),
    properties,
  })
