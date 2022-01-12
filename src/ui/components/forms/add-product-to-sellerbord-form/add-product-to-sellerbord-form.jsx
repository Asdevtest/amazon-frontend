import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid} from '@material-ui/data-grid'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'
import {ImageFileInput} from '@components/image-file-input'
import {Input} from '@components/input'

import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {chosenGoodsColumns} from './add-product-to-sellerbord-colums'
import {useClassNames} from './add-product-to-sellerbord-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addProductSellerboardForm

export const AddProductSellerboardForm = observer(({selectedProduct, goodsToSelect}) => {
  const classNames = useClassNames()

  const [chosenGoods, setChosenGoods] = useState(goodsToSelect)

  const [amazonLink, setAmazonLink] = useState('')

  const [images, setImages] = useState([])

  const [selectedRow, setSelectedRow] = useState({})

  const onClickRowRadioBtn = item => {
    setSelectedRow(item)

    setFormFields({
      asin: item?.asin || '',
      sku: item?.sku || '',
      title: item?.title || '',
    })
  }

  const onClickTrash = asin => {
    const filteredArray = [...chosenGoods].filter(el => el.asin !== asin)
    setChosenGoods(filteredArray)
  }

  const onClickParseBtn = () => {
    setSelectedRow({})

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
    setSelectedRow({})

    const newFormFields = {...formFields}
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  const disableSubmitBtn = formFields.asin === '' || formFields.sku === '' || formFields.title === ''
  return (
    <div className={classNames.root}>
      <Typography variant="h5" className={classNames.title}>
        {textConsts.formTitle}
      </Typography>

      <Typography className={classNames.title}>{textConsts.chosenMainGood}</Typography>

      <div className={classNames.tableWrapper}>
        <DataGrid
          hideFooter
          rows={chosenGoods || []}
          columns={chosenGoodsColumns({onClickTrash, onClickRowRadioBtn}, selectedRow)}
          rowHeight={40}
        />
      </div>

      <div>
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
