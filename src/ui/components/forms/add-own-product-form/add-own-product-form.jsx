import { observer } from 'mobx-react'
import { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { Checkbox, IconButton } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonCodeFromLink } from '@utils/get-amazon-code-from-link'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './add-own-product-form.style'

export const AddOwnProductForm = observer(({ onSubmit, showProgress, progressValue }) => {
  const { classes: styles } = useStyles()

  const [skuLine, setSkuLine] = useState('')

  const [isNoAsin, setIsNoAsin] = useState(false)

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [images, setImages] = useState([])

  const sourceFormFields = {
    asin: '',
    skuByClient: '',
    amazonTitle: '',
    images: [],
    lamazon: '',
    fba: true,
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onClickParseBtn = () => {
    setFormFields({ ...formFields, asin: getAmazonCodeFromLink(formFields.lamazon) || '' })
  }

  const onClickSkuBtn = () => {
    setFormFields({ ...formFields, skuByClient: skuLine.toUpperCase() })
    setSkuLine('')
  }

  const onRemoveSku = () => {
    setFormFields({ ...formFields, skuByClient: '' })
  }

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  const disableSubmitBtn =
    (formFields.asin === '' && !formFields.skuByClient && formFields.amazonTitle === '' && formFields.lamazon === '') ||
    (!isNoAsin && formFields.asin === '') ||
    submitIsClicked

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Add your product'])}</p>

      <Field
        label={t(TranslationKey['Amazon product link'])}
        tooltipInfoContent={t(TranslationKey['Provide a link to the product you want to add to Amazon'])}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <div className={styles.inputWrapper}>
            <Input
              placeholder={t(TranslationKey.Link)}
              value={formFields.lamazon}
              className={styles.input}
              onChange={onChangeField('lamazon')}
            />
            <Button
              tooltipInfoContent={t(TranslationKey['Fills in the ASIN field from the added Amazon link'])}
              className={styles.defaultBtn}
              onClick={onClickParseBtn}
            >
              Parse
            </Button>
          </div>
        }
      />

      <Field
        inputProps={{ maxLength: 50 }}
        label={t(TranslationKey.ASIN)}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        value={formFields.asin}
        placeholder={t(TranslationKey.ASIN)}
        onChange={onChangeField('asin')}
      />

      <Field
        oneLine
        tooltipInfoContent={t(TranslationKey['Opens additional fields to be filled in when adding a product'])}
        label={t(TranslationKey.No) + ' ASIN'}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <Checkbox
            color="primary"
            checked={isNoAsin}
            className={styles.checkbox}
            onClick={() => setIsNoAsin(!isNoAsin)}
          />
        }
      />

      {isNoAsin && (
        <div>
          <Field
            label={t(TranslationKey.SKU)}
            labelClasses={styles.fieldLabel}
            inputComponent={
              <div>
                {!!formFields.skuByClient && (
                  <div className={styles.skuItemsWrapper}>
                    <div className={styles.skuItemWrapper}>
                      <p className={styles.skuItemTitle}>{formFields.skuByClient}</p>

                      <IconButton className={styles.deleteBtnWrapper} onClick={() => onRemoveSku()}>
                        <DeleteIcon className={styles.deleteBtn} />
                      </IconButton>
                    </div>
                  </div>
                )}

                <div className={styles.inputWrapper}>
                  <Input
                    placeholder={t(TranslationKey.SKU)}
                    inputProps={{ maxLength: 256 }}
                    value={skuLine}
                    className={styles.input}
                    onChange={e => setSkuLine(e.target.value)}
                  />

                  <Button
                    disabled={skuLine === '' || !!formFields.skuByClient}
                    className={styles.defaultBtn}
                    onClick={onClickSkuBtn}
                  >
                    {t(TranslationKey.Add)}
                  </Button>
                </div>
              </div>
            }
          />

          <Field
            label={t(TranslationKey.Title)}
            labelClasses={styles.fieldLabel}
            value={formFields.amazonTitle}
            placeholder={t(TranslationKey.Title)}
            onChange={onChangeField('amazonTitle')}
          />

          <UploadFilesInput
            fullWidth
            images={images}
            setImages={setImages}
            maxNumber={50}
            acceptType={['jpg', 'gif', 'png', 'jpeg']}
          />
        </div>
      )}

      <div className={styles.btnsWrapper}>
        <Button
          styleType={ButtonType.SUCCESS}
          disabled={disableSubmitBtn}
          onClick={() => {
            onSubmit(formFields, images, isNoAsin)
            setSubmitIsClicked(true)
          }}
        >
          {t(TranslationKey.Add)}
        </Button>
      </div>

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}
    </div>
  )
})
