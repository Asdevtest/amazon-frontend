/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { SelectProductAsinCellWithourTitle } from '@components/data-grid/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { ButtonStyle } from '@typings/enums/button-style'

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
    <Button styleType={ButtonStyle.TRANSPARENT} className={styles.button} onClick={onClickCustomButton}>
      <SelectProductAsinCellWithourTitle
        product={data}
        withCheckbox={checkbox}
        checkboxChecked={checkboxChecked}
        onClickCheckbox={onClickCustomButton}
      />
    </Button>
  )
})
