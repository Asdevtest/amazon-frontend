/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import React, {useState} from 'react'

import {Divider, Grid, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

import {useClassNames} from './idea-view-and-edit-card.style'

export const IdeaViewAndEditCard = ({edit, idea}) => {
  const classNames = useClassNames()

  const [showFullCard, setShowFullCard] = useState(false)

  const [images, setImages] = useState([])

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  // console.log(item)
  return (
    <Grid item className={classNames.mainWrapper}>
      <Typography variant="h5">{idea.title}</Typography>

      <div className={classNames.cardWrapper}>
        <div className={classNames.cardBlockWrapper}>
          <div className={classNames.leftSubBlockWrapper}>
            <Field
              labelClasses={classNames.spanLabel}
              label={t(TranslationKey.Photos)}
              containerClasses={classNames.carouselContainer}
              inputComponent={
                <Carousel autoPlay timeout={100} animation="fade">
                  {[idea.images].map((el, index) => (
                    <div key={index} className={classNames.imgWrapper}>
                      <img
                        alt=""
                        className={classNames.imgBox}
                        src={el}
                        onClick={() => {
                          setShowPhotosModal(!showPhotosModal)

                          setBigImagesOptions({images: idea.images, imgIndex: index})
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              }
            />

            {edit ? <UploadFilesInput images={images} setImages={setImages} maxNumber={50} /> : null}
          </div>
        </div>

        <Divider className={classNames.divider} orientation="vertical" />

        <div className={classNames.cardBlockWrapper}>
          <Field
            multiline
            disabled
            className={classNames.commentField}
            labelClasses={classNames.spanLabel}
            inputProps={{maxLength: 1000}}
            minRows={6}
            rowsMax={6}
            label={t(TranslationKey.Comments)}
            value={idea.comment}
            // onChange={onChangeField('comment')}
          />
        </div>
      </div>

      <div className={clsx(classNames.middleBlock, {[classNames.fullMiddleBlock]: showFullCard})}>
        <Typography variant="h5">{'Параметры поиска поставщика'}</Typography>

        <div className={classNames.cardWrapper}>
          <div className={classNames.cardBlockWrapper}>
            <div className={classNames.middleSubBlockWrapper}>
              <Field disabled labelClasses={classNames.spanLabel} label={'Наименование товара'} value={idea.name} />

              <Field
                multiline
                disabled
                className={classNames.commentField}
                labelClasses={classNames.spanLabel}
                inputProps={{maxLength: 1000}}
                minRows={6}
                rowsMax={6}
                label={'Важные критерии'}
                value={idea.criterions}
                // onChange={onChangeField('comment')}
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
                  {[idea.links].map((el, index) => (
                    <div key={index} className={classNames.linkWrapper}>
                      <Link target="_blank" href={el} className={classNames.linkTextWrapper}>
                        <Typography className={classNames.linkText}>{el}</Typography>
                      </Link>

                      <img
                        className={classNames.copyImg}
                        src="/assets/icons/copy-img.svg"
                        alt=""
                        onClick={() => copyValue(el)}
                      />
                    </div>
                  ))}
                </div>
              }
            />

            <Grid container className={classNames.shortFieldsWrapper} spacing={2}>
              <Grid item>
                <Field
                  disabled
                  labelClasses={classNames.spanLabel}
                  inputClasses={classNames.shortInput}
                  label={'Количество'}
                  value={idea.count}
                />
              </Grid>
              <Grid item>
                <Field
                  disabled
                  labelClasses={classNames.spanLabel}
                  inputClasses={classNames.shortInput}
                  label={'Желаемая цена закупки'}
                  value={idea.price}
                />
              </Grid>
              <Grid item>
                <Field
                  disabled
                  labelClasses={classNames.spanLabel}
                  inputClasses={classNames.shortInput}
                  label={'Размеры'}
                  value={idea.dimensions}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      <div className={classNames.existedIdeaBtnsWrapper}>
        <div className={classNames.existedIdeaBtnsSubWrapper}>
          <Button
            tooltipContent={'В инвентаре появится новая карточка товара'}
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
              // onClick={() => onClickViewMore(item._id)}
            >
              {t(TranslationKey.Edit)}
            </Button>

            <Button
              variant="contained"
              color="alert"
              className={[classNames.actionButton, classNames.cancelBtn]}
              // onClick={() => onClickViewMore(item._id)}
            >
              {t(TranslationKey.Remove)}
            </Button>
          </div>
        </div>

        <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
          <Typography className={classNames.tablePanelViewText}>{showFullCard ? 'Скрыть' : 'Показать'}</Typography>

          {!showFullCard ? <KeyboardArrowDownIcon color="primary" /> : <KeyboardArrowUpIcon color="primary" />}
        </div>
      </div>

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images || []}
      />
    </Grid>
  )
}
