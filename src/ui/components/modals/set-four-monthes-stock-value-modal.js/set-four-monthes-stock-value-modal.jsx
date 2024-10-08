import { useState } from 'react'

import { Box, Container, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { checkIsPositiveNum } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './set-four-monthes-stock-value-modal.style'

export const SetFourMonthesStockModal = ({ title, onSubmit, onCloseModal, selectedProduct }) => {
  const { classes: styles, cx } = useStyles()

  const [newValue, setNewValue] = useState(selectedProduct?.fourMonthesStock || 0)

  return (
    <Container disableGutters className={styles.root}>
      <Typography className={styles.modalTitle}>{title}</Typography>

      <Field
        containerClasses={styles.field}
        // error={error && t(TranslationKey['The number entered must not exceed the " Stock sum" field'])}
        inputProps={{ maxLength: 64 }}
        value={newValue}
        onChange={e => checkIsPositiveNum(e.target.value) && setNewValue(e.target.value)}
      />
      <div className={styles.errorWrapper}>
        <span className={cx(styles.standartText, { [styles.error]: newValue > 99999 })}>{`${t(
          TranslationKey['Maximum value'],
        )} 99999`}</span>
      </div>

      <Box className={styles.saveBox}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={!newValue || newValue > 99999}
          className={styles.saveBtn}
          onClick={() => onSubmit(newValue)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} className={styles.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
