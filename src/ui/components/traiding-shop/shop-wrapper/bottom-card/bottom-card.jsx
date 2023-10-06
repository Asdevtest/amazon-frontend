import { observer } from 'mobx-react'
import React from 'react'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomList } from '@components/shared/custom-list'

import { t } from '@utils/translations'

import { useClassNames } from './bottom-card.style'

export const BottomCard = observer(({ data }) => {
  const { classes: classNames } = useClassNames()

  return (
    <React.Fragment>
      <div className={classNames.bottomCardsWrapper}>
        <div className={classNames.topWrapper}>
          <Paper className={classNames.detailsWrapper}>
            <Typography className={classNames.title}>{t(TranslationKey['Store Details'])}</Typography>
            <Typography>{data?.shopDetails}</Typography>
          </Paper>
          <Paper className={classNames.featuresWrapper}>
            <CustomList title={t(TranslationKey.Features)} dataList={data?.opportunities} />
            <CustomList title={t(TranslationKey.Risks)} dataList={data?.risks} />
          </Paper>
        </div>
        <div className={classNames.bottomWrapper}>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Required work and skills'])} dataList={data?.requiredSkills} />
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Seller support includes'])} dataList={data?.sellIncludes} />
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Reasons for sale'])} dataList={data?.reasonForSale} />
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Additional Information'])} dataList={data?.additionalInfo} />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  )
})
