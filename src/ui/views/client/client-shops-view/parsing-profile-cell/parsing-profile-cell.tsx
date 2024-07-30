import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, TextCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { IShopProfile, RequestStatus } from '../client-shops-view.types'

interface ParsingProfileCellProps {
  profile: IShopProfile
  onConfirm: () => void
}

export const ParsingProfileCell: FC<ParsingProfileCellProps> = memo(props => {
  const { profile, onConfirm } = props

  if (profile?.requestStatus === RequestStatus.PENDING) {
    return <TextCell text={t(TranslationKey['Request sent'])} />
  }

  if (profile?.requestStatus === RequestStatus.APPROVED && profile?.email) {
    return <TextCell text={profile.email} />
  }

  return (
    <ActionButtonsCell
      isFirstButton
      firstButtonElement={t(TranslationKey.Confirm)}
      firstButtonStyle={ButtonStyle.PRIMARY}
      onClickFirstButton={onConfirm}
    />
  )
})
