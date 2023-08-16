/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { useEffect, useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './request-result-modal.style'

export const RequestResultModal = ({
  openModal,
  setOpenModal,
  onClickSendAsResult,
  request,
  proposal,
  missClickModalOn,
}) => {
  const { classes: classNames } = useClassNames()

  const [linkLine, setLinkLine] = useState('')
  const [images, setImages] = useState([])

  const disableFields = null

  const getSourceFormFields = () => ({
    amazonOrderId: proposal?.details?.amazonOrderId || '',
    publicationLinks: proposal?.details?.publicationLinks || [],
    result: proposal?.details?.result || '',
  })

  const [formFields, setFormFields] = useState(getSourceFormFields())

  useEffect(() => {
    setFormFields(getSourceFormFields())
  }, [proposal])

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  const onClickLinkBtn = () => {
    onChangeField('publicationLinks')({ target: { value: [...formFields.publicationLinks, linkLine] } })

    setLinkLine('')
  }

  const onRemoveLink = index => {
    const newArr = formFields.publicationLinks.filter((el, i) => i !== index)

    onChangeField('publicationLinks')({ target: { value: [...newArr] } })
  }

  const disabledBtn =
    (`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
      (!formFields.amazonOrderId || !formFields.publicationLinks.length)) ||
    (`${request?.request?.typeTask}` !== `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
      !formFields.result)

  return (
    <Modal missClickModalOn={missClickModalOn} openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMainWrapper}>
        <p className={classNames.modalTitle}>{t(TranslationKey['Result of the request'])}</p>

        {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
          <Field
            disabled={proposal}
            inputProps={{ maxLength: 100 }}
            labelClasses={classNames.label}
            label={'Amazon order ID*'}
            className={classNames.input}
            value={formFields.amazonOrderId}
            onChange={onChangeField('amazonOrderId')}
          />
        )}

        {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
          <Field
            labelClasses={classNames.label}
            label={t(TranslationKey['Link to publication']) + '*'}
            inputComponent={
              <div className={classNames.linksWrapper}>
                {!proposal && (
                  <div className={classNames.inputWrapper}>
                    <Input
                      inputProps={{ maxLength: 512 }}
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
                )}
                {formFields?.publicationLinks?.length ? (
                  <div className={classNames.linksSubWrapper}>
                    {formFields?.publicationLinks.map((el, index) => (
                      <div key={index} className={classNames.linkWrapper}>
                        <Link target="_blank" href={el} className={classNames.linkText}>
                          {`${index + 1}. ${el}`}
                        </Link>

                        <div className={classNames.linksBtnsWrapper}>
                          <CopyValue text={el} />
                          {!disableFields && !proposal && (
                            <DeleteOutlineOutlinedIcon
                              className={classNames.deleteBtn}
                              onClick={() => onRemoveLink(index)}
                            />
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
          disabled={proposal}
          containerClasses={classNames.commentFieldWrapper}
          labelClasses={classNames.label}
          className={classNames.commentField}
          inputProps={{ maxLength: 255 }}
          minRows={4}
          maxRows={4}
          label={t(TranslationKey.Comments)}
          value={formFields.result}
          onChange={onChangeField('result')}
        />

        <div className={classNames.dragAndDropWrapper}>
          {proposal ? (
            <PhotoAndFilesCarousel
              notToShowEmpty
              small
              files={proposal?.proposal?.media?.map(el => (typeof el === 'object' ? el?.fileLink : el))}
            />
          ) : (
            <UploadFilesInput
              withComment
              fullWidth
              title={t(TranslationKey.Files)}
              dragAndDropBtnHeight={55}
              images={images}
              setImages={setImages}
              maxNumber={50}
              maxHeight={160}
            />
          )}
        </div>

        <div className={classNames.buttonsWrapper}>
          {!!onClickSendAsResult && (
            <Button
              success
              disableElevation
              disabled={disabledBtn}
              className={classNames.button}
              onClick={() => {
                onClickSendAsResult({
                  message: formFields.result,
                  files: images.map(el => ({ ...el, image: el.file })),
                  amazonOrderId: formFields.amazonOrderId,
                  publicationLinks: formFields.publicationLinks,
                })
                setOpenModal()
              }}
            >
              {t(TranslationKey.Send)}
            </Button>
          )}

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
