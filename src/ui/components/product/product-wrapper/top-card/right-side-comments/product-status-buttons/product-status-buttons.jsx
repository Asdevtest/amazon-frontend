/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'

import { ProductStatusByCode } from '@constants/product/product-status'
import { mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'

import { Text } from '@components/shared/text'

import { translateTooltipAttentionMessageByRole, translateTooltipMessageByRole } from '@utils/translate-tooltip-message'

export const ProductStatusButtons = props => {
  const { buttonsConfig, product, onClickButton, curUserRole } = props
  const [selected, setSelected] = useState(ProductStatusByCode[product.status])

  useEffect(() => {
    setSelected(ProductStatusByCode[product.status])
  }, [product])

  if (!buttonsConfig) {
    return <div />
  }

  return (
    <Box my={2}>
      <Grid container item spacing={2}>
        <RadioGroup
          name="status"
          sx={{ display: 'flex', flexDirection: 'row' }}
          defaultValue={ProductStatusByCode[selected]}
          value={selected}
          onChange={e => {
            onClickButton(e.target.value)
            setSelected(e.target.value)
          }}
        >
          {buttonsConfig.map(buttonConfig => (
            <Box key={buttonConfig.statusKey}>
              <FormControlLabel
                sx={{ paddingLeft: '20px' }}
                control={<Radio />}
                value={buttonConfig.statusKey}
                label={
                  <Text
                    tooltipInfoContent={translateTooltipMessageByRole(buttonConfig.label, curUserRole)}
                    tooltipAttentionContent={translateTooltipAttentionMessageByRole(buttonConfig.label, curUserRole)}
                  >
                    {buttonConfig.label}
                  </Text>
                }
                disabled={
                  mapProductStrategyStatusEnum[product.strategyStatus] === 'PRIVATE_LABEL' &&
                  buttonConfig.statusKey === 'RESEARCHER_FOUND_SUPPLIER'
                }
              />
            </Box>
          ))}
        </RadioGroup>
      </Grid>
    </Box>
  )
}
