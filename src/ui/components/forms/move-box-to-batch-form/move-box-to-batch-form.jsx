import { Typography } from '@mui/material'
import { cx } from '@emotion/css'
import React, { useState } from 'react'

import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { t } from '@utils/translations'

import { moveBoxToBatchFormColumns } from './move-box-to-batch-form-columns'
import { useClassNames } from './move-box-to-batch-form.style'

export const MoveBoxToBatchForm = observer(({ batches, setOpenModal, onSubmit, box, onSubmitCreateBatch }) => {
  const { classes: classNames } = useClassNames()

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
    <div>
      {filteredBatches.length ? (
        <div className={classNames.batchesExistBlock}>
          <div className={classNames.titleWrapper}>
            <Typography variant="h5" className={classNames.standartText}>
              {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey['Add to batch'])}
            </Typography>

            <div className={classNames.titleSubWrapper}>
              <Typography variant="h6" className={classNames.standartText}>{`${t(TranslationKey.Box)}: ${
                box.humanFriendlyId
              }`}</Typography>

              <Typography variant="h6" className={classNames.standartText}>{`${t(TranslationKey.Batch)}: ${
                box.batch?.humanFriendlyId || t(TranslationKey['Not chosen'])
              }`}</Typography>
            </div>
          </div>

          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              hideFooter
              // sx={{
              //   border: 0,
              //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              //   backgroundColor: theme.palette.background.general,
              // }}
              rows={toJS(filteredBatches)}
              columns={moveBoxToBatchFormColumns({ onClickRowRadioBtn }, selectedBatch)}
              rowHeight={80}
              onRowClick={e => setSelectedBatch(e.row)}
            />
          </div>

          <div className={classNames.btnsWrapper}>
            <Button
              success
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {t(TranslationKey['Create new batch'])}
            </Button>

            <div className={classNames.btnsSubWrapper}>
              <Button
                disabled={!selectedBatch}
                variant="contained"
                className={cx(classNames.cancelBtn, classNames.moveBox)}
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
            <Typography className={classNames.standartText}>
              {t(TranslationKey['No batch with the parameters of the box.'])}
            </Typography>
            <Typography className={classNames.standartText}>{`${t(TranslationKey.For)} ${
              box.batchId ? t(TranslationKey.move) : t(TranslationKey.sending)
            } ${t(TranslationKey.Box)} №${box.humanFriendlyId} ${t(TranslationKey['Create new batch'])}.`}</Typography>
          </div>

          <div className={classNames.btnsSecondWrapper}>
            <Button
              success
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {t(TranslationKey['Create new batch'])}
            </Button>

            <Button color="primary" variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})
