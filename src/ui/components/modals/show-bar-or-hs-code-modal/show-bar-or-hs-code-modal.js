import { Container, Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'

import { t } from '@utils/translations'

import { useStyles } from './show-bar-or-hs-code-modal.style'

export const ShowBarOrHscodeModal = ({ barcode, hscode, onCloseModal }) => {
  const { classes: styles } = useStyles()

  const renderText = () => {
    if (barcode) {
      return (
        <div className={styles.modalTitleWrapper}>
          <Link className={styles.modalTitle} target="__blank" href={barcode}>
            {barcode}
          </Link>
          <CopyValue text={barcode} />
        </div>
      )
    } else if (hscode) {
      return (
        <div className={styles.modalTitleWrapper}>
          <Typography className={styles.modalTitle}>{hscode}</Typography>
          <CopyValue text={hscode} />
        </div>
      )
    } else {
      return <Typography className={styles.modalNoTitle}>{t(TranslationKey['No data'])}</Typography>
    }
  }

  return (
    <Container disableGutters>
      <div className={styles.modalWrapper}>
        {renderText()}
        <div className={styles.modalBtnWrapper}>
          <Button onClick={onCloseModal}>{t(TranslationKey.Close)}</Button>
        </div>
      </div>
    </Container>
  )
}
