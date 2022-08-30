/* eslint-disable no-unused-vars */
import {useState} from 'react'

import {Checkbox, Chip, Divider, NativeSelect, TableCell, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

// import Carousel from 'react-material-ui-carousel'
import {loadingStatuses} from '@constants/loading-statuses'
import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

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

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
// import {checkIsImageLink} from '@utils/checks'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {SelectStorekeeperAndTariffForm} from '../select-storkeeper-and-tariff-form'
import {useClassNames} from './edit-box-form.style'
import {ProductInOrderTableRow} from './product-in-order-table-row'

const WarehouseDemensions = ({orderBox, sizeSetting}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.demensionsWrapper}>
      <Typography>
        {t(TranslationKey.Length) + ': '}

        {toFixed(orderBox.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
      </Typography>
      <Typography>
        {t(TranslationKey.Width) + ': '}
        {toFixed(orderBox.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
      </Typography>
      <Typography>
        {t(TranslationKey.Height) + ': '}
        {toFixed(orderBox.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
      </Typography>

      <Typography>
        {t(TranslationKey.Weight) + ': '}
        {orderBox.weighGrossKgWarehouse || 0}
      </Typography>

      <Typography>
        {t(TranslationKey['Volume weight']) + ': '}
        {toFixed(orderBox.volumeWeightKgWarehouse, 4) || 0}
      </Typography>

      <Typography className={clsx({[classNames.alertText]: orderBox.weightFinalAccountingKgWarehouse < 12})}>
        {t(TranslationKey['Final weight']) + ': '}
        {toFixed(orderBox.weightFinalAccountingKgWarehouse, 4) || 0}
      </Typography>

      {orderBox.weightFinalAccountingKgWarehouse < 12 ? (
        <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
      ) : null}
    </div>
  )
}

export const CLIENT_EDIT_BOX_MODAL_HEAD_CELLS = () => [
  t(TranslationKey.Product),
  t(TranslationKey.BarCode),
  t(TranslationKey.Quantity),
  t(TranslationKey['Order comment']),
  t(TranslationKey.Actions),
]

const renderHeadRow = () => (
  <TableRow>
    {CLIENT_EDIT_BOX_MODAL_HEAD_CELLS().map((item, index) => (
      <TableCell key={index}>
        <Text tooltipInfoContent={item === t(TranslationKey.BarCode) && t(TranslationKey['Product barcode'])}>
          {item}
        </Text>
      </TableCell>
    ))}
  </TableRow>
)

export const EditBoxForm = observer(
  ({formItem, onSubmit, onTriggerOpenModal, requestStatus, volumeWeightCoefficient, destinations, storekeepers}) => {
    const classNames = useClassNames()

    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

    const rowHandlers = {
      onTriggerOpenModal: () => setShowPhotosModal(!showPhotosModal),
      onSelectPhotos: setBigImagesOptions,
    }

    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(null)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickBarcode = item => {
      setCurProductToEditBarcode(item)

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onDoubleClickBarcode = item => {
      setCurProductToEditBarcode(item)
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onClickSaveBarcode = product => newBarCodeData => {
      const newFormFields = {...boxFields}

      newFormFields.items = [
        ...boxFields.items.map(el =>
          el.product._id === product.product._id ? {...el, tmpBarCode: newBarCodeData} : el,
        ),
      ]

      setBoxFields(newFormFields)

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const boxInitialState = {
      ...formItem,

      lengthCmWarehouse: formItem?.lengthCmWarehouse || 0,
      widthCmWarehouse: formItem?.widthCmWarehouse || 0,
      heightCmWarehouse: formItem?.heightCmWarehouse || 0,
      weighGrossKgWarehouse: formItem?.weighGrossKgWarehouse || 0,
      volumeWeightKgWarehouse: formItem ? calcVolumeWeightForBox(formItem, volumeWeightCoefficient) : 0,
      weightFinalAccountingKgWarehouse: formItem ? calcFinalWeightForBox(formItem, volumeWeightCoefficient) : 0,

      destinationId: formItem?.destinationId || null,
      storekeeperId: formItem?.storekeeperId || '',
      logicsTariffId: formItem?.logicsTariffId || '',

      amount: formItem?.amount,
      shippingLabel: formItem?.shippingLabel,
      clientComment: formItem?.clientComment || '',
      images: formItem?.images || [],
      fbaShipment: formItem?.fbaShipment || '',
      tmpShippingLabel: [],
      items: formItem?.items
        ? [...formItem.items.map(el => ({...el, changeBarCodInInventory: false, tmpBarCode: []}))]
        : [],
    }

    const [boxFields, setBoxFields] = useState(boxInitialState)

    const setFormField = fieldName => e => {
      const newFormFields = {...boxFields}
      newFormFields[fieldName] = e.target.value

      setBoxFields(newFormFields)
    }

    const setShippingLabel = () => value => {
      const newFormFields = {...boxFields}
      newFormFields.tmpShippingLabel = value

      setBoxFields(newFormFields)
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      const newFormFields = {...boxFields}
      newFormFields.shippingLabel = ''
      newFormFields.tmpShippingLabel = []
      setBoxFields(newFormFields)
    }

    const onDeleteBarcode = productId => {
      const newFormFields = {...boxFields}
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId ? {...item, barCode: '', changeBarCodInInventory: false} : item,
      )
      setBoxFields(newFormFields)
    }

    const onClickBarcodeInventoryCheckbox = (productId, value) => {
      const newFormFields = {...boxFields}
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId ? {...item, changeBarCodInInventory: value} : item,
      )
      setBoxFields(newFormFields)
    }

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)
    }

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

    const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
      setBoxFields({...boxFields, storekeeperId, logicsTariffId: tariffId})

      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }

    const disableSubmit =
      JSON.stringify(boxInitialState) === JSON.stringify(boxFields) ||
      requestStatus === loadingStatuses.isLoading ||
      boxFields.storekeeperId === '' ||
      boxFields.logicsTariffId === ''

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
                  <Field
                    oneLine
                    labelClasses={classNames.standartLabel}
                    label={`${t(TranslationKey.Box)} №`}
                    inputComponent={
                      <div className={classNames.boxTitleWrapper}>
                        <Typography className={classNames.tableTitle}>{`${
                          formItem && formItem.humanFriendlyId
                        }`}</Typography>

                        <Typography variant="h4" className={classNames.amountSpan}>
                          {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                        </Typography>
                      </div>
                    }
                  />
                  <Field
                    oneLine
                    disabled
                    labelClasses={classNames.standartLabel}
                    inputClasses={classNames.disabledNumInput}
                    label={t(TranslationKey['Total goods In Box'])}
                    value={allItemsCount}
                  />
                </div>

                <Divider className={classNames.divider} />

                <div className={classNames.productsWrapper}>
                  <CustomCarousel alignButtons="end">
                    {boxFields.items.map((item, index) => (
                      <div key={index} className={classNames.productWrapper}>
                        <div className={classNames.leftProductColumn}>
                          <div className={classNames.photoWrapper}>
                            <PhotoCarousel isAmazonPhoto files={item.product.images} width={200} />
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
                                    className={clsx({[classNames.barcodeChipExists]: item.barCode})}
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

                            {item.tmpBarCode.length ? (
                              <Field
                                oneLine
                                labelClasses={classNames.standartLabel}
                                containerClasses={classNames.checkboxContainer}
                                tooltipInfoContent={t(
                                  TranslationKey['The new barcode will be updated at the product in the inventory'],
                                )}
                                label={t(TranslationKey['Change in inventory'])}
                                inputComponent={
                                  <Checkbox
                                    color="primary"
                                    checked={item.changeBarCodInInventory}
                                    onClick={() =>
                                      onClickBarcodeInventoryCheckbox(item.product._id, !item.changeBarCodInInventory)
                                    }
                                  />
                                }
                              />
                            ) : null}

                            {!item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper ? (
                              <Typography className={classNames.noBarCodeGlued}>
                                {t(TranslationKey['Not glued!'])}
                              </Typography>
                            ) : (
                              <div>
                                {item.isBarCodeAlreadyAttachedByTheSupplier ? (
                                  <Field
                                    oneLine
                                    labelClasses={classNames.standartLabel}
                                    tooltipInfoContent={t(
                                      TranslationKey['The supplier has glued the barcode before shipment'],
                                    )}
                                    containerClasses={classNames.checkboxContainer}
                                    label={t(TranslationKey['The barcode is glued by the supplier'])}
                                    inputComponent={
                                      <Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />
                                    }
                                  />
                                ) : (
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
                                      <Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />
                                    }
                                  />
                                )}
                              </div>
                            )}
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
                            rows={5}
                            rowsMax={5}
                            labelClasses={classNames.standartLabel}
                            inputClasses={classNames.multiline}
                            label={t(TranslationKey['Comments on order'])}
                            value={item.order.clientComment}
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
                          selectedItemName={
                            destinations.find(el => el._id === boxFields.destinationId)?.name ||
                            t(TranslationKey['Not chosen'])
                          }
                          data={destinations}
                          fieldName="name"
                          onClickSelect={el => setBoxFields({...boxFields, destinationId: el._id})}
                        />
                      }
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      label={'Storekeeper /' + t(TranslationKey.Tariff)}
                      tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                      error={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
                      inputComponent={
                        <Button
                          disableElevation
                          color="primary"
                          variant={boxFields.storekeeperId && 'text'}
                          className={clsx({[classNames.storekeeperBtn]: !boxFields.storekeeperId})}
                          onClick={() =>
                            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                          }
                        >
                          {boxFields.storekeeperId
                            ? `${storekeepers.find(el => el._id === boxFields.storekeeperId)?.name || 'N/A'} /  
                        ${
                          boxFields.storekeeperId
                            ? `${tariffName}${regionOfDeliveryName ? ' / ' + regionOfDeliveryName : ''}${
                                tariffRate ? ' / ' + tariffRate + ' $' : ''
                              }`
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
                            className={clsx({[classNames.barcodeChipExists]: boxFields.shippingLabel})}
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
                    {t(TranslationKey.Demensions)}
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

                <WarehouseDemensions orderBox={boxFields} sizeSetting={sizeSetting} />

                <div className={classNames.photoWrapper}>
                  <Typography className={classNames.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>
                  <PhotoCarousel small files={boxFields.images} width={250} />
                </div>
              </div>
            }
          />

          <Field
            multiline
            className={classNames.multiline}
            rows={25}
            rowsMax={25}
            inputProps={{maxLength: 1000}}
            tooltipAttentionContent={t(TranslationKey['A task will be created for the prep center'])}
            label={t(TranslationKey['Write a comment on the task'])}
            placeholder={t(TranslationKey['Task commentary'])}
            onChange={setFormField('clientComment')}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the box'])}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(formItem?._id, {...boxFields, destinationId: boxFields.destinationId || null}, formItem)
            }}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            disableElevation
            color="primary"
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={classNames.button}
            variant="text"
            onClick={onTriggerOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <BigImagesModal
          isAmazone
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
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
            tmpCode={curProductToEditBarcode?.tmpBarCode}
            item={curProductToEditBarcode}
            onClickSaveBarcode={data => onClickSaveBarcode(curProductToEditBarcode)(data)}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
      </div>
    )
  },
)
