import {DataGrid} from '@mui/x-data-grid'

import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {SuccessButton} from '@components/buttons/success-button/success-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {addOrEditBatchFormColumns} from './add-or-edit-batch-form-columns'
import {useClassNames} from './add-or-edit-batch-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditBatchForm

export const AddOrEditBatchForm = observer(({boxesData, selectedRowId, onSubmit}) => {
  const classNames = useClassNames()

  const [chosenBoxes, setChosenBoxes] = useState([])

  // const onClickTrash = asin => {
  //   const filteredArray = [...chosenGoods].filter(el => el.asin !== asin)
  //   setChosenGoods(filteredArray)
  // }

  const onSelectionModel = model => {
    const curChosenGoodsIds = chosenBoxes.map(el => el.id)

    const newRowIds = model.filter(el => !curChosenGoodsIds.includes(el))

    const newSelectedItems = toJS(boxesData).filter(el => newRowIds.includes(el.id))
    setChosenBoxes([...chosenBoxes, ...newSelectedItems])
  }

  const onClickSubmit = () => {
    const selectedWarehouseStocks = chosenBoxes.map(el => ({sku: el.sku, shopId: el.shop._id}))

    onSubmit({productId: selectedRowId, warehouseStocks: selectedWarehouseStocks})
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h5">{'Создание партии'}</Typography>

      <div className={classNames.form}>
        <div className={classNames.filtersWrapper}></div>

        <div className={classNames.tableWrapper}>
          <DataGrid
            hideFooter
            checkboxSelection
            rows={toJS(boxesData)}
            columns={addOrEditBatchFormColumns()}
            rowHeight={80}
            onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          <Button
            disabled
            color="primary"
            variant="contained"
            // onClick={() => onTriggerOpenModal('showConfirmModal')}
          >
            {'Добавить в партию'}
          </Button>
        </div>

        <Typography className={classNames.chosenGoodsTitle}>{textConsts.chosenGoods}</Typography>

        <div className={classNames.tableWrapper}>
          <DataGrid
            hideFooter
            checkboxSelection
            rows={chosenBoxes || []}
            columns={addOrEditBatchFormColumns()}
            rowHeight={80}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          <ErrorButton
            disabled
            color="primary"
            variant="contained"
            // onClick={() => onTriggerOpenModal('showConfirmModal')}
          >
            {'Удалить'}
          </ErrorButton>
        </div>

        <div className={classNames.btnsWrapper}>
          <SuccessButton
            disableElevation
            disabled={chosenBoxes.length < 1}
            variant="contained"
            color="primary"
            onClick={onClickSubmit}
          >
            {'Сохранить'}
          </SuccessButton>

          <Button
            color="primary"
            variant="text"
            className={classNames.cancelBtn}
            // onClick={() => onTriggerOpenModal('showConfirmModal')}
          >
            {'Отмена'}
          </Button>
        </div>
      </div>
    </div>
  )
})
