import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './footer.style'

interface FooterProps {
  isClient: boolean
  onEditCustomProposal: () => void
  onReceiveCustomProposal: () => void
  onOpenModal: () => void
  showActionButtons?: boolean
}

export const Footer: FC<FooterProps> = memo(props => {
  const { isClient, onEditCustomProposal, onReceiveCustomProposal, onOpenModal, showActionButtons } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <Button styleType={ButtonType.DANGER} onClick={onOpenModal}>
        {t(TranslationKey.Cancel)}
      </Button>

      {showActionButtons ? (
        <div className={styles.flexContainer}>
          {isClient ? (
            <Button styleType={ButtonType.PRIMARY} onClick={onEditCustomProposal}>
              {t(TranslationKey['Send in for rework'])}
            </Button>
          ) : null}
          <Button
            styleType={ButtonType.SUCCESS}
            onClick={() => (isClient ? onReceiveCustomProposal() : onEditCustomProposal())}
          >
            {isClient ? t(TranslationKey.Receive) : t(TranslationKey.Send)}
          </Button>
        </div>
      ) : null}
    </div>
  )
})
