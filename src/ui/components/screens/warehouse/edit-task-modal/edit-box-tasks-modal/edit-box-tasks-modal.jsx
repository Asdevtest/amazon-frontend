import React, {useState} from 'react'

import {Box, Checkbox, Container, Typography, Divider} from '@material-ui/core'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {UploadFilesInput} from '@components/upload-files-input'

import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './edit-box-tasks-modal.style'

const AttributesEditBlock = ({
  box,
  setNewBoxField,
  volumeWeightCoefficient,
  sizeSetting,
  isShippingSizes,

  isNoActive,
}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled={isNoActive}
          inputProps={{maxLength: 6}}
          error={
            Number(isShippingSizes ? box.deliveryLength : box.lengthCmWarehouse) === 0 &&
            !isNoActive &&
            !box.fitsInitialDimensions &&
            true
          }
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Length) + ': '}
          value={isShippingSizes ? box.deliveryLength : box.lengthCmWarehouse}
          onChange={setNewBoxField(isShippingSizes ? 'deliveryLength' : 'lengthCmWarehouse')}
        />

        <Field
          disabled={isNoActive}
          inputProps={{maxLength: 6}}
          error={
            Number(isShippingSizes ? box.deliveryHeight : box.heightCmWarehouse) === 0 &&
            !isNoActive &&
            !box.fitsInitialDimensions &&
            true
          }
          labelClasses={classNames.label}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={isShippingSizes ? box.deliveryHeight : box.heightCmWarehouse}
          onChange={setNewBoxField(isShippingSizes ? 'deliveryHeight' : 'heightCmWarehouse')}
        />

        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          labelClasses={classNames.label}
          value={
            isShippingSizes
              ? toFixed(
                  (sizeSetting === sizesType.INCHES
                    ? box.deliveryHeight *
                      inchesCoefficient *
                      box.deliveryWidth *
                      inchesCoefficient *
                      box.deliveryLength *
                      inchesCoefficient
                    : box.deliveryHeight * box.deliveryWidth * box.deliveryLength) / volumeWeightCoefficient,
                  2,
                )
              : toFixed(
                  (sizeSetting === sizesType.INCHES
                    ? box.heightCmWarehouse *
                      inchesCoefficient *
                      box.widthCmWarehouse *
                      inchesCoefficient *
                      box.lengthCmWarehouse *
                      inchesCoefficient
                    : box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
                  2,
                )
          }
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled={isNoActive}
          inputProps={{maxLength: 6}}
          error={
            Number(isShippingSizes ? box.deliveryWidth : box.widthCmWarehouse) === 0 &&
            !isNoActive &&
            !box.fitsInitialDimensions &&
            true
          }
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Width) + ': '}
          value={isShippingSizes ? box.deliveryWidth : box.widthCmWarehouse}
          onChange={setNewBoxField(isShippingSizes ? 'deliveryWidth' : 'widthCmWarehouse')}
        />

        <Field
          disabled={isNoActive}
          inputProps={{maxLength: 6}}
          error={
            Number(isShippingSizes ? box.deliveryMass : box.weighGrossKgWarehouse) === 0 &&
            !isNoActive &&
            !box.fitsInitialDimensions &&
            true
          }
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Weight) + ', ' + t(TranslationKey.Kg) + ': '}
          value={isShippingSizes ? box.deliveryMass : box.weighGrossKgWarehouse}
          onChange={setNewBoxField(isShippingSizes ? 'deliveryMass' : 'weighGrossKgWarehouse')}
        />

        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          labelClasses={classNames.label}
          value={
            isShippingSizes
              ? Math.max(
                  toFixed(
                    (sizeSetting === sizesType.INCHES
                      ? box.deliveryHeight *
                        inchesCoefficient *
                        box.deliveryWidth *
                        inchesCoefficient *
                        box.deliveryLength *
                        inchesCoefficient
                      : box.deliveryHeight * box.deliveryWidth * box.deliveryLength) / volumeWeightCoefficient,
                    2,
                  ),
                  box.deliveryMass,
                )
              : Math.max(
                  toFixed(
                    (sizeSetting === sizesType.INCHES
                      ? box.heightCmWarehouse *
                        inchesCoefficient *
                        box.widthCmWarehouse *
                        inchesCoefficient *
                        box.lengthCmWarehouse *
                        inchesCoefficient
                      : box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / volumeWeightCoefficient,
                    2,
                  ),
                  box.weighGrossKgWarehouse,
                )
          }
        />
      </div>
    </div>
  )
}

