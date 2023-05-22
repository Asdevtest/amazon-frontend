import { getModelNameWithotPostfix } from '@utils/text'

import { LoggerService } from '../logger-service/index'

export const getLoggerServiceForClass = modelInstance =>
  new LoggerService({
    sourceName: getModelNameWithotPostfix(modelInstance.constructor.name),
    hideParamsLogs: true,
  })
