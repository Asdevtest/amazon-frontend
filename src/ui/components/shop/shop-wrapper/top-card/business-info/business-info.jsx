import React from 'react'

import {Box, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {CustomList} from '@components/custom-list'

import {useClassNames} from './business-info.style'

export const BusinessInfo = observer(({data}) => {
  const classNames = useClassNames()

  return (
    <Box className={classNames.businessInfoWrapper}>
      <Typography className={classNames.businessInfoTitle}>{'Бизнес начат'}</Typography>

      <div>
        <Typography className={classNames.businessInfoDate}>{'10 июля 2010 г.'}</Typography>
        <Typography className={classNames.businessInfoDateAgo}>{'( 11 лет 11 месяцев )'}</Typography>
      </div>
      <div>
        <CustomList title="Активы, включенные в продажу" dataList={data?.asset} />
      </div>
    </Box>
  )
})
