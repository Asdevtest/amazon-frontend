import {DataGrid} from '@mui/x-data-grid'

import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {moveBoxToBatchFormColumns} from './move-box-to-batch-form-columns'
import {useClassNames} from './move-box-to-batch-form.style'

const textConsts = getLocalizedTexts(texts, 'en').moveBoxToBatchForm

export const MoveBoxToBatchForm = observer(({batches, setOpenModal, onSubmit, box, onSubmitCreateBatch}) => {
  const classNames = useClassNames()

  const [selectedBatch, setSelectedBatch] = useState(null)

  const filteredBatches = batches.filter(
    batch =>
      batch.originalData.boxes[0].destination?.name === box.destination.name &&
      batch.originalData.boxes[0].logicsTariff?.name === box.logicsTariff.name &&
      batch.originalData._id !== box.batchId,
  )

  const onClickRowRadioBtn = row => {
    setSelectedBatch(row)
  }

  return (
    <div className={classNames.root}>
      {filteredBatches.length ? (
        <div className={classNames.batchesExistBlock}>
          <div className={classNames.titleWrapper}>
            <Typography variant="h5">{box.batchId ? 'Переместить коробку' : 'Добавить коробку в партию'}</Typography>

            <div className={classNames.titleSubWrapper}>
              <Typography variant="h6">{`Коробка: ${box.humanFriendlyId}`}</Typography>

              <Typography variant="h6">{`Текущая партия: ${box.batch?.humanFriendlyId || 'N/A'}`}</Typography>
            </div>
          </div>

          <div className={classNames.tableWrapper}>
            <DataGrid
              hideFooter
              rows={toJS(filteredBatches)}
              columns={moveBoxToBatchFormColumns({onClickRowRadioBtn}, selectedBatch)}
              rowHeight={80}
              onRowClick={e => setSelectedBatch(e.row)}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <SuccessButton
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {'Создать новую партию'}
            </SuccessButton>

            <div className={classNames.btnsSubWrapper}>
              <Button
                disabled={!selectedBatch}
                color="primary"
                variant="contained"
                className={classNames.cancelBtn}
                onClick={() => onSubmit(box, selectedBatch)}
              >
                {box.batchId ? 'Переместить' : 'Добавить'}
              </Button>

              <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
                {textConsts.cancelBtn}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={classNames.batchesNotExistBlock}>
          <Typography variant="h5" className={classNames.title}>
            {'Добавить коробку в партию'}
          </Typography>

          <div className={classNames.messageWrapper}>
            <Typography>{`Партий с параметрами коробки нет.`}</Typography>
            <Typography>{`Для ${box.batchId ? 'переноса' : 'отправки'} Коробки №${
              box.humanFriendlyId
            } создайте новую партию.`}</Typography>
          </div>

          <div className={classNames.btnsSecondWrapper}>
            <SuccessButton
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {'Создать новую партию товара'}
            </SuccessButton>

            <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
              {textConsts.cancelBtn}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})