export const EditBoxTasksModal = ({
  isInStorekeeperWarehouse,
  setEditModal,
  box,
  operationType,
  setNewBoxes,

  newBoxes,
  volumeWeightCoefficient,
  storekeeperWarehouseSubmit,
  isReceive,
  primarySizeSuitableCheckbox,
}) => {
  const classNames = useClassNames()

  const [editingBox, setEditingBox] = useState(isInStorekeeperWarehouse ? {...box, tmpImages: []} : box)

  const setNewBoxField = fieldName => e => {
    const newFormFields = {...editingBox}
    if (fieldName === 'fitsInitialDimensions') {
      newFormFields[fieldName] = e.target.checked
    } else {
      if (isNaN(e.target.value) || Number(e.target.value) < 0) {
        return
      }

      newFormFields[fieldName] = e.target.value
    }

    setEditingBox(newFormFields)
  }

  const setImagesOfBox = images => {
    const newFormFields = {...editingBox}

    newFormFields.tmpImages = [...images]

    setEditingBox(() => newFormFields)
  }

  const onSubmit = () => {
    if (isInStorekeeperWarehouse) {
      const lastStepEditBox = {
        ...editingBox,

        deliveryLength:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.deliveryLength * inchesCoefficient * 100) / 100
            : editingBox.deliveryLength) || 0,

        deliveryWidth:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.deliveryWidth * inchesCoefficient * 100) / 100
            : editingBox.deliveryWidth) || 0,

        deliveryHeight:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.deliveryHeight * inchesCoefficient * 100) / 100
            : editingBox.deliveryHeight) || 0,
      }

      storekeeperWarehouseSubmit(box._id, lastStepEditBox)
    } else {
      const lastStepEditBox = {
        ...editingBox,

        lengthCmWarehouse:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.lengthCmWarehouse * inchesCoefficient * 100) / 100
            : editingBox.lengthCmWarehouse) || 0,

        widthCmWarehouse:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.widthCmWarehouse * inchesCoefficient * 100) / 100
            : editingBox.widthCmWarehouse) || 0,

        heightCmWarehouse:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.heightCmWarehouse * inchesCoefficient * 100) / 100
            : editingBox.heightCmWarehouse) || 0,

        weighGrossKgWarehouse: parseFloat(editingBox?.weighGrossKgWarehouse) || '',
        volumeWeightKgWarehouse: parseFloat(editingBox?.volumeWeightKgWarehouse) || '',
      }

      const updatedNewBoxes = newBoxes.map(oldBox => (oldBox._id === lastStepEditBox._id ? lastStepEditBox : oldBox))
      setNewBoxes([...updatedNewBoxes])
      setEditModal()
    }
  }

  const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

  const handleChange = (event, newAlignment) => {
    setSizeSetting(newAlignment)

    if (newAlignment === sizesType.INCHES) {
      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse / inchesCoefficient, 4),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse / inchesCoefficient, 4),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse / inchesCoefficient, 4),
      })
    } else {
      setEditingBox({
        ...editingBox,
        lengthCmWarehouse: toFixed(editingBox.lengthCmWarehouse * inchesCoefficient, 4),
        widthCmWarehouse: toFixed(editingBox.widthCmWarehouse * inchesCoefficient, 4),
        heightCmWarehouse: toFixed(editingBox.heightCmWarehouse * inchesCoefficient, 4),
      })
    }
  }

  const disabledSubmit =
    ((!Number(editingBox.lengthCmWarehouse) ||
      !Number(editingBox.widthCmWarehouse) ||
      !Number(editingBox.heightCmWarehouse) ||
      !Number(editingBox.weighGrossKgWarehouse)) &&
      isReceive) ||
    ((!Number(editingBox.deliveryLength) ||
      !Number(editingBox.deliveryWidth) ||
      !Number(editingBox.deliveryHeight) ||
      !Number(editingBox.deliveryMass)) &&
      !isReceive &&
      !editingBox.fitsInitialDimensions)

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Editing the box'])}</Typography>

      <div className={classNames.sizesSubWrapper}>
        <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
          <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
            {'In'}
          </ToggleBtn>
          <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
            {'Cm'}
          </ToggleBtn>
        </ToggleBtnGroup>
      </div>

      <div className={classNames.dimensionsWrapper}>
        <div>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Primary dimensions'])}</Typography>

          <AttributesEditBlock
            isNoActive={!isReceive}
            // isReceive={isReceive}
            box={editingBox}
            operationType={operationType}
            setNewBoxField={setNewBoxField}
            volumeWeightCoefficient={volumeWeightCoefficient}
            sizeSetting={sizeSetting}
          />
        </div>

        <Divider orientation="vertical" className={classNames.divider} />

        <div>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Shipping dimensions'])}</Typography>

          <AttributesEditBlock
            isShippingSizes
            isNoActive={isReceive}
            box={editingBox}
            operationType={operationType}
            setNewBoxField={setNewBoxField}
            volumeWeightCoefficient={volumeWeightCoefficient}
            sizeSetting={sizeSetting}
          />
        </div>
      </div>

      {primarySizeSuitableCheckbox ? (
        <Field
          oneLine
          containerClasses={classNames.checkboxContainer}
          labelClasses={classNames.label}
          label={t(TranslationKey['The primary size suitable for shipment'])}
          inputComponent={
            <Checkbox
              color="primary"
              checked={editingBox.fitsInitialDimensions}
              onChange={setNewBoxField('fitsInitialDimensions')}
            />
          }
        />
      ) : null}

      <Box className={classNames.boxCode}>
        <div className={classNames.imageFileInputWrapper}>
          <UploadFilesInput images={editingBox.tmpImages} setImages={setImagesOfBox} maxNumber={50} />
        </div>
      </Box>
      <div className={classNames.photoWrapper}>
        <Typography className={classNames.photoAndFilesTitle}>
          {t(TranslationKey['Photos and documents of the box']) + ': '}
        </Typography>
        <div className={classNames.photoAndFilesTitleMobileWrapper}>
          <PhotoAndFilesCarousel
            small
            direction={window.screen.width < 768 ? 'column' : 'row'}
            files={box.images}
            width="300px"
          />
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button success disabled={disabledSubmit} className={classNames.saveButton} onClick={onSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={classNames.cancelButton} onClick={() => setEditModal()}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </Container>
  )
}
