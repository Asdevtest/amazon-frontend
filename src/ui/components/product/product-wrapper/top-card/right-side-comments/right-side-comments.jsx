import React from 'react'

import {Box, Grid, Typography, Button} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {ErrorButton} from '@components/buttons/error-button'
import {ColoredChip} from '@components/colored-chip'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './right-side-comments.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const RightSideComments = observer(
  ({curUserRole, onChangeField, product, chipList, activeChip, setActiveChip}) => {
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
          {chipList && curUserRole === userRole.SUPERVISOR && (
            <Box marginBottom={2}>
              <Grid container spacing={1}>
                {chipList.map(chip => (
                  <Grid key={chip.key} item>
                    <ColoredChip
                      label={chip.label}
                      color={chip.color}
                      colorHover={chip.colorHover}
                      selected={activeChip === chip.key}
                      onClick={() => setActiveChip(chip.key)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

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
            <ErrorButton className={classNames.buttonNormal} variant="contained">
              {textConsts.buttonCancel}
            </ErrorButton>
            <ErrorButton disabled className={classNames.buttonDelete} variant="contained">
              {textConsts.buttonDelete}
            </ErrorButton>
          </div>
        </Box>
      </Grid>
    )
  },
)
