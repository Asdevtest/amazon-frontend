import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './footer.style'

interface FooterProps {
  isClient: boolean
  disabledSendResultButton: boolean
  onEditCustomProposal: () => void
  onReceiveCustomProposal: () => void
  onToggleShowConfirmModal: () => void
}

export const Footer: FC<FooterProps> = memo(props => {
  const {
    isClient,
    disabledSendResultButton,
    onEditCustomProposal,
    onReceiveCustomProposal,
    onToggleShowConfirmModal,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {isClient ? (
        <CustomButton onClick={onToggleShowConfirmModal}>{t(TranslationKey['Send in for rework'])}</CustomButton>
      ) : null}

      <CustomButton
        type="primary"
        disabled={disabledSendResultButton}
        onClick={() => (isClient ? onReceiveCustomProposal() : onEditCustomProposal())}
      >
        {isClient ? t(TranslationKey.Receive) : t(TranslationKey.Send)}
      </CustomButton>
    </div>
  )
})
