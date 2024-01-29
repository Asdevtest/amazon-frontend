import { memo, useEffect, useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { isString } from '@typings/type-guards'

import { useStyles } from './request-result-modal.style'

export const RequestResultModal = memo(props => {
  const { openModal, setOpenModal, onClickSendAsResult, request, proposal, missClickModalOn } = props

  const { classes: styles, cx } = useStyles()

  const getInitialFormFields = () => ({
    amazonOrderId: proposal?.details?.amazonOrderId || '',
    publicationLinks: proposal?.details?.publicationLinks || [],
    result: proposal?.details?.result || '',
  })

  const [link, setLink] = useState('')
  const [images, setImages] = useState([])
  const [formFields, setFormFields] = useState(getInitialFormFields())

  useEffect(() => {
    setFormFields(getInitialFormFields())
  }, [proposal])

  const onChangeField = fieldName => event => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      [fieldName]: event.target.value,
    }))
  }

  const onClickLinkBtn = () => {
    const newLinks = [...formFields.publicationLinks, link]
    onChangeField('publicationLinks')({ target: { value: newLinks } })

    setLink('')
  }

  const onRemoveLink = removeLinkIndex => {
    const newArr = formFields.publicationLinks.filter((_, linkIndex) => linkIndex !== removeLinkIndex)

    onChangeField('publicationLinks')({ target: { value: newArr } })
  }

  const isBloggerTypeTask =
    (request?.spec?.type || request?.request?.spec?.type) === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]
  const disabledSendButton =
    (isBloggerTypeTask && (!formFields.amazonOrderId || !formFields.publicationLinks.length)) ||
    (!isBloggerTypeTask && !formFields.result)
  const mediaFiles = proposal?.proposal?.media?.map(mediaFile =>
    isString(mediaFile) ? mediaFile : mediaFile?.fileLink,
  )
  const isNotEmptyPublicationLinks = formFields.publicationLinks.length > 0

  return (
    <Modal missClickModalOn={missClickModalOn} openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey['Result of the request'])}</p>

        {isBloggerTypeTask && (
          <>
            <Field
              disabled={!!proposal}
              inputProps={{ maxLength: 100 }}
              labelClasses={styles.label}
              label={'Amazon order ID*'}
              className={styles.input}
              value={formFields.amazonOrderId}
              onChange={onChangeField('amazonOrderId')}
            />

            {onClickSendAsResult && (
              <div
                className={cx(styles.linkPublicationContainer, {
                  [styles.marginBottomDefault]: !isNotEmptyPublicationLinks,
                })}
              >
                <Field
                  inputProps={{ maxLength: 512 }}
                  labelClasses={styles.label}
                  label={t(TranslationKey['Link to publication']) + '*'}
                  className={styles.input}
                  containerClasses={styles.inputContainer}
                  value={link}
                  onChange={e => setLink(e.target.value)}
                />

                <Button
                  disableElevation
                  disabled={!link}
                  className={styles.button}
                  variant="contained"
                  color="primary"
                  onClick={onClickLinkBtn}
                >
                  {t(TranslationKey.Add)}
                </Button>
              </div>
            )}

            {isNotEmptyPublicationLinks && (
              <div className={styles.links}>
                {formFields.publicationLinks.map((el, index) => (
                  <div key={index} className={styles.linkWrapper}>
                    <a href={el} className={styles.linkText} target="_blank" rel="noreferrer noopener">
                      {`${index + 1}. ${el}`}
                    </a>

                    <div className={styles.linksBtnsWrapper}>
                      <CopyValue text={el} />
                      {!proposal && (
                        <DeleteOutlineOutlinedIcon className={styles.deleteBtn} onClick={() => onRemoveLink(index)} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Field
          multiline
          disabled={!!proposal}
          labelClasses={styles.label}
          className={styles.commentField}
          inputProps={{ maxLength: 255 }}
          minRows={4}
          maxRows={4}
          label={`${t(TranslationKey.Comments)}*`}
          value={formFields.result}
          onChange={onChangeField('result')}
        />

        <div className={styles.dragAndDropWrapper}>
          {proposal ? (
            <PhotoAndFilesSlider files={mediaFiles} />
          ) : (
            <UploadFilesInput
              withComment
              fullWidth
              title={t(TranslationKey.Files)}
              dragAndDropBtnHeight={55}
              images={images}
              setImages={setImages}
              maxNumber={50 - images.length}
              maxHeight={160}
            />
          )}
        </div>

        <div className={styles.buttonsWrapper}>
          {onClickSendAsResult && (
            <Button
              success
              disableElevation
              disabled={disabledSendButton}
              className={styles.button}
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
            className={cx(styles.button, styles.cancelButton)}
            onClick={setOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
