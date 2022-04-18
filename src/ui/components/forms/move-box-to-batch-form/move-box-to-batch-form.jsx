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

export const MoveBoxToBatchForm = observer(({batches, setOpenModal, onSubmit, box}) => {
  const classNames = useClassNames()

  const [selectedBatch, setSelectedBatch] = useState(null)

  const filteredBatches = batches.filter(
    batch =>
      batch.originalData.boxes[0].destination?.name === box.destination.name &&
      batch.originalData.boxes[0].logicsTariff?.name === box.logicsTariff.name,
  )

  const onClickRowRadioBtn = row => {
    setSelectedBatch(row)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.titleWrapper}>
        <Typography variant="h5">{'Переместить коробку'}</Typography>

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
          disabled={!selectedBatch}
          variant="contained"
          color="primary"
          onClick={() => onSubmit(box, selectedBatch)}
        >
          {'Выбрать'}
        </SuccessButton>

        <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
})
