import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'

import {calcFinalWeightForBox, calcPriceForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {formatDateWithoutTime} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getFullTariffTextForBoxOrOrder, toFixed} from '@utils/text'

import {addOrEditBatchFormColumns} from './add-or-edit-batch-form-columns'
import {useClassNames} from './add-or-edit-batch-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditBatchForm

export const AddOrEditBatchForm = observer(
  ({boxesData, onClose, volumeWeightCoefficient, onSubmit, batchToEdit, sourceBox}) => {
    const classNames = useClassNames()

    const [boxesToAddData, setBoxesToAddData] = useState([...boxesData])

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
          box.destination === chosenBoxes[0]?.originalData?.destination?.name &&
          box.logicsTariff === chosenBoxes[0]?.originalData?.logicsTariff?.name &&
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
        setBoxesToAddData(() => [
          ...[
            ...boxesData.filter(
              box =>
                box.destination === batchToEdit.destination &&
                box.logicsTariff === batchToEdit.originalData.boxes[0].logicsTariff?.name &&
                !chosenBoxesIds.includes(box._id),
            ),
          ],
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

      onSubmit(chosenBoxesIds, sourceBoxesIds, batchToEdit?.id)
    }

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{batchToEdit ? 'Редактирование партии' : 'Создание партии'}</Typography>

        <div className={classNames.form}>
          <div className={classNames.filtersWrapper}>
            <Field
              disabled
              className={classNames.filterField}
              label={'ETD (дата отправки)'}
              value={
                sourceDataForFilters
                  ? formatDateWithoutTime(sourceDataForFilters.logicsTariff?.etd)
                  : (chosenBoxes[0]?.originalData?.logicsTariff?.etd &&
                      formatDateWithoutTime(chosenBoxes[0]?.originalData?.logicsTariff?.etd)) ||
                    ''
              }
              placeholder={'dd.mm.yyyy'}
            />

            <Field
              disabled
              className={classNames.filterField}
              label={'ETA (дата прибытия)'}
              value={
                sourceDataForFilters
                  ? formatDateWithoutTime(sourceDataForFilters.logicsTariff?.eta)
                  : (chosenBoxes[0]?.originalData?.logicsTariff?.eta &&
                      formatDateWithoutTime(chosenBoxes[0]?.originalData?.logicsTariff?.eta)) ||
                    ''
              }
              placeholder={'dd.mm.yyyy'}
            />

            <Field
              disabled
              className={classNames.filterField}
              label={'CLS (дата закрытия партии)'}
              value={
                sourceDataForFilters
                  ? formatDateWithoutTime(sourceDataForFilters.logicsTariff?.cls)
                  : (chosenBoxes[0]?.originalData?.logicsTariff?.cls &&
                      formatDateWithoutTime(chosenBoxes[0]?.originalData?.logicsTariff?.cls)) ||
                    ''
              }
              placeholder={'dd.mm.yyyy'}
            />

            <Field
              disabled
              className={classNames.filterField}
              label={'Тариф'}
              value={
                (sourceDataForFilters
                  ? getFullTariffTextForBoxOrOrder(sourceDataForFilters)
                  : getFullTariffTextForBoxOrOrder(chosenBoxes[0])) || ''
              }
              placeholder={'N/A'}
            />

            <Field
              disabled
              className={classNames.filterField}
              label={'Destination'}
              value={
                (sourceDataForFilters
                  ? sourceDataForFilters.destination.name
                  : chosenBoxes[0]?.originalData?.destination.name) || ''
              }
              placeholder={'N/A'}
            />
          </div>

          <Typography>{'Выберите коробки из списка:'}</Typography>
          <div className={classNames.tableWrapper}>
            <DataGrid
              autoHeight
              hideFooter
              checkboxSelection
              rows={toJS(boxesToAddData)}
              columns={addOrEditBatchFormColumns()}
              rowHeight={80}
              selectionModel={boxesToAddIds}
              onSelectionModelChange={newSelection => onSelectionAwaitingBoxes(newSelection)}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              tooltipContent={!chosenBoxes.length && !batchToEdit && 'Сначала выберите одну коробку'}
              disabled={!boxesToAddIds.length || (!chosenBoxes.length && boxesToAddIds.length !== 1 && !batchToEdit)}
              color="primary"
              variant="contained"
              onClick={onClickAdd}
            >
              {'Добавить в партию'}
            </Button>
          </div>

          <Typography className={classNames.chosenGoodsTitle}>{textConsts.chosenGoods}</Typography>

          <div className={classNames.tableWrapper}>
            <DataGrid
              autoHeight
              hideFooter
              checkboxSelection
              rows={chosenBoxes || []}
              columns={addOrEditBatchFormColumns()}
              rowHeight={80}
              onSelectionModelChange={newSelection => onSelectionChoosenBoxes(newSelection)}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <ErrorButton disabled={!boxesToDeliteIds.length} color="primary" variant="contained" onClick={onClickTrash}>
              {'Удалить'}
            </ErrorButton>
          </div>

          <div className={classNames.sumsWrapper}>
            <Field
              disabled
              containerClasses={classNames.sumField}
              label={'Объемный вес'}
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
              label={'Общий финальный вес'}
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
              label={'Общая финальная стоимость'}
              value={toFixed(
                chosenBoxes.reduce((ac, cur) => (ac += calcPriceForBox(cur.originalData)), 0),
                2,
              )}
              placeholder={'0'}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <SuccessButton
              disableElevation
              disabled={chosenBoxes.length < 1 && !batchToEdit}
              variant="contained"
              color="primary"
              onClick={onClickSubmit}
            >
              {'Сохранить'}
            </SuccessButton>

            <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={onClose}>
              {'Отмена'}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)
