import { observer } from 'mobx-react'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomList } from '@components/shared/custom-list'

import { t } from '@utils/translations'

import { useStyles } from './bottom-card.style'

export const BottomCard = observer(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <>
      <div className={styles.bottomCardsWrapper}>
        <div className={styles.topWrapper}>
          <Paper className={styles.detailsWrapper}>
            <Typography className={styles.title}>{t(TranslationKey['Store Details'])}</Typography>
            <Typography>{data?.shopDetails}</Typography>
          </Paper>
          <Paper className={styles.featuresWrapper}>
            <CustomList title={t(TranslationKey.Features)} dataList={data?.opportunities} />
            <CustomList title={t(TranslationKey.Risks)} dataList={data?.risks} />
          </Paper>
        </div>
        <div className={styles.bottomWrapper}>
          <Paper className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Required work and skills'])} dataList={data?.requiredSkills} />
          </Paper>
          <Paper className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Seller support includes'])} dataList={data?.sellIncludes} />
          </Paper>
          <Paper className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Reasons for sale'])} dataList={data?.reasonForSale} />
          </Paper>
          <Paper className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Additional Information'])} dataList={data?.additionalInfo} />
          </Paper>
        </div>
      </div>
    </>
  )
})
