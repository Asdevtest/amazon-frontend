import {cx} from '@emotion/css'
import {FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {
  BatchWeightCalculationMethod,
  BatchWeightCalculationMethodByKey,
  BatchWeightCalculationMethodTranslateKey,
  getBatchWeightCalculationMethodForBox,
  getBatchWeightCalculationMethodsData,
} from '@constants/batch-weight-calculations-method'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar'
import {Field} from '@components/field/field'
import {MemoDataGrid} from '@components/memo-data-grid'
import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'
import {UploadFilesInput} from '@components/upload-files-input'

import {calcFinalWeightForBatchByMoreTotalWeight, calcVolumeWeightForBox} from '@utils/calculation'
import {addOrEditBatchDataConverter} from '@utils/data-grid-data-converters'
import {formatDateWithoutTime} from '@utils/date-time'
import {getFullTariffTextForBoxOrOrder, toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {addOrEditBatchFormColumns} from './add-or-edit-batch-form-columns'
import {useClassNames} from './add-or-edit-batch-form.style'

export const AddOrEditBatchForm = observer(
  ({
    boxesData,
    onClose,
    /* volumeWeightCoefficient,*/ onSubmit,
    batchToEdit,
    sourceBox,
    showProgress,
    progressValue,
  }) => {
    const {classes: classNames} = useClassNames()

    const [nameSearchValueBoxesToAddData, setNameSearchValueBoxesToAddData] = useState('')

    const [nameSearchValueChosenBoxes, setNameSearchValueChosenBoxes] = useState('')

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const [batchFields, setBatchFields] = useState({
      title: batchToEdit?.originalData.title || '',
      calculationMethod:
        batchToEdit?.originalData.calculationMethod ||
        BatchWeightCalculationMethodByKey[BatchWeightCalculationMethod.BY_MORE_WEIGHT],
      volumeWeightDivide: batchToEdit?.originalData.volumeWeightDivide || 5000,
    })

    const [boxesToAddData, setBoxesToAddData] = useState(
      addOrEditBatchDataConverter(
        boxesData,
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
      ),
    )

    const changeBatchFields = fieldName => value => {
      const newFields = {...batchFields}

      newFields[fieldName] = value
      setBatchFields(newFields)
    }

    const [filesToAdd, setfilesToAdd] = useState([])

    const [chosenBoxesBase, setChosenBoxesBase] = useState([])

    const [chosenBoxes, setChosenBoxes] = useState(
      batchToEdit
        ? addOrEditBatchDataConverter(
            batchToEdit.originalData?.boxes,
            batchFields.volumeWeightDivide,
            getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
          )
        : sourceBox
        ? [
            ...addOrEditBatchDataConverter(
              [sourceBox],
              batchFields.volumeWeightDivide,
              getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
            ),
          ]
        : [],
    )

    // console.log('chosenBoxes', chosenBoxes)
    // console.log('sourceBox', sourceBox)

    const [boxesToAddIds, setBoxesToAddIds] = useState([])

    const [boxesToDeliteIds, setBoxesToDeliteIds] = useState([])

    const [sourceDataForFilters, setSourceDataForFilters] = useState(null)

    const filterBoxesToAddData = () => {
      const chosenBoxesIds = chosenBoxes.map(box => box._id)

      const newArr = addOrEditBatchDataConverter(
        boxesData,
        batchFields.volumeWeightDivide,
        getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
      ).filter(
        box =>
          box.originalData?.destination?.name === chosenBoxes[0]?.originalData?.destination?.name &&
          box.originalData?.logicsTariff?.name === chosenBoxes[0]?.originalData?.logicsTariff?.name &&
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
      boxesArr?.filter(el =>
        el.originalData.items.some(
          item =>
            item.product.amazonTitle?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()) ||
            item.product.asin?.toLowerCase().includes(nameSearchValueBoxesToAddData.toLowerCase()),
        ),
      )

    const filterBySearchValueChosenBoxes = boxesArr =>
      boxesArr?.filter(el =>
        el.originalData.items.some(
          item =>
            item.product.amazonTitle?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()) ||
            item.product.asin?.toLowerCase().includes(nameSearchValueChosenBoxes.toLowerCase()),
        ),
      )

    useEffect(() => {
      if (chosenBoxes.length && !batchToEdit) {
        setBoxesToAddData(() => filterBySearchValueBoxesToAddData([...filterBoxesToAddData()]))
      } else if (batchToEdit) {
        const chosenBoxesIds = chosenBoxes.map(box => box._id)

        const deletedBoxes = addOrEditBatchDataConverter(
          [...batchToEdit.originalData.boxes].filter(el => !chosenBoxesIds.includes(el._id)),
          batchFields.volumeWeightDivide,
          getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
        )

        setBoxesToAddData(() =>
          filterBySearchValueBoxesToAddData([
            ...addOrEditBatchDataConverter(
              boxesData,
              batchFields.volumeWeightDivide,
              getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
            ).filter(
              box =>
                box.originalData?.destination?.name === batchToEdit.destination &&
                box.originalData?.logicsTariff?.name === batchToEdit.originalData.boxes[0].logicsTariff?.name &&
                !chosenBoxesIds.includes(box._id),
            ),

            ...deletedBoxes,
          ]),
        )
      } else {
        // if (/* !nameSearchValueBoxesToAddData && */ !chosenBoxesBase) {
        console.log('!!! *** 3')
        setBoxesToAddData(() =>
          filterBySearchValueBoxesToAddData(
            addOrEditBatchDataConverter(
              boxesData,
              batchFields.volumeWeightDivide,
              getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
            ),
          ),
        )
      }
    }, [chosenBoxes, nameSearchValueBoxesToAddData, batchFields.volumeWeightDivide, batchFields.calculationMethod])

    useEffect(() => {
      if (nameSearchValueChosenBoxes && !batchToEdit) {
        setChosenBoxes(() => filterBySearchValueChosenBoxes([...chosenBoxesBase]))
      } else if (batchToEdit) {
        const chosenBoxesIds = chosenBoxes.map(box => box._id)

        const deletedBoxes = addOrEditBatchDataConverter(
          [...batchToEdit.originalData.boxes].filter(el => !chosenBoxesIds.includes(el._id)),
          batchFields.volumeWeightDivide,
          getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
        )

        setChosenBoxesBase(() =>
          filterBySearchValueChosenBoxes([
            ...[
              ...boxesData.filter(
                box =>
                  box.originalData?.destination?.name === batchToEdit.destination &&
                  box.originalData?.logicsTariff?.name === batchToEdit.originalData.boxes[0].logicsTariff?.name &&
                  !chosenBoxesIds.includes(box._id),
              ),
            ],
            ...deletedBoxes,
          ]),
        )
      } else {
        setChosenBoxes(chosenBoxesBase)
      }
      // else if (!nameSearchValueChosenBoxes && !chosenBoxesBase) {
      //   setChosenBoxesBase(() => filterBySearchValueChosenBoxes([...[...boxesData]]))
      // }
    }, [nameSearchValueChosenBoxes])

    useEffect(() => {
      setChosenBoxes(() => [
        ...addOrEditBatchDataConverter(
          chosenBoxes.map(el => el.originalData),
          batchFields.volumeWeightDivide,
          getBatchWeightCalculationMethodForBox(batchFields.calculationMethod),
        ),
      ])
    }, [batchFields.volumeWeightDivide, batchFields.calculationMethod])

    const onClickTrash = () => {
      const filteredArray = [...chosenBoxes].filter(el => !boxesToDeliteIds.includes(el.id))
      setChosenBoxes(() => filteredArray)
      setChosenBoxesBase(() => filteredArray)
    }

    const onClickAdd = () => {
      const curChosenGoodsIds = chosenBoxes.map(el => el.id)

      const newRowIds = boxesToAddIds.filter(el => !curChosenGoodsIds.includes(el))

      const newSelectedItems = toJS(boxesToAddData).filter(el => newRowIds.includes(el.id))
      setChosenBoxes(() => [...chosenBoxes, ...newSelectedItems])
      setChosenBoxesBase(() => [...chosenBoxes, ...newSelectedItems])

      setBoxesToAddIds([])
    }

    const onSelectionAwaitingBoxes = model => {
      setBoxesToAddIds(model)
    }

    const onSelectionChoosenBoxes = model => {
      setBoxesToDeliteIds(model)
    }

    const onClickSubmit = () => {
      const chosenBoxesIds = chosenBoxes.map(el => el.id)

      const sourceBoxesIds = batchToEdit?.originalData.boxes.map(el => el._id) || []

      onSubmit({boxesIds: chosenBoxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields})

      setSubmitIsClicked(true)
    }

    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTitle}>
          {batchToEdit ? t(TranslationKey['Editing a batch']) : t(TranslationKey['Creating a batch'])}
        </Typography>

        <div className={classNames.form}>
          <div className={classNames.filtersWrapper}>
            <div>
              <Field
                className={classNames.filterField}
                label={t(TranslationKey['Batch title'])}
                value={batchFields.title}
                onChange={e => changeBatchFields('title')(e.target.value)}
              />
            </div>

            <div>
              <Field
                disabled
                className={classNames.filterField}
                labelClasses={classNames.label}
                containerClasses={classNames.filterFieldWrapper}
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
                className={classNames.filterField}
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
                className={classNames.filterField}
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
                className={classNames.filterField}
                tooltipInfoContent={t(TranslationKey['Selected shipping tariff to USA'])}
                label={t(TranslationKey.Tariff)}
                value={
                  (sourceDataForFilters
                    ? getFullTariffTextForBoxOrOrder(sourceDataForFilters)
                    : getFullTariffTextForBoxOrOrder(chosenBoxes[0]?.originalData)) || ''
                }
                placeholder={t(TranslationKey['Not chosen'])}
              />
            </div>

            <div>
              <Field
                disabled
                className={classNames.filterField}
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

          <div className={classNames.searchWrapper}>
            <Typography className={classNames.subTitle}>{t(TranslationKey['Choose boxes from the list:'])}</Typography>

            <SearchInput
              inputClasses={classNames.searchInput}
              value={nameSearchValueBoxesToAddData}
              placeholder={t(TranslationKey['Search by ASIN, Title'])}
              onChange={e => setNameSearchValueBoxesToAddData(e.target.value)}
            />
          </div>

          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              // autoHeight
              hideFooter
              checkboxSelection
              components={{
                Toolbar: DataGridCustomToolbar,
              }}
              sx={{
                border: `1px solid  #EBEBEB !important`,
                boxShadow: '0px 2px 10px 2px #EBEBEB !important',
              }}
              rows={toJS(boxesToAddData)}
              columns={addOrEditBatchFormColumns()}
              rowHeight={100}
              selectionModel={boxesToAddIds}
              onSelectionModelChange={newSelection => onSelectionAwaitingBoxes(newSelection)}
            />
          </div>

          <div className={classNames.tableSubWrapper}>
            <div className={classNames.weigthCalcWrapper}>
              <WithSearchSelect
                withoutSearch
                width={343}
                widthPopover={343}
                selectedItemName={
                  !batchFields.calculationMethod
                    ? t(TranslationKey['Method of box weight calculation'])
                    : t(BatchWeightCalculationMethodTranslateKey(batchFields.calculationMethod))
                }
                data={getBatchWeightCalculationMethodsData().filter(
                  el => batchFields.calculationMethod?.methodStatus !== el.methodStatus,
                )}
                searchFields={['name']}
                onClickSelect={item => changeBatchFields('calculationMethod')(item.methodStatus)}
              />

              <Typography className={classNames.volumeWeightDivider}>{t(TranslationKey.Divider) + ':'}</Typography>

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
              tooltipAttentionContent={!chosenBoxes.length && !batchToEdit && t(TranslationKey['First select one box'])}
              disabled={!boxesToAddIds.length || (!chosenBoxes.length && boxesToAddIds.length !== 1 && !batchToEdit)}
              color="primary"
              variant="contained"
              className={classNames.actionBtn}
              onClick={onClickAdd}
            >
              {t(TranslationKey.Add)}
            </Button>
          </div>

          <div className={classNames.searchWrapper}>
            <Typography className={classNames.chosenGoodsTitle}>{t(TranslationKey['Boxes in batch']) + ':'}</Typography>

            <SearchInput
              inputClasses={classNames.searchInput}
              value={nameSearchValueChosenBoxes}
              placeholder={t(TranslationKey['Search by ASIN, Title'])}
              onChange={e => setNameSearchValueChosenBoxes(e.target.value)}
            />
          </div>

          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              // autoHeight
              hideFooter
              checkboxSelection
              sx={{
                // border: 0,
                boxShadow: '0px 2px 10px 2px #EBEBEB',
                // backgroundColor: theme.palette.background.general,
                border: `1px solid  #EBEBEB !important`,
              }}
              components={{
                Toolbar: DataGridCustomToolbar,
              }}
              classes={{
                root: classNames.rootDataGrid,
              }}
              rows={chosenBoxes || []}
              columns={addOrEditBatchFormColumns()}
              rowHeight={100}
              onSelectionModelChange={newSelection => onSelectionChoosenBoxes(newSelection)}
            />
          </div>

          <div className={classNames.footerWrapper}>
            <div className={classNames.sumsWrapper}>
              <Field
                disabled
                containerClasses={classNames.sumField}
                tooltipInfoContent={t(TranslationKey['Calculated from the dimensions of the box'])}
                label={t(TranslationKey['Volume weight'])}
                value={toFixed(
                  chosenBoxes.reduce(
                    (ac, cur) => (ac += calcVolumeWeightForBox(cur.originalData, batchFields.volumeWeightDivide)),
                    0,
                  ),
                  4,
                )}
                placeholder={'0'}
              />

              <Field
                disabled
                containerClasses={classNames.sumField}
                tooltipInfoContent={t(TranslationKey['Total weight of boxes in a batch'])}
                label={t(TranslationKey['Final weight'])}
                // value={toFixed(
                //   chosenBoxes.reduce(
                //     (ac, cur) => (ac += calcFinalWeightForBox(cur.originalData, batchFields.volumeWeightDivide)),
                //     0,
                //   ),
                //   4,
                // )}

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
                        chosenBoxes.reduce((ac, cur) => (ac += cur.finalWeight), 0),
                        4,
                      )
                }
                placeholder={'0'}
              />

              <Field
                disabled
                containerClasses={classNames.sumField}
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
              disabled={!boxesToDeliteIds.length}
              color="primary"
              variant="contained"
              className={classNames.actionBtn}
              onClick={onClickTrash}
            >
              {t(TranslationKey.Remove)}
            </Button>
          </div>

          <div className={classNames.imageFileInputWrapper}>
            <div className={classNames.uploadFilesWrapper}>
              <UploadFilesInput images={filesToAdd} setImages={setfilesToAdd} maxNumber={50} />
            </div>
            <div className={classNames.imageAndFileInputWrapper}>
              <Field
                containerClasses={classNames.filesWrapper}
                label={t(TranslationKey.Files)}
                inputComponent={
                  <PhotoAndFilesCarousel
                    small
                    direction={window.screen.width < 768 ? 'column' : 'row'}
                    files={batchToEdit?.originalData.attachedDocuments}
                    width={window.screen.width < 768 ? '100%' : '400px'}
                  />
                }
              />
            </div>
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              success
              disableElevation
              disabled={(chosenBoxes.length < 1 && !batchToEdit) || submitIsClicked}
              variant="contained"
              color="primary"
              className={classNames.actionBtn}
              onClick={onClickSubmit}
            >
              {t(TranslationKey.Save)}
            </Button>

            <Button
              color="primary"
              variant="text"
              className={cx(classNames.actionBtn, classNames.cancelBtn)}
              onClick={onClose}
            >
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>

        {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
      </div>
    )
  },
)
