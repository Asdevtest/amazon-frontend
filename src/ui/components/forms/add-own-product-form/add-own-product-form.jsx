import { observer } from 'mobx-react'
import { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { Checkbox, Grid, IconButton, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getAmazonCodeFromLink } from '@utils/get-amazon-code-from-link'
import { t } from '@utils/translations'

import { useClassNames } from './add-own-product-form.style'

export const AddOwnProductForm = observer(({ onSubmit, showProgress, progressValue }) => {
  const { classes: classNames } = useClassNames()

  const [skuLine, setSkuLine] = useState('')

  const [isNoAsin, setIsNoAsin] = useState(false)

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [images, setImages] = useState([])

  const sourceFormFields = {
    asin: '',
    skusByClient: [],
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
    setFormFields({ ...formFields, skusByClient: [...formFields.skusByClient, skuLine.toUpperCase()] })
    setSkuLine('')
  }

  const onRemoveSku = index => {
    const newArr = formFields.skusByClient.filter((el, i) => i !== index)

    setFormFields({ ...formFields, skusByClient: newArr })
  }

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  const disableSubmitBtn =
    (formFields.asin === '' &&
      !formFields.skusByClient.length &&
      formFields.amazonTitle === '' &&
      formFields.lamazon === '') ||
    (!isNoAsin && formFields.asin === '') ||
    submitIsClicked

  return (
    <div className={classNames.root}>
      <Typography variant="h5" className={classNames.title}>
        {t(TranslationKey['Add your product'])}
      </Typography>

      <Field
        label={t(TranslationKey['Amazon product link'])}
        tooltipInfoContent={t(TranslationKey['Provide a link to the product you want to add to Amazon'])}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div className={classNames.inputWrapper}>
            <Input
              placeholder={t(TranslationKey.Link)}
              value={formFields.lamazon}
              className={classNames.input}
              onChange={onChangeField('lamazon')}
            />
            <Button
              disableElevation
              tooltipInfoContent={t(TranslationKey['Fills in the ASIN field from the added Amazon link'])}
              className={classNames.defaultBtn}
              variant="contained"
              color="primary"
              onClick={onClickParseBtn}
            >
              {'Parse'}
            </Button>
          </div>
        }
      />

      <Field
        inputProps={{ maxLength: 50 }}
        label={t(TranslationKey.ASIN)}
        labelClasses={classNames.fieldLabel}
        value={formFields.asin}
        placeholder={t(TranslationKey.ASIN)}
        onChange={onChangeField('asin')}
      />

      <div className={classNames.checkboxWrapper} onClick={() => setIsNoAsin(!isNoAsin)}>
        <Field
          oneLine
          tooltipInfoContent={t(TranslationKey['Opens additional fields to be filled in when adding a product'])}
          label={t(TranslationKey.No) + ' ASIN'}
          labelClasses={classNames.fieldLabel}
          inputComponent={<Checkbox color="primary" checked={isNoAsin} />}
        />
      </div>

      {isNoAsin && (
        <div>
          <Field
            label={t(TranslationKey.SKU)}
            labelClasses={classNames.fieldLabel}
            inputComponent={
              <div>
                {formFields.skusByClient.length ? (
                  <Grid container spacing={2} className={classNames.skuItemsWrapper}>
                    {formFields.skusByClient.map((item, index) => (
                      <Grid key={index} item className={classNames.skuItemWrapper}>
                        <Typography className={classNames.skuItemTitle}>{item}</Typography>

                        <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveSku(index)}>
                          <DeleteIcon className={classNames.deleteBtn} />
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>
                ) : null}

                <div className={classNames.inputWrapper}>
                  <Input
                    placeholder={t(TranslationKey.SKU)}
                    inputProps={{ maxLength: 256 }}
                    value={skuLine}
                    className={classNames.input}
                    onChange={e => setSkuLine(e.target.value)}
                  />
                  <Button
                    disableElevation
                    disabled={skuLine === '' || !!formFields.skusByClient.length}
                    className={classNames.defaultBtn}
                    variant="contained"
                    color="primary"
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
            labelClasses={classNames.fieldLabel}
            value={formFields.amazonTitle}
            placeholder={t(TranslationKey.Title)}
            onChange={onChangeField('amazonTitle')}
          />

          <div className={classNames.imageFileInputWrapper}>
            <UploadFilesInput
              images={images}
              setImages={setImages}
              maxNumber={50}
              acceptType={['jpg', 'gif', 'png', 'jpeg']}
            />
          </div>
        </div>
      )}

      <div className={classNames.btnsWrapper}>
        <Button
          success
          disableElevation
          disabled={disableSubmitBtn}
          variant="contained"
          color="primary"
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
