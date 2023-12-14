import { darkTheme, lightTheme } from '@constants/theme/mui-theme'
import { UiTheme } from '@constants/theme/mui-theme.type'

import { SettingsModel } from '@models/settings-model'

import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export enum difficultyLevel {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

export const difficultyLevelByCode: Record<number, difficultyLevel> = {
  10: difficultyLevel.EASY,
  20: difficultyLevel.NORMAL,
  30: difficultyLevel.HARD,
}

export const difficultyLevelByKey: Record<string, number> = objectFlip(difficultyLevelByCode, parseInt)

export const difficultyLevelTranslate = (level: difficultyLevel) => {
  switch (level) {
    case difficultyLevel.EASY:
      return t(TranslationKey.Easy)
    case difficultyLevel.NORMAL:
      return t(TranslationKey.Normal)
    case difficultyLevel.HARD:
      return t(TranslationKey.Hard)
  }
}

export const colorByDifficultyLevel = (level: difficultyLevel) => {
  if ([difficultyLevel.EASY].includes(level)) {
    return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.primary.main : lightTheme.palette.primary.main
  } else if ([difficultyLevel.NORMAL].includes(level)) {
    return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.other.succes : lightTheme.palette.other.succes
  } else if ([difficultyLevel.HARD].includes(level)) {
    return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.other.rejected : lightTheme.palette.other.rejected
  }
}
