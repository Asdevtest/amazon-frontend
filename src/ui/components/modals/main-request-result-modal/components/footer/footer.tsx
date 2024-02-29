import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './footer.style'

interface FooterProps {
  isClient: boolean
  disabledSendResultButton: boolean
  onEditCustomProposal: () => void
  onReceiveCustomProposal: () => void
  onToggleShowConfirmModal: () => void
  showActionButtons?: boolean
}

export const Footer: FC<FooterProps> = memo(props => {
  const {
    isClient,
    disabledSendResultButton,
    onEditCustomProposal,
    onReceiveCustomProposal,
    onToggleShowConfirmModal,
    showActionButtons,
  } = props

  const { classes: styles } = useStyles()

  const showFooter = showActionButtons || !isClient

  return showFooter ? (
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
  ) : null
})
