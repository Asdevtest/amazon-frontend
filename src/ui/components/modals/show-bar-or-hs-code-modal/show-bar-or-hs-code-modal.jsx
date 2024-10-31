import { Container, Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value/copy-value'
import { CustomButton } from '@components/shared/custom-button'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './show-bar-or-hs-code-modal.style'

export const ShowBarOrHscodeModal = ({ barcode, hscode, onCloseModal }) => {
  const { classes: styles } = useStyles()

  const renderText = () => {
    if (barcode) {
      return (
        <div className={styles.modalTitleWrapper}>
          <Link className={styles.modalTitle} target="__blank" href={checkAndMakeAbsoluteUrl(barcode)}>
            {barcode}
          </Link>
          <CopyValue text={barcode} />
        </div>
      )
    } else if (hscode) {
      return (
        <div className={styles.modalTitleWrapper}>
          <p className={styles.modalTitle}>{hscode}</p>
          <CopyValue text={hscode} />
        </div>
      )
    } else {
      return <p className={styles.modalNoTitle}>{t(TranslationKey['No data'])}</p>
    }
  }

  return (
    <Container disableGutters>
      <div className={styles.modalWrapper}>
        {renderText()}
        <div className={styles.modalBtnWrapper}>
          <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>
    </Container>
  )
}
