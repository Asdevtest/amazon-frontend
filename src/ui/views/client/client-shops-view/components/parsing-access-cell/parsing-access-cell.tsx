import { FC, memo } from 'react'
import { CiCircleCheck } from 'react-icons/ci'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ProfileStatus } from '@typings/enums/request/profile-request-status'

import { useStyles } from './parsing-access-cell.style'

import { IShopProfile } from '../../client-shops-view.types'

interface ParsingAccessCellProps {
  profile: IShopProfile
  onAccess: () => void
  onParsingProfileInvited: () => void
}

export const ParsingAccessCell: FC<ParsingAccessCellProps> = memo(props => {
  const { profile, onAccess, onParsingProfileInvited } = props

  const { classes: styles } = useStyles()

  if (profile?.access) {
    return (
      <p className={styles.issued}>
        <CiCircleCheck size={18} />
        {t(TranslationKey.Issued)}
      </p>
    )
  }

  const disabledFirstButton = profile?.status !== ProfileStatus.WAITING_INVITE
  const disabledSecondButton = profile?.status !== ProfileStatus.REGISTERED

  return (
    <ActionButtonsCell
      showFirst
      showSecond
      firstDisabled={disabledFirstButton}
      secondDisabled={disabledSecondButton}
      firstContent={t(TranslationKey['Invitation sent'])}
      secondContent={t(TranslationKey.Confirm)}
      onClickFirst={onParsingProfileInvited}
      onClickSecond={onAccess}
    />
  )
})
