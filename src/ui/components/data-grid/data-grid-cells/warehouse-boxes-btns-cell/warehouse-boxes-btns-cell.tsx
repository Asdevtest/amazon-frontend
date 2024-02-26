/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
          <Button
            tooltipAttentionContent={
              row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF
                ? t(TranslationKey['The tariff is invalid or has been removed!'])
                : ''
            }
            tooltipInfoContent={t(TranslationKey['Move a box from the current batch to another'])}
            disabled={row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF || row.isDraft}
            className={styles.warehouseBoxesBtn}
            onClick={() => handlers.moveBox(row)}
          >
            {t(TranslationKey['Move box'])}
          </Button>
        )}

      {row.status === BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={row.isDraft}
          tooltipInfoContent={t(TranslationKey['Add a box to a new or existing batch'])}
          className={styles.warehouseBoxesBtn}
          onClick={() => handlers.moveBox(row)}
        >
          {t(TranslationKey['Add to batch'])}
        </Button>
      )}
    </div>
  )
})
