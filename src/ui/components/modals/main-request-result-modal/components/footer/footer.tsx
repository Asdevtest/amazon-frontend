import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
        <Button styleType={ButtonStyle.PRIMARY} onClick={onToggleShowConfirmModal}>
          {t(TranslationKey['Send in for rework'])}
        </Button>
      ) : null}

      <Button
        styleType={ButtonStyle.SUCCESS}
        disabled={disabledSendResultButton}
        onClick={() => (isClient ? onReceiveCustomProposal() : onEditCustomProposal())}
      >
        {isClient ? t(TranslationKey.Receive) : t(TranslationKey.Send)}
      </Button>
    </div>
  )
})
