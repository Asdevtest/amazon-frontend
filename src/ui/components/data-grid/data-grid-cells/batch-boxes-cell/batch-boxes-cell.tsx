/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductInfoAbbreviated, ProductInfoExtended } from '..'
import { FC, Fragment, memo } from 'react'

import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'

import { tableProductViewMode } from '@typings/enums/table-product-view'

import { useStyles } from './batch-boxes-cell.style'

interface BatchBoxesCellProps {
  boxes: any[]
  productViewMode?: keyof typeof tableProductViewMode
}

export const BatchBoxesCell: FC<BatchBoxesCellProps> = memo(({ boxes, productViewMode }) => {
  const { classes: styles, cx } = useStyles()

  const isAbbreviatedView = productViewMode === tableProductViewMode.ABBREVIATED

  const simpleBoxes = boxes.map(box => ({
    amount: box.amount,
    deliveryTotalPrice: box.deliveryTotalPrice,
    deliveryTotalPriceChanged: box.deliveryTotalPriceChanged,
    items: box.items.map((item: any) => ({
      image: item.product.images?.[0],
      amazonTitle: item.product.amazonTitle,
      asin: item.product.asin,
      amount: item.amount,
    })),
    status: box.status,
  }))

  const object = {}
  simpleBoxes.forEach(box => {
    const boxStr = JSON.stringify(
      getObjectFilteredByKeyArrayBlackList(box, ['deliveryTotalPrice', 'deliveryTotalPriceChanged']),
    )

    const extraPay = box.deliveryTotalPriceChanged - box.deliveryTotalPrice
    if (extraPay > 0) {
      // @ts-ignore
      object[`${boxStr}${extraPay}`] = object[`${boxStr}${extraPay}`] ? [...object[`${boxStr}${extraPay}`], box] : [box]
    } else {
      // @ts-ignore
      object[boxStr] = object[boxStr] ? [...object[boxStr], box] : [box]
    }
  })
  const filteredBoxes = Object.values(object)

  return (
    <div
      className={cx(styles.batchBoxesWrapper, {
        [styles.withScrollBatchBoxesWrapper]: isAbbreviatedView,
      })}
    >
      {filteredBoxes.map((boxes: any, index) => (
        <Fragment key={index}>
          {isAbbreviatedView ? (
            <ProductInfoAbbreviated box={boxes[0]} boxesLength={boxes.length} />
          ) : (
            <ProductInfoExtended box={boxes[0]} boxesLength={boxes.length} />
          )}
        </Fragment>
      ))}
    </div>
  )
})
