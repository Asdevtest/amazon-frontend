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
          disabled
          multiline
          className={classNames.heightFieldAuto}
          rows={4}
          rowsMax={6}
          title={textConsts.fieldManager}
          value={product.commentManager}
          onChange={onChangeField('commentManager')}
        />
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={4}
          rowsMax={6}
          title={textConsts.fieldSoperviser}
          value={product.commentSupervisor}
          onChange={onChangeField('commentSupervisor')}
        />
        <Field
          disabled
          multiline
          className={classNames.heightFieldAuto}
          rows={4}
          rowsMax={6}
          title={textConsts.fieldBuyer}
          value={product.commentBuyer}
          onChange={onChangeField('commentBuyer')}
        />

        <div className={classNames.buttonsWrapper}>
          <Button className={classNames.buttonNormal} color="primary" variant="contained">
            {textConsts.buttonAccept}
          </Button>
          <Button danger className={classNames.buttonNormal} color="primary" variant="contained">
            {textConsts.buttonCancel}
          </Button>
          <Button danger disabled className={classNames.buttonDelete} color="primary" variant="contained">
            {textConsts.buttonDelete}
          </Button>
        </div>
      </Box>
    </Grid>
  )
}
