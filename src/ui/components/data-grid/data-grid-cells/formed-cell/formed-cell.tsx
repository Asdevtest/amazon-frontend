import { FC, memo } from 'react'

import { Text } from '@components/shared/text'

import { useStyles } from './formed-cell.style'

import { CheckboxCell } from '../checkbox-cell/checkbox-cell'

interface ISub {
  name: string
  id: string
}

interface FormedCellProps {
  sub: ISub
  disable: boolean
  isChecked: boolean
  onChangeIsFormedInBox: () => void
}

export const FormedCell: FC<FormedCellProps> = memo(({ sub, disable, isChecked, onChangeIsFormedInBox }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <CheckboxCell disabled={disable} checked={isChecked} onClick={onChangeIsFormedInBox} />
      {sub?.name ? <Text text={sub.name} /> : null}
    </div>
  )
})
