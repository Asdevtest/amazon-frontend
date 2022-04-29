import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {useState} from 'react'

import {Chip, Divider, NativeSelect, TableCell, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {loadingStatuses} from '@constants/loading-statuses'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {texts} from '@constants/texts'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'
import {Table} from '@components/table'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

import {SelectStorekeeperAndTariffForm} from '../select-storkeeper-and-tariff-form'
import {useClassNames} from './edit-box-form.style'
import {ProductInOrderTableRow} from './product-in-order-table-row'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

const WarehouseDemensions = ({orderBox, sizeSetting}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmWarehouse}
          value={toFixed(orderBox.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmWarehouse}
          value={toFixed(orderBox.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmWarehouse}
          value={toFixed(orderBox.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgWarehouse}
          value={orderBox.weighGrossKgWarehouse || 0}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgWarehouse}
          value={toFixed(orderBox.volumeWeightKgWarehouse, 4) || 0}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgWarehouse}
          value={toFixed(orderBox.weightFinalAccountingKgWarehouse, 4) || 0}
        />
      </div>
    </div>
  )
}

export const CLIENT_EDIT_BOX_MODAL_HEAD_CELLS = ['Product', 'Barcode', 'Qty', 'Buyer order comment', 'Actions']

const renderHeadRow = (
  <TableRow>
    {CLIENT_EDIT_BOX_MODAL_HEAD_CELLS.map((item, index) => (
      <TableCell key={index}>{item}</TableCell>
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

    const boxInitialState = {
      ...formItem,

      lengthCmWarehouse: formItem?.lengthCmWarehouse || 0,
      widthCmWarehouse: formItem?.widthCmWarehouse || 0,
      heightCmWarehouse: formItem?.heightCmWarehouse || 0,
      weighGrossKgWarehouse: formItem?.weighGrossKgWarehouse || 0,
      volumeWeightKgWarehouse: formItem ? calcVolumeWeightForBox(formItem, volumeWeightCoefficient) : 0,
      weightFinalAccountingKgWarehouse: formItem ? calcFinalWeightForBox(formItem, volumeWeightCoefficient) : 0,

      destinationId: formItem?.destinationId || '',
      storekeeperId: formItem?.storekeeperId || '',
      logicsTariffId: formItem?.logicsTariffId || '',

      amount: formItem?.amount,
      shippingLabel: formItem?.shippingLabel || '',
      clientComment: formItem?.clientComment || '',
      images: formItem?.images || [],
      fbaShipment: formItem?.fbaShipment || '',
      tmpShippingLabel: [],
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
      (boxFields.shippingLabel.length < 5 && boxFields.shippingLabel.length > 0) ||
      boxFields.destinationId === '' ||
      boxFields.storekeeperId === '' ||
      boxFields.logicsTariffId === ''

    const curDestination = destinations.find(el => el._id === boxFields.destinationId)

    const firstNumOfCode = curDestination?.zipCode[0]

    const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <div className={classNames.topWrapper}>
            <div>
              <Typography paragraph className={classNames.subTitle}>
                {textConsts.updateBoxTitle}
              </Typography>

              <Field
                containerClasses={classNames.field}
                label={'Destination'}
                inputComponent={
                  <NativeSelect
                    variant="filled"
                    inputProps={{
                      name: 'destinationId',
                      id: 'destinationId',
                    }}
                    className={classNames.destinationSelect}
                    input={<Input />}
                    value={boxFields.destinationId}
                    onChange={e => setBoxFields({...boxFields, destinationId: e.target.value})}
                  >
                    <option value={''}>{'none'}</option>

                    {destinations.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </NativeSelect>
                }
              />

              <Field
                containerClasses={classNames.field}
                label={'Storekeeper / Tariff'}
                inputComponent={
                  <Button
                    disableElevation
                    color="primary"
                    variant={boxFields.storekeeperId && 'text'}
                    className={clsx({[classNames.storekeeperBtn]: !boxFields.storekeeperId})}
                    onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                  >
                    {boxFields.storekeeperId
                      ? `${storekeepers.find(el => el._id === boxFields.storekeeperId)?.name || 'N/A'} /  
                        ${
                          boxFields.storekeeperId
                            ? `${
                                storekeepers
                                  .find(el => el._id === boxFields.storekeeperId)
                                  .tariffLogistics.find(el => el._id === boxFields.logicsTariffId)?.name
                              } / ${regionOfDeliveryName} / ${
                                storekeepers
                                  .find(el => el._id === boxFields.storekeeperId)
                                  .tariffLogistics.find(el => el._id === boxFields.logicsTariffId)?.conditionsByRegion[
                                  regionOfDeliveryName
                                ]?.rate || 'n/a'
                              } $`
                            : 'none'
                        }`
                      : 'Выбрать'}
                  </Button>
                }
              />

              <Field
                disabled
                containerClasses={classNames.field}
                label={textConsts.statusLabel}
                value={
                  boxFields.items[0].order.status && getOrderStatusOptionByCode(boxFields.items[0].order.status).label
                }
              />

              <Field
                containerClasses={classNames.field}
                inputProps={{maxLength: 255}}
                label={'FBA SHIPMENT'}
                value={boxFields.fbaShipment}
                onChange={setFormField('fbaShipment')}
              />

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
                      ? 'FILE IS ADDED'
                      : boxFields.shippingLabel
                      ? boxFields.shippingLabel
                      : 'Set shipping label'
                  }
                  onClick={() => onClickShippingLabel()}
                  onDelete={!boxFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                />
              </div>
            </div>

            <div className={classNames.blockOfNewBoxWrapper}>
              <div className={classNames.sizesTitleWrapper}>
                <Typography paragraph className={classNames.subTitle}>
                  {textConsts.warehouseDemensions}
                </Typography>

                <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                  <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                    {'In'}
                  </ToggleButton>
                  <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                    {'Cm'}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <WarehouseDemensions orderBox={boxFields} sizeSetting={sizeSetting} />

              <div className={classNames.photoWrapper}>
                <Typography className={classNames.subTitle}>{'Фотографии коробки, сделанные на складе:'}</Typography>

                {boxFields.images.length > 0 ? (
                  <Carousel autoPlay timeout={100} animation="fade">
                    {boxFields.images.map((el, index) => (
                      <div key={index}>
                        <img
                          alt=""
                          className={classNames.imgBox}
                          src={el}
                          onClick={() => {
                            setShowPhotosModal(!showPhotosModal)

                            setBigImagesOptions({images: boxFields.images, imgIndex: index})
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <Typography>{'Фотографий пока нет...'}</Typography>
                )}
              </div>
            </div>
          </div>

          <Divider className={classNames.divider} />

          <div className={classNames.tableWrapper}>
            <div className={classNames.boxTitleWrapper}>
              <Typography className={classNames.tableTitle}>{`${textConsts.boxTitle} #${
                formItem && formItem.humanFriendlyId
              }`}</Typography>

              <Typography variant="h4" className={classNames.amountSpan}>
                {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
              </Typography>
            </div>

            <Table
              rowsOnly
              data={boxFields.items}
              BodyRow={ProductInOrderTableRow}
              renderHeadRow={renderHeadRow}
              rowsHandlers={rowHandlers}
            />
          </div>

          <Divider className={classNames.divider} />

          <div className={classNames.commentsWrapper}>
            <Field
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              inputProps={{maxLength: 2000}}
              label={'Оставить комментарий к задаче'}
              placeholder={'Комментарий клиента к задаче'}
              onChange={setFormField('clientComment')}
            />
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            disabled={disableSubmit}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(formItem._id, boxFields, formItem)
            }}
          >
            {textConsts.saveChangesBtn}
          </SuccessButton>

          <Button
            disableElevation
            color="primary"
            className={classNames.button}
            variant="contained"
            onClick={onTriggerOpenModal}
          >
            {textConsts.cancelChangesBtn}
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
      </div>
    )
  },
)
