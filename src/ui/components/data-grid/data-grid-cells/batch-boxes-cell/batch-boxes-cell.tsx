import { FC, memo } from 'react'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './batch-boxes-cell.style'

import { BoxItem } from './box-item'

interface BatchBoxesCellProps {
  boxes: IBox[]
}

export const BatchBoxesCell: FC<BatchBoxesCellProps> = memo(({ boxes }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      {boxes.map((box: IBox, index) => (
        <BoxItem key={index} box={box} />
      ))}
    </div>
  )
})
