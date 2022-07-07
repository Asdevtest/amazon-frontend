/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

import {Typography, IconButton, Grid, Checkbox, NativeSelect, Link} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {t} from '@utils/translations'

import {useClassNames} from './add-supplier-to-idea-from-inventory-form.style'

const ideasMock = [
  {name: 'idea 1', _id: '001'},
  {name: 'idea 2', _id: '002'},
  {name: 'idea 3', _id: '003'},
]

export const AddSupplierToIdeaFromInventoryForm = observer(({onSubmit, showProgress, progressValue, onClose}) => {
  const classNames = useClassNames()

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [images, setImages] = useState([])

  const sourceFormFields = {
    links: [],

    asin: '',
    skusByClient: [],
    amazonTitle: '',
    images: [],
    lamazon: '',
    fba: true,
  }

  const [linkLine, setLinkLine] = useState('')

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    // if (['execution_time'].includes(fieldName)) {
    //   newFormFields[fieldName] = parseInt(event.target.value) || ''
    // } else
    if (
      ['price', 'count'].includes(fieldName) &&
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    ) {
      return
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const onClickLinkBtn = () => {
    onChangeField('links')({target: {value: [...formFields.links, linkLine]}})

    setLinkLine('')
  }

  const onRemoveLink = index => {
    const newArr = formFields.links.filter((el, i) => i !== index)

    onChangeField('links')({target: {value: [...newArr]}})
  }

  const disableSubmitBtn =
    (formFields.asin === '' &&
      !formFields.skusByClient.length &&
      formFields.amazonTitle === '' &&
      formFields.lamazon === '') ||
    // (!isNoAsin && formFields.asin === '') ||
    submitIsClicked

  return (
    <div className={classNames.root}>
      <Typography variant="h5" className={classNames.title}>
        {t(TranslationKey['Supplier search options'])}
      </Typography>

      <Field
        label={t(TranslationKey.Idea)}
        inputClasses={classNames.nativeSelect}
        labelClasses={classNames.label}
        inputComponent={
          <NativeSelect
            variant="filled"
            // value={order.storekeeper?.name}
            className={classNames.nativeSelect}
            input={<Input />}
          >
            <option value={''}>{'none'}</option>
            {ideasMock.map((idea, statusIndex) => (
              <option key={statusIndex} value={idea._id}>
                {idea.name}
              </option>
            ))}
          </NativeSelect>
        }
      />

      <Field
        inputProps={{maxLength: 50}}
        label={t(TranslationKey['Product name'])}
        labelClasses={classNames.label}
        // value={formFields.asin}
        placeholder={t(TranslationKey['Product name'])}
        // onChange={onChangeField('asin')}
      />

      <Field
        labelClasses={classNames.label}
        label={t(TranslationKey['Product Link'])}
        containerClasses={classNames.linksContainer}
        inputComponent={
          <div className={classNames.linksWrapper}>
            <div className={classNames.inputWrapper}>
              <Input
                placeholder={'Link to the product'}
                inputProps={{maxLength: 1500}}
                value={linkLine}
                className={classNames.input}
                onChange={e => setLinkLine(e.target.value)}
              />
              <Button
                disableElevation
                disabled={!linkLine}
                className={classNames.defaultBtn}
                variant="contained"
                color="primary"
                onClick={onClickLinkBtn}
              >
                {t(TranslationKey.Add)}
              </Button>
            </div>
            <div className={classNames.linksSubWrapper}>
              {formFields.links.length ? (
                formFields.links.map((el, index) => (
                  <div key={index} className={classNames.linkWrapper}>
                    <Link target="_blank" href={el} className={classNames.linkTextWrapper}>
                      <Typography className={classNames.linkText}>{el}</Typography>
                    </Link>

                    <div className={classNames.linksBtnsWrapper}>
                      <img
                        className={classNames.copyImg}
                        src="/assets/icons/copy-img.svg"
                        alt=""
                        onClick={() => copyValue(el)}
                      />

                      <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveLink(index)}>
                        <DeleteIcon className={classNames.deleteBtn} />
                      </IconButton>
                    </div>
                  </div>
                ))
              ) : (
                <Typography>{''}</Typography>
              )}
            </div>
          </div>
        }
      />

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput
          title={t(TranslationKey['Product photo'])}
          images={images}
          setImages={setImages}
          maxNumber={50}
          acceptType={['jpg', 'gif', 'png', 'jpeg']}
        />
      </div>

      <div className={classNames.bottomFieldsWrapper}>
        <div className={classNames.bottomFieldsSubWrapper}>
          <Field
            multiline
            rows={10}
            rowsMax={10}
            inputProps={{maxLength: 50}}
            label={t(TranslationKey['Important criteria'])}
            labelClasses={classNames.label}
            inputClasses={classNames.bigInput}
            containerClasses={classNames.bigInputContainer}
            // value={formFields.asin}
            placeholder={t(TranslationKey['Important criteria and features, material, color, markings'])}
            // onChange={onChangeField('asin')}
          />
        </div>

        <div className={classNames.bottomFieldsSubWrapper}>
          <Field
            inputProps={{maxLength: 50}}
            label={t(TranslationKey.Demensions)}
            labelClasses={classNames.label}
            // value={formFields.asin}
            placeholder={t(TranslationKey['Approximate or exact size'])}
            // onChange={onChangeField('asin')}
          />
          <Field
            inputProps={{maxLength: 50}}
            label={t(TranslationKey.Quantity)}
            labelClasses={classNames.label}
            // value={formFields.asin}
            placeholder={t(TranslationKey['Estimated number of order units'])}
            // onChange={onChangeField('asin')}
          />
          <Field
            inputProps={{maxLength: 50}}
            label={t(TranslationKey['Desired purchase price'])}
            labelClasses={classNames.label}
            // value={formFields.asin}
            placeholder={t(TranslationKey['Price per unit'])}
            // onChange={onChangeField('asin')}
          />
        </div>
      </div>

      <div className={classNames.btnsWrapper}>
        <Button
          success
          disableElevation
          // disabled={disableSubmitBtn}
          variant="contained"
          color="primary"
          className={classNames.successBtn}
          // onClick={() => {
          //   onSubmit(formFields, images, isNoAsin)
          //   setSubmitIsClicked(true)
          // }}
        >
          {t(TranslationKey.Next)}
        </Button>

        <Button variant="text" color="primary" className={classNames.cancelBtn} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}
    </div>
  )
})
