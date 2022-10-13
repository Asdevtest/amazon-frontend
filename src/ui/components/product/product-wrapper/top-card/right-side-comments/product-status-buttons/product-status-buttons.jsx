/* eslint-disable no-unused-vars */
import {Box, Grid} from '@mui/material'

import React from 'react'

import {ProductStatus, ProductStatusByCode, ProductStatusByKey} from '@constants/product-status'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ColoredChip} from '@components/colored-chip'

import {translateTooltipAttentionMessageByRole, translateTooltipMessageByRole} from '@utils/translate-tooltip-message'
import {t} from '@utils/translations'

const saveWithoutStatusBtnColor = '#adadad'
const saveWithoutStatusBtnColorHover = '#8c8a8a'

export const ProductStatusButtons = ({
  buttonsConfig,
  productStatus,
  product,
  onClickButton,
  onClickSaveWithoutStatusChange,
  curUserRole,
}) => {
  if (!buttonsConfig) {
    return <div />
  }

  return (
    <Box marginBottom={2}>
      <Grid container spacing={2}>
        {buttonsConfig.map(buttonConfig => (
          <Grid key={buttonConfig.statusKey} item>
            <ColoredChip
              tooltipInfoContent={translateTooltipMessageByRole(buttonConfig.label, curUserRole)}
              tooltipAttentionContent={translateTooltipAttentionMessageByRole(buttonConfig.label, curUserRole)}
              disabled={
                mapProductStrategyStatusEnum[product.strategyStatus] === 'PRIVATE_LABEL' &&
                buttonConfig.statusKey === 'RESEARCHER_FOUND_SUPPLIER'
              }
              label={buttonConfig.label}
              color={buttonConfig.color}
              colorHover={buttonConfig.colorHover}
              selected={ProductStatusByCode[productStatus] === buttonConfig.statusKey}
              onClickChip={() => onClickButton(buttonConfig.statusKey)}
            />
          </Grid>
        ))}
        {onClickSaveWithoutStatusChange ? (
          <Grid item>
            <ColoredChip
              tooltipInfoContent={translateTooltipMessageByRole(t(TranslationKey['Save without status']), curUserRole)}
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
