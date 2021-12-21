import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-product-to-sellerbord-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addProductSellerboardForm

export const AddProductSellerboardForm = observer(({onCloseModal, selectedProduct}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    asin: selectedProduct?.asin || '',
    sku: selectedProduct?.sku || '',
    title: selectedProduct?.title || '',
    stockValue: selectedProduct?.stockValue === 0 ? 0 : selectedProduct?.stockValue || '',
    reserved: selectedProduct?.reserved === 0 ? 0 : selectedProduct?.reserved || '',
    sentToFba: selectedProduct?.sentToFba === 0 ? 0 : selectedProduct?.sentToFba || '',
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

      <div>
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

        <Field
          label={textConsts.stockValue}
          value={formFields.stockValue}
          placeholder={textConsts.stockValue}
          onChange={onChangeField('stockValue')}
        />

        <Field
          label={textConsts.reserved}
          value={formFields.reserved}
          placeholder={textConsts.reserved}
          onChange={onChangeField('reserved')}
        />

        <Field
          label={textConsts.sentToFba}
          value={formFields.sentToFba}
          placeholder={textConsts.sentToFba}
          onChange={onChangeField('sentToFba')}
        />
      </div>

      <Button disableElevation disabled={disableSubmitBtn} color="primary" variant="contained">
        {textConsts.addBtn}
      </Button>

      <Button
        disableElevation
        color="primary"
        variant="contained"
        className={classNames.btn}
        onClick={() => onCloseModal()}
      >
        {textConsts.closeBtn}
      </Button>
    </div>
    //   )
  )
})
