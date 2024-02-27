import dayjs from 'dayjs'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { ShareIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { OrderStatus } from '@typings/enums/order-status'

import { useStyles } from './footer.style'

import { IOrderWithAdditionalFields } from '../../my-order-modal.type'

interface FooterProps {
  formFields: IOrderWithAdditionalFields
  isOrderEditable: boolean
  stateComparison: boolean
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
    stateComparison,
    onClickOpenNewTab,
    onClickCancelOrder,
    onClickReorder,
    onSubmitSaveOrder,
    isClient,
  } = props

  const { classes: styles } = useStyles()

  const showButtons = isClient && isOrderEditable
  const showCancelButton = showButtons || formFields?.status === OrderStatus.READY_TO_PROCESS
  const showToOrderButton = formFields?.status <= OrderStatus.READY_FOR_BUYOUT
  const isPendingOrder = formFields?.status > OrderStatus.READY_FOR_BUYOUT
  const minDate = dayjs().startOf('day').add(2, 'day')
  const isNotValidDate = new Date(formFields.deadline as string) < new Date(minDate.toString()) && !!formFields.deadline
  const disabledSaveSubmit = isNotValidDate || !formFields?.amount || stateComparison

  return (
    <div className={styles.footer}>
      <button className={styles.linkToNewTab} onClick={() => onClickOpenNewTab(formFields?._id)}>
        <ShareIcon className={styles.icon} />
      </button>

      <div className={styles.buttons}>
        {showCancelButton ? (
          <Button styleType={ButtonStyle.DANGER} onClick={() => onClickCancelOrder(formFields?._id)}>
            {t(TranslationKey['Cancel order'])}
          </Button>
        ) : null}

        {showButtons ? (
          <>
            {showToOrderButton && (
              <Button styleType={ButtonStyle.PRIMARY} onClick={() => onClickReorder(formFields, isPendingOrder)}>
                {t(TranslationKey['To order'])}
              </Button>
            )}

            <Button
              styleType={ButtonStyle.SUCCESS}
              disabled={disabledSaveSubmit}
              onClick={() => onSubmitSaveOrder(formFields)}
            >
              {t(TranslationKey.Save)}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  )
})
