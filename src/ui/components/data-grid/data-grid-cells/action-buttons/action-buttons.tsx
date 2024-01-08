import { ChangeEvent, FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './action-buttons.style'

interface ActionButtonsProps {
  rowHandlers?: any
  params?: any
}

export const ActionButtons: FC<ActionButtonsProps> = ({ rowHandlers, params }) => {
  const { classes: styles, cx } = useStyles()
  return (
    <div className={styles.wrapper}>
      <Button
        className={cx(styles.button, styles.repeatButton)}
        onClick={(e: ChangeEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          rowHandlers.onClickReorder(params.row.originalData, false)
        }}
      >
        {t(TranslationKey['Repeat order'])}
      </Button>

      <Button
        className={styles.button}
        variant="outlined"
        onClick={() => rowHandlers.onClickWarehouseOrderButton(params.row.originalData.product._id)}
      >
        {t(TranslationKey['Warehouse and orders'])}
      </Button>
    </div>
  )
}
