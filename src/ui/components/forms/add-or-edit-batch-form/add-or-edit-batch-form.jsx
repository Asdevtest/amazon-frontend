import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'

import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import {
  BatchWeightCalculationMethod,
  BatchWeightCalculationMethodByKey,
  BatchWeightCalculationMethodTranslateKey,
  getBatchWeightCalculationMethodForBox,
  getBatchWeightCalculationMethodsData,
} from '@constants/statuses/batch-weight-calculations-method'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { BoxModal } from '@components/modals/box-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { ClientAwaitingBatchesViewModel } from '@views/client/client-batches-views/client-awaiting-batches-view/client-awaiting-batches-view.model'

import {
  calcFinalWeightForBatchByMoreTotalWeight,
  calcPriceForBox,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
  getTariffRateForBoxOrOrder,
} from '@utils/calculation'
import { checkIsClient } from '@utils/checks'
import { formatDateWithoutTime } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './add-or-edit-batch-form.style'

import { addOrEditBatchFormColumns } from './add-or-edit-batch-form-columns'

export const addOrEditBatchDataConverter = (
  data,
  volumeWeightCoefficient,
  finalWeightCalculationMethod,
  getBatchWeightCalculationMethodForBox,
  calculationMethod,
  // isDifferentMethodForEach,
) =>
  data.map(item => ({
    originalData: item,
    ...item,
    id: item._id,
    _id: item._id,
    qty: item.items?.reduce((acc, cur) => (acc += cur.amount), 0),
    amazonPrice: calcPriceForBox(item),
    finalWeight: getBatchWeightCalculationMethodForBox
      ? getBatchWeightCalculationMethodForBox(
          calculationMethod,
          checkActualBatchWeightGreaterVolumeBatchWeight([item], volumeWeightCoefficient),
        )(item, volumeWeightCoefficient) * item.amount
      : finalWeightCalculationMethod(item, volumeWeightCoefficient) * item.amount,
    grossWeight: item.weighGrossKgWarehouse,
    destination: item.destination?.name,
    storekeeper: item.storekeeper,
    logicsTariff: getNewTariffTextForBoxOrOrder(item),
    client: item.client,
    isDraft: item.isDraft,
    isFormed: item.isFormed,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    xid: item.xid,
    deliveryTotalPrice:
      getTariffRateForBoxOrOrder(item) *
      (getBatchWeightCalculationMethodForBox
        ? getBatchWeightCalculationMethodForBox(
            calculationMethod,
            checkActualBatchWeightGreaterVolumeBatchWeight([item], volumeWeightCoefficient),
          )(item, volumeWeightCoefficient) * item.amount
        : finalWeightCalculationMethod(item, volumeWeightCoefficient) * item.amount),
    deliveryTotalPriceChanged: item.deliveryTotalPriceChanged,
    shippingLabel: item.shippingLabel,
    fbaShipment: item.fbaShipment,
    volumeWeightCoefficient,
    orderIdsItems: `${t(TranslationKey.Order)} №: ${item.items
      ?.reduce((acc, cur) => (acc += cur.order?.xid + ', '), '')
      .slice(0, -2)}  item №: ${item.items
      ?.reduce((acc, cur) => (acc += (cur.order?.item ? cur.order?.item : '-') + ', '), '')
      .slice(0, -2)}`,
  }))

