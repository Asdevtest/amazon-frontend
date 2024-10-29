import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { useStyles } from './move-box-to-batch-form.style'

import { moveBoxToBatchFormColumns } from './move-box-to-batch-form-columns'

export const MoveBoxToBatchForm = observer(props => {
  const { batches, setOpenModal, onSubmit, box, onSubmitCreateBatch } = props

  const { classes: styles, cx } = useStyles()
  const [selectedBatch, setSelectedBatch] = useState(null)

  const filteredBatches = batches?.filter(
    batch =>
      batch?.boxes?.[0]?.destination?.name === box.destination?.name &&
      batch?.boxes?.[0]?.logicsTariff?.name === box.logicsTariff.name &&
      batch?._id !== box.batchId,
  )

  return (
    <div className={styles.root}>
      <div className={styles.flexRow}>
        <p className={styles.title}>
          {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey['Add to batch'])}
        </p>

        <div className={styles.flexRow}>
          <p>{`${t(TranslationKey.Box)}: ${box.xid}`}</p>
          <p>{`${t(TranslationKey.Batch)}: ${box.batch?.xid || t(TranslationKey['Not chosen'])}`}</p>
        </div>
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          rowCount={filteredBatches?.length}
          rows={filteredBatches}
          columns={moveBoxToBatchFormColumns({ setSelectedBatch }, selectedBatch)}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
          onRowClick={e => setSelectedBatch(e.row)}
        />
      </div>

      <div className={styles.flexRow}>
        <CustomButton type="primary" size="large" onClick={() => onSubmitCreateBatch(box)}>
          {t(TranslationKey['Create new batch'])}
        </CustomButton>

        <div className={styles.flexRow}>
          <CustomButton
            type="primary"
            size="large"
            disabled={!selectedBatch}
            onClick={() => onSubmit(box, selectedBatch)}
          >
            {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey.Add)}
          </CustomButton>

          <CustomButton size="large" onClick={setOpenModal}>
            {t(TranslationKey.Close)}
          </CustomButton>
        </div>
      </div>
    </div>
  )
})
