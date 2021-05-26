import React from 'react'

import {Box, Grid, Typography, Button} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './right-side-comments.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const RightSideComments = ({onChangeField, product}) => {
  const classNames = useClassNames()

  return (
    <Grid item sm={5} xs={12}>
      <Box className={classNames.rightBoxComments}>
        <Typography className={classNames.title}>{textConsts.typographyComments}</Typography>
        <Field
          className={classNames.heightFieldAuto}
          disabled
          multiline
          onChange={onChangeField('commentManager')}
          rows={4}
          rowsMax={6}
          title={textConsts.fieldManager}
          value={product.commentManager}
        />
        <Field
          className={classNames.heightFieldAuto}
          multiline
          onChange={onChangeField('commentSupervisor')}
          rows={4}
          rowsMax={6}
          title={textConsts.fieldSoperviser}
          value={product.commentSupervisor}
        />
        <Field
          className={classNames.heightFieldAuto}
          disabled
          multiline
          onChange={onChangeField('commentBuyer')}
          rows={4}
          rowsMax={6}
          title={textConsts.fieldBuyer}
          value={product.commentBuyer}
        />

        <div className={classNames.buttonsWrapper}>
          <Button className={classNames.buttonNormal} color="primary" variant="contained">
            {textConsts.buttonAccept}
          </Button>
          <Button className={classNames.buttonNormal} color="primary" danger variant="contained">
            {textConsts.buttonCancel}
          </Button>
          <Button className={classNames.buttonDelete} color="primary" danger disabled variant="contained">
            {textConsts.buttonDelete}
          </Button>
        </div>
      </Box>
    </Grid>
  )
}
