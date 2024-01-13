/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton } from '@mui/material'

import { UiTheme } from '@constants/theme/mui-theme.type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkIsPositiveNum } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './box.style'

interface BoxProps {
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  box: any
  readOnly?: boolean
  boxIsMasterBox?: boolean
  isMasterBox?: boolean
  selectedBox?: any
  isNewBox?: boolean
  totalProductsAmount?: number
  destinationsFavourites?: any
  onClickEditBox: (box: any) => void
  setCurBox: (box: any) => void
  onClickApplyAllBtn: (box: any) => void
  setDestinationsFavouritesItem: (destinationId: string) => void
  onRemoveBox: (boxIndex: string) => void
  onChangeAmountInput: (event: any, guid: string, order: any) => void
  onChangeField: (value: any, field: string, guid: string) => void
}

export const Box: FC<BoxProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    destinations,
    storekeepers,
    box,
    readOnly = false,
    boxIsMasterBox,
    isMasterBox,
    selectedBox,
    isNewBox,
    totalProductsAmount,
    destinationsFavourites,
    onClickEditBox,
    setCurBox,
    onClickApplyAllBtn,
    onChangeAmountInput,
    onRemoveBox,
    onChangeField,
    setDestinationsFavouritesItem,
  } = props

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
  const [showFullCard, setShowFullCard] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmModalSettings, setConfirmModalSettings] = useState<any>(undefined)

  const setShippingLabel = () => (value: any) => {
    onChangeField({ target: { value } }, 'tmpShippingLabel', box._id)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }

  const onDeleteShippingLabel = () => {
    onChangeField({ shippingLabel: '', tmpShippingLabel: [] }, 'part', box._id)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (
    storekeeperId: string,
    tariffId: string,
    variationTariffId: string,
    destinationId: string,
    isSelectedDestinationNotValid: boolean,
  ) => {
    if (isSelectedDestinationNotValid) {
      setConfirmModalSettings({
        isWarning: false,
        title: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Wish to change a destination?']),

        onClickConfirm: () => {
          onChangeField({ storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId }, 'part', box._id)

          setShowConfirmModal(false)
          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
        },

        onClickCancelBtn: () => {
          onChangeField(
            { storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId: null },
            'part',
            box._id,
          )

          setShowConfirmModal(false)
          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
        },
      })

      setShowConfirmModal(true)
    } else {
      onChangeField({ storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId }, 'part', box._id)
      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }
  }

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    box.destinationId,
    box.storekeeperId,
    box.logicsTariffId,
    box.variationTariffId,
  )

  return (
    <div className={styles.box}>
      <div className={styles.itemWrapper}>
        <div>
          {box?.items?.map((order: any, orderIndex: number) => (
            <div key={`box_${box?._id}_${readOnly ? 1 : 0}_${orderIndex}`}>
              <div key={orderIndex} className={styles.order}>
                <img className={styles.img} src={getAmazonImageUrl(order.product.images[0])} />
                <div>
                  <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={order.product.asin} />

                  <p className={styles.title}>{order.product.amazonTitle}</p>
                </div>

                <div>
                  <Field
                    disabled={readOnly}
                    label={t(TranslationKey.Quantity)}
                    className={styles.orderInput}
                    labelClasses={styles.label}
                    value={isMasterBox ? (boxIsMasterBox ? selectedBox.amount : 1) : order.amount}
                    tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                    onChange={(e: any) =>
                      checkIsPositiveNum(e.target.value) && onChangeAmountInput(e, box._id, order.order)
                    }
                  />
                </div>
              </div>
              {isMasterBox ? (
                <p className={styles.subTitle}>{`${t(TranslationKey['Units in a box'])} ${box.items[0].amount}`}</p>
              ) : undefined}
            </div>
          ))}
          {showFullCard ? (
            <div className={styles.itemSubWrapper}>
              <Field
                containerClasses={styles.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={styles.label}
                inputComponent={
                  <WithSearchSelect
                    // @ts-ignore
                    disabled={!isNewBox}
                    width={220}
                    selectedItemName={
                      destinations.find(el => el._id === (isNewBox ? box.destinationId : box.destination?._id))?.name ||
                      t(TranslationKey['Not chosen'])
                    }
                    data={
                      box?.variationTariffId
                        ? destinations
                            ?.filter(el => el.storekeeper?._id !== box?.storekeeper?._id)
                            ?.filter(el => el._id === box?.destinationId)
                        : destinations?.filter(el => el.storekeeper?._id !== box?.storekeeper?._id)
                    }
                    searchFields={['name']}
                    favourites={destinationsFavourites}
                    onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                    onClickNotChosen={() => onChangeField({ target: { value: '' } }, 'destinationId', box._id)}
                    onClickSelect={(el: any) => onChangeField({ target: { value: el._id } }, 'destinationId', box._id)}
                  />
                }
              />

              <Field
                containerClasses={styles.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={styles.label}
                inputComponent={
                  <div>
                    {isNewBox ? (
                      <Button
                        disabled={!isNewBox}
                        className={cx(
                          styles.storekeeperBtnDefault,
                          { [styles.storekeeperBtn]: !box.logicsTariffId },
                          {
                            [styles.storekeeperBtnColored]:
                              !box.logicsTariffId && SettingsModel.uiTheme === UiTheme.light,
                          },
                          { [styles.storekeeperDisableBtn]: !isNewBox },
                        )}
                        onClick={() =>
                          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                        }
                      >
                        {box.logicsTariffId
                          ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                          : t(TranslationKey.Select)}
                      </Button>
                    ) : (
                      <p className={styles.storekeeperDisableBtn}>{`${
                        box.logicsTariff?._id ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}` : 'none'
                      }`}</p>
                    )}
                  </div>
                }
              />

              <Field
                disabled={!isNewBox}
                inputProps={{ maxLength: 255 }}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={styles.field}
                labelClasses={styles.label}
                inputClasses={cx(styles.fieldInput, {
                  [styles.inputAccent]:
                    (box.shippingLabel || box.tmpShippingLabel?.length) &&
                    !box.fbaShipment &&
                    !destinations.find(el => el._id === box.destinationId)?.storekeeper &&
                    isNewBox,
                })}
                label={t(TranslationKey['FBA Shipment'])}
                value={box.fbaShipment}
                onChange={(e: any) => onChangeField(e, 'fbaShipment', box._id)}
              />

              {!isNewBox ? (
                <LabelWithCopy
                  direction="column"
                  labelTitleColor="gray"
                  lableLinkTitleSize="medium"
                  labelTitle={t(TranslationKey['Shipping label'])}
                  labelValue={box.shippingLabel}
                  lableLinkTitle={t(TranslationKey.View)}
                  labelWrapperStyles={styles.labelWrapperStyles}
                />
              ) : null}

              {isNewBox ? (
                <div>
                  <Field
                    label={t(TranslationKey['Shipping label']) + ':'}
                    tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                    labelClasses={styles.label}
                    inputComponent={
                      <ChangeChipCell
                        isChipOutTable
                        text={
                          !box.shippingLabel && !box?.tmpShippingLabel?.length
                            ? t(TranslationKey['Set Shipping Label'])
                            : ''
                        }
                        value={
                          box?.tmpShippingLabel?.[0]?.file?.name || box?.tmpShippingLabel?.[0] || box.shippingLabel
                        }
                        onClickChip={onClickShippingLabel}
                        onDeleteChip={onDeleteShippingLabel}
                      />
                    }
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {!isNewBox && (
            <div className={styles.currentBoxFooter}>
              <p className={styles.footerTitle}>{`${t(
                TranslationKey['Left to redistribute'],
              )}: ${totalProductsAmount}`}</p>
            </div>
          )}

          {isNewBox && (
            <div className={styles.bottomBlockWrapper}>
              <IconButton classes={{ root: styles.icon }} onClick={() => onRemoveBox(box._id)}>
                <DeleteOutlineOutlinedIcon className={styles.deleteBtn} />
              </IconButton>
              <Button
                className={cx(styles.editBtn, {
                  [styles.editBtnYellow]:
                    !box.widthCmWarehouse ||
                    !box.weighGrossKgWarehouse ||
                    !box.lengthCmWarehouse ||
                    !box.heightCmWarehouse,
                })}
                tooltipInfoContent={t(TranslationKey['Edit box parameters'])}
                onClick={() => {
                  setCurBox(box)
                  onClickEditBox(box)
                }}
              >
                {t(TranslationKey.Edit)}
              </Button>

              <Button
                disabled={
                  !box.widthCmWarehouse ||
                  !box.weighGrossKgWarehouse ||
                  !box.lengthCmWarehouse ||
                  !box.heightCmWarehouse
                }
                className={styles.editBtn}
                onClick={() => {
                  onClickApplyAllBtn(box)
                }}
              >
                {t(TranslationKey['Apply to all'])}
              </Button>
              <div className={styles.incomingBtnWrapper}>
                <div className={styles.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                  <p className={styles.tablePanelViewText}>
                    {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                  </p>

                  {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetShippingLabelModal
          tmpShippingLabel={box.tmpShippingLabel}
          item={box}
          onClickSaveShippingLabel={(shippingLabel: string) => {
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
          showCheckbox
          RemoveDestinationRestriction
          // @ts-ignore
          destinationsData={destinations}
          storekeepers={storekeepers.filter(el => el?._id === box?.storekeeper?._id)}
          curStorekeeperId={box?.storekeeperId}
          curTariffId={box?.logicsTariffId}
          currentDestinationId={box?.destinationId}
          currentVariationTariffId={box?.variationTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>

      <ConfirmationModal
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
    </div>
  )
})
