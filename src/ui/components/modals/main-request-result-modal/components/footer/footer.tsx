import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './footer.style'

interface FooterProps {
  isClient: boolean
  onEditCustomProposal: () => void
  onOpenModal: () => void
}

export const Footer: FC<FooterProps> = memo(props => {
  const { isClient, onEditCustomProposal, onOpenModal } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <Button styleType={ButtonType.DANGER} onClick={onOpenModal}>
        {t(TranslationKey.Cancel)}
      </Button>

      <div className={styles.flexContainer}>
        {isClient ? (
          <Button styleType={ButtonType.PRIMARY} onClick={onEditCustomProposal}>
            {t(TranslationKey['Send in for rework'])}
          </Button>
        ) : null}
        <Button styleType={ButtonType.SUCCESS}>{isClient ? t(TranslationKey.Receive) : t(TranslationKey.Send)}</Button>
      </div>
    </div>
  )
})
