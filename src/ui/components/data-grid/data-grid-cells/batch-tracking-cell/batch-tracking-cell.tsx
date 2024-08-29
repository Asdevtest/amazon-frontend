import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useStyles } from './batch-tracking-cell.style'

import { DatePickerCell } from '../date-picker-cell/date-picker-cell'

interface BatchTrackingCellProps {
  rowHandlers: {
    onClickSaveTrackingNumber: (id: string, value: string) => void
    onClickSaveArrivalDate: (id: string, value: string) => void
  }
  id: string
  trackingNumber: string
  arrivalDate: string
  disabled?: boolean
}

export const BatchTrackingCell: FC<BatchTrackingCellProps> = memo(
  ({ rowHandlers, id, trackingNumber, arrivalDate, disabled }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.batchTrackingWrapper}>
        <Field
          containerClasses={styles.batchTrackingContainer}
          label={t(TranslationKey['Track number'])}
          labelClasses={styles.batchTrackingTitle}
          inputComponent={
            <Text
              editMode={!disabled}
              text={trackingNumber}
              onClickSubmit={value => rowHandlers?.onClickSaveTrackingNumber(id, value)}
            />
          }
        />

        <Field
          containerClasses={styles.batchTrackingContainer}
          label={t(TranslationKey['Arrival date'])}
          labelClasses={styles.batchTrackingTitle}
          inputComponent={
            <DatePickerCell
              disabled={disabled}
              id={id}
              arrivalDate={arrivalDate}
              onClickSaveArrivalDate={rowHandlers?.onClickSaveArrivalDate}
            />
          }
        />
      </div>
    )
  },
)
