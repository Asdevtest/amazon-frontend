/* eslint-disable no-unused-vars */
import {DataGrid} from '@mui/x-data-grid'

import React, {useState} from 'react'

import {Grid, IconButton, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {UploadFilesInput} from '@components/upload-files-input'

import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {chosenGoodsColumns} from './add-product-to-sellerbord-colums'
import {useClassNames} from './add-product-to-sellerbord-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addProductSellerboardForm

export const AddProductSellerboardForm = observer(({goodsToSelect, onSubmit, showProgress, progressValue}) => {
  const classNames = useClassNames()

  const [chosenGoods, setChosenGoods] = useState(goodsToSelect)

  const [skuLine, setSkuLine] = useState('')

  const [images, setImages] = useState([])

  const [selectedRow, setSelectedRow] = useState({})

  const onClickRowRadioBtn = item => {
    setSelectedRow(item)

    setFormFields({
      ...formFields,
      asin: item?.asin || '',
      skusByClient: item ? [item.sku] : [],
      amazonTitle: item?.title || '',
    })
  }

  const sourceFormFields = {
    asin: '',
    skusByClient: [],
    amazonTitle: '',
    images: [],
    lamazon: '',
    fba: true,
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    setSelectedRow({})

    const newFormFields = {...formFields}
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  const onClickTrash = asin => {
    const filteredArray = [...chosenGoods].filter(el => el.asin !== asin)
    setChosenGoods(filteredArray)
  }

  const onClickParseBtn = () => {
    setFormFields({...formFields, asin: getAmazonCodeFromLink(formFields.lamazon) || ''})
  }

  const onClickSkuBtn = () => {
    setSelectedRow({})

    setFormFields({...formFields, skusByClient: [...formFields.skusByClient, skuLine.toUpperCase()]})
    setSkuLine('')
  }

  const onRemoveSku = index => {
    setSelectedRow({})

    const newArr = formFields.skusByClient.filter((el, i) => i !== index)

    setFormFields({...formFields, skusByClient: newArr})
  }

  const disableSubmitBtn = formFields.asin === '' || !formFields.skusByClient.length || formFields.title === ''
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
        {/* <Field
          label={textConsts.linkLabel}
          inputComponent={
            <div className={classNames.inputWrapper}>
              <Input
                placeholder={textConsts.linkHolder}
                value={formFields.lamazon}
                className={classNames.input}
                onChange={onChangeField('lamazon')}
              />
              <Button
                disableElevation
                className={classNames.defaultBtn}
                variant="contained"
                color="primary"
                onClick={onClickParseBtn}
              >
                {textConsts.parseBtn}
              </Button>
            </div>
          }
        /> */}

        <Field
          disabled
          inputProps={{maxLength: 1000}}
          label={textConsts.asin}
          value={formFields.asin}
          placeholder={textConsts.asin}
          onChange={onChangeField('asin')}
        />

        <Field
          label={textConsts.sku}
          inputComponent={
            <div>
              {formFields.skusByClient.length ? (
                <Grid container spacing={2} className={classNames.skuItemsWrapper}>
                  {formFields.skusByClient.map((item, index) => (
                    <Grid key={index} item className={classNames.skuItemWrapper}>
                      <Typography className={classNames.skuItemTitle}>{item}</Typography>

                      {/* <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveSku(index)}>
                        <DeleteIcon className={classNames.deleteBtn} />
                      </IconButton> */}
                    </Grid>
                  ))}
                </Grid>
              ) : null}

              {/* <div className={classNames.inputWrapper}>
                <Input
                  placeholder={textConsts.skuHolder}
                  value={skuLine}
                  className={classNames.input}
                  onChange={e => setSkuLine(e.target.value)}
                />
                <Button
                  disableElevation
                  disabled={skuLine === ''}
                  className={classNames.defaultBtn}
                  variant="contained"
                  color="primary"
                  onClick={onClickSkuBtn}
                >
                  {textConsts.addSkuBtn}
                </Button>
              </div> */}
            </div>
          }
        />

        <Field
          disabled
          label={textConsts.title}
          value={formFields.amazonTitle}
          placeholder={textConsts.title}
          onChange={onChangeField('amazonTitle')}
        />
      </div>

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={images} setImages={setImages} maxNumber={50} acceptType={['jpg', 'gif', 'png']} />
      </div>

      <div className={classNames.btnsWrapper}>
        <SuccessButton
          disableElevation
          disabled={disableSubmitBtn}
          variant="contained"
          color="primary"
          onClick={() => onSubmit(formFields, images)}
        >
          {textConsts.addAndBindBtn}
        </SuccessButton>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title={textConsts.circularProgressTitle} />}
    </div>
  )
})
