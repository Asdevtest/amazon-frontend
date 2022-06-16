/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import React, {useEffect, useState} from 'react'

import {Divider, Grid, Link, Typography, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {TableSupplier} from '@components/product/table-supplier'
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

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  const sourceFormFields = {
    images: idea?.images || [],
    title: idea?.title || '',
    links: idea?.links || [],
    comment: idea?.comment || '',
    name: idea?.name || '',
    criterions: idea?.criterions || '',
    count: idea?.count || '',
    price: idea?.price || '',
    dimensions: idea?.dimensions || '',
    suppliers: idea?.suppliers || [],
    _id: idea?._id || null,
  }

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

  const disableFields = idea && !(curIdea?._id === idea?._id && inEdit)

  console.log('formFields', formFields)

  return (
    <Grid item className={classNames.mainWrapper}>
      <Typography variant="h5">{formFields.title}</Typography>

      <div className={classNames.cardWrapper}>
        <div className={classNames.cardBlockWrapper}>
          <div className={classNames.leftSubBlockWrapper}>
            <Field
              labelClasses={classNames.spanLabel}
              label={t(TranslationKey.Photos)}
              containerClasses={classNames.carouselContainer}
              inputComponent={
                <>
                  {formFields.images.length ? (
                    <Carousel autoPlay timeout={100} animation="fade">
                      {[formFields.images].map((el, index) => (
                        <div key={index} className={classNames.imgWrapper}>
                          <img
                            alt=""
                            className={classNames.imgBox}
                            src={el}
                            onClick={() => {
                              setShowPhotosModal(!showPhotosModal)

                              setBigImagesOptions({images: formFields.images, imgIndex: index})
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <div className={classNames.imgWrapper}>
                      <img alt="" className={classNames.imgBox} src={'/assets/img/no-photo.jpg'} />
                    </div>
                  )}
                </>
              }
            />

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
            value={formFields.comment}
            onChange={onChangeField('comment')}
          />
        </div>
      </div>

      <div className={clsx(classNames.middleBlock, {[classNames.fullMiddleBlock]: showFullCard})}>
        <Typography variant="h5">{'Параметры поиска поставщика'}</Typography>

        <div className={classNames.cardWrapper}>
          <div className={classNames.cardBlockWrapper}>
            <div className={classNames.middleSubBlockWrapper}>
              <Field
                disabled={disableFields}
                labelClasses={classNames.spanLabel}
                label={'Наименование товара'}
                value={formFields.name}
                onChange={onChangeField('name')}
              />

              <Field
                multiline
                disabled={disableFields}
                className={classNames.commentField}
                labelClasses={classNames.spanLabel}
                inputProps={{maxLength: 1000}}
                minRows={6}
                rowsMax={6}
                label={'Важные критерии'}
                value={formFields.criterions}
                onChange={onChangeField('criterions')}
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
                  value={formFields.count}
                  onChange={onChangeField('count')}
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
                <Field
                  disabled={disableFields}
                  labelClasses={classNames.spanLabel}
                  inputClasses={classNames.shortInput}
                  label={'Размеры'}
                  value={formFields.dimensions}
                  onChange={onChangeField('dimensions')}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <Field
          labelClasses={classNames.spanLabel}
          label={t(TranslationKey.Suppliers)}
          containerClasses={classNames.linksContainer}
          inputComponent={
            <TableSupplier
              product={formFields} /* selectedSupplier={selectedSupplier} onClickSupplier={onClickSupplier} */
            />
          }
        />
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
              {t(TranslationKey['Create a product'])}
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
            <Typography className={classNames.tablePanelViewText}>{showFullCard ? 'Скрыть' : 'Показать'}</Typography>

            {!showFullCard ? <KeyboardArrowDownIcon color="primary" /> : <KeyboardArrowUpIcon color="primary" />}
          </div>
        </div>
      ) : null}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images || []}
      />
    </Grid>
  )
}
