import { FC, memo } from 'react'

import { CustomSwitch } from '@components/shared/custom-switch'

interface SwitchCellProps {
  value: boolean
  onClick: () => void
  disabled?: boolean
}

export const SwitchCell: FC<SwitchCellProps> = memo(props => {
  const { value, onClick, disabled } = props

  const style = { width: '100%', padding: '10px 0', display: 'flex', justifyContent: 'center' }

  return (
    <div style={style}>
      <CustomSwitch disabled={disabled} value={value} onClick={onClick} />
    </div>
  )
})
