import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {Link, Typography} from '@material-ui/core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {checkIsImageLink} from '@utils/checks'
import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {formatDateWithoutTime} from '@utils/date-time'
import {getFullTariffTextForBoxOrOrder, toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {addOrEditBatchFormColumns} from './add-or-edit-batch-form-columns'
import {useClassNames} from './add-or-edit-batch-form.style'

export const AddOrEditBatchForm = observer(
  ({boxesData, onClose, volumeWeightCoefficient, onSubmit, batchToEdit, sourceBox, showProgress, progressValue}) => {
    const classNames = useClassNames()

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const [boxesToAddData, setBoxesToAddData] = useState([...boxesData])

    const [filesToAdd, setfilesToAdd] = useState([])
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [chosenBoxes, setChosenBoxes] = useState(
      batchToEdit
        ? clientWarehouseDataConverter(batchToEdit.originalData?.boxes, volumeWeightCoefficient)
        : sourceBox
        ? [...clientWarehouseDataConverter([sourceBox], volumeWeightCoefficient)]
        : [],
    )

    const [boxesToAddIds, setBoxesToAddIds] = useState([])

    const [boxesToDeliteIds, setBoxesToDeliteIds] = useState([])

    const [sourceDataForFilters, setSourceDataForFilters] = useState(null)

    const filterBoxesToAddData = () => {
      const chosenBoxesIds = chosenBoxes.map(box => box._id)

      const newArr = boxesData.filter(
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

    useEffect(() => {
      if (chosenBoxes.length && !batchToEdit) {
        setBoxesToAddData(() => [...filterBoxesToAddData()])
      } else if (batchToEdit) {
        const chosenBoxesIds = chosenBoxes.map(box => box._id)

        const deletedBoxes = clientWarehouseDataConverter(
          [...batchToEdit.originalData?.boxes].filter(el => !chosenBoxesIds.includes(el._id)),
          volumeWeightCoefficient,
        )

        setBoxesToAddData(() => [
          ...[
            ...boxesData.filter(
              box =>
                box.originalData?.destination?.name === batchToEdit.destination &&
                box.originalData?.logicsTariff?.name === batchToEdit.originalData.boxes[0].logicsTariff?.name &&
                !chosenBoxesIds.includes(box._id),
            ),
          ],
          ...deletedBoxes,
        ])
      } else {
        setBoxesToAddData(() => [...[...boxesData]])
      }
    }, [chosenBoxes])

    const onClickTrash = () => {
      const filteredArray = [...chosenBoxes].filter(el => !boxesToDeliteIds.includes(el.id))
      setChosenBoxes(() => filteredArray)
    }

    const onClickAdd = () => {
      const curChosenGoodsIds = chosenBoxes.map(el => el.id)

      const newRowIds = boxesToAddIds.filter(el => !curChosenGoodsIds.includes(el))

      const newSelectedItems = toJS(boxesToAddData).filter(el => newRowIds.includes(el.id))
      setChosenBoxes(() => [...chosenBoxes, ...newSelectedItems])

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

      onSubmit(chosenBoxesIds, filesToAdd, sourceBoxesIds, batchToEdit)

      setSubmitIsClicked(true)
    }

    return (
      <div className={classNames.root}>
        <Typography variant="h5">
          {batchToEdit ? t(TranslationKey['Editing a batch']) : t(TranslationKey['Creating a batch'])}
        </Typography>

        <div className={classNames.form}>
          <div className={classNames.filtersWrapper}>
            <Field
              disabled
              className={classNames.filterField}
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

            <Field
              disabled
              className={classNames.filterField}
              label={t(TranslationKey.Tariff)}
              value={
                (sourceDataForFilters
                  ? getFullTariffTextForBoxOrOrder(sourceDataForFilters)
                  : getFullTariffTextForBoxOrOrder(chosenBoxes[0]?.originalData)) || ''
              }
              placeholder={'N/A'}
            />

            <Field
              disabled
              className={classNames.filterField}
              label={t(TranslationKey.Destination)}
              value={
                (sourceDataForFilters
                  ? sourceDataForFilters.destination?.name
                  : chosenBoxes[0]?.originalData?.destination?.name) || ''
              }
              placeholder={'N/A'}
            />
          </div>

          <Typography>{t(TranslationKey['Choose boxes from the list:'])}</Typography>
          <div className={classNames.tableWrapper}>
            <DataGrid
              // autoHeight
              hideFooter
              checkboxSelection
              sx={{
                border: 0,
                boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                backgroundColor: '#fff',
              }}
              rows={toJS(boxesToAddData)}
              columns={addOrEditBatchFormColumns()}
              rowHeight={100}
              selectionModel={boxesToAddIds}
              onSelectionModelChange={newSelection => onSelectionAwaitingBoxes(newSelection)}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              tooltipAttentionContent={!chosenBoxes.length && !batchToEdit && t(TranslationKey['First select one box'])}
              disabled={!boxesToAddIds.length || (!chosenBoxes.length && boxesToAddIds.length !== 1 && !batchToEdit)}
              color="primary"
              variant="contained"
              onClick={onClickAdd}
            >
              {t(TranslationKey.Add)}
            </Button>
          </div>

          <Typography className={classNames.chosenGoodsTitle}>{t(TranslationKey['Boxes in batch']) + ':'}</Typography>

          <div className={classNames.tableWrapper}>
            <DataGrid
              // autoHeight
              hideFooter
              checkboxSelection
              rows={chosenBoxes || []}
              columns={addOrEditBatchFormColumns()}
              rowHeight={100}
              onSelectionModelChange={newSelection => onSelectionChoosenBoxes(newSelection)}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              danger
              disabled={!boxesToDeliteIds.length}
              color="primary"
              variant="contained"
              onClick={onClickTrash}
            >
              {t(TranslationKey.Remove)}
            </Button>
          </div>

          <div className={classNames.sumsWrapper}>
            <Field
              disabled
              containerClasses={classNames.sumField}
              label={t(TranslationKey['Volume weight'])}
              value={toFixed(
                chosenBoxes.reduce(
                  (ac, cur) => (ac += calcVolumeWeightForBox(cur.originalData, volumeWeightCoefficient)),
                  0,
                ),
                4,
              )}
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              label={t(TranslationKey['Final weight'])}
              value={toFixed(
                chosenBoxes.reduce(
                  (ac, cur) => (ac += calcFinalWeightForBox(cur.originalData, volumeWeightCoefficient)),
                  0,
                ),
                4,
              )}
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              label={t(TranslationKey['Total price'])}
              value={toFixed(
                chosenBoxes.reduce((ac, cur) => (ac += cur.deliveryTotalPrice), 0),
                2,
              )}
              placeholder={'0'}
            />
          </div>

          <div className={classNames.imageFileInputWrapper}>
            <UploadFilesInput images={filesToAdd} setImages={setfilesToAdd} maxNumber={50} />

            <Button
              disableElevation
              disabled={!batchToEdit?.originalData.attachedDocuments?.filter(el => checkIsImageLink(el)).length}
              color="primary"
              className={classNames.imagesButton}
              variant="contained"
              onClick={() => setShowPhotosModal(!showPhotosModal)}
            >
              {t(TranslationKey['Available images'])}
            </Button>

            {batchToEdit?.originalData.attachedDocuments?.filter(el => !checkIsImageLink(el)).length ? (
              <Field
                multiline
                label={t(TranslationKey.Files)}
                containerClasses={classNames.filesContainer}
                inputComponent={
                  <div className={classNames.filesWrapper}>
                    {batchToEdit?.originalData.attachedDocuments
                      ?.filter(el => !checkIsImageLink(el))
                      .map((file, index) => (
                        <Link key={index} target="_blank" href={file}>
                          <Typography className={classNames.linkText}>{file}</Typography>
                        </Link>
                      ))}
                  </div>
                }
              />
            ) : null}
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              success
              disableElevation
              disabled={(chosenBoxes.length < 1 && !batchToEdit) || submitIsClicked}
              variant="contained"
              color="primary"
              onClick={onClickSubmit}
            >
              {t(TranslationKey.Save)}
            </Button>

            <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>

        {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}

        <BigImagesModal
          isAmazone
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={batchToEdit?.originalData.attachedDocuments?.filter(el => checkIsImageLink(el)) || []}
        />
      </div>
    )
  },
)
