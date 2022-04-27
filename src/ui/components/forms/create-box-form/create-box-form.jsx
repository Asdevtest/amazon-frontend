import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {useState} from 'react'

import {Button, Divider, Typography, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {getOrderStatusOptionByCode} from '@constants/order-status'
import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {LabelField} from '@components/label-field/label-field'

import {checkIsPositiveNum} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

import {useClassNames} from './create-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerCreateBoxForm

const BlockOfNewBox = ({
  orderBoxIndex,
  orderBox,
  setFormField,
  setAmountField,
  onRemoveBox,
  sizeSetting,
  volumeWeightCoefficient,
}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 10}}
          label={textConsts.lengthCmSupplier}
          value={orderBox.lengthCmSupplier}
          onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
        />
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 10}}
          label={textConsts.widthCmSupplier}
          value={orderBox.widthCmSupplier}
          onChange={setFormField('widthCmSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 10}}
          label={textConsts.heightCmSupplier}
          value={orderBox.heightCmSupplier}
          onChange={setFormField('heightCmSupplier', orderBoxIndex)}
        />
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 10}}
          label={textConsts.weighGrossKgSupplier}
          value={orderBox.weighGrossKgSupplier}
          onChange={setFormField('weighGrossKgSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgSupplier}
          value={toFixed(
            (sizeSetting === sizesType.INCHES
              ? orderBox.heightCmSupplier *
                inchesCoefficient *
                orderBox.widthCmSupplier *
                inchesCoefficient *
                orderBox.lengthCmSupplier *
                inchesCoefficient
              : orderBox.heightCmSupplier * orderBox.widthCmSupplier * orderBox.lengthCmSupplier) /
              volumeWeightCoefficient,
            4,
          )}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgSupplier}
          value={toFixed(
            Math.max(
              toFixed(
                (sizeSetting === sizesType.INCHES
                  ? orderBox.heightCmSupplier *
                    inchesCoefficient *
                    orderBox.widthCmSupplier *
                    inchesCoefficient *
                    orderBox.lengthCmSupplier *
                    inchesCoefficient
                  : orderBox.heightCmSupplier * orderBox.widthCmSupplier * orderBox.lengthCmSupplier) /
                  volumeWeightCoefficient,
                4,
              ),
              orderBox.weighGrossKgSupplier,
            ),
            4,
          )}
        />
      </div>

      <div className={classNames.numberInputFieldsWrapper}>
        <Field disabled containerClasses={classNames.numberInputField} label={textConsts.amountOfSubBoxes} value={1} />
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.amountIfItemsInBox}
          value={orderBox.items[0].amount}
          onChange={setAmountField(orderBoxIndex)}
        />
      </div>
      <IconButton className={classNames.iconBtn} onClick={() => onRemoveBox(orderBoxIndex)}>
        <DeleteIcon className={classNames.deleteBtn} />
      </IconButton>
    </div>
  )
}

