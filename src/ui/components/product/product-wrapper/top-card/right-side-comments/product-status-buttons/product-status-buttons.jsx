import React from 'react'

import {Box, Grid} from '@material-ui/core'

import {ProductStatus, ProductStatusByCode, ProductStatusByKey} from '@constants/product-status'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ColoredChip} from '@components/colored-chip'

import {t} from '@utils/translations'

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
              disabled={productStatus === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]}
              label={t(TranslationKey['Save without status'])}
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
