import { FC, memo } from 'react'
import { CiCircleCheck } from 'react-icons/ci'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell } from '@components/data-grid/data-grid-cells'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { RequestStatus } from '@typings/enums/request/request-status'

import { IShopProfile } from '../../client-shops-view.types'

interface ParsingAccessCellProps {
  profile: IShopProfile
  onAccess: () => void
}

export const ParsingAccessCell: FC<ParsingAccessCellProps> = memo(props => {
  const { profile, onAccess } = props

  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: '#B3E7C7',
    color: '#0B903E',
    border: '1px solid #0B903E',
    borderRadius: '20px',
    fontSize: '14px',
    lineHeight: '19px',
    padding: '5px 10px',
  }

  if (profile?.isActive) {
    return (
      <p style={style}>
        <CiCircleCheck />
        {t(TranslationKey.issued)}
      </p>
    )
  }

  const disabled = !profile || [RequestStatus.PENDING, RequestStatus.REJECTED].includes(profile?.requestStatus)

  return (
    <ActionButtonsCell
      isFirstButton
      disabledFirstButton={disabled}
      firstButtonElement={t(TranslationKey.Confirm)}
      firstButtonStyle={ButtonStyle.PRIMARY}
      onClickFirstButton={throttle(onAccess)}
    />
  )
})
