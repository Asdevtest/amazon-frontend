import { cx } from '@emotion/css'
import { Box, Container, Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { checkIsPositiveNum } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './set-four-monthes-stock-value-modal.style'

export const SetFourMonthesStockModal = ({ title, onSubmit, onCloseModal, selectedProduct }) => {
  const { classes: classNames } = useClassNames()

  const [newValue, setNewValue] = useState(selectedProduct?.fourMonthesStock || 0)

  return (
    <Container disableGutters className={classNames.root}>
      <Typography className={classNames.modalTitle}>{title}</Typography>

      <Field
        containerClasses={classNames.field}
        // error={error && t(TranslationKey['The number entered must not exceed the " Stock sum" field'])}
        inputProps={{ maxLength: 64 }}
        value={newValue}
        onChange={e => checkIsPositiveNum(e.target.value) && setNewValue(e.target.value)}
      />
      <div className={classNames.errorWrapper}>
        <span className={cx(classNames.standartText, { [classNames.error]: newValue > 99999 })}>{`${t(
          TranslationKey['Maximum value'],
        )} 99999`}</span>
      </div>

      <Box className={classNames.saveBox}>
        <Button
          success
          disabled={/* error || */ !newValue || newValue > 99999}
          className={classNames.saveBtn}
          onClick={() => onSubmit(newValue)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={classNames.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </Box>
    </Container>
  )
}
