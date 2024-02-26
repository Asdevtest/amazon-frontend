import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './footer.style'

interface FooterProps {
  isClient: boolean
  onOpenModal: () => void
  onEditCustomProposal: () => void
  onReceiveCustomProposal: () => void
  showActionButtons?: boolean
}

export const Footer: FC<FooterProps> = memo(props => {
  const { isClient, onOpenModal, onEditCustomProposal, onReceiveCustomProposal, showActionButtons } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <Button styleType={ButtonStyle.DANGER} onClick={onOpenModal}>
        {t(TranslationKey.Cancel)}
      </Button>

      {showActionButtons || !isClient ? (
        <div className={styles.flexContainer}>
          {isClient ? (
            <Button styleType={ButtonStyle.PRIMARY} onClick={onEditCustomProposal}>
              {t(TranslationKey['Send in for rework'])}
            </Button>
          ) : null}
          <Button
            styleType={ButtonStyle.SUCCESS}
            onClick={() => (isClient ? onReceiveCustomProposal() : onEditCustomProposal())}
          >
            {isClient ? t(TranslationKey.Receive) : t(TranslationKey.Send)}
          </Button>
        </div>
      ) : null}
    </div>
  )
})
