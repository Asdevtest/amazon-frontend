/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography, Checkbox, Divider} from '@mui/material'

import React from 'react'

import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {styles} from './data-grid-menu-items.style'

export const IsFormedMenuItem = React.memo(
  withStyles(
    ({classes: classNames, isFormedData}) => (
      <div className={classNames.isFormedWrapper}>
        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey['Not formed'])}</Typography>

          <Checkbox
            color="primary"
            checked={!isFormedData.isFormed || isFormedData.isFormed === null}
            onClick={() =>
              isFormedData.onChangeIsFormed(
                isFormedData.isFormed !== null ? (!isFormedData.isFormed ? !isFormedData.isFormed : null) : true,
              )
            }
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.Formed)}</Typography>

          <Checkbox
            color="primary"
            checked={isFormedData.isFormed || isFormedData.isFormed === null}
            onClick={() =>
              isFormedData.onChangeIsFormed(
                isFormedData.isFormed !== null ? (isFormedData.isFormed ? !isFormedData.isFormed : null) : false,
              )
            }
          />
        </div>

        <Divider />
      </div>
    ),
    styles,
  ),
)

export const OrderStatusMenuItem = React.memo(
  withStyles(
    ({classes: classNames, orderStatusData}) => (
      <div className={classNames.isFormedWrapper}>
        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.All)}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.ALL}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.ALL)}
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey['At process'])}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.AT_PROCESS}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.AT_PROCESS)}
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.Canceled)}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.CANCELED}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.CANCELED)}
          />
        </div>

        <div className={classNames.isFormedSubWrapper}>
          <Typography>{t(TranslationKey.Completed)}</Typography>

          <Checkbox
            color="primary"
            checked={orderStatusData.chosenStatus === orderStatusData.chosenStatusSettings.COMPLETED}
            onClick={() => orderStatusData.onChangeOrderStatusData(orderStatusData.chosenStatusSettings.COMPLETED)}
          />
        </div>

        <Divider />
      </div>
    ),
    styles,
  ),
)
