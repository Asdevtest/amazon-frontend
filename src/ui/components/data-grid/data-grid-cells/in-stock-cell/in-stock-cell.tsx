/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Text } from '@components/shared/text'

import { useStyles } from './in-stock-cell.style'

import { UserCell } from '../user-cell/user-cell'

interface InStockCellProps {
  boxAmounts: any[]
  boxId: string
  onClickInStock: (boxId: string, storekeeper: any) => void
  isHideStorekeeper?: boolean
}

export const InStockCell: FC<InStockCellProps> = memo(props => {
  const { boxAmounts, boxId, onClickInStock, isHideStorekeeper } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      {boxAmounts?.map(el => (
        <div key={el?._id} className={styles.flexRow}>
          {!isHideStorekeeper ? <UserCell name={el?.storekeeper?.name} /> : null}

          <Text
            link
            url={el?.amountInBoxes}
            text={el?.amountInBoxes}
            onClick={() => onClickInStock(boxId, el?.storekeeper)}
          />
        </div>
      ))}
    </div>
  )
})
