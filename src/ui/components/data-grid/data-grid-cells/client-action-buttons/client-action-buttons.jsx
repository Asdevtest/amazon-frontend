import { TranslationKey } from '@constants/translations/translation-key'

import { NormalActionBtnCell } from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

import { useStyles } from './client-action-buttons.style'

export const ClientActionButtons = ({ rowHandlers, params }) => {
  const { classes: styles } = useStyles()
  return (
    <div className={styles.wrapper}>
      <NormalActionBtnCell
        fullWidthButton
        bTnText={t(TranslationKey['Repeat order'])}
        onClickOkBtn={e => {
          e.stopPropagation()
          rowHandlers.onClickReorder(params.row.originalData, false)
        }}
      />
      <NormalActionBtnCell
        fullWidthButton
        variant="outlined"
        bTnText={t(TranslationKey['Warehouse and orders'])}
        onClickOkBtn={() => rowHandlers.onClickWarehouseOrderButton(params.row.originalData.product._id)}
      />
    </div>
  )
}
