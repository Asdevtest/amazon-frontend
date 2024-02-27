import { FC, memo } from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { ISupplier } from '@typings/models/suppliers/supplier'

import { useStyles } from './toolbar.style'

import { ModalModes } from '../list-suppliers.type'

interface ToolbarProps {
  showViewButtons: boolean
  onSupplierApproximateCalculationsModal: () => void
  onClickTooltipButton: (mode: ModalModes) => void
  readOnly?: boolean
  supplier?: ISupplier
}

export const Toolbar: FC<ToolbarProps> = memo(props => {
  const { showViewButtons, onSupplierApproximateCalculationsModal, onClickTooltipButton, readOnly, supplier } = props

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

  return (
    <div className={styles.toolbar}>
      <p className={styles.tableTitle}>{t(TranslationKey['List of suppliers'])}</p>

      <div className={styles.buttons}>
        {!readOnly && showViewButtons ? (
          <Button
            styleType={ButtonStyle.PRIMARY}
            variant={ButtonVariant.OUTLINED}
            // tooltipAttentionContent={!boxPropertiesIsFullAndMainsValues && t(TranslationKey['Not enough data'])}
            disabled={!boxPropertiesIsFullAndMainsValues}
            className={styles.buttonWithText}
            onClick={onSupplierApproximateCalculationsModal}
          >
            {t(TranslationKey['View an oriented calculation'])}
          </Button>
        ) : null}

        {!readOnly ? (
          <Button
            styleType={ButtonStyle.PRIMARY}
            variant={ButtonVariant.OUTLINED}
            // tooltipInfoContent={t(TranslationKey['Add a new supplier to this product'])}
            className={styles.button}
            onClick={() => onClickTooltipButton(ModalModes.ADD)}
          >
            <AddIcon />
          </Button>
        ) : null}

        {!readOnly ? (
          <Button
            styleType={ButtonStyle.PRIMARY}
            variant={ButtonVariant.OUTLINED}
            // tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
            className={styles.button}
            disabled={!supplier || supplier?.name === ACCESS_DENIED}
            onClick={() => onClickTooltipButton(ModalModes.EDIT)}
          >
            <EditOutlinedIcon />
          </Button>
        ) : null}

        {showViewButtons ? (
          <Button
            styleType={ButtonStyle.PRIMARY}
            variant={ButtonVariant.OUTLINED}
            className={styles.button}
            onClick={() => onClickTooltipButton(ModalModes.VIEW)}
          >
            <EyeIcon />
          </Button>
        ) : null}

        {!readOnly ? (
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

        {!readOnly ? (
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

        {!readOnly ? (
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
