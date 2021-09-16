import React from 'react'

import {Button, Typography} from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './info.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderInfo

export const Info = ({order}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Typography className={(classNames.containerTitle, classNames.title)}>{textConsts.mainTitle}</Typography>
      <div className={classNames.orderWrapperInfo}>
        <div className={classNames.orderSubWrapperInfo}>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.priceBatch}</Typography>
          <Typography className={classNames.orderPrice}>{'N/A'}</Typography>
        </div>
        <div className={classNames.typoFlexWrapper}>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.orderSum}</Typography>
          <Typography className={classNames.orderPrice}>
            {calcProductsPriceWithDelivery(order.product, order)}
          </Typography>
        </div>
      </div>

      <div className={classNames.orderWrapperInfo}>
        <div className={classNames.orderSubWrapperInfoDivider}>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.sendDate}</Typography>
          <Typography className={classNames.text}>{'N/A'}</Typography>
        </div>
        <div>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.sendNearDate}</Typography>
          <Typography className={classNames.text}>{'N/A'}</Typography>
        </div>
      </div>

      <div className={classNames.orderWrapperInfo}>
        <div className={classNames.orderSubWrapperInfoDivider}>
          <Button
            className={clsx(classNames.text, classNames.button)}
            variant="outlined"
            endIcon={<LaunchIcon fontSize="small" />}
          >
            {textConsts.docs}
          </Button>
        </div>
      </div>
    </div>
  )
}
