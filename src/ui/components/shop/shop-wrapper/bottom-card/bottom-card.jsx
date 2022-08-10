import React from 'react'

import {Typography, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'

import {CustomList} from '@components/custom-list'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {Field} from '@components/field'
// import {toFixed} from '@utils/text'
// import {t} from '@utils/translations'
import {useClassNames} from './bottom-card.style'

export const BottomCard = observer(({data}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <div className={classNames.bottomCardsWrapper}>
        <div className={classNames.topWrapper}>
          <Paper className={classNames.detailsWrapper}>
            <Typography className={classNames.title}>{'Детали магазина'}</Typography>
            <Typography>{data?.shopDetails}</Typography>
          </Paper>
          <Paper className={classNames.featuresWrapper}>
            <CustomList title="Возможности" dataList={data?.opportunities} />
            <CustomList title="Риски" dataList={data?.risks} />
          </Paper>
        </div>
        <div className={classNames.bottomWrapper}>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title="Требуемая работа и навыки" dataList={data?.requiredSkills} />
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title="Поддержка продавца включает" dataList={data?.sellIncludes} />
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title="Причины продажи" dataList={data?.reasonForSale} />
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <CustomList title="Дополнительная информация" dataList={data?.additionalInfo} />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  )
})
