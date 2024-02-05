import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

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

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Field } from '@components/shared/field/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { ClientAwaitingBatchesViewModel } from '@views/client/client-batches-views/client-awaiting-batches-view/client-awaiting-batches-view.model'

import {
  calcFinalWeightForBatchByMoreTotalWeight,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
} from '@utils/calculation'
import { checkIsClient } from '@utils/checks'
import { addOrEditBatchDataConverter } from '@utils/data-grid-data-converters'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { formatDateWithoutTime } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './add-or-edit-batch-form.style'

import { addOrEditBatchFormColumns } from './add-or-edit-batch-form-columns'

export const AddOrEditBatchForm = observer(
  ({
    userRole,
    boxesData,
    onClose,
    onSubmit,
    batchToEdit,
    sourceBox,
    showProgress,
    progressValue,
    history,
    location,
  }) => {
    const [viewModel] = useState(
      () =>
        new ClientAwaitingBatchesViewModel({
          history,
          location,
        }),
    )

    const { classes: styles, cx } = useStyles()

    const isClient = checkIsClient(UserRoleCodeMap[userRole])

    const [nameSearchValueBoxesToAddData, setNameSearchValueBoxesToAddData] = useState('')

    const [nameSearchValueChosenBoxes, setNameSearchValueChosenBoxes] = useState('')

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const [batchFields, setBatchFields] = useState({
      title: batchToEdit?.originalData.title || '',
      calculationMethod:
        batchToEdit?.originalData.calculationMethod ||
        BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_TOTAL_WEIGHT],
      volumeWeightDivide: batchToEdit?.originalData.volumeWeightDivide || 6000,
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

    const sourceChosenBoxesBase = batchToEdit
      ? addOrEditBatchDataConverter(
          batchToEdit.originalData?.boxes.map(box => ({ ...box, storekeeper: batchToEdit.originalData?.storekeeper })),
          batchFields.volumeWeightDivide,
          getBatchWeightCalculationMethodForBox(
            batchFields.calculationMethod,
            checkActualBatchWeightGreaterVolumeBatchWeight(
              batchToEdit.originalData?.boxes,
              batchFields.volumeWeightDivide,
            ),
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
              String(item.order.id)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()) ||
              String(item.order.item)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()),
          ) ||
          String(el.originalData.humanFriendlyId)?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()),
      )

    const filterBySearchValueChosenBoxes = boxesArr =>
      boxesArr?.filter(
        el =>
          el.originalData.items.some(
            item =>
              item.product.amazonTitle?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
              item.product.asin?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
              String(item.order.id)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
              String(item.order.item)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()),
          ) ||
          String(el.originalData.humanFriendlyId)?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()),
      )

    useEffect(() => {
      if (!batchToEdit) {
        setBoxesToAddData(() => filterBySearchValueBoxesToAddData([...filterBoxesToAddData()]))
      } else if (batchToEdit /* && !nameSearchValueChosenBoxes */) {
        const chosenBoxesIds = chosenBoxesBase.map(box => box._id)
        const deletedBoxes = addOrEditBatchDataConverter(
          [...batchToEdit.originalData.boxes]
            .map(box => ({ ...box, storekeeper: batchToEdit.originalData?.storekeeper }))
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
                box.originalData?.destination?.name === batchToEdit.destination &&
                box.originalData?.logicsTariff?.name === batchToEdit.originalData.boxes[0].logicsTariff?.name &&
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
          [...batchToEdit.originalData.boxes].filter(el => !chosenBoxesIds.includes(el._id)),
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
                box.originalData?.logicsTariff?.name === batchToEdit.originalData.boxes[0].logicsTariff?.name &&
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

      const sourceBoxesIds = batchToEdit?.originalData.boxes.map(el => el._id) || []

      onSubmit({ boxesIds: chosenBoxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields })

      setSubmitIsClicked(true)
    }

    return (
      <div className={styles.root}>
        <Typography className={styles.modalTitle}>
          {batchToEdit ? t(TranslationKey['Editing a batch']) : t(TranslationKey['Creating a batch'])}
        </Typography>

        <div className={styles.form}>
          <div className={styles.filtersWrapper}>
            <div>
              <Field
                className={styles.filterField}
                label={t(TranslationKey['Batch title'])}
                value={batchFields.title}
                onChange={e => changeBatchFields('title')(e.target.value)}
              />
            </div>

            <div>
              <Field
                disabled
                className={styles.filterField}
                labelClasses={styles.label}
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
            </div>

            <div>
              <Field
                disabled
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
            </div>

            <div>
              <Field
                disabled
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
            </div>

            <div>
              <Field
                disabled
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
            </div>

            <div>
              <Field
                disabled
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
          </div>

          <div className={styles.searchWrapper}>
            <Typography className={styles.subTitle}>{t(TranslationKey['Choose boxes from the list:'])}</Typography>

            <SearchInput
              inputClasses={styles.searchInput}
              value={nameSearchValueBoxesToAddData}
              placeholder={t(TranslationKey['Search by ASIN, Title, Order, item, ID Box'])}
              onChange={e => setNameSearchValueBoxesToAddData(e.target.value)}
            />
          </div>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              checkboxSelection
              sortingMode="client"
              paginationMode="client"
              initialState={{
                sorting: {
                  sortModel: [{ field: 'updatedAt', sort: 'desc' }],
                },
              }}
              localeText={getLocalizationByLanguageTag()}
              pageSizeOptions={[50, 100]}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
                toolbar: {
                  columsBtnSettings: {
                    columnsModel: viewModel.columnsModel,
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
              rows={toJS(boxesToAddData)}
              columns={addOrEditBatchFormColumns(isClient)}
              rowHeight={100}
              rowSelectionModel={boxesToAddIds}
              onRowSelectionModelChange={onSelectionAwaitingBoxes}
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
              disabled={
                !boxesToAddIds.length || (!chosenBoxesBase.length && boxesToAddIds.length !== 1 && !batchToEdit)
              }
              color="primary"
              variant="contained"
              className={styles.actionBtn}
              onClick={onClickAdd}
            >
              {t(TranslationKey.Add)}
            </Button>
          </div>

          <div className={styles.searchWrapper}>
            <Typography className={styles.chosenGoodsTitle}>{t(TranslationKey['Boxes in batch']) + ':'}</Typography>

            <SearchInput
              inputClasses={styles.searchInput}
              value={nameSearchValueChosenBoxes}
              placeholder={t(TranslationKey['Search by ASIN, Title, Order, item, ID Box'])}
              onChange={e => setNameSearchValueChosenBoxes(e.target.value)}
            />
          </div>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              checkboxSelection
              localeText={getLocalizationByLanguageTag()}
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
                    columnsModel: viewModel.columnsModel,
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
              columns={addOrEditBatchFormColumns(isClient)}
              rowHeight={100}
              onRowSelectionModelChange={onSelectionChoosenBoxes}
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
              danger
              disabled={!boxesToDeliteIds.length || !chosenBoxes.length}
              className={styles.actionBtn}
              onClick={onClickTrash}
            >
              {t(TranslationKey.Remove)}
            </Button>
          </div>

          <div className={styles.imageFileInputWrapper}>
            <div className={styles.uploadFilesWrapper}>
              <UploadFilesInput
                images={filesToAdd}
                setImages={setfilesToAdd}
                maxNumber={
                  batchToEdit?.originalData?.attachedDocuments?.length
                    ? 50 - batchToEdit?.originalData.attachedDocuments.length
                    : 50
                }
              />
            </div>
            <div className={styles.imageAndFileInputWrapper}>
              <p>{t(TranslationKey.Files)}</p>
              <PhotoAndFilesSlider smallSlider showPreviews files={batchToEdit?.originalData.attachedDocuments} />
            </div>
          </div>

          <div className={styles.btnsWrapper}>
            <Button
              success
              disableElevation
              disabled={(chosenBoxes.length < 1 && !batchToEdit) || submitIsClicked}
              variant="contained"
              color="primary"
              className={styles.actionBtn}
              onClick={onClickSubmit}
            >
              {t(TranslationKey.Save)}
            </Button>

            <Button color="primary" variant="text" className={cx(styles.actionBtn, styles.cancelBtn)} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>

        {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
      </div>
    )
  },
)
