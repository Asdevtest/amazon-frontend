import { cx } from '@emotion/css'
import React, { FC, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { useRestoreRequestModalStyles } from '@components/requests-and-request-proposals/restore-request-modal/restore-request-modal.styles'
import { Button } from '@components/shared/buttons/button'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

interface RestoreRequestModalProps {
  currentDate: string
  currentRequestsCount: number
  handleCloseModal: () => void
  handleSubmit: (timeoutAt?: string, maxAmountOfProposals?: string | number) => Promise<void>
}

export const RestoreRequestModal: FC<RestoreRequestModalProps> = props => {
  const { currentDate, currentRequestsCount = 1, handleCloseModal, handleSubmit } = props
  const { classes: styles } = useRestoreRequestModalStyles()

  const [date, setDate] = useState<string>()
  const [requestCount, setRequestCount] = useState<string | number>(currentRequestsCount + 1)

  return (
    <div className={styles.body}>
      <Typography className={styles.title}>{t(TranslationKey['Change request terms'])}</Typography>
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['When do you want results?'])}
        inputComponent={
          <NewDatePicker
            disablePast
            minDate={currentDate}
            value={date}
            onChange={(e: string) => {
              setDate(e)
            }}
          />
        }
      />
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['Enter the number of proposals'])}
        error={
          Number(requestCount) <= currentRequestsCount && `${t(TranslationKey['At least'])} ${currentRequestsCount}`
        }
        inputComponent={
          <Input
            // type="number"
            className={cx({ [styles.errorInput]: Number(requestCount) <= currentRequestsCount })}
            value={requestCount}
            slotProps={{
              input: {
                min: currentRequestsCount + 1 || 1,
                step: 1,
              },
            }}
            inputProps={{ maxLength: 7 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              checkIsPositiveNummberAndNoMoreNCharactersAfterDot(e.target.value, 0) &&
              setRequestCount(e.target.value.replace('.', ''))
            }
          />
        }
      />

      <div className={styles.controls}>
        <Button
          success
          disabled={!date || currentRequestsCount > Number(requestCount)}
          className={styles.controlButton}
          onClick={() => {
            handleSubmit(date, requestCount).then(() => handleCloseModal())
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={cx(styles.controlButton, styles.cancelButton)} onClick={handleCloseModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
