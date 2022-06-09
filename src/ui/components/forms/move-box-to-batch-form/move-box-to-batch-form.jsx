import {DataGrid} from '@mui/x-data-grid'

import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'

import {t} from '@utils/translations'

import {moveBoxToBatchFormColumns} from './move-box-to-batch-form-columns'
import {useClassNames} from './move-box-to-batch-form.style'

export const MoveBoxToBatchForm = observer(({batches, setOpenModal, onSubmit, box, onSubmitCreateBatch}) => {
  const classNames = useClassNames()

  const [selectedBatch, setSelectedBatch] = useState(null)

  const filteredBatches = batches.filter(
    batch =>
      batch.originalData.boxes[0].destination?.name === box.destination?.name &&
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
            <Typography variant="h5">
              {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey['Add to batch'])}
            </Typography>

            <div className={classNames.titleSubWrapper}>
              <Typography variant="h6">{`${t(TranslationKey.Box)}: ${box.humanFriendlyId}`}</Typography>

              <Typography variant="h6">{`${t(TranslationKey.Batch)}: ${
                box.batch?.humanFriendlyId || 'N/A'
              }`}</Typography>
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
              {t(TranslationKey['Create new batch'])}
            </SuccessButton>

            <div className={classNames.btnsSubWrapper}>
              <Button
                disabled={!selectedBatch}
                color="primary"
                variant="contained"
                className={classNames.cancelBtn}
                onClick={() => onSubmit(box, selectedBatch)}
              >
                {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey.Add)}
              </Button>

              <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
                {t(TranslationKey.Cancel)}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={classNames.batchesNotExistBlock}>
          <Typography variant="h5" className={classNames.title}>
            {t(TranslationKey['Add to batch'])}
          </Typography>

          <div className={classNames.messageWrapper}>
            <Typography>{t(TranslationKey['No batch with the parameters of the box.'])}</Typography>
            <Typography>{`${t(TranslationKey.For)} ${
              box.batchId ? t(TranslationKey.move) : t(TranslationKey.sending)
            } ${t(TranslationKey.Box)} №${box.humanFriendlyId} ${t(TranslationKey['Create new batch'])}.`}</Typography>
          </div>

          <div className={classNames.btnsSecondWrapper}>
            <SuccessButton
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {t(TranslationKey['Create new batch'])}
            </SuccessButton>

            <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})
