/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Link } from '@mui/material'

import { UserLink } from '@components/user/user-link'

import { useStyles } from './in-stock-cell.style'

interface InStockCellProps {
  boxAmounts: any[]
  boxId: string
  onClickInStock: (boxId: string, storekeeper: any) => void
  isHideStorekeeper?: boolean
}

export const InStockCell: FC<InStockCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { boxAmounts, boxId, onClickInStock, isHideStorekeeper } = props

  return (
    <div className={styles.inStockWrapper}>
      {!!boxAmounts?.length &&
        boxAmounts
          ?.sort((x, y) => x?.storekeeper?.name?.localeCompare(y?.storekeeper?.name))
          ?.map(el => (
            <div
              key={el?._id}
              className={cx(styles.inStockSubWrapper, { [styles.stockWrapperNoLink]: isHideStorekeeper })}
            >
              {!isHideStorekeeper ? (
                <UserLink maxNameWidth={100} name={el?.storekeeper?.name} userId={el.storekeeper?._id} />
              ) : null}

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
