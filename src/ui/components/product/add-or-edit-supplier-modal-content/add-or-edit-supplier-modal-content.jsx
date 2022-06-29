import {React, useState} from 'react'

import {Checkbox, Container, Divider, Grid, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {inchesCoefficient, sizesType, poundsCoefficient} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './add-or-edit-supplier-modal-content.style'

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

      boxProperties: {
        amountInBox: supplier?.boxProperties?.amountInBox || '',
        boxLengthCm: supplier?.boxProperties?.boxLengthCm || '',
        boxWidthCm: supplier?.boxProperties?.boxWidthCm || '',
        boxHeightCm: supplier?.boxProperties?.boxHeightCm || '',
        boxWeighGrossKg: supplier?.boxProperties?.boxWeighGrossKg || '',
      },
    })

    const calculateFieldsToSubmit = () => {
      let res = {
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

      if (
        !tmpSupplier.boxProperties.amountInBox ||
        !tmpSupplier.boxProperties.boxLengthCm ||
        !tmpSupplier.boxProperties.boxWidthCm ||
        !tmpSupplier.boxProperties.boxHeightCm ||
        !tmpSupplier.boxProperties.boxWeighGrossKg
      ) {
        res = {...res, boxProperties: null}
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
              {t(TranslationKey.Back)}
            </Button>
            <div>
              <Button
                success
                disableElevation
                tooltipInfoContent={t(TranslationKey['Saves the current supplier to the selected product'])}
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
                {t(TranslationKey['Save and bind'])}
              </Button>
              <Button
                success
                disableElevation
                tooltipInfoContent={t(TranslationKey['Saves the supplier and opens the form for adding a new one'])}
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
                {t(TranslationKey['Save and add more'])}
              </Button>
            </div>
          </div>
        )
      } else {
        return (
          <div className={classNames.buttonsWrapper}>
            <Button
              disableElevation
              tooltipInfoContent={t(TranslationKey['Saves data about the supplier'])}
              disabled={diasabledSubmit}
              className={classNames.saveBtn}
              variant="contained"
              onClick={() => {
                onClickSaveBtn({...calculateFieldsToSubmit(), _id: supplier && supplier._id}, photosOfSupplier)

                setPhotosOfSupplier(() => [])
              }}
            >
              {t(TranslationKey.Save)}
            </Button>
            <Button
              disableElevation
              tooltipInfoContent={t(TranslationKey['Cancel supplier creation/change'])}
              className={classNames.cancelBtn}
              variant="contained"
              onClick={() => onTriggerShowModal()}
            >
              {t(TranslationKey.Cancel)}
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
      '' === tmpSupplier.name ||
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
          <Typography className={classNames.modalTitle}>{t(TranslationKey['Basic information'])}</Typography>

          <div className={classNames.nameBlock}>
            <Field
              tooltipInfoContent={t(TranslationKey['Enter the name of the supplier'])}
              inputProps={{maxLength: 100}}
              label={t(TranslationKey.Title) + '*'}
              containerClasses={classNames.nameContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.name}
              onChange={onChangeField('name')}
            />

            <Field
              tooltipInfoContent={t(TranslationKey['Enter the amount of goods to be purchased'])}
              label={t(TranslationKey['Purchase quantity']) + '*'}
              inputProps={{maxLength: 10}}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.amount}
              error={parseInt(tmpSupplier.amount) === 0 && t(TranslationKey["can't be zero"])}
              onChange={onChangeField('amount')}
            />
            <Field
              tooltipInfoContent={t(TranslationKey['Minimum quantity of goods needed to order'])}
              label={t(TranslationKey['Minimum batch']) + '*'}
              inputProps={{maxLength: 10}}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.minlot}
              error={parseInt(tmpSupplier.minlot) === 0 && t(TranslationKey["can't be zero"])}
              onChange={onChangeField('minlot')}
            />
          </div>

          <Field
            tooltipInfoContent={t(TranslationKey['Link to supplier site'])}
            label={t(TranslationKey.Link) + '*'}
            inputProps={{maxLength: 2000}}
            labelClasses={classNames.normalLabel}
            value={tmpSupplier.link}
            onChange={onChangeField('link')}
          />
        </div>

        <div>
          <div className={classNames.costBlock}>
            <Typography className={classNames.modalTitle}>{t(TranslationKey['Total price'])}</Typography>

            <Field
              oneLine
              tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
              label={t(TranslationKey['Yuan to USD exchange rate'])}
              inputProps={{maxLength: 8}}
              containerClasses={classNames.rateContainer}
              labelClasses={clsx(classNames.rateLabel)}
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
                    tooltipInfoContent={t(TranslationKey['Price per unit'])}
                    label={t(TranslationKey['price per unit']) + ', ¥*'}
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
                    tooltipInfoContent={t(
                      TranslationKey['Calculated from the price per unit multiplied by the number of purchases'],
                    )}
                    label={t(TranslationKey['Batch price']) + ', ¥*'}
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
                    tooltipInfoContent={t(
                      TranslationKey['Shipping price for a batch in China for a specified number of purchases'],
                    )}
                    label={t(TranslationKey['Batch delivery']) + ', ¥'}
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
                    tooltipInfoContent={t(TranslationKey['Price per unit'])}
                    label={t(TranslationKey['price per unit']) + ', $*'}
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
                    tooltipInfoContent={t(
                      TranslationKey['Calculated from the price per unit multiplied by the number of purchases'],
                    )}
                    label={t(TranslationKey['Batch price']) + ', $*'}
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
                    tooltipInfoContent={t(
                      TranslationKey['Shipping price for a batch in China for a specified number of purchases'],
                    )}
                    label={t(TranslationKey['Batch delivery']) + ', $'}
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
            <Typography className={classNames.modalTitle}>{t(TranslationKey['Box info'])}</Typography>

            <div className={classNames.boxInfoWrapper}>
              <div className={classNames.sizesWrapper}>
                <div className={classNames.sizesSubWrapper}>
                  <Typography>{t(TranslationKey.Demensions)}</Typography>

                  <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                    <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                      {'In'}
                    </ToggleBtn>
                    <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                      {'Cm'}
                    </ToggleBtn>
                  </ToggleBtnGroup>
                </div>

                <div className={classNames.sizesBottomWrapper}>
                  <Field
                    label={t(TranslationKey.H)}
                    inputProps={{maxLength: 6}}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={clsx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxHeightCm}
                    onChange={onChangeField('boxHeightCm')}
                  />

                  <Field
                    label={t(TranslationKey.W)}
                    inputProps={{maxLength: 6}}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={clsx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxWidthCm}
                    onChange={onChangeField('boxWidthCm')}
                  />

                  <Field
                    label={t(TranslationKey.L)}
                    inputProps={{maxLength: 6}}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={clsx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxLengthCm}
                    onChange={onChangeField('boxLengthCm')}
                  />
                </div>
              </div>

              <div className={classNames.boxInfoSubWrapper}>
                <div>
                  <Field
                    disabled
                    label={t(TranslationKey['Weight, Lbs'])}
                    inputProps={{maxLength: 10}}
                    containerClasses={classNames.shortContainer}
                    labelClasses={classNames.normalLabel}
                    value={toFixed(tmpSupplier.boxProperties.boxWeighGrossKg * poundsCoefficient, 2) || ''}
                  />

                  <Field
                    label={t(TranslationKey['Weight, kg'])}
                    inputProps={{maxLength: 10}}
                    containerClasses={classNames.shortContainer}
                    labelClasses={classNames.normalLabel}
                    value={tmpSupplier.boxProperties.boxWeighGrossKg}
                    onChange={onChangeField('boxWeighGrossKg')}
                  />
                </div>

                <Field
                  label={t(TranslationKey['Number of units in box'])}
                  inputProps={{maxLength: 10}}
                  containerClasses={classNames.shortContainer}
                  labelClasses={classNames.normalLabel}
                  value={tmpSupplier.boxProperties.amountInBox}
                  onChange={onChangeField('amountInBox')}
                />

                <Field
                  disabled
                  tooltipInfoContent={t(TranslationKey['Calculated from the dimensions of the box'])}
                  label={t(TranslationKey['Volume weight, kg'])}
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
        </div>

        <Field
          multiline
          tooltipInfoContent={t(TranslationKey['The comment indicated for this supplier'])}
          className={classNames.commentField}
          labelClasses={classNames.normalLabel}
          inputProps={{maxLength: 2000}}
          rows={4}
          rowsMax={6}
          label={t(TranslationKey.Comment)}
          value={tmpSupplier.comment}
          onChange={onChangeField('comment')}
        />

        {outsideProduct && (
          <Field
            oneLine
            tooltipInfoContent={t(TranslationKey['Make the current supplier on which the order will be made'])}
            label={t(TranslationKey['Make the main supplier'])}
            containerClasses={classNames.checkboxWrapper}
            inputComponent={
              <Checkbox
                color="primary"
                checked={makeMainSupplier}
                onChange={() => setMakeMainSupplier(!makeMainSupplier)}
              />
            }
          />
          // <div className={classNames.checkboxWrapper}>
          //   <Typography className={classNames.checkboxText}>{t(TranslationKey['Make the main supplier'])}</Typography>

          //   <Checkbox
          //     color="primary"
          //     checked={makeMainSupplier}
          //     onChange={() => setMakeMainSupplier(!makeMainSupplier)}
          //   />
          // </div>
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

            <PhotoAndFilesCarousel files={tmpSupplier.images} width="300px" />
          </div>
        </div>

        <Divider className={classNames.fieldsDivider} />

        {renderFooterModalButtons()}

        {showProgress && (
          <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
        )}

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
