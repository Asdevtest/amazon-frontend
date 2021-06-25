import React from 'react'

import {Box, Grid} from '@material-ui/core'

import {ProductStatus, ProductStatusByCode} from '@constants/product-status'
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
  const isSaveWithoutStatusChipSelected = [
    ProductStatus.NEW_PRODUCT,
    ProductStatus.RESEARCHER_FOUND_SUPPLIER,
    ProductStatus.BUYER_FOUND_SUPPLIER,
    ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
    ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  ].includes(ProductStatusByCode[productStatus])
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
              selected={isSaveWithoutStatusChipSelected}
              onClick={onClickSaveWithoutStatusChange}
            />
          </Grid>
        ) : undefined}
      </Grid>
    </Box>
  )
}
