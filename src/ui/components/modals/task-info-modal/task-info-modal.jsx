import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Modal} from '@components/modal'

import {t} from '@utils/translations'

import {BigImagesModal} from '../big-images-modal'
import {BeforeAfterInfoTaskBlock} from './before-after-info-task-block'
import {useClassNames} from './task-info-modal.style'

export const TaskInfoModal = observer(({openModal, setOpenModal, task, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

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
            rows={4}
            rowsMax={6}
            label={t(TranslationKey['Client comment'])}
            placeholder={t(TranslationKey['Client comment on the task'])}
            value={task.clientComment || ''}
          />
          <Field
            multiline
            disabled
            className={classNames.heightFieldAuto}
            rows={4}
            rowsMax={6}
            label={t(TranslationKey['Storekeeper comment'])}
            placeholder={t(TranslationKey['Storekeeper comment to client'])}
            value={task.storekeeperComment || ''}
          />
        </div>

        {task.images && (
          <div className={classNames.photoWrapper}>
            <Typography className={classNames.subTitle}>{t(TranslationKey['Task photos']) + ':'}</Typography>

            {task.images.length > 0 ? (
              <Carousel autoPlay={false} timeout={100} animation="fade">
                {task.images.map((el, index) => (
                  <div key={index}>
                    <img
                      alt=""
                      className={classNames.imgBox}
                      src={el}
                      onClick={() => {
                        setShowImageModal(!showImageModal)
                        setBigImagesOptions({images: task.images, imgIndex: index})
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
            )}
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

        <BigImagesModal
          isAmazone
          openModal={showImageModal}
          setOpenModal={() => setShowImageModal(!showImageModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
        />
      </div>
    </Modal>
  )
})
