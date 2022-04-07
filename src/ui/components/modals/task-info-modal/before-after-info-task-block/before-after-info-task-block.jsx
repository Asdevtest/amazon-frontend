import React from 'react'

import {Divider, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BeforeAfterBox} from './before-after-box'
import {useClassNames} from './before-after-info-task-block.style'

const textConsts = getLocalizedTexts(texts, 'ru').beforeAfterInfoTaskBlock

export const BeforeAfterInfoTaskBlock = observer(({beforeBoxes, afterBoxes, taskType, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.boxesWrapper}>
      <div className={classNames.currentBox}>
        <Typography variant="h4">{textConsts.incom}</Typography>

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

      <Divider flexItem className={classNames.divider} orientation="vertical" />

      {afterBoxes.length > 0 && (
        <div className={classNames.newBoxes}>
          <Typography variant="h4">{textConsts.newBoxes}</Typography>

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
