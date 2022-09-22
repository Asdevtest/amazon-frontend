import React from 'react'

import {Typography} from '@material-ui/core'

import {humanFriendlyStategyStatus, mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './failed-asins-modal.style'

export const FailedAsinsModal = ({failedData, onClickSuccessBtn}) => {
  const classNames = useClassNames()
  console.log(failedData)
  return (
    <div className={classNames.modalMessageWrapper}>
      <Typography paragraph className={classNames.title}>
        {t(TranslationKey['The following ASINs have already been entered into the table'])}
      </Typography>
      {failedData.failed.map(el => (
        <div key={el.asin} className={classNames.asinsWrapper}>
          <Typography>{el.asin}</Typography>
          <Typography>{humanFriendlyStategyStatus(mapProductStrategyStatusEnum[el.strategy]).toUpperCase()}</Typography>
        </div>
      ))}
      <Button success disableElevation variant="contained" className={classNames.button} onClick={onClickSuccessBtn}>
        {t(TranslationKey.Ok)}
      </Button>
    </div>
  )
}
