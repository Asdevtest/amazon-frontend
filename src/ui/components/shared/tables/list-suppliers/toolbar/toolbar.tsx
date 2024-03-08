import { FC, memo } from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { EyeIcon } from '@components/shared/svg-icons'

import { checkIsBuyer, checkIsClient, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { ProductStatus } from '@typings/enums/product-status'
import { ISupplier } from '@typings/models/suppliers/supplier'
import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './toolbar.style'

import { ModalModes } from '../list-suppliers.type'

import {
  allIdeaStatuses,
  buyerValidProductStatuses,
  clientValidProductStatuses,
  ideaValidStatuses,
} from './toolbar.constants'

interface ToolbarProps {
  isSupplerSelected: boolean
  status: number
  onSupplierApproximateCalculationsModal: () => void
  onClickTooltipButton: (mode: ModalModes) => void
  readOnly?: boolean
  userInfo?: IFullUser
  supplier?: ISupplier
}

export const Toolbar: FC<ToolbarProps> = memo(props => {
  const {
    isSupplerSelected,
    status,
    onSupplierApproximateCalculationsModal,
    onClickTooltipButton,
    readOnly,
    userInfo,
    supplier,
  } = props

  const { classes: styles } = useStyles()

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
  const showViewCalculationButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    (checkIsClient(UserRoleCodeMap[userInfo?.role]) ||
      checkIsBuyer(UserRoleCodeMap[userInfo?.role]) ||
      checkIsSupervisor(UserRoleCodeMap[userInfo?.role])) &&
    !ideaValidStatuses.includes(status)
  const showVisibleButton = isSupplerSelected
  const showAddSupplierButton =
    !readOnly &&
    !!userInfo &&
    ((checkIsClient(UserRoleCodeMap[userInfo?.role]) && clientValidProductStatuses.includes(status)) ||
      checkIsBuyer(UserRoleCodeMap[userInfo?.role]) ||
      ((checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
        allIdeaStatuses.includes(status)))
  const showEditSupplierButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    ((checkIsClient(UserRoleCodeMap[userInfo?.role]) && clientValidProductStatuses.includes(status)) ||
      checkIsBuyer(UserRoleCodeMap[userInfo?.role]) ||
      ((checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
        allIdeaStatuses.includes(status)))
  const showToggleCurrentSupplierButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    ((checkIsClient(UserRoleCodeMap[userInfo?.role]) && clientValidProductStatuses.includes(status)) ||
      (checkIsBuyer(UserRoleCodeMap[userInfo?.role]) && buyerValidProductStatuses.includes(status)))
  const showRemoveCurrentSupplierButton =
    !readOnly &&
    isSupplerSelected &&
    !!userInfo &&
    (checkIsClient(UserRoleCodeMap[userInfo?.role]) || checkIsBuyer(UserRoleCodeMap[userInfo?.role])) &&
    status === ProductStatus.BUYER_PICKED_PRODUCT

  return (
    <div className={styles.toolbar}>
      <p className={styles.tableTitle}>{t(TranslationKey['List of suppliers'])}</p>

      <div className={styles.buttons}>
        {showViewCalculationButton ? (
          <Button
            variant={ButtonVariant.OUTLINED}
            // tooltipAttentionContent={!boxPropertiesIsFullAndMainsValues && t(TranslationKey['Not enough data'])}
            disabled={!boxPropertiesIsFullAndMainsValues}
            className={styles.buttonWithText}
            onClick={onSupplierApproximateCalculationsModal}
          >
            {t(TranslationKey['View an oriented calculation'])}
          </Button>
        ) : null}

        {showAddSupplierButton ? (
          <Button
            variant={ButtonVariant.OUTLINED}
            // tooltipInfoContent={t(TranslationKey['Add a new supplier to this product'])}
            className={styles.button}
            onClick={() => onClickTooltipButton(ModalModes.ADD)}
          >
            <AddIcon />
          </Button>
        ) : null}

        {showEditSupplierButton ? (
          <Button
            variant={ButtonVariant.OUTLINED}
            // tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
            className={styles.button}
            disabled={!supplier || supplier?.name === ACCESS_DENIED}
            onClick={() => onClickTooltipButton(ModalModes.EDIT)}
          >
            <EditOutlinedIcon />
          </Button>
        ) : null}

        {showVisibleButton ? (
          <Button
            variant={ButtonVariant.OUTLINED}
            className={styles.button}
            onClick={() => onClickTooltipButton(ModalModes.VIEW)}
          >
            <EyeIcon />
          </Button>
        ) : null}

        {showToggleCurrentSupplierButton ? (
          <Button
            styleType={ButtonStyle.DANGER}
            variant={ButtonVariant.OUTLINED}
            className={styles.button}
            // tooltipInfoContent={t(TranslationKey['Remove the current supplier'])}
            onClick={() => onClickTooltipButton(ModalModes.ACCERT_REVOKE)}
          >
            <AcceptRevokeIcon />
          </Button>
        ) : null}

        {showToggleCurrentSupplierButton ? (
          <Button
            styleType={ButtonStyle.SUCCESS}
            variant={ButtonVariant.OUTLINED}
            className={styles.button}
            // tooltipInfoContent={t(TranslationKey['Select a supplier as the current supplier'])}
            onClick={() => onClickTooltipButton(ModalModes.ACCEPT)}
          >
            {<AcceptIcon />}
          </Button>
        ) : null}

        {showRemoveCurrentSupplierButton ? (
          <Button
            styleType={ButtonStyle.DANGER}
            variant={ButtonVariant.OUTLINED}
            // tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
            className={styles.button}
            onClick={() => onClickTooltipButton(ModalModes.DELETE)}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        ) : null}
      </div>
    </div>
  )
})
