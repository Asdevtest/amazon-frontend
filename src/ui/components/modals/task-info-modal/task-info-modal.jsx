import React from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BeforeAfterInfoTaskBlock} from './before-after-info-task-block'
import {useClassNames} from './task-info-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').taskInfoModal

export const TaskInfoModal = observer(({openModal, setOpenModal, task}) => {
  const classNames = useClassNames()

  const renderDescriptionText = () => {
    switch (task.operationType) {
      case 'split':
        return textConsts.divideBox
      case 'merge':
        return textConsts.mergeBoxes
      case 'receive':
        return textConsts.receiveBoxes
      case 'edit':
        return textConsts.editBox
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
            rows={4}
            rowsMax={6}
            label={'Комментарий клиента'}
            placeholder={'Комментарий клиента к задаче'}
            value={task.clientComment || ''}
          />
          <Field
            multiline
            disabled
            className={classNames.heightFieldAuto}
            rows={4}
            rowsMax={6}
            label={'Комментарий склада'}
            placeholder={'Комментарий склада к задаче для клиента'}
            value={task.storekeeperComment || ''}
          />
        </div>
        <BeforeAfterInfoTaskBlock
          beforeBoxes={task.boxesBefore}
          afterBoxes={task.boxes}
          taskType={task.operationType}
        />
        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={setOpenModal}>
            {'Закрыть'}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
