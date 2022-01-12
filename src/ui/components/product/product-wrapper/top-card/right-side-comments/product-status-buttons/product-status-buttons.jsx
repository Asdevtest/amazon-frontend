import React from 'react'

import {Box, Grid} from '@material-ui/core'

import {ProductStatus, ProductStatusByCode, ProductStatusByKey} from '@constants/product-status'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {texts} from '@constants/texts'

import {ColoredChip} from '@components/colored-chip'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConfig = getLocalizedTexts(texts, 'en').productStatusButtons

const saveWithoutStatusBtnColor = '#adadad'
const saveWithoutStatusBtnColorHover = '#8c8a8a'

export const ProductStatusButtons = ({
  buttonsConfig,
  productStatus,
  product,
  onClickButton,
  onClickSaveWithoutStatusChange,
}) => {
  if (!buttonsConfig) {
    return <div />
  }
  console.log(buttonsConfig)
  console.log(product)
  return (
    <Box marginBottom={2}>
      <Grid container spacing={1}>
        {buttonsConfig.map(buttonConfig => (
          <Grid key={buttonConfig.statusKey} item>
            <ColoredChip
              disabled={
                mapProductStrategyStatusEnum[product.strategyStatus] === 'PRIVATE_LABEL' &&
                buttonConfig.statusKey === 'RESEARCHER_FOUND_SUPPLIER'
              }
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
              disabled={product.status === ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]}
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
