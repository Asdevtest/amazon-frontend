import React from 'react'

import {Box, Grid} from '@material-ui/core'

import {ProductStatusByCode} from '@constants/product-status'

import {ColoredChip} from '@components/colored-chip'

export const ProductStatusButtons = ({buttonsConfig, productStatus, onClickButton}) => {
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
      </Grid>
    </Box>
  )
}
