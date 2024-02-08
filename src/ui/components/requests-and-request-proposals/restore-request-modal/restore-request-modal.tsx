import { ChangeEvent, FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './restore-request-modal.style'

interface RestoreRequestModalProps {
  currentRequestsCount: number
  handleCloseModal: () => void
  handleSubmit: (timeoutAt?: string, maxAmountOfProposals?: string | number) => void
  minDate?: string
}

export const RestoreRequestModal: FC<RestoreRequestModalProps> = props => {
  const { currentRequestsCount = 1, minDate, handleCloseModal, handleSubmit } = props
  const { classes: styles, cx } = useStyles()

  const [date, setDate] = useState<string>()
  const [requestCount, setRequestCount] = useState<string | number>(currentRequestsCount + 1)

  return (
    <div className={styles.body}>
      <p className={styles.title}>{t(TranslationKey['Change request terms'])}</p>
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['When do you want results?'])}
        inputComponent={
          <NewDatePicker disablePast minDate={minDate} value={date} onChange={(e: string) => setDate(e)} />
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
            className={cx({ [styles.errorInput]: Number(requestCount) <= currentRequestsCount })}
            value={requestCount}
            slotProps={{
              input: {
                min: currentRequestsCount + 1 || 1,
                step: 1,
              },
            }}
            inputProps={{ maxLength: 7 }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
            handleSubmit(date, requestCount)
            handleCloseModal()
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
