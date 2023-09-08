/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectProductAsinCellWithourTitle } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './select-product-button.styles'

/* eslint-disable @typescript-eslint/no-unused-vars */

// ** Нужно доделывать **
export const SelectProductButton = (props: {
  [x: string]: any
  data: any
  onClick: any
  checkbox?: true | undefined
}) => {
  const { classes: classNames, cx } = useClassNames()
  const { data, onClickCustomButton, checkbox, ...restProps } = props

  return (
    <Button variant="text" className={classNames.button} onClick={onClickCustomButton}>
      <SelectProductAsinCellWithourTitle
        preventDefault
        product={data}
        withCheckbox={checkbox}
        // checkboxChecked={selectedAsins?.some(asin => asin?._id === el?._id)}
        onClickCheckbox={onClickCustomButton}
      />
    </Button>
  )
}
