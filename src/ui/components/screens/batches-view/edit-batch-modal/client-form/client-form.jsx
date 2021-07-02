import React from 'react'

import {Box, Grid, Paper, Typography} from '@material-ui/core'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './client-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientBatchesForm

export const ClientForm = ({batch}) => {
  const classNames = useClassNames()
  return (
    <Paper elevation={0} className={classNames.paper}>
      <Typography className={classNames.modalText}>{textConsts.title}</Typography>
      <Typography className={(classNames.modalText, classNames.typoSetChoosenBoxe)}>
        {textConsts.typoSetChoosenBoxe}
      </Typography>

      <Grid container spacing={4}>
        <Grid item>
          <Box>
            <Typography className={classNames.modalText}>{textConsts.warehouse}</Typography>
            <Input disabled value={warehouses[batch.batch.warehouse]} />
          </Box>
          <Box mt={3}>
            <Typography className={classNames.modalText}>{textConsts.deliveryMethod}</Typography>
            <Input disabled value={DeliveryTypeByCode[batch.batch.deliveryMethod]} />
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Typography className={classNames.modalText}>{textConsts.status}</Typography>
            <Input disabled value={batch.boxes[0].status} />
          </Box>
          <Box mt={3}>
            <Typography className={classNames.modalText}>{textConsts.track}</Typography>
            <Input disabled value={'trackId'} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
