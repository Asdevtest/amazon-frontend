import isEqual from 'lodash.isequal'
import { memo, useState } from 'react'

import { Divider, Typography } from '@mui/material'

import { tariffTypes } from '@constants/keys/tariff-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { SetFileForm } from '@components/forms/set-file-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetFilesModal } from '@components/modals/set-files-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { BoxEdit } from '@components/shared/boxes/box-edit'
import { Button } from '@components/shared/button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomSlider } from '@components/shared/custom-slider'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { WarehouseDimensions } from '@components/shared/warehouse-dimensions'

import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'
import { TariffModal } from '@typings/enums/tariff-modal'

import { INCHES_COEFFICIENT, POUNDS_COEFFICIENT, useChangeDimensions } from '@hooks/dimensions/use-change-dimensions'
import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './edit-box-storekeeper-form.style'

import { getBoxWithoutExtraFields } from './helpers/get-box-without-extra-fields'

export const EditBoxStorekeeperForm = memo(
  ({
    formItem,
    onSubmit,
    onTriggerOpenModal,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onClickHsCode,
  }) => {
    const { classes: styles, cx } = useStyles()

    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(null)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
    const [showSetFilesModal, setShowSetFilesModal] = useState(false)
    const [filesConditions, setFilesConditions] = useState({ tmpFiles: [], currentFiles: '', index: undefined })

    const onClickSaveBarcode = product => newBarCodeData => {
      const newFormFields = { ...boxFields }
      newFormFields.items = [
        ...boxFields.items.map(el =>
          el.product._id === product.product?._id ? { ...el, tmpBarCode: newBarCodeData } : el,
        ),
      ]
      setBoxFields(newFormFields)
      setShowSetBarcodeModal(false)
    }

    const counterpartFields = {
      isBarCodeAlreadyAttachedByTheSupplier: 'isBarCodeAttachedByTheStorekeeper',
      isBarCodeAttachedByTheStorekeeper: 'isBarCodeAlreadyAttachedByTheSupplier',
      isTransparencyFileAlreadyAttachedByTheSupplier: 'isTransparencyFileAttachedByTheStorekeeper',
      isTransparencyFileAttachedByTheStorekeeper: 'isTransparencyFileAlreadyAttachedByTheSupplier',
    }

    const onClickGluedCheckbox = (field, itemId) => e => {
      const newFormFields = { ...boxFields }
      const counterpartField = counterpartFields[field]

      newFormFields.items = boxFields.items.map(el =>
        el._id === itemId
          ? {
              ...el,
              [field]: e.target.checked,
              [counterpartField]: el[counterpartField] ? !e.target.checked : el[counterpartField],
            }
          : el,
      )

      setBoxFields(newFormFields)
    }

    const onClickSaveTransparencyFile = (index, value) => {
      const newFormFields = { ...boxFields }
      newFormFields.items[index] = {
        ...newFormFields.items[index],
        tmpTransparencyFile: value,
      }
      setBoxFields(newFormFields)
    }

    const boxInitialState = {
      ...formItem,
      lengthCmWarehouse: String(formItem?.lengthCmWarehouse) || '',
      widthCmWarehouse: String(formItem?.widthCmWarehouse) || '',
      heightCmWarehouse: String(formItem?.heightCmWarehouse) || '',
      weighGrossKgWarehouse: String(formItem?.weighGrossKgWarehouse) || '',
      destinationId: formItem?.destination?._id || null,
      storekeeperId: formItem?.storekeeper?._id || '',
      logicsTariffId: formItem?.logicsTariff?._id || null,
      variationTariffId: formItem?.variationTariff?._id || null,
      amount: formItem?.amount,
      shippingLabel: formItem?.shippingLabel || '',
      clientComment: formItem?.clientComment || '',
      storekeeperTaskComment: '',
      images: formItem?.images || [],
      fbaShipment: formItem?.fbaShipment || '',
      tmpShippingLabel: [],
      items: formItem?.items ? formItem.items.map(el => ({ ...el, tmpBarCode: [], tmpTransparencyFile: [] })) : [],
      tmpTrackNumberFile: [],
    }

    const [boxState, setBoxState] = useState(boxInitialState)
    const [boxFields, setBoxFields] = useState(boxInitialState)
    const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)
    const { _ } = useChangeDimensions({
      data: boxState,
      setData: setBoxState,
      sizeSetting,
    })
    const { onChangeDimensions } = useChangeDimensions({
      data: boxFields,
      setData: setBoxFields,
      sizeSetting,
    })

    const {
      destinationId,
      onSubmitSelectStorekeeperAndTariff,

      showConfirmModal,
      setShowConfirmModal,

      confirmModalSettings,

      handleSetDestination,
      handleResetDestination,

      showSelectionStorekeeperAndTariffModal,
      setShowSelectionStorekeeperAndTariffModal,
    } = useTariffVariation(boxFields.destinationId, setBoxFields)

    const setFormField = fieldName => e => {
      const { type, value, checked } = e.target
      const newFormFields = { ...boxFields }

      newFormFields[fieldName] = type === 'checkbox' ? checked : value

      setBoxFields(newFormFields)
    }

    const setHsCode = index => e => {
      const newFormFields = JSON.parse(JSON.stringify(boxFields))
      newFormFields.items[index].product.hsCode = e.target.value

      setBoxFields(newFormFields)
    }

    const setShippingLabel = value => {
      const newFormFields = { ...boxFields }
      newFormFields.shippingLabel = newFormFields.shippingLabel === null ? null : ''
      newFormFields.tmpShippingLabel = value

      setBoxFields(newFormFields)
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      const newFormFields = { ...boxFields }
      newFormFields.shippingLabel = newFormFields.shippingLabel === null ? null : ''
      newFormFields.tmpShippingLabel = []
      newFormFields.isShippingLabelAttachedByStorekeeper = false
      setBoxFields(newFormFields)
    }

    const onDeleteBarcode = productId => {
      const newFormFields = { ...boxFields }
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId
          ? {
              ...item,
              barCode: '',
              tmpBarCode: [],
              isBarCodeAlreadyAttachedByTheSupplier: false,
              isBarCodeAttachedByTheStorekeeper: false,
            }
          : item,
      )
      setBoxFields(newFormFields)
    }

    const onDeleteTransparencyFile = index => {
      const newFormFields = { ...boxFields }
      newFormFields.items[index].transparencyFile = ''
      newFormFields.items[index].tmpTransparencyFile = []
      setBoxFields(newFormFields)
    }

    const handleChangeImages = files =>
      setBoxFields({
        ...boxFields,
        images: files,
      })

    const handleSubmit = () => {
      const updateBoxFields = { ...boxFields }

      if (sizeSetting === Dimensions.US) {
        updateBoxFields.lengthCmWarehouse = Number(toFixed(updateBoxFields.lengthCmWarehouse * INCHES_COEFFICIENT))
        updateBoxFields.widthCmWarehouse = Number(toFixed(updateBoxFields.widthCmWarehouse * INCHES_COEFFICIENT))
        updateBoxFields.heightCmWarehouse = Number(toFixed(updateBoxFields.heightCmWarehouse * INCHES_COEFFICIENT))
        updateBoxFields.weighGrossKgWarehouse = Number(
          toFixed(updateBoxFields.weighGrossKgWarehouse * POUNDS_COEFFICIENT),
        )
      } else {
        updateBoxFields.lengthCmWarehouse = Number(updateBoxFields.lengthCmWarehouse)
        updateBoxFields.widthCmWarehouse = Number(updateBoxFields.widthCmWarehouse)
        updateBoxFields.heightCmWarehouse = Number(updateBoxFields.heightCmWarehouse)
        updateBoxFields.weighGrossKgWarehouse = Number(updateBoxFields.weighGrossKgWarehouse)
      }

      onSubmit({
        id: formItem?._id,
        boxData: {
          ...getBoxWithoutExtraFields(updateBoxFields),
          destinationId: updateBoxFields.destinationId || null,
        },
        sourceData: formItem,
        imagesOfBox: boxFields.images,
        dataToSubmitHsCode: boxFields.items.map(el => ({
          productId: el.product._id,
          hsCode: el.product.hsCode,
        })),
      })
    }

    const [barcodeModalSetting, setBarcodeModalSetting] = useState({
      title: '',
      maxNumber: 1,

      tmpCode: curProductToEditBarcode?.tmpBarCode,
      item: curProductToEditBarcode,
      onClickSaveBarcode: data => onClickSaveBarcode(curProductToEditBarcode)(data),
    })

    const onClickBarcode = item => {
      setCurProductToEditBarcode(item)

      setBarcodeModalSetting({
        title: '',
        maxNumber: 1,

        tmpCode: item?.tmpBarCode,
        item,
        onClickSaveBarcode: data => onClickSaveBarcode(item)(data),
      })

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onDoubleClickBarcode = item => {
      setCurProductToEditBarcode(item)

      setBarcodeModalSetting({
        title: '',
        maxNumber: 1,
        tmpCode: item?.tmpBarCode,
        item,
        onClickSaveBarcode: data => onClickSaveBarcode(item)(data),
      })
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const disableSubmit =
      isEqual(boxState, boxFields) ||
      boxFields.storekeeperId === '' ||
      maxBoxSizeFromOption(sizeSetting, Number(boxFields.lengthCmWarehouse)) ||
      maxBoxSizeFromOption(sizeSetting, Number(boxFields.widthCmWarehouse)) ||
      maxBoxSizeFromOption(sizeSetting, Number(boxFields.heightCmWarehouse))

    const { tariffName, tariffRate, currentTariff } = useGetDestinationTariffInfo(
      destinations,
      storekeepers,
      boxFields.destinationId,
      boxFields.storekeeperId,
      boxFields.logicsTariffId,
      boxFields.variationTariffId,
    )

    const isBarCodeMissing = item => !item.tmpBarCode.length && !item.barCode
    const isTransparencyFileMissing = item => !item.tmpTransparencyFile.length && !item.transparencyFile
    const isShippingLabelMissing = !boxFields.shippingLabel && !boxFields.tmpShippingLabel.length

    const allItemsCount =
      boxFields.items.reduce((ac, cur) => (ac = ac + cur.amount), 0) * (boxFields.amount < 1 ? 1 : boxFields.amount)
    return (
      <div className={styles.root}>
        <div className={styles.titleWrapper}>
          <Typography className={styles.title}>{t(TranslationKey['Editing the box'])}</Typography>
          <BoxEdit />
        </div>

        <div className={styles.form}>
          <Field
            label={t(TranslationKey.Edit)}
            inputComponent={
              <div className={styles.editBlockWrapper}>
                <div className={styles.editBlockHeaderWrapper}>
                  <div className={styles.titlePrepIdSubWrapper}>
                    <Field
                      oneLine
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.containerTitleField}
                      label={`${t(TranslationKey.Box)} №`}
                      inputComponent={
                        <div className={styles.boxTitleWrapper}>
                          <Typography className={styles.tableTitle}>{`${formItem && formItem.xid}`}</Typography>
                        </div>
                      }
                    />

                    <Field
                      oneLine
                      labelClasses={styles.standartLabel}
                      label={`ID:`}
                      inputComponent={
                        <Input
                          className={styles.itemInput}
                          classes={{ input: styles.input }}
                          inputProps={{ maxLength: 25 }}
                          value={boxFields.prepId}
                          onChange={setFormField('prepId')}
                        />
                      }
                    />
                  </div>
                  <Field
                    oneLine
                    disabled
                    labelClasses={styles.standartLabel}
                    inputClasses={styles.disabledNumInput}
                    containerClasses={styles.containerField}
                    label={t(TranslationKey['Total goods In Box'])}
                    value={allItemsCount}
                  />
                </div>
                <Typography className={styles.amountSpan}>
                  {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                </Typography>

                <Divider className={styles.divider} />

                <div className={styles.productsWrapper}>
                  <CustomSlider alignButtons="end">
                    {boxFields.items.map((item, index) => (
                      <div key={index} className={styles.productWrapper}>
                        <div className={styles.leftProductColumn}>
                          <SlideshowGallery slidesToShow={2} files={item.product.images} />

                          <Field
                            containerClasses={styles.field}
                            tooltipInfoContent={!item.barCode && t(TranslationKey['Add a product barcode to the box'])}
                            labelClasses={styles.standartLabel}
                            label={t(TranslationKey.BarCode)}
                            inputComponent={
                              <ChangeChipCell
                                isChipOutTable
                                text={isBarCodeMissing(item) && t(TranslationKey['Set Barcode'])}
                                value={item?.tmpBarCode?.[0]?.file?.name || item?.tmpBarCode?.[0] || item.barCode}
                                onClickChip={() => onClickBarcode(item)}
                                onDoubleClickChip={() => onDoubleClickBarcode(item)}
                                onDeleteChip={() => onDeleteBarcode(item.product._id)}
                              />
                            }
                          />

                          <Field
                            containerClasses={styles.field}
                            labelClasses={styles.standartLabel}
                            label="Transparency Codes"
                            inputComponent={
                              <ChangeChipCell
                                disabled
                                isChipOutTable
                                text={isTransparencyFileMissing(item) && t(TranslationKey.Transparency)}
                                value={
                                  item?.tmpTransparencyFile?.[0]?.file?.name ||
                                  item?.tmpTransparencyFile?.[0] ||
                                  item.transparencyFile
                                }
                                onClickChip={() => {
                                  setFilesConditions({
                                    tmpFiles: item?.tmpTransparencyFile,
                                    currentFiles: item.transparencyFile,
                                    index,
                                  })
                                  setShowSetFilesModal(true)
                                }}
                                onDeleteChip={() => onDeleteTransparencyFile(index)}
                              />
                            }
                          />

                          <div>
                            <CustomCheckbox
                              disabled={isBarCodeMissing(item)}
                              tooltip="The supplier has glued the barcode before shipment"
                              checked={item.isBarCodeAlreadyAttachedByTheSupplier}
                              onChange={onClickGluedCheckbox('isBarCodeAlreadyAttachedByTheSupplier', item._id)}
                            >
                              The barcode is glued by the supplier
                            </CustomCheckbox>

                            <CustomCheckbox
                              isRow
                              disabled={isBarCodeMissing(item)}
                              tooltip="The barcode was glued on when the box was accepted at the prep center"
                              checked={item.isBarCodeAttachedByTheStorekeeper}
                              onChange={onClickGluedCheckbox('isBarCodeAttachedByTheStorekeeper', item._id)}
                            >
                              The barcode is glued by the Storekeeper
                            </CustomCheckbox>

                            <CustomCheckbox
                              disabled={isTransparencyFileMissing(item)}
                              checked={item.isTransparencyFileAlreadyAttachedByTheSupplier}
                              onChange={onClickGluedCheckbox(
                                'isTransparencyFileAlreadyAttachedByTheSupplier',
                                item._id,
                              )}
                            >
                              Transparency Codes glued by the supplier
                            </CustomCheckbox>

                            <CustomCheckbox
                              disabled={isTransparencyFileMissing(item)}
                              checked={item.isTransparencyFileAttachedByTheStorekeeper}
                              onChange={onClickGluedCheckbox('isTransparencyFileAttachedByTheStorekeeper', item._id)}
                            >
                              Transparency Codes are glued by storekeeper
                            </CustomCheckbox>
                          </div>
                        </div>

                        <div className={styles.rightProductColumn}>
                          <Typography className={styles.amazonTitle}>{item.product.amazonTitle}</Typography>

                          {item.product.asin ? (
                            <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={item.product.asin} />
                          ) : null}

                          <Field
                            oneLine
                            disabled
                            labelClasses={styles.standartLabel}
                            inputClasses={styles.disabledNumInput}
                            label={t(TranslationKey['Quantity units of product'])}
                            value={item.amount}
                          />

                          <Field
                            multiline
                            disabled
                            minRows={5}
                            maxRows={5}
                            labelClasses={styles.standartLabel}
                            inputClasses={styles.multiline}
                            label={t(TranslationKey['Comments on order'])}
                            value={item.order.clientComment}
                          />

                          <Field
                            labelClasses={styles.standartLabel}
                            containerClasses={styles.field}
                            inputClasses={styles.inputField}
                            inputProps={{ maxLength: 255 }}
                            label={t(TranslationKey['HS code'])}
                            value={item.product.hsCode}
                            inputComponent={
                              <Button onClick={() => onClickHsCode(item.product._id)}>
                                {t(TranslationKey['HS code'])}
                              </Button>
                            }
                            onChange={setHsCode(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </CustomSlider>
                </div>

                <Divider className={styles.divider} />

                <div className={styles.shareBoxWrapper}>
                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      label={t(TranslationKey.Destination)}
                      tooltipInfoContent={t(
                        TranslationKey["Amazon's final warehouse in the USA, available for change"],
                      )}
                      inputComponent={
                        <WithSearchSelect
                          width={230}
                          favourites={destinationsFavourites}
                          selectedItemName={
                            destinations.find(el => el._id === boxFields.destinationId)?.name ||
                            t(TranslationKey['Not chosen'])
                          }
                          data={
                            boxFields.logicsTariffId &&
                            currentTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                              ? destinations.filter(el => el?._id === destinationId)
                              : destinations.filter(el => el.storekeeper?._id !== formItem?.storekeeper._id)
                          }
                          searchFields={['name']}
                          onClickNotChosen={handleResetDestination}
                          onClickSelect={el => handleSetDestination(el._id)}
                          onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                        />
                      }
                    />

                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
                      tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                      inputComponent={
                        <Button
                          onClick={() =>
                            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                          }
                        >
                          {boxFields.storekeeperId && (tariffName || tariffRate)
                            ? `${tariffName ? tariffName : ''}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                            : t(TranslationKey.Select)}
                        </Button>
                      }
                    />
                  </div>

                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={cx(styles.fbaShipmentInput)}
                      inputProps={{ maxLength: 255 }}
                      label={t(TranslationKey['Reference id'])}
                      value={boxFields.referenceId}
                      onChange={setFormField('referenceId')}
                    />

                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.shippingField}
                      tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                      label="Shipping label"
                      inputComponent={
                        <ChangeChipCell
                          isChipOutTable
                          text={
                            !boxFields.shippingLabel &&
                            !boxFields.tmpShippingLabel.length &&
                            t(TranslationKey['Set Shipping Label'])
                          }
                          value={
                            boxFields?.tmpShippingLabel?.[0]?.file?.name ||
                            boxFields?.tmpShippingLabel?.[0] ||
                            boxFields.shippingLabel
                          }
                          onClickChip={onClickShippingLabel}
                          onDeleteChip={onDeleteShippingLabel}
                        />
                      }
                    />
                  </div>

                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={styles.fbaShipmentInput}
                      inputProps={{ maxLength: 255 }}
                      tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                      label="FBA Shipment"
                      value={boxFields.fbaShipment}
                      onChange={setFormField('fbaShipment')}
                    />

                    <CustomCheckbox
                      disabled={isShippingLabelMissing}
                      checked={boxFields.isShippingLabelAttachedByStorekeeper}
                      onChange={setFormField('isShippingLabelAttachedByStorekeeper')}
                    >
                      Shipping label was glued to the warehouse
                    </CustomCheckbox>
                  </div>

                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={styles.fbaShipmentInput}
                      inputProps={{ maxLength: 255 }}
                      label={'UPS Track number'}
                      value={boxFields.upsTrackNumber}
                      onChange={setFormField('upsTrackNumber')}
                    />

                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={styles.fbaShipmentInput}
                      inputProps={{ maxLength: 255 }}
                      label={'FBA number'}
                      value={boxFields.fbaNumber}
                      onChange={setFormField('fbaNumber')}
                    />
                  </div>

                  <div className={styles.shareBoxSubWrapper}>
                    <div className={styles.field}>
                      <Field
                        labelClasses={styles.standartLabel}
                        containerClasses={styles.field}
                        inputClasses={styles.fbaShipmentInput}
                        inputProps={{ maxLength: 255 }}
                        label={t(TranslationKey['Track number'])}
                        value={boxFields.trackNumberText}
                        onChange={setFormField('trackNumberText')}
                      />

                      <Button
                        onClick={() => {
                          setBarcodeModalSetting({
                            title: 'Track number',
                            maxNumber: 50 - boxFields.tmpTrackNumberFile.length - boxFields.trackNumberFile.length,

                            tmpCode: boxFields.tmpTrackNumberFile,
                            item: null,
                            onClickSaveBarcode: value => {
                              setFormField('tmpTrackNumberFile')({ target: { value } })
                              setShowSetBarcodeModal(false)
                            },
                          })

                          setShowSetBarcodeModal(!showSetBarcodeModal)
                        }}
                      >
                        {boxFields.tmpTrackNumberFile[0]
                          ? t(TranslationKey['File added'])
                          : t(TranslationKey['Photo track numbers'])}
                      </Button>
                    </div>

                    <div className={styles.field}>
                      <div className={styles.trackNumberPhotoWrapper}>
                        {boxFields.trackNumberFile[0] || boxFields.tmpTrackNumberFile[0] ? (
                          <SlideshowGallery
                            slidesToShow={2}
                            files={
                              boxFields.trackNumberFile.length
                                ? boxFields.trackNumberFile
                                : boxFields.tmpTrackNumberFile
                            }
                          />
                        ) : (
                          <Typography>{`${t(TranslationKey['no photo track number'])}...`}</Typography>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Field
            containerClasses={styles.blockOfNewBoxContainer}
            label={t(TranslationKey['Box data'])}
            inputComponent={
              <div className={styles.blockOfNewBoxWrapper}>
                <div className={styles.sizesTitleWrapper}>
                  <p
                    title={t(TranslationKey['The dimensions of the box specified by the prep center'])}
                    className={styles.standartLabel}
                  >
                    {t(TranslationKey.Dimensions)}
                  </p>

                  <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />
                </div>

                <WarehouseDimensions
                  dimensions={boxFields}
                  sizeSetting={sizeSetting}
                  onChangeDimensions={onChangeDimensions}
                />

                <div className={styles.imageFileInputWrapper}>
                  <UploadFilesInput images={boxFields.images} setImages={handleChangeImages} />
                </div>

                <div className={styles.boxPhotoWrapper}>
                  <Typography className={styles.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>
                  <SlideshowGallery slidesToShow={2} files={boxFields.images} />
                </div>

                <div className={styles.commentsWrapper}>
                  <Field
                    multiline
                    disabled
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Client comment'])}
                    className={styles.commentField}
                    labelClasses={styles.label}
                    value={boxFields.clientComment}
                  />

                  <Field
                    multiline
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Storekeeper comment'])}
                    placeholder={t(TranslationKey['Add comment'])}
                    className={styles.commentField}
                    labelClasses={styles.label}
                    value={boxFields.storekeeperComment}
                    onChange={setFormField('storekeeperComment')}
                  />
                </div>
              </div>
            }
          />

          <Field
            multiline
            className={styles.multiline}
            minRows={25}
            maxRows={25}
            inputProps={{ maxLength: 1000 }}
            label={t(TranslationKey['Write a comment on the task'])}
            placeholder={t(TranslationKey.Comment)}
            value={boxFields.storekeeperTaskComment}
            onChange={setFormField('storekeeperTaskComment')}
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the box'])}
            onClick={handleSubmit}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            styleType={ButtonStyle.CASUAL}
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            onClick={onTriggerOpenModal}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetFileForm
            data={boxFields?.shippingLabel}
            onSubmit={setShippingLabel}
            onClose={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
          />
        </Modal>

        {showSelectionStorekeeperAndTariffModal ? (
          <SupplierApproximateCalculationsModal
            isTariffsSelect
            tariffModalType={TariffModal.WAREHOUSE}
            openModal={showSelectionStorekeeperAndTariffModal}
            setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
            box={boxFields}
            onClickSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        ) : null}

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={barcodeModalSetting.title}
            maxNumber={barcodeModalSetting.maxNumber}
            tmpCode={barcodeModalSetting.tmpCode}
            barCode={barcodeModalSetting.item?.barCode}
            onClickSaveBarcode={barcodeModalSetting.onClickSaveBarcode}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <Modal openModal={showSetFilesModal} setOpenModal={setShowSetFilesModal}>
          <SetFilesModal
            modalTitle={t(TranslationKey.Transparency)}
            LabelTitle="Transparency Codes"
            currentFiles={filesConditions.currentFiles}
            tmpFiles={filesConditions.tmpFiles}
            onClickSave={value => {
              onClickSaveTransparencyFile(filesConditions.index, value)
              setShowSetFilesModal(false)
            }}
            onCloseModal={setShowSetFilesModal}
          />
        </Modal>

        {showConfirmModal ? (
          <ConfirmationModal
            // @ts-ignore
            isWarning={confirmModalSettings?.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => setShowConfirmModal(false)}
            title={t(TranslationKey.Attention)}
            message={confirmModalSettings?.confirmMessage}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={confirmModalSettings?.onClickConfirm}
            onClickCancelBtn={confirmModalSettings?.onClickCancelBtn}
          />
        ) : null}
      </div>
    )
  },
)
