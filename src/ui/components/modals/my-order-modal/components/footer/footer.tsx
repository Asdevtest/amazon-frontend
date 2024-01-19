import { isPast } from 'date-fns'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { OrderStatus } from '@typings/enums/order-status'

import { useStyles } from './footer.style'

import { IOrderWithAdditionalFields } from '../../my-order-modal.type'

interface FooterProps {
  formFields: IOrderWithAdditionalFields
  isOrderEditable: boolean
  onClickOpenNewTab: (id: string) => void
  onClickCancelOrder: (id: string) => void
  onClickReorder: (order: IOrderWithAdditionalFields, isPendingOrder: boolean) => void
  onSubmitSaveOrder: (order: IOrderWithAdditionalFields) => void
  isClient?: boolean
}

export const Footer: FC<FooterProps> = memo(props => {
  const {
    formFields,
    isOrderEditable,
    onClickOpenNewTab,
    onClickCancelOrder,
    onClickReorder,
    onSubmitSaveOrder,
    isClient,
  } = props

  const { classes: styles, cx } = useStyles()

  const showButtons = isClient && isOrderEditable
  const showCancelButton = showButtons || formFields?.status === OrderStatus.READY_TO_PROCESS
  const showToOrderButton = formFields?.status <= OrderStatus.READY_FOR_BUYOUT
  const isPendingOrder = formFields?.status > OrderStatus.READY_FOR_BUYOUT
  const disabledSaveSubmit = (formFields?.deadline && isPast(new Date(formFields?.deadline))) || !formFields?.amount

  return (
    <div className={styles.footer}>
      <button className={styles.linkToNewTab} onClick={() => onClickOpenNewTab(formFields?._id)}>
        <ShareIcon className={styles.icon} />
      </button>

      <div className={styles.buttons}>
        {showCancelButton ? (
          <button
            className={cx(styles.button, styles.buttonCancel)}
            onClick={() => onClickCancelOrder(formFields?._id)}
          >
            {t(TranslationKey['Cancel order'])}
          </button>
        ) : null}

        {showButtons ? (
          <>
            {showToOrderButton && (
              <button
                className={cx(styles.button, styles.buttonOrder)}
                onClick={() => onClickReorder(formFields, isPendingOrder)}
              >
                {t(TranslationKey['To order'])}
              </button>
            )}

            <button
              disabled={disabledSaveSubmit}
              className={cx(styles.button, styles.buttonSave)}
              onClick={() => onSubmitSaveOrder(formFields)}
            >
              {t(TranslationKey.Save)}
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
})
