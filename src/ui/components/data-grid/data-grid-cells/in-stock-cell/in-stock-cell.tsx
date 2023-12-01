/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { Link } from '@mui/material'

import { UserLink } from '@components/user/user-link'

import { useStyles } from './in-stock-cell.style'

interface InStockCellProps {
  boxAmounts: any[]
  boxId: string
  onClickInStock: (boxId: string, storekeeper: any) => void
}

export const InStockCell: FC<InStockCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { boxAmounts, boxId, onClickInStock } = props

  return (
    <div className={styles.inStockWrapper}>
      {!!boxAmounts.length &&
        boxAmounts
          ?.sort((x, y) => x?.storekeeper?.name?.localeCompare(y?.storekeeper?.name))
          ?.map(el => (
            <div key={el?._id} className={styles.inStockSubWrapper}>
              <UserLink maxNameWidth={100} name={el?.storekeeper?.name} userId={el.storekeeper?._id} />

              <Link
                target="_blank"
                underline={'hover'}
                className={styles.linkWrapper}
                onClick={e => {
                  e.stopPropagation()
                  onClickInStock(boxId, el?.storekeeper)
                }}
              >
                {el?.amountInBoxes}
              </Link>
            </div>
          ))}
    </div>
  )
})
