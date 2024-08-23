import { memo } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { Checkbox } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { calcVolumeWeightForBox } from '@utils/calculation'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './create-box-form.style'

export const OrderBox = memo(props => {
  const {
    order,
    orderBoxIndex,
    orderBox,
    setFormField,
    setAmountField,
    setDimensionsOfSupplierField,
    onRemoveBox,
    volumeWeightCoefficient,
    currentSupplier,
    sizeSetting,
  } = props

  const { classes: styles } = useStyles()

  const isNormalLength =
    maxBoxSizeFromOption(sizeSetting, Number(orderBox.lengthCmSupplier)) || Number(orderBox.lengthCmSupplier) === 0
  const isNormalWidth =
    maxBoxSizeFromOption(sizeSetting, Number(orderBox.widthCmSupplier)) || Number(orderBox.widthCmSupplier) === 0
  const isNormalHeight =
    maxBoxSizeFromOption(sizeSetting, Number(orderBox.heightCmSupplier)) || Number(orderBox.heightCmSupplier) === 0

  return (
    <div className={styles.numberInputFieldsBlocksWrapper}>
      <div className={styles.numberInputFieldsBlocksSubWrapper}>
        <div className={styles.numberInputFieldsWrapper}>
          <Field
            inputProps={{ maxLength: 6 }}
            label={t(TranslationKey['Box length'])}
            error={isNormalLength}
            value={orderBox.lengthCmSupplier}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
            onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
          />

          <Field
            inputProps={{ maxLength: 6 }}
            label={t(TranslationKey['Box width'])}
            error={isNormalWidth}
            value={orderBox.widthCmSupplier}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
            onChange={setFormField('widthCmSupplier', orderBoxIndex)}
          />
        </div>

        <div className={styles.numberInputFieldsWrapper}>
          <Field
            inputProps={{ maxLength: 6 }}
            label={t(TranslationKey['Box height'])}
            error={isNormalHeight}
            value={orderBox.heightCmSupplier}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
            onChange={setFormField('heightCmSupplier', orderBoxIndex)}
          />

          <Field
            inputProps={{ maxLength: 6 }}
            label={t(TranslationKey['Real weight'])}
            error={Number(orderBox.weighGrossKgSupplier) === 0}
            value={orderBox.weighGrossKgSupplier}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
            onChange={setFormField('weighGrossKgSupplier', orderBoxIndex)}
          />
        </div>

        <div className={styles.numberInputFieldsWrapper}>
          <Field
            disabled
            label={t(TranslationKey['Volume weight'])}
            value={toFixed(calcVolumeWeightForBox(orderBox, volumeWeightCoefficient), 2)}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
          />

          <Field
            disabled
            label={t(TranslationKey['Final weight'])}
            value={toFixed(
              Math.max(
                (orderBox.heightCmSupplier * orderBox.widthCmSupplier * orderBox.lengthCmSupplier) /
                  volumeWeightCoefficient,
                orderBox.weighGrossKgSupplier,
              ),
              2,
            )}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
          />
        </div>

        <div className={styles.numberInputFieldsWrapper}>
          <Field
            error={orderBox.amount < 1}
            inputProps={{ maxLength: 3 }}
            label={t(TranslationKey['Quantity of boxes'])}
            value={orderBox.amount}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
            onChange={setFormField('amount', orderBoxIndex)}
          />
          <Field
            inputProps={{ maxLength: 7 }}
            error={
              currentSupplier?.multiplicity &&
              currentSupplier?.boxProperties?.amountInBox &&
              orderBox.items[0]?.amount % currentSupplier?.boxProperties?.amountInBox !== 0 &&
              ` ${t(TranslationKey['Not a multiple of'])} ${currentSupplier?.boxProperties?.amountInBox}`
            }
            label={t(TranslationKey['Products in a box'])}
            value={orderBox.items[0]?.amount}
            inputClasses={styles.input}
            labelClasses={styles.checkboxLabel}
            onChange={setAmountField(orderBoxIndex)}
          />
        </div>
      </div>

      <div className={styles.checkboxWithLabelWrapper}>
        <Checkbox
          color="primary"
          disabled={!order.orderSupplier?.boxProperties}
          checked={orderBox?.tmpUseCurrentSupplierDimensions}
          onChange={setDimensionsOfSupplierField(orderBoxIndex)}
        />
        <Field
          tooltipInfoContent={t(
            TranslationKey['Allows you to use the box parameters specified when creating a supplier'],
          )}
          label={t(TranslationKey['Use the supplier standard'])}
          containerClasses={styles.checkboxLabelContainer}
          inputClasses={styles.hidden}
          labelClasses={styles.checkboxLabel}
        />
      </div>

      <div>
        <Button iconButton variant={ButtonVariant.OUTLINED} onClick={() => onRemoveBox(orderBoxIndex)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  )
})
