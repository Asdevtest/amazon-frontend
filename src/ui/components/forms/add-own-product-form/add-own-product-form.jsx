import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'
import {ImageFileInput} from '@components/image-file-input'
import {Input} from '@components/input'

import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-own-product-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOwnProductForm

export const AddOwnProductForm = observer(({selectedProduct}) => {
  const classNames = useClassNames()

  const [amazonLink, setAmazonLink] = useState('')

  const [images, setImages] = useState([])

  const onClickParseBtn = () => {
    setFormFields({
      asin: getAmazonCodeFromLink(amazonLink) || '',
      sku: '',
      title: '',
    })
    setAmazonLink('')
  }

  const sourceFormFields = {
    asin: selectedProduct?.asin || '',
    sku: selectedProduct?.sku || '',
    title: selectedProduct?.title || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  const disableSubmitBtn = formFields.asin === '' && formFields.sku === '' && formFields.title === ''

  return (
    <div className={classNames.root}>
      <Typography variant="h5" className={classNames.title}>
        {textConsts.formTitle}
      </Typography>

      <div className={classNames.fieldsWrapper}>
        <Field
          label={textConsts.linkLabel}
          inputComponent={
            <div className={classNames.amazonLinkWrapper}>
              <Input
                placeholder={textConsts.linkHolder}
                value={amazonLink}
                className={classNames.amazonLinkInput}
                onChange={e => setAmazonLink(e.target.value)}
              />
              <Button
                disableElevation
                className={classNames.parseBtn}
                variant="contained"
                color="primary"
                onClick={onClickParseBtn}
              >
                {textConsts.parseBtn}
              </Button>
            </div>
          }
        />

        <Field
          label={textConsts.asin}
          value={formFields.asin}
          placeholder={textConsts.asin}
          onChange={onChangeField('asin')}
        />

        <Field
          label={textConsts.sku}
          value={formFields.sku}
          placeholder={textConsts.sku}
          onChange={onChangeField('sku')}
        />

        <Field
          label={textConsts.title}
          value={formFields.title}
          placeholder={textConsts.title}
          onChange={onChangeField('title')}
        />

        <Field label={textConsts.addingAmazon} />
      </div>

      <div className={classNames.imageFileInputWrapper}>
        <ImageFileInput images={images} setImages={setImages} maxNumber={50} />
      </div>

      <div className={classNames.btnsWrapper}>
        <SuccessButton disableElevation disabled={disableSubmitBtn} variant="contained" color="primary">
          {textConsts.addAndBindBtn}
        </SuccessButton>
      </div>
    </div>
  )
})
