import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { useStyles } from './move-box-to-batch-form.style'

import { moveBoxToBatchFormColumns } from './move-box-to-batch-form-columns'

export const MoveBoxToBatchForm = observer(({ batches, setOpenModal, onSubmit, box, onSubmitCreateBatch }) => {
  const { classes: styles, cx } = useStyles()

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
        <div className={styles.batchesExistBlock}>
          <div className={styles.titleWrapper}>
            <Typography variant="h5" className={styles.standartText}>
              {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey['Add to batch'])}
            </Typography>

            <div className={styles.titleSubWrapper}>
              <Typography variant="h6" className={styles.standartText}>{`${t(TranslationKey.Box)}: ${
                box.humanFriendlyId
              }`}</Typography>

              <Typography variant="h6" className={styles.standartText}>{`${t(TranslationKey.Batch)}: ${
                box.batch?.humanFriendlyId || t(TranslationKey['Not chosen'])
              }`}</Typography>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              rows={toJS(filteredBatches)}
              columns={moveBoxToBatchFormColumns({ onClickRowRadioBtn }, selectedBatch)}
              rowHeight={80}
              onRowClick={e => setSelectedBatch(e.row)}
            />
          </div>

          <div className={styles.btnsWrapper}>
            <Button
              success
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {t(TranslationKey['Create new batch'])}
            </Button>

            <div className={styles.btnsSubWrapper}>
              <Button
                disabled={!selectedBatch}
                variant="contained"
                className={cx(styles.cancelBtn, styles.moveBox)}
                onClick={() => onSubmit(box, selectedBatch)}
              >
                {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey.Add)}
              </Button>

              <Button color="primary" variant="text" className={styles.cancelBtn} onClick={setOpenModal}>
                {t(TranslationKey.Cancel)}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.batchesNotExistBlock}>
          <Typography variant="h5" className={styles.title}>
            {t(TranslationKey['Add to batch'])}
          </Typography>

          <div className={styles.messageWrapper}>
            <Typography className={styles.standartText}>
              {t(TranslationKey['No batch with the parameters of the box.'])}
            </Typography>
            <Typography className={styles.standartText}>{`${t(TranslationKey.For)} ${
              box.batchId ? t(TranslationKey.move) : t(TranslationKey.sending)
            } ${t(TranslationKey.Box)} №${box.humanFriendlyId} ${t(TranslationKey['Create new batch'])}.`}</Typography>
          </div>

          <div className={styles.btnsSecondWrapper}>
            <Button
              success
              disableElevation
              variant="contained"
              color="primary"
              onClick={() => onSubmitCreateBatch(box)}
            >
              {t(TranslationKey['Create new batch'])}
            </Button>

            <Button color="primary" variant="text" className={styles.cancelBtn} onClick={setOpenModal}>
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})
