/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Avatar, Checkbox, Chip, Divider, Typography} from '@mui/material'

import {useState} from 'react'

import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {UiTheme} from '@constants/themes'
import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {ColoredChip} from '@components/colored-chip'
import {CustomCarousel, PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'
import {WithSearchSelect} from '@components/selects/with-search-select'
import {Table} from '@components/table'
import {Text} from '@components/text'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {UploadFilesInput} from '@components/upload-files-input'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {SelectStorekeeperAndTariffForm} from '../select-storkeeper-and-tariff-form'
import {useClassNames} from './edit-box-storekeeper-form.style'

export const WarehouseDemensions = ({orderBox, sizeSetting, volumeWeightCoefficient, setFormField}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{maxLength: 6}}
          error={Number(orderBox.lengthCmWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Length) + ': '}
          value={orderBox.lengthCmWarehouse}
          onChange={setFormField('lengthCmWarehouse')}
        />

        <Field
          inputProps={{maxLength: 6}}
          error={Number(orderBox.widthCmWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Width) + ': '}
          value={orderBox.widthCmWarehouse}
          onChange={setFormField('widthCmWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{maxLength: 6}}
          error={Number(orderBox.heightCmWarehouse) === 0 && true}
          labelClasses={classNames.label}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={orderBox.heightCmWarehouse}
          onChange={setFormField('heightCmWarehouse')}
        />

        <Field
          inputProps={{maxLength: 6}}
          error={Number(orderBox.weighGrossKgWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Weight) + ', ' + t(TranslationKey.Kg) + ': '}
          value={orderBox.weighGrossKgWarehouse}
          onChange={setFormField('weighGrossKgWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          labelClasses={classNames.label}
          value={toFixed(
            (sizeSetting === sizesType.INCHES
              ? orderBox.heightCmWarehouse *
                inchesCoefficient *
                orderBox.widthCmWarehouse *
                inchesCoefficient *
                orderBox.lengthCmWarehouse *
                inchesCoefficient
              : orderBox.heightCmWarehouse * orderBox.widthCmWarehouse * orderBox.lengthCmWarehouse) /
              volumeWeightCoefficient,
            2,
          )}
        />

        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight']) + ', ' + t(TranslationKey.Kg) + ': '}
          labelClasses={classNames.label}
          value={Math.max(
            toFixed(
              (sizeSetting === sizesType.INCHES
                ? orderBox.heightCmWarehouse *
                  inchesCoefficient *
                  orderBox.widthCmWarehouse *
                  inchesCoefficient *
                  orderBox.lengthCmWarehouse *
                  inchesCoefficient
                : orderBox.heightCmWarehouse * orderBox.widthCmWarehouse * orderBox.lengthCmWarehouse) /
                volumeWeightCoefficient,
              2,
            ),
            orderBox.weighGrossKgWarehouse,
          )}
        />
      </div>
    </div>
  )
}

export const EditBoxStorekeeperForm = observer(
  ({
    formItem,
    onSubmit,
    onTriggerOpenModal,
    requestStatus,
    volumeWeightCoefficient,
    destinations,
    storekeepers,

    destinationsFavourites,
    setDestinationsFavouritesItem,
    onClickHsCode,
  }) => {
    const {classes: classNames} = useClassNames()

    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

    const [imagesOfBox, setImagesOfBox] = useState([])

    const rowHandlers = {
      onTriggerOpenModal: () => setShowPhotosModal(!showPhotosModal),
      onSelectPhotos: setBigImagesOptions,
    }

    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(null)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickSaveBarcode = product => newBarCodeData => {
      const newFormFields = {...boxFields}

      newFormFields.items = [
        ...boxFields.items.map(el =>
          el.product._id === product.product?._id ? {...el, tmpBarCode: newBarCodeData} : el,
        ),
      ]

      setBoxFields(newFormFields)

      setShowSetBarcodeModal(false)
    }

    const onClickGluedCheckbox = (field, itemId) => e => {
      const newFormFields = {...boxFields}

      if (field === 'isBarCodeAlreadyAttachedByTheSupplier') {
        newFormFields.items = [
          ...boxFields.items.map(el =>
            el._id === itemId
              ? {
                  ...el,
                  isBarCodeAlreadyAttachedByTheSupplier: e.target.checked,
                  isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper
                    ? !e.target.checked
                    : el.isBarCodeAttachedByTheStorekeeper,
                }
              : el,
          ),
        ]
      } else if (field === 'isBarCodeAttachedByTheStorekeeper') {
        newFormFields.items = [
          ...boxFields.items.map(el =>
            el._id === itemId
              ? {
                  ...el,
                  isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier
                    ? !e.target.checked
                    : el.isBarCodeAlreadyAttachedByTheSupplier,
                  isBarCodeAttachedByTheStorekeeper: e.target.checked,
                }
              : el,
          ),
        ]
      }

      setBoxFields(newFormFields)
    }

    const boxInitialState = {
      ...formItem,

      lengthCmWarehouse: formItem?.lengthCmWarehouse || 0,
      widthCmWarehouse: formItem?.widthCmWarehouse || 0,
      heightCmWarehouse: formItem?.heightCmWarehouse || 0,
      weighGrossKgWarehouse: formItem?.weighGrossKgWarehouse || 0,
      volumeWeightKgWarehouse: formItem ? calcVolumeWeightForBox(formItem, volumeWeightCoefficient) : 0,
      weightFinalAccountingKgWarehouse: formItem ? calcFinalWeightForBox(formItem, volumeWeightCoefficient) : 0,

      destinationId: formItem?.destination?._id || null,
      storekeeperId: formItem?.storekeeper?._id || '',
      logicsTariffId: formItem?.logicsTariff?._id || null,

      amount: formItem?.amount,
      shippingLabel: formItem?.shippingLabel,
      clientComment: formItem?.clientComment || '',
      storekeeperTaskComment: '',
      images: formItem?.images || [],
      fbaShipment: formItem?.fbaShipment || '',
      tmpShippingLabel: [],
      items: formItem?.items ? [...formItem.items.map(el => ({...el, tmpBarCode: []}))] : [],
      tmpTrackNumberFile: [],
    }

    const [boxFields, setBoxFields] = useState(boxInitialState)

    const setFormField = fieldName => e => {
      const newFormFields = {...boxFields}

      if (['weighGrossKgWarehouse', 'widthCmWarehouse', 'heightCmWarehouse', 'lengthCmWarehouse'].includes(fieldName)) {
        if (isNaN(e.target.value) || Number(e.target.value) < 0) {
          return
        }
      }

      newFormFields[fieldName] = e.target.value

      setBoxFields(newFormFields)
    }

    const setHsCode = index => e => {
      const newFormFields = JSON.parse(JSON.stringify(boxFields))
      newFormFields.items[index].product.hsCode = e.target.value

      setBoxFields(newFormFields)
    }

    const setShippingLabel = () => value => {
      const newFormFields = {...boxFields}
      newFormFields.shippingLabel = newFormFields.shippingLabel === null ? null : ''
      newFormFields.tmpShippingLabel = value

      setBoxFields(newFormFields)
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      const newFormFields = {...boxFields}
      newFormFields.shippingLabel = newFormFields.shippingLabel === null ? null : ''
      newFormFields.tmpShippingLabel = []
      setBoxFields(newFormFields)
    }

    const onDeleteBarcode = productId => {
      const newFormFields = {...boxFields}
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId ? {...item, barCode: ''} : item,
      )
      setBoxFields(newFormFields)
    }

    // const onClickBarcodeInventoryCheckbox = (productId, value) => {
    //   const newFormFields = {...boxFields}
    //   newFormFields.items = boxFields.items.map(item =>
    //     item.product._id === productId ? {...item, changeBarCodInInventory: value} : item,
    //   )
    //   setBoxFields(newFormFields)
    // }

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)

      if (newAlignment === sizesType.INCHES) {
        setBoxFields({
          ...boxFields,
          lengthCmWarehouse: toFixed(boxFields.lengthCmWarehouse / inchesCoefficient, 4),
          widthCmWarehouse: toFixed(boxFields.widthCmWarehouse / inchesCoefficient, 4),
          heightCmWarehouse: toFixed(boxFields.heightCmWarehouse / inchesCoefficient, 4),
        })
      } else {
        setBoxFields({
          ...boxFields,
          lengthCmWarehouse: toFixed(boxFields.lengthCmWarehouse * inchesCoefficient, 4),
          widthCmWarehouse: toFixed(boxFields.widthCmWarehouse * inchesCoefficient, 4),
          heightCmWarehouse: toFixed(boxFields.heightCmWarehouse * inchesCoefficient, 4),
        })
      }
    }

    const getBoxDataToSubmit = () => {
      if (sizeSetting === sizesType.INCHES) {
        return {
          ...boxFields,
          destinationId: boxFields.destinationId || null,
          lengthCmWarehouse: toFixed(boxFields.lengthCmWarehouse * inchesCoefficient, 4),
          widthCmWarehouse: toFixed(boxFields.widthCmWarehouse * inchesCoefficient, 4),
          heightCmWarehouse: toFixed(boxFields.heightCmWarehouse * inchesCoefficient, 4),
        }
      } else {
        return {...boxFields, destinationId: boxFields.destinationId || null}
      }
    }

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

    const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
      setBoxFields({...boxFields, storekeeperId, logicsTariffId: tariffId})

      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
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
      (JSON.stringify(getObjectFilteredByKeyArrayBlackList(boxInitialState, ['logicsTariffId'])) ===
        JSON.stringify(getObjectFilteredByKeyArrayBlackList(boxFields, ['logicsTariffId'])) ||
        boxFields.storekeeperId === '') &&
      !imagesOfBox.length

    const curDestination = destinations.find(el => el._id === boxFields.destinationId)

    const firstNumOfCode = curDestination?.zipCode[0]

    const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

    const tariffName = storekeepers
      .find(el => el._id === boxFields.storekeeperId)
      ?.tariffLogistics.find(el => el._id === boxFields.logicsTariffId)?.name

    const tariffRate = storekeepers
      .find(el => el._id === boxFields.storekeeperId)
      ?.tariffLogistics.find(el => el._id === boxFields.logicsTariffId)?.conditionsByRegion[regionOfDeliveryName]?.rate

    const allItemsCount =
      boxFields.items.reduce((ac, cur) => (ac = ac + cur.amount), 0) * (boxFields.amount < 1 ? 1 : boxFields.amount)

    return (
      <div className={classNames.root}>
        <div className={classNames.titleWrapper}>
          <Typography className={classNames.title}>{t(TranslationKey['Editing the box'])}</Typography>{' '}
          <img src={'/assets/img/edit.png'} />
        </div>

        <div className={classNames.form}>
          <Field
            label={t(TranslationKey.Edit)}
            inputComponent={
              <div className={classNames.editBlockWrapper}>
                <div className={classNames.editBlockHeaderWrapper}>
                  <div className={classNames.titlePrepIdSubWrapper}>
                    <Field
                      oneLine
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.containerTitleField}
                      label={`${t(TranslationKey.Box)} №`}
                      inputComponent={
                        <div className={classNames.boxTitleWrapper}>
                          <Typography className={classNames.tableTitle}>{`${
                            formItem && formItem.humanFriendlyId
                          }`}</Typography>

                          {/* <Typography className={classNames.amountSpan}>
                            {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                          </Typography> */}
                        </div>
                      }
                    />

                    <Field
                      oneLine
                      labelClasses={classNames.standartLabel}
                      label={`ID:`}
                      inputComponent={
                        <Input
                          className={classNames.itemInput}
                          classes={{input: classNames.input}}
                          inputProps={{maxLength: 25}}
                          value={boxFields.prepId}
                          onChange={setFormField('prepId')}
                        />
                      }
                    />
                  </div>
                  <Field
                    oneLine
                    disabled
                    labelClasses={classNames.standartLabel}
                    inputClasses={classNames.disabledNumInput}
                    containerClasses={classNames.containerField}
                    label={t(TranslationKey['Total goods In Box'])}
                    value={allItemsCount}
                  />
                </div>
                <Typography className={classNames.amountSpan}>
                  {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                </Typography>

                <Divider className={classNames.divider} />

                <div className={classNames.productsWrapper}>
                  <CustomCarousel alignButtons="end">
                    {boxFields.items.map((item, index) => (
                      <div key={index} className={classNames.productWrapper}>
                        <div className={classNames.leftProductColumn}>
                          <div className={classNames.photoWrapper}>
                            <PhotoCarousel
                              isAmazonPhoto
                              files={item.product.images}
                              imageClass={classNames.productImageClass}
                            />
                          </div>

                          <>
                            <Field
                              containerClasses={classNames.field}
                              tooltipAttentionContent={
                                !item.barCode && t(TranslationKey['A task will be created for the prep center'])
                              }
                              tooltipInfoContent={
                                !item.barCode &&
                                t(
                                  TranslationKey[
                                    'Add a product barcode to the box. A task will be created for the prep center'
                                  ],
                                )
                              }
                              labelClasses={classNames.standartLabel}
                              label={t(TranslationKey.BarCode)}
                              inputComponent={
                                <div>
                                  <Chip
                                    classes={{
                                      root: classNames.barcodeChip,
                                      clickable: classNames.barcodeChipHover,
                                      deletable: classNames.barcodeChipHover,
                                      deleteIcon: classNames.barcodeChipIcon,
                                      label: classNames.barcodeChiplabel,
                                    }}
                                    className={cx({[classNames.barcodeChipExists]: item.barCode})}
                                    size="small"
                                    label={
                                      item.tmpBarCode.length
                                        ? t(TranslationKey['File added'])
                                        : item.barCode
                                        ? item.barCode
                                        : t(TranslationKey['Set Barcode'])
                                    }
                                    onClick={() => onClickBarcode(item)}
                                    onDoubleClick={() => onDoubleClickBarcode(item)}
                                    onDelete={!item.barCode ? undefined : () => onDeleteBarcode(item.product._id)}
                                  />
                                </div>
                              }
                            />

                            <div>
                              <Field
                                oneLine
                                labelClasses={classNames.standartLabel}
                                tooltipInfoContent={t(
                                  TranslationKey['The supplier has glued the barcode before shipment'],
                                )}
                                containerClasses={classNames.checkboxContainer}
                                label={t(TranslationKey['The barcode is glued by the supplier'])}
                                inputComponent={
                                  <Checkbox
                                    checked={item.isBarCodeAlreadyAttachedByTheSupplier}
                                    onChange={onClickGluedCheckbox('isBarCodeAlreadyAttachedByTheSupplier', item._id)}
                                  />
                                }
                              />
                              <Field
                                oneLine
                                labelClasses={classNames.standartLabel}
                                tooltipInfoContent={t(
                                  TranslationKey[
                                    'The barcode was glued on when the box was accepted at the prep center'
                                  ],
                                )}
                                containerClasses={classNames.checkboxContainer}
                                label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                                inputComponent={
                                  <Checkbox
                                    checked={item.isBarCodeAttachedByTheStorekeeper}
                                    onChange={onClickGluedCheckbox('isBarCodeAttachedByTheStorekeeper', item._id)}
                                  />
                                }
                              />
                            </div>
                          </>
                        </div>

                        <div className={classNames.rightProductColumn}>
                          <Typography className={classNames.amazonTitle}>{item.product.amazonTitle}</Typography>

                          <Field
                            oneLine
                            containerClasses={classNames.field}
                            labelClasses={classNames.standartLabel}
                            label={`${t(TranslationKey.ASIN)}:`}
                            inputComponent={
                              <Typography className={classNames.asinText}>{item.product.asin}</Typography>
                            }
                          />

                          <Field
                            oneLine
                            disabled
                            labelClasses={classNames.standartLabel}
                            inputClasses={classNames.disabledNumInput}
                            label={t(TranslationKey['Quantity units of product'])}
                            value={item.amount}
                          />

                          <Field
                            multiline
                            disabled
                            minRows={5}
                            maxRows={5}
                            labelClasses={classNames.standartLabel}
                            inputClasses={classNames.multiline}
                            label={t(TranslationKey['Comments on order'])}
                            value={item.order.clientComment}
                          />

                          <Field
                            labelClasses={classNames.standartLabel}
                            containerClasses={classNames.field}
                            inputClasses={classNames.inputField}
                            inputProps={{maxLength: 255}}
                            label={t(TranslationKey['HS code'])}
                            value={item.product.hsCode}
                            inputComponent={
                              <Button
                                variant="contained"
                                color="primary"
                                className={classNames.hsCodeBtn}
                                onClick={() => onClickHsCode(item.product._id)}
                              >
                                {t(TranslationKey['HS code'])}
                              </Button>
                            }
                            onChange={setHsCode(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </CustomCarousel>
                </div>

                <Divider className={classNames.divider} />
                <div className={classNames.shareBoxWrapper}>
                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
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
                          data={destinations.filter(el => el.storekeeper?._id !== formItem?.storekeeper._id)}
                          searchFields={['name']}
                          onClickNotChosen={() => setBoxFields({...boxFields, destinationId: null})}
                          onClickSelect={el => setBoxFields({...boxFields, destinationId: el._id})}
                          onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                        />
                      }
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
                      tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                      error={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
                      inputComponent={
                        <Button
                          disableElevation
                          color="primary"
                          variant={boxFields.storekeeperId && 'text'}
                          className={cx(classNames.storekeeperBtnDefault, {
                            [classNames.storekeeperBtn]: !boxFields.storekeeperId,
                            [classNames.storekeeperBtnColored]:
                              !boxFields.storekeeperId && SettingsModel.uiTheme === UiTheme.light,
                          })}
                          onClick={() =>
                            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                          }
                        >
                          {boxFields.storekeeperId
                            ? `${
                                storekeepers.find(el => el._id === boxFields.storekeeperId)?.name ||
                                t(TranslationKey['Not available'])
                              } /  
                        ${
                          boxFields.storekeeperId
                            ? `${tariffName ? tariffName + ' / ' : ''}${
                                regionOfDeliveryName ? regionOfDeliveryName : ''
                              }${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                            : 'none'
                        }`
                            : t(TranslationKey.Select)}
                        </Button>
                      }
                    />
                  </div>
                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={cx(classNames.fbaShipmentInput)}
                      inputProps={{maxLength: 255}}
                      label={t(TranslationKey['Reference id'])}
                      value={boxFields.referenceId}
                      onChange={setFormField('referenceId')}
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.shippingField}
                      tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                      tooltipAttentionContent={t(
                        TranslationKey['When re-sticking will create a task for the prep center'],
                      )}
                      label={t(TranslationKey['Shipping label'])}
                      inputComponent={
                        <div>
                          <Chip
                            classes={{
                              root: classNames.barcodeChip,
                              clickable: classNames.barcodeChipHover,
                              deletable: classNames.barcodeChipHover,
                              deleteIcon: classNames.barcodeChipIcon,
                              label: classNames.barcodeChiplabel,
                            }}
                            className={cx({[classNames.barcodeChipExists]: boxFields.shippingLabel})}
                            size="small"
                            label={
                              boxFields.tmpShippingLabel.length
                                ? t(TranslationKey['File added'])
                                : boxFields.shippingLabel
                                ? boxFields.shippingLabel
                                : t(TranslationKey['Set Shipping Label'])
                            }
                            onClick={() => onClickShippingLabel()}
                            onDelete={!boxFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                          />
                        </div>
                      }
                    />
                  </div>
                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={classNames.fbaShipmentInput}
                      inputProps={{maxLength: 255}}
                      tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                      label={t(TranslationKey['FBA Shipment'])}
                      value={boxFields.fbaShipment}
                      onChange={setFormField('fbaShipment')}
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={classNames.fbaShipmentInput}
                      inputProps={{maxLength: 255}}
                      label={'FBA number'}
                      value={boxFields.fbaNumber}
                      onChange={setFormField('fbaNumber')}
                    />
                  </div>

                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={classNames.fbaShipmentInput}
                      inputProps={{maxLength: 255}}
                      label={'UPS Track number'}
                      value={boxFields.upsTrackNumber}
                      onChange={setFormField('upsTrackNumber')}
                    />
                  </div>

                  <div className={classNames.labelsInfoWrapper}>
                    <div>
                      <Field
                        labelClasses={classNames.standartLabel}
                        containerClasses={classNames.field}
                        inputClasses={classNames.inputField}
                        inputProps={{maxLength: 255}}
                        label={t(TranslationKey['Track number'])}
                        value={boxFields.trackNumberText}
                        onChange={setFormField('trackNumberText')}
                      />

                      <Button
                        className={classNames.trackNumberPhotoBtn}
                        onClick={() => {
                          setBarcodeModalSetting({
                            title: 'Track number',
                            maxNumber: 50 - boxFields.tmpTrackNumberFile.length - boxFields.trackNumberFile.length,

                            tmpCode: boxFields.tmpTrackNumberFile,
                            item: null,
                            onClickSaveBarcode: value => {
                              setFormField('tmpTrackNumberFile')({target: {value}})
                              setShowSetBarcodeModal(false)
                            },
                          })

                          setShowSetBarcodeModal(!showSetBarcodeModal)
                        }}
                      >
                        {boxFields.tmpTrackNumberFile[0] ? t(TranslationKey['File added']) : 'Photo track numbers'}
                      </Button>
                    </div>

                    <div className={classNames.trackNumberPhotoWrapper}>
                      {boxFields.trackNumberFile[0] || boxFields.tmpTrackNumberFile[0] ? (
                        <CustomCarousel>
                          {(boxFields.trackNumberFile.length
                            ? boxFields.trackNumberFile
                            : boxFields.tmpTrackNumberFile
                          ).map((el, index) => (
                            <img
                              key={index}
                              className={classNames.trackNumberPhoto}
                              src={
                                boxFields.tmpTrackNumberFile[index]
                                  ? typeof boxFields.tmpTrackNumberFile[index] === 'string'
                                    ? boxFields.tmpTrackNumberFile[index]
                                    : boxFields.tmpTrackNumberFile[index]?.data_url
                                  : boxFields.trackNumberFile[index]
                              }
                              // variant="square"
                              onClick={() => {
                                setShowPhotosModal(!showPhotosModal)
                                setBigImagesOptions({
                                  ...bigImagesOptions,

                                  images: [
                                    boxFields.tmpTrackNumberFile[index]
                                      ? typeof boxFields.tmpTrackNumberFile[index] === 'string'
                                        ? boxFields.tmpTrackNumberFile[index]
                                        : boxFields.tmpTrackNumberFile[index]?.data_url
                                      : boxFields.trackNumberFile[index],
                                  ],
                                })
                              }}
                            />
                          ))}
                        </CustomCarousel>
                      ) : (
                        <Typography>{'no photo track number...'}</Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Field
            containerClasses={classNames.blockOfNewBoxContainer}
            label={t(TranslationKey['Box data'])}
            inputComponent={
              <div className={classNames.blockOfNewBoxWrapper}>
                <div className={classNames.sizesTitleWrapper}>
                  <Text
                    tooltipInfoContent={t(TranslationKey['The dimensions of the box specified by the prep center'])}
                    className={classNames.standartLabel}
                  >
                    {t(TranslationKey.Dimensions)}
                  </Text>

                  <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                    <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                      {'In'}
                    </ToggleBtn>
                    <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                      {'Cm'}
                    </ToggleBtn>
                  </ToggleBtnGroup>
                </div>

                <WarehouseDemensions
                  orderBox={boxFields}
                  sizeSetting={sizeSetting}
                  volumeWeightCoefficient={volumeWeightCoefficient}
                  setFormField={setFormField}
                />

                <div className={classNames.imageFileInputWrapper}>
                  <UploadFilesInput
                    images={imagesOfBox}
                    setImages={setImagesOfBox}
                    maxNumber={boxFields.images?.length ? 50 - boxFields.images?.length : 50}
                  />
                </div>

                <div className={classNames.boxPhotoWrapper}>
                  <Typography className={classNames.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>
                  <PhotoCarousel files={boxFields.images} imageClass={classNames.boxImageClass} />
                </div>

                <div className={classNames.commentsWrapper}>
                  <Field
                    multiline
                    disabled
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Client comment'])}
                    className={classNames.commentField}
                    labelClasses={classNames.label}
                    value={boxFields.clientComment}
                  />

                  <Field
                    multiline
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Storekeeper comment'])}
                    placeholder={t(TranslationKey['Add comment'])}
                    className={classNames.commentField}
                    labelClasses={classNames.label}
                    value={boxFields.storekeeperComment}
                    onChange={setFormField('storekeeperComment')}
                  />
                </div>
              </div>
            }
          />

          <Field
            multiline
            className={classNames.multiline}
            minRows={25}
            maxRows={25}
            inputProps={{maxLength: 1000}}
            label={t(TranslationKey['Write a comment on the task'])}
            placeholder={t(TranslationKey.Comment)}
            value={boxFields.storekeeperTaskComment}
            onChange={setFormField('storekeeperTaskComment')}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the box'])}
            className={classNames.button}
            onClick={() => {
              onSubmit({
                id: formItem?._id,
                boxData: getBoxDataToSubmit(),
                sourceData: formItem,
                imagesOfBox,
                dataToSubmitHsCode: boxFields.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode})),
              })
            }}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(classNames.button, classNames.cancelBtn)}
            variant="text"
            onClick={onTriggerOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
          setImageIndex={imgIndex => setBigImagesOptions(() => ({...bigImagesOptions, imgIndex}))}
        />

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetShippingLabelModal
            tmpShippingLabel={boxFields.tmpShippingLabel}
            item={boxFields}
            onClickSaveShippingLabel={shippingLabel => {
              setShippingLabel()(shippingLabel)
              setShowSetShippingLabelModal(!showSetShippingLabelModal)
            }}
            onCloseModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
          />
        </Modal>

        <Modal
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
        >
          <SelectStorekeeperAndTariffForm
            storekeepers={storekeepers.filter(el => el._id === formItem?.storekeeper._id)}
            curStorekeeperId={boxFields.storekeeperId}
            curTariffId={boxFields.logicsTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={barcodeModalSetting.title}
            maxNumber={barcodeModalSetting.maxNumber}
            tmpCode={barcodeModalSetting.tmpCode}
            item={barcodeModalSetting.item}
            onClickSaveBarcode={barcodeModalSetting.onClickSaveBarcode}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
      </div>
    )
  },
)
