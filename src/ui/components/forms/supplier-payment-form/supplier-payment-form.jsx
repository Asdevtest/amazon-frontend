/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {
  Box,
  Link,
  Tabs,
  Typography,
  /* Tab, */
} from '@mui/material'

import React, {useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value'
import {ITab} from '@components/i-tab/i-tab'
import {MemoDataGrid} from '@components/memo-data-grid'
import {SearchInput} from '@components/search-input'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './supplier-payment-form.style'

export const SupplierPaymentForm = observer(
  ({storekeepers, curStorekeeperId, curTariffId, onSubmit, inNotifications, total}) => {
    const {classes: classNames} = useClassNames()

    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTile}>{t(TranslationKey['Add payment to supplier'])}</Typography>

        <div>
          orderFields.product.barCode ? (
          <div className={classNames.barCode}>
            <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl('s')}>
              <Typography className={classNames.link}>{t(TranslationKey.View)}</Typography>
            </Link>
            <CopyValue text={'s'} />
          </div>
          ) : (<Typography className={classNames.barCodeText}>{t(TranslationKey.Missing)}</Typography>)
        </div>
      </div>
    )
  },
)
