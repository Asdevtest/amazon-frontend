/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { useStyles } from './boxes-and-quantity-cell.style'

interface BoxesAndQuantityCellProps {
  boxesData: any
}

export const BoxesAndQuantityCell: FC<BoxesAndQuantityCellProps> = React.memo(({ boxesData }) => {
  const { classes: styles } = useStyles()
  if (Array.isArray(boxesData)) {
    const mergedBoxes = boxesData.map(item => `${item.boxAmount}x${item.itemAmount}`)
    const filteredBoxes = [...new Set(mergedBoxes)]
    const count = mergedBoxes.reduce((acc, el) => {
      // @ts-ignore
      acc[el] = (acc[el] || 0) + 1
      return acc
    }, {})
    const boxes = filteredBoxes.map((item, i) =>
      item ? (
        <p key={i} className={styles.boxesAndQuantityText}>
          {item}
          {/*  @ts-ignore */}
          {count[item] !== 1 ? ` x ${count[item]}` : ''}
          {filteredBoxes.length > 1 && i + 1 !== filteredBoxes.length ? ',' : ''}
        </p>
      ) : null,
    )
    return <div className={styles.boxesAndQuantityWrapper}>{boxes}</div>
  } else {
    return (
      <div className={styles.boxesAndQuantityWrapper}>
        <p className={styles.boxesAndQuantityText}>{`${boxesData.amount}x${boxesData.items[0].amount}`}</p>
      </div>
    )
  }
})
