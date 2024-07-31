import { FC, memo } from 'react'

import { CustomSwitch } from '@components/shared/custom-switch'

import { IShopProfile, RequestStatus } from '../../client-shops-view.types'

interface ParsingStatusCellProps {
  profile: IShopProfile
  onClick: () => void
}

export const ParsingStatusCell: FC<ParsingStatusCellProps> = memo(props => {
  const { profile, onClick } = props

  const style = { width: '100%', padding: '10px 0', display: 'flex', justifyContent: 'center' }

  const disabled = !profile || profile?.requestStatus === RequestStatus.PENDING

  return (
    <div style={style}>
      <CustomSwitch disabled={disabled} value={profile?.isActive} onClick={onClick} />
    </div>
  )
})
