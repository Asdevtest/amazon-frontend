/* eslint-disable no-unused-vars */
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {React, useState} from 'react'

import {Checkbox, Container, Divider, Grid, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'
import {toFixed} from '@utils/text'

import {useClassNames} from './add-or-edit-supplier-modal-content.style'

const textConsts = getLocalizedTexts(texts, 'ru').addOrEditSupplierModalContent

const sizesType = {
  INCHES: 'INCHES',
  CM: 'CM',
}

const inchesCoefficient = 2.54

export const AddOrEditSupplierModalContent = observer(
  ({
    sourceYuanToDollarRate,
    volumeWeightCoefficient,
    title,
    onTriggerShowModal,
    supplier,
    onClickSaveBtn,
    showProgress,
    progressValue,
    requestStatus,
    outsideProduct,
    onClickPrevButton,
  }) => {
    const classNames = useClassNames()

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const [yuanToDollarRate, setYuanToDollarRate] = useState(sourceYuanToDollarRate)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)

      if (newAlignment === sizesType.INCHES) {
        setTmpSupplier({
          ...tmpSupplier,
          boxProperties: {
            ...tmpSupplier.boxProperties,
            boxLengthCm: toFixed(tmpSupplier.boxProperties.boxLengthCm / inchesCoefficient, 2),
            boxWidthCm: toFixed(tmpSupplier.boxProperties.boxWidthCm / inchesCoefficient, 2),
            boxHeightCm: toFixed(tmpSupplier.boxProperties.boxHeightCm / inchesCoefficient, 2),
          },
        })
      } else {
        setTmpSupplier({
          ...tmpSupplier,
          boxProperties: {
            ...tmpSupplier.boxProperties,
            boxLengthCm: toFixed(tmpSupplier.boxProperties.boxLengthCm * inchesCoefficient, 2),
            boxWidthCm: toFixed(tmpSupplier.boxProperties.boxWidthCm * inchesCoefficient, 2),
            boxHeightCm: toFixed(tmpSupplier.boxProperties.boxHeightCm * inchesCoefficient, 2),
          },
        })
      }
    }

    const [tmpSupplier, setTmpSupplier] = useState({
      amount: supplier?.amount || '',
      comment: supplier?.comment || '',
      link: supplier?.link || '',
      lotcost: supplier?.lotcost || '',
      minlot: supplier?.minlot || '',
      name: supplier?.name || '',
      price: supplier?.price || '',
      images: supplier?.images || [],

      priceInYuan: supplier?.priceInYuan || '',
      batchDeliveryCostInDollar: supplier?.batchDeliveryCostInDollar || 0,
      batchDeliveryCostInYuan: supplier?.batchDeliveryCostInYuan || 0,
      batchTotalCostInDollar: supplier?.batchTotalCostInDollar || '',
      batchTotalCostInYuan: supplier?.batchTotalCostInYuan || '',

      // amountInBox: (supplier && supplier.amountInBox) || '',

      // boxLengthCm: (supplier && supplier.boxLengthCm) || '',
      // boxWidthCm: (supplier && supplier.boxWidthCm) || '',
      // boxHeightCm: (supplier && supplier.boxHeightCm) || '',
      // boxWeighGrossKg: (supplier && supplier.boxWeighGrossKg) || '',
      // boxVolumeWeightKg: (supplier && supplier.boxVolumeWeightKg) || '',

      boxProperties: {
        amountInBox: supplier?.boxProperties.amountInBox || '',
        boxLengthCm: supplier?.boxProperties.boxLengthCm || '',
        boxWidthCm: supplier?.boxProperties.boxWidthCm || '',
        boxHeightCm: supplier?.boxProperties.boxHeightCm || '',
        boxWeighGrossKg: supplier?.boxProperties.boxWeighGrossKg || '',
      },
    })

    const calculateFieldsToSubmit = () => {
      const res = {
        ...tmpSupplier,
        batchTotalCostInYuan: toFixed(
          +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,
          2,
        ),
        batchTotalCostInDollar: toFixed(
          +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,
          2,
        ),

        lotcost: toFixed(+tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar, 2),

        boxProperties: {
          ...tmpSupplier.boxProperties,
          boxLengthCm:
            (sizeSetting === sizesType.INCHES
              ? tmpSupplier.boxProperties.boxLengthCm * inchesCoefficient
              : tmpSupplier.boxProperties.boxLengthCm) || 0,
          boxWidthCm:
            (sizeSetting === sizesType.INCHES
              ? tmpSupplier.boxProperties.boxWidthCm * inchesCoefficient
              : tmpSupplier.boxProperties.boxWidthCm) || 0,
          boxHeightCm:
            (sizeSetting === sizesType.INCHES
              ? tmpSupplier.boxProperties.boxHeightCm * inchesCoefficient
              : tmpSupplier.boxProperties.boxHeightCm) || 0,

          amountInBox: tmpSupplier.boxProperties.amountInBox || 0,
          boxWeighGrossKg: tmpSupplier.boxProperties.boxWeighGrossKg || 0,
        },
      }
      return res
    }

    const [makeMainSupplier, setMakeMainSupplier] = useState(false)

    const [photosOfSupplier, setPhotosOfSupplier] = useState([])

    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const renderFooterModalButtons = () => {
      if (outsideProduct) {
        return (
          <div className={classNames.buttonsWrapperClient}>
            <Button disableElevation className={classNames.prevBtnClient} onClick={() => onClickPrevButton()}>
              {textConsts.backBtn}
            </Button>
            <div>
              <SuccessButton
                disableElevation
                disabled={diasabledSubmit}
                className={classNames.saveBtnClient}
                variant="contained"
                onClick={() => {
                  onClickSaveBtn(
                    {...calculateFieldsToSubmit(), _id: supplier && supplier._id},
                    photosOfSupplier,
                    false,
                    makeMainSupplier,
                  )
                }}
              >
                {textConsts.saveAndBindBtn}
              </SuccessButton>
              <SuccessButton
                disableElevation
                disabled={diasabledSubmit}
                className={classNames.saveBtnClient}
                variant="contained"
                onClick={() => {
                  onClickSaveBtn(
                    {...calculateFieldsToSubmit(), _id: supplier && supplier._id},
                    photosOfSupplier,
                    true,
                    makeMainSupplier,
                  )
                  setTmpSupplier({
                    amount: '',
                    comment: '',
                    link: '',
                    lotcost: '',
                    minlot: '',
                    name: '',
                    price: '',
                    images: [],

                    priceInYuan: '',
                    batchDeliveryCostInDollar: 0,
                    batchDeliveryCostInYuan: 0,
                    batchTotalCostInDollar: '',
                    batchTotalCostInYuan: '',

                    boxProperties: {
                      amountInBox: '',
                      boxLengthCm: '',
                      boxWidthCm: '',
                      boxHeightCm: '',
                      boxWeighGrossKg: '',
                    },
                  })

                  setPhotosOfSupplier(() => [])
                  setMakeMainSupplier(false)
                }}
              >
                {textConsts.saveAndAddBtn}
              </SuccessButton>
            </div>
          </div>
        )
      } else {
        return (
          <div className={classNames.buttonsWrapper}>
            <Button
              disableElevation
              disabled={diasabledSubmit}
              className={classNames.saveBtn}
              variant="contained"
              onClick={() => {
                onClickSaveBtn({...calculateFieldsToSubmit(), _id: supplier && supplier._id}, photosOfSupplier)

                setPhotosOfSupplier(() => [])
              }}
            >
              {textConsts.saveBtn}
            </Button>
            <Button
              disableElevation
              className={classNames.cancelBtn}
              variant="contained"
              onClick={() => onTriggerShowModal()}
            >
              {textConsts.cancelBtn}
            </Button>
          </div>
        )
      }
    }

    const onChangeField = fieldName => event => {
      if (
        fieldName !== 'name' &&
        fieldName !== 'comment' &&
        fieldName !== 'link' &&
        !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)
      ) {
        return
      } else if (['minlot', 'amount'].includes(fieldName)) {
        setTmpSupplier({...tmpSupplier, [fieldName]: parseInt(event.target.value) || ''})
      } else if (['amountInBox'].includes(fieldName)) {
        setTmpSupplier({
          ...tmpSupplier,
          boxProperties: {...tmpSupplier.boxProperties, [fieldName]: parseInt(event.target.value) || ''},
        })
      } else if (['boxLengthCm', 'boxWidthCm', 'boxHeightCm', 'boxWeighGrossKg'].includes(fieldName)) {
        setTmpSupplier({
          ...tmpSupplier,
          boxProperties: {...tmpSupplier.boxProperties, [fieldName]: event.target.value || ''},
        })
      } else if (['price'].includes(fieldName)) {
        setTmpSupplier({
          ...tmpSupplier,
          [fieldName]: event.target.value,
          priceInYuan: toFixed(event.target.value * yuanToDollarRate, 2),
        })
      } else if (['priceInYuan'].includes(fieldName)) {
        setTmpSupplier({
          ...tmpSupplier,
          [fieldName]: event.target.value,
          price: toFixed(
            event.target.value / (yuanToDollarRate === '' || parseFloat(yuanToDollarRate) === 0 ? 1 : yuanToDollarRate),
            2,
          ),
        })
      } else if (['batchDeliveryCostInDollar'].includes(fieldName)) {
        setTmpSupplier({
          ...tmpSupplier,
          [fieldName]: event.target.value,
          batchDeliveryCostInYuan: toFixed(
            event.target.value * (yuanToDollarRate === ('' || '0') ? 1 : yuanToDollarRate),
            2,
          ),
        })
      } else if (['batchDeliveryCostInYuan'].includes(fieldName)) {
        setTmpSupplier({
          ...tmpSupplier,
          [fieldName]: event.target.value,
          batchDeliveryCostInDollar: toFixed(
            event.target.value / (yuanToDollarRate === '' || parseFloat(yuanToDollarRate) === 0 ? 1 : yuanToDollarRate),
            2,
          ),
        })
      } else {
        setTmpSupplier({...tmpSupplier, [fieldName]: event.target.value})
      }
    }

    const onChangeYuanToDollarRate = e => {
      if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
        setYuanToDollarRate(e.target.value)

        setTmpSupplier({
          ...tmpSupplier,
          batchDeliveryCostInDollar: toFixed(
            tmpSupplier.batchDeliveryCostInYuan /
              (e.target.value === '' || parseFloat(e.target.value) === 0 ? 1 : e.target.value),
            2,
          ),
          price: toFixed(
            tmpSupplier.priceInYuan / (e.target.value === '' || parseFloat(e.target.value) === 0 ? 1 : e.target.value),
            2,
          ),
        })
      }
    }

    const diasabledSubmit =
      '' === tmpSupplier.price ||
      '' === tmpSupplier.link ||
      '' === tmpSupplier.amount ||
      '' === tmpSupplier.minlot ||
      '' === tmpSupplier.priceInYuan ||
      '' === tmpSupplier.batchDeliveryCostInDollar ||
      '' === tmpSupplier.batchDeliveryCostInYuan ||
      '' === yuanToDollarRate ||
      '0' === yuanToDollarRate ||
      0 === parseFloat(tmpSupplier.price) ||
      0 === parseInt(tmpSupplier.amount) ||
      0 === parseInt(tmpSupplier.minlot) ||
      requestStatus === loadingStatuses.isLoading ||
      ((tmpSupplier.boxProperties.amountInBox ||
        tmpSupplier.boxProperties.boxLengthCm ||
        tmpSupplier.boxProperties.boxWidthCm ||
        tmpSupplier.boxProperties.boxHeightCm ||
        tmpSupplier.boxProperties.boxWeighGrossKg) &&
        !(
          tmpSupplier.boxProperties.amountInBox &&
          tmpSupplier.boxProperties.boxLengthCm &&
          tmpSupplier.boxProperties.boxWidthCm &&
          tmpSupplier.boxProperties.boxHeightCm &&
          tmpSupplier.boxProperties.boxWeighGrossKg
        ))

    return (
      <Container disableGutters className={classNames.modalContainer}>
        <Typography className={classNames.modalTitle}>{title}</Typography>
        <Divider className={classNames.titleDivider} />

        <div>
          <Typography className={classNames.modalTitle}>{'Основная информация'}</Typography>

          <div className={classNames.nameBlock}>
            <Field
              label={textConsts.name}
              inputProps={{maxLength: 1024}}
              containerClasses={classNames.nameContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.name}
              onChange={onChangeField('name')}
            />

            <Field
              label={textConsts.qty}
              inputProps={{maxLength: 10}}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.amount}
              error={parseInt(tmpSupplier.amount) === 0 && textConsts.errorNoZero}
              onChange={onChangeField('amount')}
            />
            <Field
              label={textConsts.minLot}
              inputProps={{maxLength: 10}}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.minlot}
              error={parseInt(tmpSupplier.minlot) === 0 && textConsts.errorNoZero}
              onChange={onChangeField('minlot')}
            />
          </div>

          <Field
            label={textConsts.link}
            inputProps={{maxLength: 2000}}
            labelClasses={classNames.normalLabel}
            value={tmpSupplier.link}
            onChange={onChangeField('link')}
          />
        </div>

        <div>
          <div className={classNames.costBlock}>
            <Typography className={classNames.modalTitle}>{'Стоимость'}</Typography>

            <Field
              oneLine
              label={'Курс Юань к Доллару'}
              inputProps={{maxLength: 10}}
              containerClasses={classNames.rateContainer}
              labelClasses={clsx(classNames.rateLabel, classNames.rightMargin)}
              inputClasses={classNames.middleInput}
              value={yuanToDollarRate}
              onChange={onChangeYuanToDollarRate}
            />
          </div>

          <div className={classNames.calculationMainWrapper}>
            <div className={classNames.calculationWrapper}>
              <Typography className={classNames.modalTitle}>{'¥'}</Typography>

              <Grid
                container
                classes={{root: classNames.calculationSubWrapper}}
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <Grid item>
                  <Field
                    label={'Цена за единицу, ¥*'}
                    inputProps={{maxLength: 10}}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={tmpSupplier.priceInYuan}
                    onChange={onChangeField('priceInYuan')}
                  />
                </Grid>

                <Grid item>
                  <Field
                    disabled
                    label={'Цена партии, ¥*'}
                    inputProps={{maxLength: 10}}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={toFixed(
                      +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,
                      2,
                    )}
                  />
                </Grid>

                <Grid item>
                  <Field
                    label={'Доставка партии, ¥'}
                    inputProps={{maxLength: 10}}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={tmpSupplier.batchDeliveryCostInYuan}
                    onChange={onChangeField('batchDeliveryCostInYuan')}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider flexItem orientation="vertical" className={classNames.divider} />

            <div className={classNames.calculationWrapper}>
              <Typography className={classNames.modalTitle}>{'$'}</Typography>

              <Grid
                container
                classes={{root: classNames.calculationSubWrapper}}
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <Grid item>
                  <Field
                    label={'Цена за единицу, $*'}
                    inputProps={{maxLength: 10}}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={tmpSupplier.price}
                    onChange={onChangeField('price')}
                  />
                </Grid>

                <Grid item>
                  <Field
                    disabled
                    label={'Цена партии, $*'}
                    inputProps={{maxLength: 15}}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={toFixed(
                      +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,
                      2,
                    )}
                  />
                </Grid>

                <Grid item>
                  <Field
                    label={'Доставка партии, $'}
                    inputProps={{maxLength: 15}}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={tmpSupplier.batchDeliveryCostInDollar}
                    onChange={onChangeField('batchDeliveryCostInDollar')}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          <div>
            <Typography className={classNames.modalTitle}>{'Информация о коробке'}</Typography>

            <div className={classNames.boxInfoWrapper}>
              <div className={classNames.sizesWrapper}>
                <div className={classNames.sizesSubWrapper}>
                  <Typography>{'Размеры'}</Typography>

                  <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                    <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                      {'In'}
                    </ToggleButton>
                    <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                      {'Cm'}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <div className={classNames.sizesBottomWrapper}>
                  <Field
                    label={'H'}
                    inputProps={{maxLength: 8}}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={clsx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxHeightCm}
                    onChange={onChangeField('boxHeightCm')}
                  />

                  <Field
                    label={'W'}
                    inputProps={{maxLength: 8}}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={clsx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxWidthCm}
                    onChange={onChangeField('boxWidthCm')}
                  />

                  <Field
                    label={'L'}
                    inputProps={{maxLength: 8}}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={clsx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxLengthCm}
                    onChange={onChangeField('boxLengthCm')}
                  />
                </div>
              </div>

              <Field
                label={'Вес, кг'}
                inputProps={{maxLength: 10}}
                containerClasses={classNames.shortContainer}
                labelClasses={classNames.normalLabel}
                value={tmpSupplier.boxProperties.boxWeighGrossKg}
                onChange={onChangeField('boxWeighGrossKg')}
              />
              <Field
                label={'Количество единиц в коробке'}
                inputProps={{maxLength: 10}}
                containerClasses={classNames.shortContainer}
                labelClasses={classNames.normalLabel}
                value={tmpSupplier.boxProperties.amountInBox}
                onChange={onChangeField('amountInBox')}
              />

              <Field
                disabled
                label={'Объемный вес, кг'}
                inputProps={{maxLength: 15}}
                containerClasses={classNames.shortContainer}
                labelClasses={classNames.normalLabel}
                value={toFixed(
                  (sizeSetting === sizesType.INCHES
                    ? tmpSupplier.boxProperties.boxHeightCm *
                      inchesCoefficient *
                      tmpSupplier.boxProperties.boxWidthCm *
                      inchesCoefficient *
                      tmpSupplier.boxProperties.boxLengthCm *
                      inchesCoefficient
                    : tmpSupplier.boxProperties.boxHeightCm *
                      tmpSupplier.boxProperties.boxWidthCm *
                      tmpSupplier.boxProperties.boxLengthCm) / volumeWeightCoefficient,
                  2,
                )}
              />
            </div>
          </div>
        </div>

        <Field
          multiline
          className={classNames.commentField}
          labelClasses={classNames.normalLabel}
          inputProps={{maxLength: 2000}}
          rows={4}
          rowsMax={6}
          label={textConsts.comment}
          value={tmpSupplier.comment}
          onChange={onChangeField('comment')}
        />

        {outsideProduct && (
          <div className={classNames.checkboxWrapper}>
            <Typography className={classNames.checkboxText}>{textConsts.makeMainSupplier}</Typography>

            <Checkbox
              color="primary"
              checked={makeMainSupplier}
              onChange={() => setMakeMainSupplier(!makeMainSupplier)}
            />
          </div>
        )}

        <div className={classNames.bottomWrapper}>
          <div>
            <div className={classNames.imageFileInputWrapper}>
              <UploadFilesInput
                images={photosOfSupplier}
                setImages={setPhotosOfSupplier}
                maxNumber={50}
                className={classNames.imageFileInput}
              />
            </div>

            <Button
              disableElevation
              disabled={tmpSupplier.images.length < 1}
              color="primary"
              className={classNames.imagesButton}
              variant="contained"
              onClick={() => setShowPhotosModal(!showPhotosModal)}
            >
              {textConsts.availablePhotos}
            </Button>
          </div>
        </div>

        <Divider className={classNames.fieldsDivider} />

        {renderFooterModalButtons()}

        {showProgress && <CircularProgressWithLabel value={progressValue} title={textConsts.circularProgressTitle} />}

        <BigImagesModal
          isAmazone
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={tmpSupplier.images}
        />
      </Container>
    )
  },
)