export const AddOrEditBatchForm = observer(({ boxesData, onClose, onSubmit, batchToEdit, sourceBox }) => {
  const viewModel = useMemo(() => new ClientAwaitingBatchesViewModel(true), [])
  const { classes: styles, cx } = useStyles()

  const isClient = checkIsClient(UserRoleCodeMap[UserModel.platformSettings?.role])

  const [nameSearchValueBoxesToAddData, setNameSearchValueBoxesToAddData] = useState('')

  const [nameSearchValueChosenBoxes, setNameSearchValueChosenBoxes] = useState('')

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [batchFields, setBatchFields] = useState({
    title: batchToEdit?.title || '',
    calculationMethod:
      batchToEdit?.calculationMethod ||
      BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT],
    volumeWeightDivide: batchToEdit?.volumeWeightDivide || 6000,
  })

  const [boxesToAddData, setBoxesToAddData] = useState(
    addOrEditBatchDataConverter(
      boxesData,
      batchFields.volumeWeightDivide,
      getBatchWeightCalculationMethodForBox(
        batchFields.calculationMethod,
        checkActualBatchWeightGreaterVolumeBatchWeight(boxesData, batchFields.volumeWeightDivide),
      ),
      getBatchWeightCalculationMethodForBox,
      batchFields.calculationMethod,
    ),
  )

  const changeBatchFields = fieldName => value => {
    const newFields = { ...batchFields }

    newFields[fieldName] = value
    setBatchFields(newFields)
  }

  const [filesToAdd, setfilesToAdd] = useState([])

  useEffect(() => {
    if (batchToEdit) {
      setfilesToAdd(batchToEdit?.attachedDocuments || [])
    }
  }, [batchToEdit])

  const sourceChosenBoxesBase = batchToEdit
    ? addOrEditBatchDataConverter(
        batchToEdit?.boxes.map(box => ({ ...box, storekeeper: batchToEdit?.storekeeper })),
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(
          batchFields.calculationMethod,
          checkActualBatchWeightGreaterVolumeBatchWeight(batchToEdit?.boxes, batchFields.volumeWeightDivide),
        ),
        getBatchWeightCalculationMethodForBox,
        batchFields.calculationMethod,
      )
    : sourceBox
    ? [
        ...addOrEditBatchDataConverter(
          [sourceBox].map(box => ({ ...box, storekeeper: sourceBox?.storekeeper })),
          batchFields.volumeWeightDivide,
          getBatchWeightCalculationMethodForBox(
            batchFields.calculationMethod,
            checkActualBatchWeightGreaterVolumeBatchWeight([sourceBox], batchFields.volumeWeightDivide),
          ),
          getBatchWeightCalculationMethodForBox,
          batchFields.calculationMethod,
        ),
      ]
    : []

  const [chosenBoxesBase, setChosenBoxesBase] = useState(sourceChosenBoxesBase)

  const [chosenBoxes, setChosenBoxes] = useState(sourceChosenBoxesBase)

  const getCheckActualBatchWeightGreaterVolumeBatchWeight = () =>
    checkActualBatchWeightGreaterVolumeBatchWeight(
      chosenBoxes.map(el => el.originalData),
      batchFields.volumeWeightDivide,
    )

  const [boxesToAddIds, setBoxesToAddIds] = useState([])

  const [boxesToDeliteIds, setBoxesToDeliteIds] = useState([])

  const [sourceDataForFilters, setSourceDataForFilters] = useState(null)

  const filterBoxesToAddData = () => {
    const chosenBoxesIds = chosenBoxesBase.map(box => box._id)

    const newArr = addOrEditBatchDataConverter(
      boxesData,
      batchFields.volumeWeightDivide,
      getBatchWeightCalculationMethodForBox(
        batchFields.calculationMethod,
        getCheckActualBatchWeightGreaterVolumeBatchWeight(),
      ),
      getBatchWeightCalculationMethodForBox,
      batchFields.calculationMethod,
    ).filter(
      box =>
        (chosenBoxesBase[0]
          ? box.originalData?.destination?.name === chosenBoxesBase[0]?.originalData?.destination?.name
          : true) &&
        (chosenBoxesBase[0]
          ? box.originalData?.logicsTariff?.name === chosenBoxesBase[0]?.originalData?.logicsTariff?.name
          : true) &&
        !chosenBoxesIds.includes(box._id),
    )

    return newArr
  }

  useEffect(() => {
    if (batchToEdit) {
      setSourceDataForFilters(() => chosenBoxes[0].originalData)
    }
  }, [])

  const filterBySearchValueBoxesToAddData = boxesArr =>
    boxesArr?.filter(
      el =>
        el.originalData.items.some(
          item =>
            item.product.amazonTitle?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()) ||
            item.product.asin?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()) ||
            String(item.order.xid)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()) ||
            String(item.order.item)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()),
        ) ||
        String(el.originalData.xid)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()) ||
        String(el.originalData.prepId)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()),
    )

  const filterBySearchValueChosenBoxes = boxesArr =>
    boxesArr?.filter(
      el =>
        el.originalData.items.some(
          item =>
            item.product.amazonTitle?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
            item.product.asin?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
            String(item.order.xid)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
            String(item.order.item)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()),
        ) ||
        String(el.originalData.xid)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
        String(el.originalData.prepId)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()),
    )

  useEffect(() => {
    if (!batchToEdit) {
      setBoxesToAddData(() => filterBySearchValueBoxesToAddData([...filterBoxesToAddData()]))
    } else if (batchToEdit /* && !nameSearchValueChosenBoxes */) {
      const chosenBoxesIds = chosenBoxesBase.map(box => box._id)
      const deletedBoxes = addOrEditBatchDataConverter(
        [...(batchToEdit?.boxes || [])]
          .map(box => ({ ...box, storekeeper: batchToEdit?.storekeeper }))
          .filter(el => !chosenBoxesIds.includes(el._id)),
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(
          batchFields.calculationMethod,
          getCheckActualBatchWeightGreaterVolumeBatchWeight(),
        ),
        getBatchWeightCalculationMethodForBox,
        batchFields.calculationMethod,
      )

      setBoxesToAddData(() =>
        filterBySearchValueBoxesToAddData([
          ...addOrEditBatchDataConverter(
            boxesData,
            batchFields.volumeWeightDivide,
            getBatchWeightCalculationMethodForBox(
              batchFields.calculationMethod,
              getCheckActualBatchWeightGreaterVolumeBatchWeight(),
            ),
            getBatchWeightCalculationMethodForBox,
            batchFields.calculationMethod,
          ).filter(
            box =>
              box.originalData?.destination?._id === batchToEdit?.boxes?.[0]?.destination?._id &&
              box.originalData?.logicsTariff?._id === batchToEdit?.boxes?.[0].logicsTariff?._id &&
              !chosenBoxesIds.includes(box._id),
          ),
          ...deletedBoxes,
        ]),
      )
    }
  }, [chosenBoxesBase, nameSearchValueBoxesToAddData, batchFields.volumeWeightDivide, batchFields.calculationMethod])

  useEffect(() => {
    if (nameSearchValueChosenBoxes && !batchToEdit) {
      setChosenBoxes(() => filterBySearchValueChosenBoxes([...chosenBoxesBase]))
    } else if (batchToEdit) {
      setChosenBoxes(() => filterBySearchValueChosenBoxes(chosenBoxesBase))
    } else {
      setChosenBoxes(chosenBoxesBase)
    }
  }, [nameSearchValueChosenBoxes])

  useEffect(() => {
    setChosenBoxes(() => [
      ...addOrEditBatchDataConverter(
        chosenBoxes.map(el => el.originalData),
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(
          batchFields.calculationMethod,
          getCheckActualBatchWeightGreaterVolumeBatchWeight(),
        ),
        getBatchWeightCalculationMethodForBox,
        batchFields.calculationMethod,
      ),
    ])
  }, [batchFields.volumeWeightDivide, batchFields.calculationMethod])

  const onClickTrash = () => {
    const filteredArray = [...chosenBoxesBase].filter(el => !boxesToDeliteIds.includes(el.id))

    setChosenBoxes(() => filterBySearchValueChosenBoxes(filteredArray))
    setChosenBoxesBase(() => filteredArray)

    if (batchToEdit && nameSearchValueChosenBoxes) {
      const chosenBoxesIds = chosenBoxesBase.map(box => box._id)
      const deletedBoxes = addOrEditBatchDataConverter(
        [...(batchToEdit?.boxes || [])].filter(el => !chosenBoxesIds.includes(el._id)),
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(
          batchFields.calculationMethod,
          getCheckActualBatchWeightGreaterVolumeBatchWeight(),
        ),
        getBatchWeightCalculationMethodForBox,
        batchFields.calculationMethod,
      )

      setBoxesToAddData(() =>
        filterBySearchValueBoxesToAddData([
          ...addOrEditBatchDataConverter(
            boxesData,
            batchFields.volumeWeightDivide,
            getBatchWeightCalculationMethodForBox(
              batchFields.calculationMethod,
              getCheckActualBatchWeightGreaterVolumeBatchWeight(),
            ),
            getBatchWeightCalculationMethodForBox,
            batchFields.calculationMethod,
          ).filter(
            box =>
              box.originalData?.destination?.name === batchToEdit.destination &&
              box.originalData?.logicsTariff?.name === batchToEdit?.boxes[0].logicsTariff?.name &&
              !chosenBoxesIds.includes(box._id),
          ),
          ...deletedBoxes,
        ]),
      )
    }
  }

  const onClickAdd = () => {
    const curChosenGoodsIds = chosenBoxesBase.map(el => el.id)

    const newRowIds = boxesToAddIds.filter(el => !curChosenGoodsIds.includes(el))

    const newSelectedItems = [
      ...addOrEditBatchDataConverter(
        boxesData,
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(
          batchFields.calculationMethod,
          getCheckActualBatchWeightGreaterVolumeBatchWeight(),
        ),
        getBatchWeightCalculationMethodForBox,
        batchFields.calculationMethod,
      ),
      ...sourceChosenBoxesBase,
    ].filter(el => newRowIds.includes(el.id))

    setChosenBoxes(() => filterBySearchValueChosenBoxes([...chosenBoxesBase, ...newSelectedItems]))
    setChosenBoxesBase(() => [...chosenBoxesBase, ...newSelectedItems])

    setBoxesToAddIds([])
  }

  const onSelectionAwaitingBoxes = model => {
    setBoxesToAddIds(model)
  }

  const onSelectionChoosenBoxes = model => {
    setBoxesToDeliteIds(model)
  }

  const onClickSubmit = () => {
    const chosenBoxesIds =
      chosenBoxes.length < chosenBoxesBase.length ? chosenBoxesBase.map(el => el.id) : chosenBoxes.map(el => el.id)

    const sourceBoxesIds = batchToEdit?.boxes.map(el => el._id) || []

    onSubmit({ boxesIds: chosenBoxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields })

    setSubmitIsClicked(true)
  }

  const columnsModel = addOrEditBatchFormColumns(isClient)

  return (
    <div className={styles.root}>
      <Typography className={styles.modalTitle}>
        {batchToEdit ? t(TranslationKey['Editing a batch']) : t(TranslationKey['Creating a batch'])}
      </Typography>

      <div className={styles.form}>
        <div className={styles.filtersWrapper}>
          <Field
            labelClasses={styles.subFieldLabel}
            className={styles.filterField}
            label={t(TranslationKey['Batch title'])}
            value={batchFields.title}
            onChange={e => changeBatchFields('title')(e.target.value)}
          />

          <Field
            disabled
            className={styles.filterField}
            labelClasses={styles.subFieldLabel}
            containerClasses={styles.filterFieldWrapper}
            label={t(TranslationKey['CLS (batch closing date)'])}
            value={
              sourceDataForFilters
                ? formatDateWithoutTime(sourceDataForFilters.logicsTariff?.cls)
                : (chosenBoxes[0]?.originalData?.logicsTariff?.cls &&
                    formatDateWithoutTime(chosenBoxes[0]?.originalData?.logicsTariff?.cls)) ||
                  ''
            }
            placeholder={t(TranslationKey['dd.mm.yyyy'])}
          />

          <Field
            disabled
            labelClasses={styles.subFieldLabel}
            className={styles.filterField}
            label={t(TranslationKey['ETD (date of shipment)'])}
            value={
              sourceDataForFilters
                ? formatDateWithoutTime(sourceDataForFilters.logicsTariff?.etd)
                : (chosenBoxes[0]?.originalData?.logicsTariff?.etd &&
                    formatDateWithoutTime(chosenBoxes[0]?.originalData?.logicsTariff?.etd)) ||
                  ''
            }
            placeholder={t(TranslationKey['dd.mm.yyyy'])}
          />

          <Field
            disabled
            labelClasses={styles.subFieldLabel}
            className={styles.filterField}
            label={t(TranslationKey['ETA (arrival date)'])}
            value={
              sourceDataForFilters
                ? formatDateWithoutTime(sourceDataForFilters.logicsTariff?.eta)
                : (chosenBoxes[0]?.originalData?.logicsTariff?.eta &&
                    formatDateWithoutTime(chosenBoxes[0]?.originalData?.logicsTariff?.eta)) ||
                  ''
            }
            placeholder={t(TranslationKey['dd.mm.yyyy'])}
          />

          <Field
            disabled
            labelClasses={styles.subFieldLabel}
            className={styles.filterField}
            tooltipInfoContent={t(TranslationKey['Selected shipping tariff to USA'])}
            label={t(TranslationKey.Tariff)}
            value={
              (sourceDataForFilters
                ? getNewTariffTextForBoxOrOrder(sourceDataForFilters)
                : getNewTariffTextForBoxOrOrder(chosenBoxes[0]?.originalData)) || ''
            }
            placeholder={t(TranslationKey['Not chosen'])}
          />

          <Field
            disabled
            labelClasses={styles.subFieldLabel}
            className={styles.filterField}
            tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
            label={t(TranslationKey.Destination)}
            value={
              (sourceDataForFilters
                ? sourceDataForFilters.destination?.name
                : chosenBoxes[0]?.originalData?.destination?.name) || ''
            }
            placeholder={t(TranslationKey['Not chosen'])}
          />
        </div>

        <div className={styles.searchWrapper}>
          <Typography>{t(TranslationKey['Choose boxes from the list:'])}</Typography>

          <CustomInputSearch
            allowClear
            value={nameSearchValueBoxesToAddData}
            placeholder="Search by ASIN, Title, Order, item, ID Box"
            onChange={e => setNameSearchValueBoxesToAddData(e.target.value)}
          />
        </div>

        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableRowSelectionOnClick
            checkboxSelection
            sortingMode="client"
            paginationMode="client"
            initialState={{
              sorting: {
                sortModel: [{ field: 'updatedAt', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[50, 100]}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
                children: (
                  <div className={styles.boxCounterWrapper}>
                    <Typography className={styles.boxCounterText}>
                      {t(TranslationKey['Selected boxes']) + ':'}
                    </Typography>
                    <Typography className={styles.boxCounterCount}>
                      {[
                        ...addOrEditBatchDataConverter(
                          boxesData,
                          batchFields.volumeWeightDivide,
                          getBatchWeightCalculationMethodForBox(
                            batchFields.calculationMethod,
                            getCheckActualBatchWeightGreaterVolumeBatchWeight(),
                          ),
                          getBatchWeightCalculationMethodForBox,
                          batchFields.calculationMethod,
                        ),
                        ...sourceChosenBoxesBase,
                      ]
                        .filter(el => boxesToAddIds.includes(el._id))
                        .reduce((ac, cur) => (ac += cur.originalData.amount), 0)}
                    </Typography>
                  </div>
                ),
              },
            }}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            rows={boxesToAddData}
            columns={columnsModel}
            getRowHeight={() => 'auto'}
            rowSelectionModel={boxesToAddIds}
            onRowSelectionModelChange={onSelectionAwaitingBoxes}
            onRowDoubleClick={e => viewModel.setBoxId(e.row._id)}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          />
        </div>

        <div className={styles.tableSubWrapper}>
          <div className={styles.weigthCalcWrapper}>
            <WithSearchSelect
              withoutSearch
              width={343}
              widthPopover={343}
              selectedItemName={
                !batchFields.calculationMethod
                  ? t(TranslationKey['Method of batch weight calculation'])
                  : t(BatchWeightCalculationMethodTranslateKey(batchFields.calculationMethod))
              }
              data={getBatchWeightCalculationMethodsData().filter(
                el => batchFields.calculationMethod?.methodStatus !== el.methodStatus,
              )}
              searchFields={['name']}
              onClickSelect={item => changeBatchFields('calculationMethod')(item.methodStatus)}
            />

            <Typography className={styles.volumeWeightDivider}>{t(TranslationKey.Divider) + ':'}</Typography>

            <RadioGroup
              row
              value={batchFields.volumeWeightDivide}
              onChange={e => changeBatchFields('volumeWeightDivide')(e.target.value)}
            >
              <FormControlLabel value={5000} control={<Radio />} label="5000" />
              <FormControlLabel value={6000} control={<Radio />} label="6000" />
            </RadioGroup>
          </div>

          <Button
            tooltipAttentionContent={
              !chosenBoxesBase.length && !batchToEdit && t(TranslationKey['First select one box'])
            }
            disabled={!boxesToAddIds.length || (!chosenBoxesBase.length && boxesToAddIds.length !== 1 && !batchToEdit)}
            onClick={onClickAdd}
          >
            {t(TranslationKey.Add)}
          </Button>
        </div>

        <div className={styles.searchWrapper}>
          <Typography>{t(TranslationKey['Boxes in batch']) + ':'}</Typography>

          <CustomInputSearch
            allowClear
            value={nameSearchValueChosenBoxes}
            placeholder="Search by ASIN, Title, Order, item, ID Box"
            onChange={e => setNameSearchValueChosenBoxes(e.target.value)}
          />
        </div>

        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableRowSelectionOnClick
            checkboxSelection
            sortingMode="client"
            paginationMode="client"
            columnVisibilityModel={viewModel.columnVisibilityModel}
            pageSizeOptions={[50, 100]}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
                children: (
                  <div className={styles.boxCounterWrapper}>
                    <Typography className={styles.boxCounterText}>
                      {t(TranslationKey['Quantity of boxes']) + ':'}
                    </Typography>
                    <Typography className={styles.boxCounterCount}>
                      {chosenBoxesBase.reduce((ac, cur) => (ac += cur.originalData.amount), 0)}
                    </Typography>
                  </div>
                ),
              },
            }}
            rows={chosenBoxes || []}
            columns={columnsModel}
            getRowHeight={() => 'auto'}
            onRowSelectionModelChange={onSelectionChoosenBoxes}
            onRowDoubleClick={e => viewModel.setBoxId(e.row._id)}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          />
        </div>

        <div className={styles.footerWrapper}>
          <div className={styles.sumsWrapper}>
            <Field
              disabled
              containerClasses={styles.sumField}
              tooltipInfoContent={t(TranslationKey['Calculated from the dimensions of the box'])}
              label={t(TranslationKey['Volume weight'])}
              value={toFixed(
                chosenBoxes.reduce(
                  (ac, cur) =>
                    (ac +=
                      calcVolumeWeightForBox(cur.originalData, batchFields.volumeWeightDivide) *
                      cur.originalData.amount),
                  0,
                ),
                4,
              )}
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={styles.sumField}
              tooltipInfoContent={t(TranslationKey['Total weight of boxes in a batch'])}
              label={t(TranslationKey['Final weight'])}
              value={
                batchFields.calculationMethod ===
                BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT]
                  ? toFixed(
                      calcFinalWeightForBatchByMoreTotalWeight(
                        chosenBoxes.map(el => el.originalData),
                        batchFields.volumeWeightDivide,
                      ),
                      4,
                    )
                  : toFixed(
                      chosenBoxes.reduce((ac, cur) => (ac += Number(cur.finalWeight)), 0),
                      4,
                    )
              }
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={styles.sumField}
              tooltipInfoContent={t(TranslationKey['Cost of shipping boxes in a batch'])}
              label={t(TranslationKey['Total price'])}
              value={toFixed(
                chosenBoxes.reduce((ac, cur) => (ac += cur.deliveryTotalPrice), 0),
                2,
              )}
              placeholder={'0'}
            />
          </div>
          <Button
            styleType={ButtonStyle.DANGER}
            disabled={!boxesToDeliteIds.length || !chosenBoxes.length}
            onClick={onClickTrash}
          >
            {t(TranslationKey.Remove)}
          </Button>
        </div>

        {filesToAdd ? <UploadFilesInput images={filesToAdd} setImages={setfilesToAdd} /> : null}

        <div className={styles.btnsWrapper}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={(chosenBoxes.length < 1 && !batchToEdit) || submitIsClicked}
            onClick={onClickSubmit}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button styleType={ButtonStyle.CASUAL} onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxModal
          boxId={viewModel.selectedBoxId}
          onToggleModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
        />
      </Modal>
    </div>
  )
})
