import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useStyles } from './batch-tracking-cell.style'

import { ChangeInputCommentCell, DatePickerCell } from '../data-grid-cells'

interface BatchTrackingCellProps {
  rowHandlers: {
    onClickSaveTrackingNumber: (id: string, value: string) => void
    onClickSaveArrivalDate: (value: string) => void
  }
  id: string
  trackingNumber: string
  arrivalDate: string
  disabled?: boolean
  disableMultilineForTrack?: boolean
}

export const BatchTrackingCell: FC<BatchTrackingCellProps> = React.memo(
  ({ rowHandlers, id, trackingNumber, arrivalDate, disabled, disableMultilineForTrack }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.batchTrackingWrapper}>
        <Field
          containerClasses={styles.batchTrackingContainer}
          label={t(TranslationKey['Track number'])}
          labelClasses={styles.batchTrackingTitle}
          inputComponent={
            <ChangeInputCommentCell
              disableMultiline={disableMultilineForTrack}
              disabled={disabled}
              maxLength={64}
              placeholder={t(TranslationKey['Enter track number'])}
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
