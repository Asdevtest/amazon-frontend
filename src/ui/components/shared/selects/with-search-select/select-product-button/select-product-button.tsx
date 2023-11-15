/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { SelectProductAsinCellWithourTitle } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { useStyles } from './select-product-button.styles'

interface SelectProductButtonProps {
  [x: string]: any
  data: any
  onClick: any
  checkbox?: boolean | undefined
  checkboxChecked?: boolean | undefined
}

// ** Нужно доделывать **
export const SelectProductButton: FC<SelectProductButtonProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { data, onClickCustomButton, checkbox, checkboxChecked } = props

  return (
    <Button variant="text" className={styles.button} onClick={onClickCustomButton}>
      <SelectProductAsinCellWithourTitle
        product={data}
        withCheckbox={checkbox}
        checkboxChecked={checkboxChecked}
        onClickCheckbox={onClickCustomButton}
      />
    </Button>
  )
})
