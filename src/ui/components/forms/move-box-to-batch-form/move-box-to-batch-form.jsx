import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
            <h5 className={styles.standartText}>
              {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey['Add to batch'])}
            </h5>

            <div className={styles.titleSubWrapper}>
              <h6 className={styles.standartText}>{`${t(TranslationKey.Box)}: ${box.xid}`}</h6>

              <h6 className={styles.standartText}>{`${t(TranslationKey.Batch)}: ${
                box.batch?.xid || t(TranslationKey['Not chosen'])
              }`}</h6>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              rowCount={filteredBatches?.length}
              rows={toJS(filteredBatches)}
              columns={moveBoxToBatchFormColumns({ onClickRowRadioBtn }, selectedBatch)}
              getRowHeight={() => 'auto'}
              onRowClick={e => setSelectedBatch(e.row)}
            />
          </div>

          <div className={styles.btnsWrapper}>
            <Button styleType={ButtonStyle.SUCCESS} onClick={() => onSubmitCreateBatch(box)}>
              {t(TranslationKey['Create new batch'])}
            </Button>

            <div className={styles.btnsSubWrapper}>
              <Button disabled={!selectedBatch} onClick={() => onSubmit(box, selectedBatch)}>
                {box.batchId ? t(TranslationKey['Move box']) : t(TranslationKey.Add)}
              </Button>

              <Button styleType={ButtonStyle.CASUAL} onClick={setOpenModal}>
                {t(TranslationKey.Close)}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.batchesNotExistBlock}>
          <h5 className={styles.title}>{t(TranslationKey['Add to batch'])}</h5>

          <div className={styles.messageWrapper}>
            <p className={styles.standartText}>{t(TranslationKey['No batch with the parameters of the box.'])}</p>
            <p className={styles.standartText}>{`${t(TranslationKey.For)} ${
              box.batchId ? t(TranslationKey.move) : t(TranslationKey.sending)
            } ${t(TranslationKey.Box)} №${box.xid} ${t(TranslationKey['Create new batch'])}.`}</p>
          </div>

          <div className={styles.btnsSecondWrapper}>
            <Button styleType={ButtonStyle.SUCCESS} onClick={() => onSubmitCreateBatch(box)}>
              {t(TranslationKey['Create new batch'])}
            </Button>

            <Button styleType={ButtonStyle.CASUAL} onClick={setOpenModal}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})
