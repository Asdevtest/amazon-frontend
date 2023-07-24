/* eslint-disable no-unused-vars */
import DeleteIcon from '@material-ui/icons/Delete'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Checkbox, Grid, IconButton, Link, NativeSelect, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { getAmazonCodeFromLink } from '@utils/get-amazon-code-from-link'
import { t } from '@utils/translations'

import { useClassNames } from './add-supplier-to-idea-from-inventory-form.style'

export const AddSupplierToIdeaFromInventoryForm = observer(
  ({ onSubmit, showProgress, progressValue, onClose, ideas, product }) => {
    const { classes: classNames } = useClassNames()

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const [images, setImages] = useState([])

    const sourceFormFields = {
      links: [],
      criteria: '',
      quantity: '',
      price: '',
      title: '',

      width: '',
      height: '',
      length: '',

      asin: '',
      skusByClient: [],
      amazonTitle: '',
      images: [],
      lamazon: '',
      fba: true,
    }

    const [linkLine, setLinkLine] = useState('')

    const [curIdeaId, setCurIdeaId] = useState(null)

    const [formFields, setFormFields] = useState(sourceFormFields)

    useEffect(() => {
      if (curIdeaId) {
        const curIdea = ideas.find(el => el._id === curIdeaId)

        setFormFields({
          ...formFields,
          links: curIdea.productLinks,
          images: curIdea.media,
          criteria: curIdea.criteria,
          quantity: curIdea.quantity,
          price: curIdea.price,
          title: curIdea.productName,

          width: curIdea.width,
          height: curIdea.height,
          length: curIdea.length,
        })
      }
    }, [curIdeaId])

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }
      // if (['execution_time'].includes(fieldName)) {
      //   newFormFields[fieldName] = parseInt(event.target.value) || ''
      // } else
      if (
        ['price', 'quantity', 'width', 'height', 'length'].includes(fieldName) &&
        !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
      ) {
        return
      } else {
        newFormFields[fieldName] = event.target.value
      }

      setFormFields(newFormFields)
    }

    const onClickLinkBtn = () => {
      onChangeField('links')({ target: { value: [...formFields.links, linkLine] } })

      setLinkLine('')
    }

    const onRemoveLink = index => {
      const newArr = formFields.links.filter((el, i) => i !== index)

      onChangeField('links')({ target: { value: [...newArr] } })
    }

    const onCreateSearchSupplierRequest = () => {
      const forCreateIdea = {
        media: formFields.images,
        comments: '',
        productName: formFields.title,
        productLinks: formFields.links,
        criteria: formFields.criteria,
        quantity: formFields.quantity,
        price: formFields.price,
        width: formFields.width,
        height: formFields.height,
        length: formFields.length,
        productId: product._id,
      }
      const forCreateRequest = {
        productName: formFields.title,
        productLinks: formFields.links,
        linksToMediaFiles: formFields.images,
        criteria: formFields.criteria,
        dimensions: `${formFields.width}, ${formFields.height}, ${formFields.length}`,
        quantity: formFields.quantity,
        price: formFields.price,
        productId: product._id,
      }
      onSubmit(curIdeaId, forCreateIdea, forCreateRequest)
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
            <WithSearchSelect
              width={400}
              selectedItemName={ideas.find(el => el._id === curIdeaId)?.productName || t(TranslationKey['Not chosen'])}
              data={ideas}
              searchFields={['productName']}
              onClickSelect={idea => setCurIdeaId(idea._id)}
            />
          }
        />

        <Field
          inputProps={{ maxLength: 50 }}
          label={t(TranslationKey['Product name'])}
          labelClasses={classNames.label}
          value={formFields.title}
          placeholder={t(TranslationKey['Product name'])}
          onChange={onChangeField('title')}
        />

        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Product Link'])}
          containerClasses={classNames.linksContainer}
          inputComponent={
            <div className={classNames.linksWrapper}>
              <div className={classNames.inputWrapper}>
                <Input
                  placeholder={t(TranslationKey['Product Link'])}
                  inputProps={{ maxLength: 1500 }}
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
                        <CopyValue text={el} />

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

        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Product photo'])}
          inputComponent={
            <div className={classNames.imageFileInputWrapper}>
              <PhotoAndFilesCarousel small files={formFields.images} />

              <UploadFilesInput
                images={images}
                setImages={setImages}
                maxNumber={50}
                acceptType={['jpg', 'gif', 'png', 'jpeg']}
              />
            </div>
          }
        />

        <div className={classNames.bottomFieldsWrapper}>
          <div className={classNames.bottomFieldsSubWrapper}>
            <Field
              multiline
              minRows={9}
              maxRows={9}
              inputProps={{ maxLength: 200 }}
              label={t(TranslationKey['Important criteria'])}
              labelClasses={classNames.label}
              inputClasses={classNames.bigInput}
              containerClasses={classNames.bigInputContainer}
              value={formFields.criteria}
              placeholder={t(TranslationKey['Important criteria and features, material, color, markings'])}
              onChange={onChangeField('criteria')}
            />
          </div>

          <div className={classNames.bottomFieldsSubWrapper}>
            <div className={classNames.sizesBottomWrapper}>
              <Field
                inputProps={{ maxLength: 9 }}
                labelClasses={classNames.label}
                inputClasses={classNames.sizesInput}
                containerClasses={classNames.sizesContainer}
                label={t(TranslationKey.Width)}
                value={formFields.width}
                onChange={onChangeField('width')}
              />
              <Field
                inputProps={{ maxLength: 9 }}
                labelClasses={classNames.label}
                inputClasses={classNames.sizesInput}
                containerClasses={classNames.sizesContainer}
                label={t(TranslationKey.Height)}
                value={formFields.height}
                onChange={onChangeField('height')}
              />
              <Field
                inputProps={{ maxLength: 9 }}
                labelClasses={classNames.label}
                inputClasses={classNames.sizesInput}
                containerClasses={classNames.sizesContainer}
                label={t(TranslationKey.Length)}
                value={formFields.length}
                onChange={onChangeField('length')}
              />
            </div>

            <Field
              inputProps={{ maxLength: 9 }}
              label={t(TranslationKey.Quantity)}
              labelClasses={classNames.label}
              value={formFields.quantity}
              placeholder={t(TranslationKey['Estimated number of order units'])}
              onChange={onChangeField('quantity')}
            />
            <Field
              inputProps={{ maxLength: 9 }}
              label={t(TranslationKey['Desired purchase price']) + ', $'}
              labelClasses={classNames.label}
              value={formFields.price}
              placeholder={t(TranslationKey['Price per unit'])}
              onChange={onChangeField('price')}
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
            onClick={() => {
              onCreateSearchSupplierRequest()
            }}
          >
            {t(TranslationKey['Create a request'])}
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
  },
)
