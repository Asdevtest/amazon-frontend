import { ChangeEvent, FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { DatePicker } from '@components/shared/date-picker'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './restore-request-modal.style'

interface RestoreRequestModalProps {
  currentRequestsCount: number
  handleCloseModal: () => void
  handleSubmit: (timeoutAt?: string, maxAmountOfProposals?: string | number) => void
  currentDate?: string
  minDate?: string
}

export const RestoreRequestModal: FC<RestoreRequestModalProps> = props => {
  const { currentRequestsCount = 1, currentDate, minDate, handleCloseModal, handleSubmit } = props
  const { classes: styles, cx } = useStyles()

  const [date, setDate] = useState<string>(currentDate || '')
  const [requestCount, setRequestCount] = useState<string | number>(currentRequestsCount)

  const disableButton =
    (!date || date === currentDate) &&
    (currentRequestsCount > Number(requestCount) || currentRequestsCount === Number(requestCount))

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Change request terms'])}</p>
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['When do you want results?'])}
        inputComponent={<DatePicker disablePast minDate={minDate} value={date} onChange={(e: string) => setDate(e)} />}
      />
      <Field
        labelClasses={styles.label}
        label={t(TranslationKey['Enter the number of proposals'])}
        error={
          Number(requestCount) < currentRequestsCount && `${t(TranslationKey['At least'])} ${currentRequestsCount}`
        }
        inputComponent={
          <Input
            className={cx({ [styles.errorInput]: Number(requestCount) < currentRequestsCount })}
            value={requestCount}
            slotProps={{
              input: {
                min: currentRequestsCount || 1,
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
        <CustomButton
          type="primary"
          disabled={disableButton}
          onClick={() => {
            handleSubmit(date, requestCount)
            handleCloseModal()
          }}
        >
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton onClick={handleCloseModal}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </>
  )
}
