/* eslint-disable no-console */
import { loggerDefaultConfig } from '@constants/configs/logger-default-config'

import { isNotUndefined } from '@utils/checks'
import { isDebug } from '@utils/env'

export class LoggerService {
  constructor(config = loggerDefaultConfig) {
    if (isNotUndefined(config.sourceName)) {
      this.sourceName = config.sourceName
    }
    if (isNotUndefined(config.showInProduction)) {
      this.showInProduction = config.showInProduction
    }
    if (isNotUndefined(config.onlyErrorLogs)) {
      this.onlyErrorLogs = config.onlyErrorLogs
    }
    if (isNotUndefined(config.hideParamsLogs)) {
      this.hideParamsLogs = config.hideParamsLogs
    }
  }

  logParams = (sourceFuncName, params) => {
    if ((isDebug() || this.showInProduction) && !this.onlyErrorLogs && !this.hideParamsLogs) {
      console.log(`${this.sourceName}, ${sourceFuncName} params:`, params)
    }
  }

  logResult = (sourceFuncName, result) => {
    if ((isDebug() || this.showInProduction) && !this.onlyErrorLogs) {
      console.log(`${this.sourceName}, ${sourceFuncName} result:`, result)
    }
  }

  logCoughtError = (sourceFuncName, error) => {
    if (isDebug() || this.showInProduction) {
      console.log(`${this.sourceName}, ${sourceFuncName} cought error:`, error)
    }
  }

  logError = (sourceFuncName, error) => {
    if (isDebug() || this.showInProduction) {
      console.log(`${this.sourceName}, ${sourceFuncName} error:`, error)
    }
  }
}
