import { Typography } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { BeforeAfterInfoTaskBlock } from './before-after-info-task-block'
import { useClassNames } from './task-info-modal.style'

export const TaskInfoModal = observer(({ openModal, setOpenModal, task, volumeWeightCoefficient }) => {
  const { classes: classNames } = useClassNames()

  const renderDescriptionText = () => {
    switch (task.operationType) {
      case 'split':
        return t(TranslationKey.Split)
      case 'merge':
        return t(TranslationKey.Merge)
      case 'receive':
        return t(TranslationKey.Receive)
      case 'edit':
        return t(TranslationKey.Edit)
    }
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.form}>
        <Typography className={classNames.modalTitle} variant="h3">
          {renderDescriptionText()}
        </Typography>
        <div className={classNames.commentsWrapper}>
          <Field
            multiline
            disabled
            className={classNames.heightFieldAuto}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey['Client comment'])}
            placeholder={t(TranslationKey['Client comment on the task'])}
            value={task.clientComment || ''}
          />
          <Field
            multiline
            disabled
            className={classNames.heightFieldAuto}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey['Storekeeper comment'])}
            placeholder={t(TranslationKey['Storekeeper comment to client'])}
            value={task.storekeeperComment || ''}
          />
        </div>

        {task.images && (
          <div className={classNames.photoWrapper}>
            <Typography className={classNames.subTitle}>{t(TranslationKey['Task photos']) + ':'}</Typography>
            <PhotoCarousel files={task.images} />
          </div>
        )}

        <BeforeAfterInfoTaskBlock
          volumeWeightCoefficient={volumeWeightCoefficient}
          beforeBoxes={task.boxesBefore}
          afterBoxes={task.boxes}
          taskType={task.operationType}
        />
        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={setOpenModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