export const CreateBoxForm = observer(
  ({formItem, boxesForCreation, onTriggerOpenModal, setBoxesForCreation, volumeWeightCoefficient}) => {
    const classNames = useClassNames()

    const sourceBox = {
      lengthCmSupplier: formItem?.lengthCmSupplier || '',
      widthCmSupplier: formItem?.widthCmSupplier || '',
      heightCmSupplier: formItem?.heightCmSupplier || '',
      weighGrossKgSupplier: formItem?.weighGrossKgSupplier || '',
      // volumeWeightKgSupplier: formItem?.volumeWeightKgSupplier || '',
      warehouse: formItem?.warehouse || '',
      deliveryMethod: formItem?.deliveryMethod || '',
      amount: 1,
      items: formItem?.items || [
        {
          product: formItem?.product,
          amount: formItem?.amount,
          order: formItem,
        },
      ],

      isBarCodeAlreadyAttachedByTheSupplier: formItem?.isBarCodeAlreadyAttachedByTheSupplier || false,
    }

    const [formFieldsArr, setFormFieldsArr] = useState([sourceBox])

    const setFormField = (fieldName, orderBoxIndex) => e => {
      if (isNaN(e.target.value) || Number(e.target.value) < 0) {
        return
      }

      const newFormFields = {...formFieldsArr[orderBoxIndex]}
      newFormFields[fieldName] = e.target.value

      const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === orderBoxIndex ? newFormFields : oldBox))
      setFormFieldsArr(updatedNewBoxes)
    }

    const onSubmit = () => {
      const newArr = formFieldsArr.map(editingBox => ({
        ...editingBox,

        lengthCmSupplier:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.lengthCmSupplier * inchesCoefficient * 100) / 100
            : editingBox.lengthCmSupplier) || 0,

        widthCmSupplier:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.widthCmSupplier * inchesCoefficient * 100) / 100
            : editingBox.widthCmSupplier) || 0,

        heightCmSupplier:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.heightCmSupplier * inchesCoefficient * 100) / 100
            : editingBox.heightCmSupplier) || 0,
      }))

      setBoxesForCreation([...boxesForCreation, ...newArr])
      onTriggerOpenModal()
    }

    const setAmountField = orderBoxIndex => e => {
      if (!checkIsPositiveNum(e.target.value)) {
        return
      }

      const newStateFormFields = [...formFieldsArr]
      newStateFormFields[orderBoxIndex] = {
        ...newStateFormFields[orderBoxIndex],
        items: [
          {
            ...newStateFormFields[orderBoxIndex].items[0],
            amount: Number(e.target.value),
          },
        ],
      }
      setFormFieldsArr(newStateFormFields)
    }

    const onRemoveBox = boxIndex => {
      const updatedNewBoxes = formFieldsArr.filter((box, i) => i !== boxIndex)
      setFormFieldsArr(updatedNewBoxes)
    }

    const disableSubmit = formFieldsArr.length < 1 || formFieldsArr.some(el => el.items[0].amount < 1)

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)

      if (newAlignment === sizesType.INCHES) {
        setFormFieldsArr(
          formFieldsArr.map(editingBox => ({
            ...editingBox,
            lengthCmSupplier: toFixed(editingBox.lengthCmSupplier / inchesCoefficient, 4),
            widthCmSupplier: toFixed(editingBox.widthCmSupplier / inchesCoefficient, 4),
            heightCmSupplier: toFixed(editingBox.heightCmSupplier / inchesCoefficient, 4),
          })),
        )
      } else {
        setFormFieldsArr(
          formFieldsArr.map(editingBox => ({
            ...editingBox,
            lengthCmSupplier: toFixed(editingBox.lengthCmSupplier * inchesCoefficient, 4),
            widthCmSupplier: toFixed(editingBox.widthCmSupplier * inchesCoefficient, 4),
            heightCmSupplier: toFixed(editingBox.heightCmSupplier * inchesCoefficient, 4),
          })),
        )
      }
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {textConsts.newBoxTitle}
          </Typography>

          <div className={classNames.labelFieldsWrapper}>
            <LabelField
              containerClasses={classNames.field}
              label={textConsts.warehouseLabel}
              value={formItem.destination?.name}
            />

            <LabelField
              containerClasses={classNames.field}
              label={textConsts.statusLabel}
              value={formItem.status && getOrderStatusOptionByCode(formItem.status).label}
            />
          </div>

          <Divider className={classNames.divider} />

          <div className={classNames.sizesSubWrapper}>
            <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
              <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                {'In'}
              </ToggleButton>
              <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                {'Cm'}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className={classNames.blockOfNewBoxWrapper}>
            {formFieldsArr.map((orderBox, orderBoxIndex) => (
              <BlockOfNewBox
                key={orderBoxIndex}
                volumeWeightCoefficient={volumeWeightCoefficient}
                sizeSetting={sizeSetting}
                orderBoxIndex={orderBoxIndex}
                orderBox={orderBox}
                setFormField={setFormField}
                setAmountField={setAmountField}
                onRemoveBox={onRemoveBox}
              />
            ))}
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              disableElevation
              className={classNames.button}
              color="primary"
              variant="contained"
              onClick={() => {
                setFormFieldsArr(formFieldsArr.concat({...sourceBox}))
              }}
            >
              {textConsts.addBoxBtn}
            </Button>
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            disabled={disableSubmit}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            {textConsts.saveChangesBtn}
          </SuccessButton>

          <Button
            disableElevation
            color="primary"
            className={classNames.button}
            variant="contained"
            onClick={() => onTriggerOpenModal()}
          >
            {textConsts.cancelChangesBtn}
          </Button>
        </div>
      </div>
    )
  },
)
