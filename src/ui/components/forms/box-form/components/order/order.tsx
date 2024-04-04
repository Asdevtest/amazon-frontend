import { FC, memo } from 'react'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './order.style'

import { Items } from '../items'

interface OrderProps {
  formFields: IBox
  onClickHsCode?: (id: string) => void
}

export const Order: FC<OrderProps> = memo(({ formFields, onClickHsCode }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Items isOrderInfo formFields={formFields} onClickHsCode={onClickHsCode} />
    </div>
  )
})
