import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './request-standart-result-form.style'

export const RequestStandartResultForm = ({ setOpenModal, proposal }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.headerText}>{t(TranslationKey.Result)}</p>

      <p className={styles.resultText}>{proposal?.details?.result}</p>

      <div className={styles.resultWrapper}>
        <PhotoAndFilesSlider
          smallSlider
          files={proposal?.proposal?.media?.map(el => ('fileLink' in el ? el?.fileLink : el))}
        />
      </div>
      <div className={styles.btnsWrapper}>
        <Button
          variant={ButtonVariant.OUTLINED}
          className={cx(styles.button, styles.cancelButton)}
          onClick={setOpenModal}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
