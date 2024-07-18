import { FC, memo } from 'react'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './items.style'

import { Item } from './item'

interface ItemsProps {
  formFields?: IBox
  isClient?: boolean
  isOrderInfo?: boolean
  onClickHsCode?: (id: string) => void
}

export const Items: FC<ItemsProps> = memo(props => {
  const { formFields, isClient, isOrderInfo, onClickHsCode } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.orderInfoWrapper]: isOrderInfo })}>
      {formFields?.items?.map((item, index) => {
        const quantity = (formFields?.amount > 1 ? item.amount * formFields?.amount : item.amount) || 0
        const isLastItem = index === formFields?.items?.length - 1 && index > 2

        return (
          <Item
            key={index}
            item={item}
            isClient={isClient}
            quantity={quantity}
            isLastItem={isLastItem}
            isOrderInfo={isOrderInfo}
            onClickHsCode={onClickHsCode}
          />
        )
      })}
    </div>
  )
})
