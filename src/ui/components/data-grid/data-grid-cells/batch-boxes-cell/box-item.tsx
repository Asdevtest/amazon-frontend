/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'

import { IBox } from '@typings/models/boxes/box'
import { IBoxItem } from '@typings/models/boxes/box-item'

import { useStyles } from './batch-boxes-cell.style'

import { ProductCell } from '../product-cell/product-cell'

interface BoxItemProps {
  box: IBox
}

export const BoxItem: FC<BoxItemProps> = memo(({ box }) => {
  const { classes: styles } = useStyles()

  const errorMessage =
    box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF ? 'The tariff is invalid or has been removed!' : ''

  return (
    <div className={styles.box}>
      {box.items.map((item: IBoxItem, index: number) => (
        <ProductCell
          key={index}
          image={item.product?.images?.[0]}
          asin={item.product?.asin}
          title={item.product?.amazonTitle}
          superbox={box.amount}
          quantity={item.amount}
          errorMessage={errorMessage}
        />
      ))}
    </div>
  )
})
