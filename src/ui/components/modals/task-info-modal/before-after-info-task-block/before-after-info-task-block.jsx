import { observer } from 'mobx-react'
import React from 'react'

import { Divider, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { BeforeAfterBox } from './before-after-box'
import { useClassNames } from './before-after-info-task-block.style'

export const BeforeAfterInfoTaskBlock = observer(({ beforeBoxes, afterBoxes, taskType, volumeWeightCoefficient }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.boxesWrapper}>
      <div className={classNames.currentBox}>
        <Typography variant="h4">{t(TranslationKey.Incoming)}</Typography>

        {beforeBoxes.map((box, boxIndex) => (
          <BeforeAfterBox
            key={boxIndex}
            isCurrentBox
            box={box}
            taskType={taskType}
            volumeWeightCoefficient={volumeWeightCoefficient}
          />
        ))}
      </div>

      <Divider flexItem orientation="vertical" />

      {afterBoxes.length > 0 && (
        <div>
          <Typography variant="h4">{t(TranslationKey['New boxes'])}</Typography>

          {afterBoxes.map((box, boxIndex) => (
            <BeforeAfterBox
              key={boxIndex}
              box={box}
              taskType={taskType}
              newBoxes={afterBoxes}
              volumeWeightCoefficient={volumeWeightCoefficient}
            />
          ))}
        </div>
      )}
    </div>
  )
})
