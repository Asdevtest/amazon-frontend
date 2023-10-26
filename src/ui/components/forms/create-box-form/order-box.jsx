import { observer } from 'mobx-react'

import DeleteIcon from '@material-ui/icons/Delete'
import { Checkbox } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { calcVolumeWeightForBox } from '@utils/calculation'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './create-box-form.style'

export const OrderBox = observer(
  ({
    order,
    orderBoxIndex,
    orderBox,
    setFormField,
    setAmountField,
    setDimensionsOfSupplierField,
    onRemoveBox,
    volumeWeightCoefficient,
    currentSupplier,
  }) => {
    const { classes: classNames } = useClassNames()

    return (
      <div className={classNames.numberInputFieldsBlocksWrapper}>
        <div className={classNames.numberInputFieldsBlocksSubWrapper}>
          <div className={classNames.numberInputFieldsWrapper}>
            <Field
              type="number"
              inputProps={{ maxLength: 6 }}
              label={t(TranslationKey['Box length'])}
              error={Number(orderBox.lengthCmSupplier) === 0}
              value={orderBox.lengthCmSupplier}
              onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
            />

            <Field
              type="number"
              inputProps={{ maxLength: 6 }}
              label={t(TranslationKey['Box width'])}
              error={Number(orderBox.widthCmSupplier) === 0}
              value={orderBox.widthCmSupplier}
              onChange={setFormField('widthCmSupplier', orderBoxIndex)}
            />
          </div>

          <div className={classNames.numberInputFieldsWrapper}>
            <Field
              type="number"
              inputProps={{ maxLength: 6 }}
              label={t(TranslationKey['Box height'])}
              error={Number(orderBox.heightCmSupplier) === 0}
              value={orderBox.heightCmSupplier}
              onChange={setFormField('heightCmSupplier', orderBoxIndex)}
            />

            <Field
              type="number"
              inputProps={{ maxLength: 6 }}
              label={t(TranslationKey['Real weight'])}
              error={Number(orderBox.weighGrossKgSupplier) === 0}
              value={orderBox.weighGrossKgSupplier}
              onChange={setFormField('weighGrossKgSupplier', orderBoxIndex)}
            />
          </div>

          <div className={classNames.numberInputFieldsWrapper}>
            <Field
              disabled
              label={t(TranslationKey['Volume weight'])}
              value={toFixed(calcVolumeWeightForBox(orderBox, volumeWeightCoefficient), 2)}
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
            />
          </div>

          <div className={classNames.numberInputFieldsWrapper}>
            <Field
              error={orderBox.amount < 1}
              inputProps={{ maxLength: 3 }}
              label={t(TranslationKey['Quantity of boxes'])}
              value={orderBox.amount}
              onChange={setFormField('amount', orderBoxIndex)}
            />
            <Field
              inputProps={{ maxLength: 7 }}
              error={
                currentSupplier?.multiplicity &&
                currentSupplier?.boxProperties?.amountInBox &&
                orderBox.items[0]?.amount % currentSupplier?.boxProperties?.amountInBox !== 0 &&
                ` ${t(TranslationKey['Value is not a multiple of'])} ${currentSupplier?.boxProperties?.amountInBox}`
              }
              label={t(TranslationKey['Products in a box'])}
              value={orderBox.items[0]?.amount}
              onChange={setAmountField(orderBoxIndex)}
            />
          </div>
        </div>

        <div className={classNames.checkboxWithLabelWrapper}>
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
            containerClasses={classNames.checkboxLabelContainer}
            inputClasses={classNames.hidden}
            labelClasses={classNames.checkboxLabel}
          />
        </div>

        <Button
          tooltipInfoContent={t(TranslationKey['Remove box'])}
          className={classNames.iconBtn}
          onClick={() => onRemoveBox(orderBoxIndex)}
        >
          <DeleteIcon className={classNames.deleteBtn} />
        </Button>
      </div>
    )
  },
)
