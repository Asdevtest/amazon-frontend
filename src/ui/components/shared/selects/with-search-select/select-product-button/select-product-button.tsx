/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { SelectProductCellWithourTitle } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './select-product-button.style'

interface SelectProductButtonProps {
  [x: string]: any
  data: any
  onClick: any
  checkbox?: boolean | undefined
  checkboxChecked?: boolean | undefined
}

// ** Нужно доделывать **
export const SelectProductButton: FC<SelectProductButtonProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { data, onClickCustomButton, checkbox, checkboxChecked } = props

  return (
    <CustomButton ghost className={styles.button} onClick={onClickCustomButton}>
      <SelectProductCellWithourTitle
        product={data}
        withCheckbox={checkbox}
        checkboxChecked={checkboxChecked}
        onClickCheckbox={onClickCustomButton}
      />
    </CustomButton>
  )
})
