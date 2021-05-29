import {isUndefined} from '@utils/checks'
import {isDebug} from '@utils/env'
import {getModelNameWithotPostfix} from '@utils/text'

const loggerDefaultConfig = {
  sourceName: 'General',
  showInProduction: false,
  onlyErrorLogs: false,
}

class Logger {
  sourceName = loggerDefaultConfig.sourceName
  showInProduction = loggerDefaultConfig.showInProduction
  onlyErrorLogs = loggerDefaultConfig.onlyErrorLogs

  constructor(config) {
    if (config) {
      this.initialize(config)
    }
  }

  initialize = config => {
    if (!isUndefined(config.sourceName)) {
      this.sourceName = config.sourceName
    }
    if (!isUndefined(config.showInProduction)) {
      this.showInProduction = config.showInProduction
    }
    if (!isUndefined(config.onlyErrorLogs)) {
      this.onlyErrorLogs = config.onlyErrorLogs
    }
    return this
  }

  logResponse = (sourceFunc, error) => {
    if ((isDebug() || this.showInProduction) && !this.onlyErrorLogs) {
      console.log(`${this.sourceName}, ${sourceFunc}:`, error)
    }
  }

  logCoughtError = (sourceFunc, error) => {
    if (isDebug() || this.showInProduction) {
      console.log(`${this.sourceName}, ${sourceFunc}:`, error)
    }
  }
}

export const loggerService = new Logger()

export const getLoggerServiceModel = modelInstance =>
  loggerService.initialize({
    sourceName: getModelNameWithotPostfix(modelInstance.constructor.name),
    showInProduction: true,
  })
