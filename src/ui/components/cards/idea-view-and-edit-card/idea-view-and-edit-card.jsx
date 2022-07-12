import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import React, {useEffect, useState} from 'react'

import {Divider, Grid, Link, Typography, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {Input} from '@components/input'
// import {TableSupplier} from '@components/product/table-supplier'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './idea-view-and-edit-card.style'

export const IdeaViewAndEditCard = ({
  inEdit,
  inCreate,
  idea,
  curIdea,
  onRemove,
  onClickCancelBtn,
  onClickSaveBtn,
  onSetCurIdea,
  onEditIdea,
}) => {
  const classNames = useClassNames()

  const [linkLine, setLinkLine] = useState('')

  const [showFullCard, setShowFullCard] = useState(idea ? false : true)

  const setShowFullCardByCurIdea = () => {
    if (curIdea?._id === idea?._id) {
      setShowFullCard(!showFullCard)
    } else {
      onSetCurIdea(idea)
      setShowFullCard(true)
    }
  }

  useEffect(() => {
    if (curIdea?._id !== idea?._id && !inEdit) {
      setShowFullCard(idea ? false : true)
    } else if (curIdea?._id === idea?._id && inEdit) {
      setShowFullCard(true)
    } else if (curIdea?._id !== idea?._id && inEdit) {
      setShowFullCard(false)
    }
  }, [curIdea, inEdit])

  const [images, setImages] = useState([])

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  const sourceFormFields = {
    media: idea?.media || [],
    comments: idea?.comments || '',
    productName: idea?.productName || '',
    productLinks: idea?.productLinks || [],
    criteria: idea?.criteria || '',
    quantity: idea?.quantity || '',
    price: idea?.price || '',

    width: idea?.width || '',
    height: idea?.height || '',
    length: idea?.length || '',

    // suppliers: idea?.suppliers || [],
    _id: idea?._id || null,
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
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
    onChangeField('productLinks')({target: {value: [...formFields.productLinks, linkLine]}})

    setLinkLine('')
  }

  const onRemoveLink = index => {
    const newArr = formFields.productLinks.filter((el, i) => i !== index)

    onChangeField('productLinks')({target: {value: [...newArr]}})
  }

  const disableFields = idea && !(curIdea?._id === idea?._id && inEdit)

  console.log('formFields', formFields)

  return (
    <Grid item className={classNames.mainWrapper}>
      {/* <Typography variant="h5" className={classNames.ideaTitle}>
        {formFields.title}
      </Typography> */}

      <div className={classNames.cardWrapper}>
        <div className={classNames.cardBlockWrapper}>
          <div className={!disableFields ? classNames.leftSubBlockWrapper : classNames.leftDisSubBlockWrapper}>
            <div className={!disableFields ? classNames.photoWrapper : classNames.bigPhotoWrapper}>
              <PhotoCarousel files={formFields.media} />
            </div>

            {!disableFields ? <UploadFilesInput images={images} setImages={setImages} maxNumber={50} /> : null}
          </div>
        </div>

        <Divider className={classNames.divider} orientation="vertical" />

        <div className={classNames.cardBlockWrapper}>
          <Field
            multiline
            tooltipAttentionContent={'В инвентаре появится новая карточка товара'}
            tooltipInfoContent={'В инвентаре появится новая карточка товара'}
            disabled={disableFields}
            className={classNames.commentField}
            labelClasses={classNames.spanLabel}
            inputProps={{maxLength: 1000}}
            minRows={6}
            rowsMax={6}
            label={t(TranslationKey.Comments)}
            value={formFields.comments}
            onChange={onChangeField('comments')}
          />
        </div>
      </div>

      <div className={clsx(classNames.middleBlock, {[classNames.fullMiddleBlock]: showFullCard})}>
        <Typography className={classNames.searchTitle}>{'Параметры поиска поставщика'}</Typography>

        <div className={classNames.cardWrapper}>
          <div className={classNames.cardBlockWrapper}>
            <div className={classNames.middleSubBlockWrapper}>
              <Field
                disabled={disableFields}
                labelClasses={classNames.spanLabel}
                label={'Наименование товара'}
                value={formFields.productName}
                onChange={onChangeField('productName')}
              />

              <Field
                multiline
                disabled={disableFields}
                className={classNames.criterionsField}
                inputProps={{maxLength: 1000}}
                minRows={9}
                rowsMax={9}
                label={'Важные критерии'}
                value={formFields.criteria}
                onChange={onChangeField('criteria')}
              />
            </div>
          </div>

          <Divider className={classNames.divider} orientation="vertical" />

          <div className={classNames.cardBlockWrapper}>
            <Field
              labelClasses={classNames.spanLabel}
              label={t(TranslationKey.Links)}
              containerClasses={classNames.linksContainer}
              inputComponent={
                <div className={classNames.linksWrapper}>
                  {inEdit || inCreate ? (
                    <div className={classNames.inputWrapper}>
                      <Input
                        disabled={disableFields}
                        placeholder={'Link to the product'}
                        inputProps={{maxLength: 1500}}
                        value={linkLine}
                        className={classNames.input}
                        onChange={e => setLinkLine(e.target.value)}
                      />
                      <Button
                        disableElevation
                        disabled={!linkLine || disableFields}
                        className={classNames.defaultBtn}
                        variant="contained"
                        color="primary"
                        onClick={onClickLinkBtn}
                      >
                        {t(TranslationKey.Add)}
                      </Button>
                    </div>
                  ) : null}
                  <div className={classNames.linksSubWrapper}>
                    {formFields.productLinks.length ? (
                      formFields.productLinks.map((el, index) => (
                        <div key={index} className={classNames.linkWrapper}>
                          <Link target="_blank" href={el} className={classNames.linkTextWrapper}>
                            <Typography className={classNames.linkText}>{`${index + 1}. ${el}`}</Typography>
                          </Link>

                          <div className={classNames.linksBtnsWrapper}>
                            <img
                              className={classNames.copyImg}
                              src="/assets/icons/copy-img.svg"
                              alt=""
                              onClick={() => copyValue(el)}
                            />

                            {!disableFields && (
                              <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveLink(index)}>
                                <DeleteIcon className={classNames.deleteBtn} />
                              </IconButton>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <Typography>{t(TranslationKey['No data'])}</Typography>
                    )}
                  </div>
                </div>
              }
            />

            <Grid container className={classNames.shortFieldsWrapper} spacing={2}>
              <Grid item>
                <Field
                  disabled={disableFields}
                  labelClasses={classNames.spanLabel}
                  inputClasses={classNames.shortInput}
                  label={'Количество'}
                  value={formFields.quantity}
                  onChange={onChangeField('quantity')}
                />
              </Grid>
              <Grid item>
                <Field
                  disabled={disableFields}
                  labelClasses={classNames.spanLabel}
                  inputClasses={classNames.shortInput}
                  label={'Желаемая цена закупки'}
                  value={formFields.price}
                  onChange={onChangeField('price')}
                />
              </Grid>
              <Grid item>
                <div className={classNames.sizesWrapper}>
                  <Field
                    disabled={disableFields}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.sizesInput}
                    containerClasses={classNames.sizesContainer}
                    label={'width'}
                    value={formFields.width}
                    onChange={onChangeField('width')}
                  />
                  <Field
                    disabled={disableFields}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.sizesInput}
                    containerClasses={classNames.sizesContainer}
                    label={'height'}
                    value={formFields.height}
                    onChange={onChangeField('height')}
                  />
                  <Field
                    disabled={disableFields}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.sizesInput}
                    containerClasses={classNames.sizesContainer}
                    label={'length'}
                    value={formFields.length}
                    onChange={onChangeField('length')}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        {/* <Field
          labelClasses={classNames.spanLabel}
          label={t(TranslationKey.Suppliers)}
          containerClasses={classNames.linksContainer}
          inputComponent={
            <TableSupplier product={formFields} selectedSupplier={selectedSupplier} onClickSupplier={onClickSupplier} />
          }
        /> */}
      </div>

      {inCreate || !disableFields ? (
        <div className={classNames.addOrEditBtnsWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={[classNames.actionButton, classNames.successBtn]}
            onClick={() => onClickSaveBtn(formFields)}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            variant="text"
            color="alert"
            className={[classNames.actionButton, classNames.btnLeftMargin]}
            onClick={() => onClickCancelBtn()}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      ) : null}

      {idea && disableFields ? (
        <div className={classNames.existedIdeaBtnsWrapper}>
          <div className={classNames.existedIdeaBtnsSubWrapper}>
            <Button
              disabled
              tooltipAttentionContent={'В инвентаре появится новая карточка товара'}
              tooltipInfoContent={'В инвентаре появится новая карточка товара'}
              variant="contained"
              color="primary"
              className={[classNames.actionButton, classNames.successBtn]}
              // onClick={() => onClickViewMore(item._id)}
            >
              {t(TranslationKey['Create a product card'])}
            </Button>

            <div>
              <Button
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                onClick={() => onEditIdea(idea)}
              >
                {t(TranslationKey.Edit)}
              </Button>

              <Button
                variant="contained"
                color="alert"
                className={[classNames.actionButton, classNames.cancelBtn, classNames.btnLeftMargin]}
                onClick={() => onRemove(idea._id)}
              >
                {t(TranslationKey.Remove)}
              </Button>
            </div>
          </div>

          <div className={classNames.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
            <Typography className={classNames.tablePanelViewText}>
              {showFullCard ? 'Скрыть' : t(TranslationKey.Details)}
            </Typography>

            {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
          </div>
        </div>
      ) : null}
    </Grid>
  )
}
