import { FC, memo } from 'react'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './order.style'

import { Items } from '../items'

interface OrderProps {
  isClient: boolean
  formFields?: IBox
  onClickHsCode?: (id: string) => void
}

export const Order: FC<OrderProps> = memo(({ isClient, formFields, onClickHsCode }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Items isOrderInfo isClient={isClient} formFields={formFields} onClickHsCode={onClickHsCode} />
    </div>
  )
})
