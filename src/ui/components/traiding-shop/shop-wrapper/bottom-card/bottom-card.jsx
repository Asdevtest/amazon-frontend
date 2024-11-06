import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

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
          <div className={styles.detailsWrapper}>
            <Typography className={styles.title}>{t(TranslationKey['Store Details'])}</Typography>
            <Typography>{data?.shopDetails}</Typography>
          </div>
          <div className={styles.featuresWrapper}>
            <CustomList title={t(TranslationKey.Features)} dataList={data?.opportunities} />
            <CustomList title={t(TranslationKey.Risks)} dataList={data?.risks} />
          </div>
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Required work and skills'])} dataList={data?.requiredSkills} />
          </div>
          <div className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Seller support includes'])} dataList={data?.sellIncludes} />
          </div>
          <div className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Reasons for sale'])} dataList={data?.reasonForSale} />
          </div>
          <div className={styles.bottomCardWrapper}>
            <CustomList title={t(TranslationKey['Additional Information'])} dataList={data?.additionalInfo} />
          </div>
        </div>
      </div>
    </>
  )
})
