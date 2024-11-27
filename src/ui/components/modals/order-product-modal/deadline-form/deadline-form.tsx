import dayjs, { Dayjs } from 'dayjs'
import { t } from 'i18n-js'
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDatePicker } from '@components/shared/custom-date-picker'

import { useStyles } from './deadline-form.style'

import { calculateRecommendedDeadline } from './calculate-recommended-deadline'

interface DeadlineFormProps {
  onSubmit: (date: Dayjs | null) => void
  onClose: () => void
  selectedDeadline: Dayjs | null
  maxProductionTerm: number
}

export const DeadlineForm: FC<DeadlineFormProps> = memo(props => {
  const { onSubmit, onClose, selectedDeadline = null, maxProductionTerm } = props

  const { classes: styles } = useStyles()
  const [desiredDate, setDesiredDate] = useState<Dayjs | null>(null)
  const [deadline, setDeadline] = useState<Dayjs | null>(selectedDeadline)

  const handleSubmit = () => {
    onSubmit(deadline)
    onClose()
  }
  const handleSelectRecommendedDeadline = () => {
    if (recommendedDeadline) {
      setDeadline(dayjs(recommendedDeadline))
    }
  }

  const recommendedDeadline = desiredDate ? calculateRecommendedDeadline(desiredDate, maxProductionTerm) : null
  const recommendedButtonText = recommendedDeadline
    ? `${t(TranslationKey.Recommended)}: ${dayjs(recommendedDeadline).format('DD.MM.YYYY')}`
    : ''

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Set dates'])}</p>

      <div className={styles.content}>
        <CustomDatePicker
          fullWidth
          format="DD.MM.YYYY"
          label="Due shipment date"
          minDate={dayjs().add(2, 'day')}
          value={desiredDate}
          onChange={date => setDesiredDate(date)}
        />

        <div className={styles.deadline}>
          <CustomDatePicker
            fullWidth
            format="DD.MM.YYYY"
            label="Deadline"
            minDate={dayjs().add(2, 'day')}
            value={deadline}
            onChange={date => setDeadline(date)}
          />

          {recommendedDeadline ? (
            <CustomButton
              type="link"
              variant="link"
              size="small"
              className={styles.button}
              onClick={handleSelectRecommendedDeadline}
            >
              {recommendedButtonText}
            </CustomButton>
          ) : null}
        </div>
      </div>

      <div className={styles.buttons}>
        <CustomButton disabled={!deadline} type="primary" onClick={handleSubmit}>
          {t(TranslationKey.Select)}
        </CustomButton>

        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
