import { useEffect, useState } from 'react'

import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'

import { ProductStatusByCode } from '@constants/product/product-status'
import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'

import { translateTooltipMessageByRole } from '@utils/translate-tooltip-message'

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
              <p title={translateTooltipMessageByRole(buttonConfig.label, curUserRole) || ''}>{buttonConfig.label}</p>
            }
            disabled={
              productStrategyStatusesEnum[product.strategyStatus] === 'PRIVATE_LABEL' &&
              buttonConfig.statusKey === 'RESEARCHER_FOUND_SUPPLIER'
            }
          />
        </Box>
      ))}
    </RadioGroup>
  )
}
