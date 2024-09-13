/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './warehouse-boxes-btns-cell.style'

interface WarehouseBoxesBtnsCellProps {
  row: any
  handlers: {
    moveBox: (row: any) => void
  }
}

export const WarehouseBoxesBtnsCell: FC<WarehouseBoxesBtnsCellProps> = memo(({ row, handlers }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.warehouseBoxesBtnsWrapper}>
      {row.status !== BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
        <p>{t(TranslationKey['Not ready to ship'])}</p>
      )}

      {row.batchId &&
        row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE &&
        row.status !== BoxStatus.NEW && (
          <CustomButton
            block
            type="primary"
            size="small"
            disabled={row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF || row.isDraft}
            onClick={() => handlers.moveBox(row)}
          >
            {t(TranslationKey['Move box'])}
          </CustomButton>
        )}

      {row.status === BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
        <CustomButton block type="primary" size="small" disabled={row.isDraft} onClick={() => handlers.moveBox(row)}>
          {t(TranslationKey['Add to batch'])}
        </CustomButton>
      )}
    </div>
  )
})
