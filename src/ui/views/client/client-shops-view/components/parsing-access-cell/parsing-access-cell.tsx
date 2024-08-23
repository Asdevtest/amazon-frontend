import { FC, memo } from 'react'
import { CiCircleCheck } from 'react-icons/ci'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell } from '@components/data-grid/data-grid-cells'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { RequestStatus } from '@typings/enums/request/request-status'

import { useStyles } from './parsing-access-cell.style'

import { IShopProfile } from '../../client-shops-view.types'

interface ParsingAccessCellProps {
  profile: IShopProfile
  onAccess: () => void
}

export const ParsingAccessCell: FC<ParsingAccessCellProps> = memo(props => {
  const { profile, onAccess } = props

  const { classes: styles } = useStyles()

  if (profile?.access) {
    return (
      <p className={styles.issued}>
        <CiCircleCheck size={18} />
        {t(TranslationKey.Issued)}
      </p>
    )
  }

  const disabled = !profile || [RequestStatus.PENDING, RequestStatus.REJECTED].includes(profile?.requestStatus)

  return (
    <ActionButtonsCell
      isFirstButton
      fullWidth
      buttonClassName={styles.button}
      disabledFirstButton={disabled}
      firstButtonElement={t(TranslationKey.Confirm)}
      firstButtonStyle={ButtonStyle.PRIMARY}
      onClickFirstButton={throttle(onAccess)}
    />
  )
})
