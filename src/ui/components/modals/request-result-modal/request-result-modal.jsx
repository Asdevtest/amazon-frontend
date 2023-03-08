/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {IconButton, Input, Link, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

import {useClassNames} from './request-result-modal.style'

export const RequestResultModal = ({openModal, setOpenModal, onClickSendAsResult, request}) => {
  const {classes: classNames} = useClassNames()

  const [linkLine, setLinkLine] = useState('')

  const [images, setImages] = useState([])

  const disableFields = null

  const sourceFormFields = {
    amazonOrderId: '',
    publicationLinks: [],
    result: '',
    // linksToMediaFiles: [],
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  const onClickLinkBtn = () => {
    onChangeField('publicationLinks')({target: {value: [...formFields.publicationLinks, linkLine]}})

    setLinkLine('')
  }

  const onRemoveLink = index => {
    const newArr = formFields.publicationLinks.filter((el, i) => i !== index)

    onChangeField('publicationLinks')({target: {value: [...newArr]}})
  }

  const disabledBtn =
    (`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
      (!formFields.amazonOrderId || !formFields.publicationLinks.length)) ||
    (`${request?.request?.typeTask}` !== `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
      !formFields.result)

  // useEffect(() => {
  //   const listener = event => {
  //     if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
  //       event.preventDefault()
  //       onClickBtn()
  //     }
  //   }
  //   document.addEventListener('keydown', listener)
  //   return () => {
  //     document.removeEventListener('keydown', listener)
  //   }
  // }, [openModal])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMainWrapper}>
        <Typography className={cx(classNames.modalTitle)}>{t(TranslationKey['Result of the request'])}</Typography>

        {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
          <Field
            inputProps={{maxLength: 100}}
            labelClasses={classNames.label}
            label={'Amazon order ID*'}
            className={classNames.input}
            containerClasses={classNames.numberInputField}
            value={formFields.amazonOrderId}
            onChange={onChangeField('amazonOrderId')}
          />
        )}

        {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
          <Field
            labelClasses={classNames.label}
            label={t(TranslationKey['Link to publication']) + '*'}
            // containerClasses={classNames.input}
            inputComponent={
              <div className={classNames.linksWrapper}>
                <div className={classNames.inputWrapper}>
                  <Input
                    inputProps={{maxLength: 1500}}
                    value={linkLine}
                    className={classNames.pubInput}
                    onChange={e => setLinkLine(e.target.value)}
                  />
                  <Button
                    disableElevation
                    disabled={!linkLine || disableFields}
                    className={classNames.button}
                    variant="contained"
                    color="primary"
                    onClick={onClickLinkBtn}
                  >
                    {t(TranslationKey.Add)}
                  </Button>
                </div>
                {formFields?.publicationLinks?.length ? (
                  <div className={classNames.linksSubWrapper}>
                    {formFields?.publicationLinks.map((el, index) => (
                      <div key={index} className={classNames.linkWrapper}>
                        <Link target="_blank" href={el} className={classNames.linkTextWrapper}>
                          <Typography className={classNames.linkText}>{`${index + 1}. ${el}`}</Typography>
                        </Link>

                        <div className={classNames.linksBtnsWrapper}>
                          <CopyValue text={el} />
                          {!disableFields && (
                            <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveLink(index)}>
                              <DeleteOutlineOutlinedIcon className={classNames.deleteBtn} />
                            </IconButton>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            }
          />
        )}

        <Field
          multiline
          // disabled={disableFields}
          containerClasses={classNames.commentFieldWrapper}
          labelClasses={classNames.label}
          className={classNames.commentField}
          inputProps={{maxLength: 255}}
          minRows={4}
          maxRows={4}
          label={t(TranslationKey.Comments)}
          value={formFields.result}
          onChange={onChangeField('result')}
        />

        <div className={classNames.dragAndDropWrapper}>
          <UploadFilesInput
            title={t(TranslationKey.Files)}
            dragAndDropBtnHeight={55}
            images={images}
            setImages={setImages}
            maxNumber={50}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            success
            disableElevation
            disabled={disabledBtn}
            className={cx(classNames.button)}
            onClick={() => {
              onClickSendAsResult({
                message: formFields.result,
                files: images,
                amazonOrderId: formFields.amazonOrderId,
                publicationLinks: formFields.publicationLinks,
              })
              setOpenModal()
            }}
          >
            {t(TranslationKey.Send)}
          </Button>

          <Button
            disableElevation
            variant="text"
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={setOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
