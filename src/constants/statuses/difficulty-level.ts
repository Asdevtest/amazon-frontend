import { darkTheme, lightTheme } from '@constants/theme/mui-theme'

import { SettingsModel } from '@models/settings-model'

import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import { TranslationKey } from '../translations/translation-key'

export enum difficultyLevel {
  LIGHT = 'LIGHT',
  STANDART = 'STANDART',
  IMPORTANT = 'IMPORTANT',
}

export const difficultyLevelByCode: Record<number, difficultyLevel> = {
  10: difficultyLevel.LIGHT,
  20: difficultyLevel.STANDART,
  30: difficultyLevel.IMPORTANT,
}

export const difficultyLevelByKey: Record<string, number> = objectFlip(difficultyLevelByCode, parseInt)

export const difficultyLevelTranslate = (level: difficultyLevel) => {
  switch (level) {
    case difficultyLevel.LIGHT:
      return t(TranslationKey.Light)
    case difficultyLevel.STANDART:
      return t(TranslationKey.Standart)
    case difficultyLevel.IMPORTANT:
      return t(TranslationKey.Important)
  }
}

export const colorByDifficultyLevel = (level: difficultyLevel) => {
  if ([difficultyLevel.LIGHT].includes(level)) {
    return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.primary.main : lightTheme.palette.primary.main
  } else if ([difficultyLevel.STANDART].includes(level)) {
    return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.other.succes : lightTheme.palette.other.succes
  } else if ([difficultyLevel.IMPORTANT].includes(level)) {
    return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.other.rejected : lightTheme.palette.other.rejected
  }
}
