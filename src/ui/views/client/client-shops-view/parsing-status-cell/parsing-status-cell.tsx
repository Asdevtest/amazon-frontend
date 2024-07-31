import { FC, memo } from 'react'

import { CustomSwitch } from '@components/shared/custom-switch'

interface ParsingStatusCellProps {
  isActive: boolean
  onClick: () => void
}

export const ParsingStatusCell: FC<ParsingStatusCellProps> = memo(props => {
  const { isActive, onClick } = props

  const style = { width: '100%', padding: '10px 0', display: 'flex', justifyContent: 'center' }

  return (
    <div style={style}>
      <CustomSwitch value={isActive} onClick={onClick} />
    </div>
  )
})
