import {Typography} from '@mui/material'

import React, {FC, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {NewDatePicker} from '@components/date-picker/date-picker'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {useRestoreRequestModalStyles} from '@components/requests-and-request-proposals/restore-request-modal/restore-request-modal.styles'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

interface RestoreRequestModalProps {
  currentDate: string
  currentRequestsCount: number
  handleCloseModal: () => void
  handleSubmit: (timeoutAt?: string, maxAmountOfProposals?: string | number) => Promise<void>
}

export const RestoreRequestModal: FC<RestoreRequestModalProps> = props => {
  const {currentDate, currentRequestsCount = 1, handleCloseModal, handleSubmit} = props
  const {classes: styles} = useRestoreRequestModalStyles()

  const [date, setDate] = useState<string>()
  const [requestCount, setRequestCount] = useState<string | number>(currentRequestsCount + 1)

  return (
    <div className={styles.body}>
      <Typography className={styles.title}>{t(TranslationKey['Restoring an application'])}</Typography>
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
        inputComponent={
          <Input
            // type="number"
            value={requestCount}
            slotProps={{
              input: {
                min: currentRequestsCount + 1 || 1,
                step: 1,
              },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              checkIsPositiveNummberAndNoMoreNCharactersAfterDot(e.target.value, 0) && setRequestCount(e.target.value)
            }
          />
        }
      />

      <div className={styles.controls}>
        <Button
          success
          disabled={!date || currentRequestsCount > requestCount}
          className={styles.controlButton}
          onClick={() => {
            handleSubmit(date, requestCount).then(() => handleCloseModal())
          }}
        >
          {t(TranslationKey.Recover)}
        </Button>
        <Button variant="text" className={styles.controlButton} onClick={handleCloseModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
