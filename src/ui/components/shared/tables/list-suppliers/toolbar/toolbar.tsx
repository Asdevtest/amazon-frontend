import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { DeleteIcon, EditIcon, EyeIcon } from '@components/shared/svg-icons'

import { checkIsBuyer, checkIsClient, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { OrderStatus } from '@typings/enums/order/order-status'
import { ProductStatus } from '@typings/enums/product/product-status'
import { ISupplier } from '@typings/models/suppliers/supplier'
import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './toolbar.style'

import { ModalModes } from '../list-suppliers.type'

import { buyerValidProductStatuses, clientValidProductStatuses, ideaValidStatuses } from './toolbar.constants'

interface ToolbarProps {
  status: number
  orderStatus: number
  isSupplerSelected: boolean
  isCurrentSupplierSelected: boolean
  onSupplierActions: (mode: ModalModes) => void
  onSupplierApproximateCalculationsModal: () => void
  readOnly?: boolean
  userInfo?: IFullUser
  supplier?: ISupplier
  isDefaultSupplier?: boolean
  checkIsPlanningPrice?: boolean
  isNotProductNameForIdea?: boolean
}

export const Toolbar: FC<ToolbarProps> = memo(props => {
  const {
    status,
    orderStatus,
    isSupplerSelected,
    isCurrentSupplierSelected,
    onSupplierActions,
    onSupplierApproximateCalculationsModal,
    readOnly,
    userInfo,
    supplier,
    isDefaultSupplier,
    checkIsPlanningPrice,
    isNotProductNameForIdea,
  } = props

  const { classes: styles } = useStyles()

  const isSelectedOwner =
    userInfo?._id === supplier?.createdBy?._id || userInfo?.masterUser?._id === supplier?.createdBy?._id

  const showViewCalculationButton =
    isSupplerSelected &&
    !!userInfo &&
    (checkIsClient(UserRoleCodeMap[userInfo?.role]) ||
      checkIsBuyer(UserRoleCodeMap[userInfo?.role]) ||
      checkIsSupervisor(UserRoleCodeMap[userInfo?.role])) /* && !ideaValidStatuses.includes(status) */

  const showAddSupplierButton =
    !readOnly &&
    !!userInfo &&
    ((checkIsClient(UserRoleCodeMap[userInfo?.role]) && clientValidProductStatuses.includes(status)) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) &&
        [OrderStatus.PENDING, OrderStatus.AT_PROCESS].includes(orderStatus)) ||
      ((checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
        ideaValidStatuses.includes(status)) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) && !orderStatus) ||
      ((checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) && !status))

  const showEditSupplierButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    ((checkIsClient(UserRoleCodeMap[userInfo?.role]) && clientValidProductStatuses.includes(status)) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) &&
        [OrderStatus.PENDING, OrderStatus.AT_PROCESS].includes(orderStatus)) ||
      ((checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
        ideaValidStatuses.includes(status) &&
        isSelectedOwner) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) && isSelectedOwner && !orderStatus))

  const showToggleCurrentSupplierButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    ((checkIsClient(UserRoleCodeMap[userInfo?.role]) && clientValidProductStatuses.includes(status)) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) && buyerValidProductStatuses.includes(status)) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) &&
        [OrderStatus.PENDING, OrderStatus.AT_PROCESS].includes(orderStatus)))

  const showRemoveCurrentSupplierButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    (checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
    (status === ProductStatus.BUYER_PICKED_PRODUCT || (ideaValidStatuses.includes(status) && isSelectedOwner))

  const boxPropertiesIsFullAndMainsValues =
    supplier?.boxProperties?.amountInBox &&
    supplier?.boxProperties?.boxLengthCm &&
    supplier?.boxProperties?.boxWidthCm &&
    supplier?.boxProperties?.boxHeightCm &&
    supplier?.boxProperties?.boxWeighGrossKg &&
    supplier?.amount &&
    supplier?.minlot &&
    supplier?.priceInYuan &&
    supplier?.price
  const isPendingOrderAndNotDefaultSupplier =
    userInfo &&
    checkIsBuyer(UserRoleCodeMap[userInfo?.role]) &&
    !isDefaultSupplier &&
    orderStatus === OrderStatus.PENDING
  const isAtProcessOrder =
    userInfo &&
    checkIsBuyer(UserRoleCodeMap[userInfo?.role]) &&
    orderStatus === OrderStatus.AT_PROCESS &&
    checkIsPlanningPrice
  const disabledAddSupplierButtonWhenCreateIdea =
    userInfo &&
    (checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
    isNotProductNameForIdea
  const disabledEditSupplierButton =
    !supplier ||
    supplier?.name === ACCESS_DENIED ||
    isAtProcessOrder ||
    isPendingOrderAndNotDefaultSupplier ||
    (userInfo &&
      checkIsBuyer(UserRoleCodeMap[userInfo?.role]) &&
      userInfo?._id !== supplier?.createdBy?._id &&
      userInfo?.masterUser?._id !== supplier?.createdBy?._id)
  const tooltipAttentionContentEditSupplierButton = isPendingOrderAndNotDefaultSupplier
    ? t(TranslationKey['Editing is unavailable due to change of current supplier'])
    : ''

  return (
    <div className={styles.toolbar}>
      <p className={styles.tableTitle}>{t(TranslationKey['List of suppliers'])}</p>

      <div className={styles.buttons}>
        <Button
          variant={ButtonVariant.OUTLINED}
          disabled={!boxPropertiesIsFullAndMainsValues || !showViewCalculationButton}
          className={styles.buttonWithText}
          onClick={onSupplierApproximateCalculationsModal}
        >
          {t(TranslationKey['View an oriented calculation'])}
        </Button>

        <Button
          iconButton
          className={styles.button}
          disabled={isAtProcessOrder || disabledAddSupplierButtonWhenCreateIdea || !showAddSupplierButton}
          onClick={() => onSupplierActions(ModalModes.ADD)}
        >
          <FiPlus style={{ width: 16, height: 16 }} />
        </Button>

        <Button
          iconButton
          tooltipAttentionContent={tooltipAttentionContentEditSupplierButton}
          className={styles.button}
          disabled={disabledEditSupplierButton || !showEditSupplierButton}
          onClick={() => onSupplierActions(ModalModes.EDIT)}
        >
          <EditIcon />
        </Button>

        <Button
          iconButton
          disabled={!isSupplerSelected}
          className={styles.button}
          onClick={() => onSupplierActions(ModalModes.VIEW)}
        >
          <EyeIcon />
        </Button>

        <Button
          iconButton
          styleType={ButtonStyle.DANGER}
          className={styles.button}
          disabled={isAtProcessOrder || !(showToggleCurrentSupplierButton && isCurrentSupplierSelected)}
          onClick={() => onSupplierActions(ModalModes.ACCERT_REVOKE)}
        >
          <IoMdClose size={18} />
        </Button>

        <Button
          iconButton
          styleType={ButtonStyle.SUCCESS}
          className={styles.button}
          disabled={isAtProcessOrder || !(showToggleCurrentSupplierButton && !isCurrentSupplierSelected)}
          onClick={() => onSupplierActions(ModalModes.ACCEPT)}
        >
          <IoMdCheckmark size={18} />
        </Button>

        <Button
          iconButton
          disabled={!showRemoveCurrentSupplierButton}
          styleType={ButtonStyle.DANGER}
          className={styles.button}
          onClick={() => onSupplierActions(ModalModes.DELETE)}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  )
})
