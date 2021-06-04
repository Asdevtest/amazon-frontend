import React, {useState} from 'react'

import {Box, Grid, Paper, Typography, Button} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './client-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientBatchesForm

export const ClientForm = ({batch}) => {
  const classNames = useClassNames()
  const [display, setDisplay] = useState(0)
  return (
    <Paper elevation={0} className={classNames.paper}>
      <Typography className={classNames.modalText}>{textConsts.title}</Typography>
      <Typography className={(classNames.modalText, classNames.typoSetChoosenBoxe)}>
        {textConsts.typoSetChoosenBoxe}
      </Typography>
      <Typography>{textConsts.makeChoose}</Typography>
      <Box className={classNames.selectBox}>
        {[1, 2, 3, 4].map((num, index) => (
          <Button key={index} disabled={display === num - 1} onClick={() => setDisplay(num - 1)}>
            {num}
          </Button>
        ))}
      </Box>
      {display === 0 && (
        <Grid container className={classNames.spaceBetweenStyle}>
          <Grid item xs={12}>
            <Box mt={3}>
              <Typography>{textConsts.spaceBetweenStyle}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography className={classNames.modalText}>{textConsts.warehouse}</Typography>
              <Input disabled value={batch[0][0].destination} />
            </Box>
            <Box mt={3}>
              <Typography className={classNames.modalText}>{textConsts.deliveryMethod}</Typography>
              <Input disabled value={batch[0][0].deliveryMethod} />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography className={classNames.modalText}>{textConsts.status}</Typography>
              <Input disabled value={batch[0][0].status} />
            </Box>
            <Box mt={3}>
              <Typography className={classNames.modalText}>{textConsts.track}</Typography>
              <Input disabled value={batch[0][0].trackId} />
            </Box>
          </Grid>
        </Grid>
      )}
      {display === 1 && (
        <Grid container className={classNames.spaceEvenly}>
          <Grid item xs={12}>
            <Box mt={3}>
              <Typography>{textConsts.spaceEvenlyStyle}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography className={classNames.modalText}>{textConsts.warehouse}</Typography>
              <Input disabled value={batch[0][0].destination} />
            </Box>
            <Box mt={3}>
              <Typography className={classNames.modalText}>{textConsts.deliveryMethod}</Typography>
              <Input disabled value={batch[0][0].deliveryMethod} />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography className={classNames.modalText}>{textConsts.status}</Typography>
              <Input disabled value={batch[0][0].status} />
            </Box>
            <Box mt={3}>
              <Typography className={classNames.modalText}>{textConsts.track}</Typography>
              <Input disabled value={batch[0][0].trackId} />
            </Box>
          </Grid>
        </Grid>
      )}
      {display === 2 && (
        <React.Fragment>
          <Box mt={3}>
            <Typography>{textConsts.widthHalfStyle}</Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item>
              <Box>
                <Typography className={classNames.modalText}>{textConsts.warehouse}</Typography>
                <Input disabled value={batch[0][0].destination} />
              </Box>
              <Box mt={3}>
                <Typography className={classNames.modalText}>{textConsts.deliveryMethod}</Typography>
                <Input disabled value={batch[0][0].deliveryMethod} />
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography className={classNames.modalText}>{textConsts.status}</Typography>
                <Input disabled value={batch[0][0].status} />
              </Box>
              <Box mt={3}>
                <Typography className={classNames.modalText}>{textConsts.track}</Typography>
                <Input disabled value={batch[0][0].trackId} />
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {display === 3 && (
        <React.Fragment>
          <Box mt={3}>
            <Typography>{textConsts.widthHalfStyle}</Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Box>
                <Typography className={classNames.modalText}>{textConsts.warehouse}</Typography>
                <Input disabled value={batch[0][0].destination} />
              </Box>
              <Box mt={3}>
                <Typography className={classNames.modalText}>{textConsts.deliveryMethod}</Typography>
                <Input disabled value={batch[0][0].deliveryMethod} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography className={classNames.modalText}>{textConsts.status}</Typography>
                <Input disabled value={batch[0][0].status} />
              </Box>
              <Box mt={3}>
                <Typography className={classNames.modalText}>{textConsts.track}</Typography>
                <Input disabled value={batch[0][0].trackId} />
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Paper>
  )
}
