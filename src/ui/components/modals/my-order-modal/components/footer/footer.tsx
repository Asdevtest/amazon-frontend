import { isPast, parseISO } from 'date-fns'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './footer.style'

import { IOrderWithAdditionalFields } from '../../my-order-modal.type'

interface FooterProps {
  order: IOrderWithAdditionalFields
  isOrderEditable: boolean
  onClickOpenNewTab: (id: string) => void
  onClickCancelOrder: (id: string) => void
  onClickReorder: (order: IOrderWithAdditionalFields, isPendingOrder: boolean) => void
  onSubmitSaveOrder: (order: IOrderWithAdditionalFields) => void
  isClient?: boolean
}

export const Footer: FC<FooterProps> = memo(props => {
  const { order, isOrderEditable, onClickOpenNewTab, onClickCancelOrder, onClickReorder, onSubmitSaveOrder, isClient } =
    props

  const { classes: styles, cx } = useStyles()

  const showButtons = isClient && isOrderEditable
  const showCancelButton = (isClient && isOrderEditable) || order?.status === 10 // OrderStatusByKey[OrderStatus.READY_TO_PROCESS]
  const showToOrderButton = order?.status <= 3 // OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]
  const isPendingOrder = order?.status > 3 // OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]
  const disabledSaveSubmit = (!!order?.deadline && isPast(parseISO(order?.deadline))) || !order?.amount

  return (
    <div className={styles.footer}>
      <button className={styles.linkToNewTab} onClick={() => onClickOpenNewTab(order._id)}>
        <ShareIcon className={styles.icon} />
      </button>

      {showButtons && (
        <div className={styles.buttons}>
          {showCancelButton && (
            <button className={cx(styles.button, styles.buttonCancel)} onClick={() => onClickCancelOrder(order._id)}>
              {t(TranslationKey['Cancel order'])}
            </button>
          )}
          {showToOrderButton && (
            <button
              className={cx(styles.button, styles.buttonOrder)}
              onClick={() => onClickReorder(order, isPendingOrder)}
            >
              {t(TranslationKey['To order'])}
            </button>
          )}
          <button
            disabled={disabledSaveSubmit}
            className={cx(styles.button, styles.buttonSave)}
            onClick={() => onSubmitSaveOrder(order)}
          >
            {t(TranslationKey.Save)}
          </button>
        </div>
      )}
    </div>
  )
})
