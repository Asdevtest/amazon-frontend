import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {ShowImageModal} from '@components/modals/show-image-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BeforeAfterInfoTaskBlock} from './before-after-info-task-block'
import {useClassNames} from './task-info-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').taskInfoModal

export const TaskInfoModal = observer(({openModal, setOpenModal, task}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)
  const [curImage, setCurImage] = useState('')

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
            label={textConsts.clientLabel}
            placeholder={textConsts.clientPlaceholder}
            value={task.clientComment || ''}
          />
          <Field
            multiline
            disabled
            className={classNames.heightFieldAuto}
            rows={4}
            rowsMax={6}
            label={textConsts.warehouseLabel}
            placeholder={textConsts.warehousePlaceholder}
            value={task.storekeeperComment || ''}
          />
        </div>

        {task.images && (
          <div className={classNames.photoWrapper}>
            <Typography className={classNames.subTitle}>{'Фотографии задачи:'}</Typography>

            {task.images.length > 0 ? (
              <Carousel autoPlay={false} timeout={100} animation="fade">
                {task.images.map((el, index) => (
                  <div key={index}>
                    <img
                      alt=""
                      className={classNames.imgBox}
                      src={el}
                      onClick={e => {
                        setShowImageModal(!showImageModal)
                        setCurImage(e.target.src)
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Typography>{'Фотографий пока нет...'}</Typography>
            )}
          </div>
        )}

        <BeforeAfterInfoTaskBlock
          beforeBoxes={task.boxesBefore}
          afterBoxes={task.boxes}
          taskType={task.operationType}
        />
        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={setOpenModal}>
            {textConsts.closeBtn}
          </Button>
        </div>
        <ShowImageModal
          openModal={showImageModal}
          setOpenModal={() => setShowImageModal(!showImageModal)}
          image={curImage}
        />
      </div>
    </Modal>
  )
})
