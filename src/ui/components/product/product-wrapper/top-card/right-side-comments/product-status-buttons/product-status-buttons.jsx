import React from 'react'

import {Box, Grid} from '@material-ui/core'

import {ProductStatusByCode} from '@constants/product-status'
import {texts} from '@constants/texts'

import {ColoredChip} from '@components/colored-chip'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConfig = getLocalizedTexts(texts, 'en').productStatusButtons

const saveWithoutStatusBtnColor = '#adadad'
const saveWithoutStatusBtnColorHover = '#8c8a8a'

export const ProductStatusButtons = ({buttonsConfig, productStatus, onClickButton, onClickSaveWithoutStatusChange}) => {
  if (!buttonsConfig) {
    return <div />
  }

  return (
    <Box marginBottom={2}>
      <Grid container spacing={1}>
        {buttonsConfig.map(buttonConfig => (
          <Grid key={buttonConfig.statusKey} item>
            <ColoredChip
              label={buttonConfig.label}
              color={buttonConfig.color}
              colorHover={buttonConfig.colorHover}
              selected={ProductStatusByCode[productStatus] === buttonConfig.statusKey}
              onClick={() => onClickButton(buttonConfig.statusKey)}
            />
          </Grid>
        ))}
        {onClickSaveWithoutStatusChange ? (
          <Grid item>
            <ColoredChip
              label={textConfig.saveWithoutStatusBtn}
              color={saveWithoutStatusBtnColor}
              colorHover={saveWithoutStatusBtnColorHover}
              onClick={onClickSaveWithoutStatusChange}
            />
          </Grid>
        ) : undefined}
      </Grid>
    </Box>
  )
}
