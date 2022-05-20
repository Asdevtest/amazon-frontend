import React, {useState} from 'react'

import {Typography, IconButton, Grid, Checkbox} from '@material-ui/core'
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

import {useClassNames} from './add-own-product-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOwnProductForm

export const AddOwnProductForm = observer(({onSubmit, showProgress, progressValue}) => {
  const classNames = useClassNames()

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
    setFormFields({...formFields, asin: getAmazonCodeFromLink(formFields.lamazon) || ''})
  }

  const onClickSkuBtn = () => {
    setFormFields({...formFields, skusByClient: [...formFields.skusByClient, skuLine.toUpperCase()]})
    setSkuLine('')
  }

  const onRemoveSku = index => {
    const newArr = formFields.skusByClient.filter((el, i) => i !== index)

    setFormFields({...formFields, skusByClient: newArr})
  }

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
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
        {textConsts.formTitle}
      </Typography>

      <Field
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
      />

      <Field
        inputProps={{maxLength: 50}}
        label={textConsts.asin}
        value={formFields.asin}
        placeholder={textConsts.asin}
        onChange={onChangeField('asin')}
      />

      <div className={classNames.checkboxWrapper} onClick={() => setIsNoAsin(!isNoAsin)}>
        <Checkbox color="primary" checked={isNoAsin} />
        <Typography>{textConsts.noAsin}</Typography>
      </div>

      {isNoAsin && (
        <div>
          <Field
            label={textConsts.sku}
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
                    placeholder={textConsts.skuHolder}
                    inputProps={{maxLength: 1000}}
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
                </div>
              </div>
            }
          />

          <Field
            label={textConsts.title}
            value={formFields.amazonTitle}
            placeholder={textConsts.title}
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
        <SuccessButton
          disableElevation
          disabled={disableSubmitBtn}
          variant="contained"
          color="primary"
          onClick={() => {
            onSubmit(formFields, images, isNoAsin)
            setSubmitIsClicked(true)
          }}
        >
          {textConsts.addAndBindBtn}
        </SuccessButton>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title={textConsts.circularProgressTitle} />}
    </div>
  )
})
