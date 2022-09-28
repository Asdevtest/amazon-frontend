import {React, useState} from 'react'

import {Checkbox, Divider, Grid, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

// import Carousel from 'react-material-ui-carousel'
import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {CustomCarousel} from '@components/custom-carousel'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {UserLink} from '@components/user-link'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {checkAndMakeAbsoluteUrl, getFullTariffTextForBoxOrOrder, shortAsin, toFixed, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-view-form.style'

export const BoxViewForm = observer(
  ({box, setOpenModal, volumeWeightCoefficient, batchHumanFriendlyId, storekeeper}) => {
    const classNames = useClassNames()

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)
    }

    // const dimensionsConfig = {
    //   PRIMARY: 'PRIMARY',
    //   SHIPPING: 'SHIPPING',
    // }

    // const [toggleDimensionsValue, setToggleDimensionsValue] = useState(
    //   (box.deliveryHeight || box.deliveryLength || box.deliveryMass || box.deliveryWidth) && !box.fitsInitialDimensions
    //     ? dimensionsConfig.SHIPPING
    //     : dimensionsConfig.PRIMARY,
    // )

    return (
      <div className={classNames.formContainer}>
        <div className={classNames.titleWrapper}>
          <Typography variant="h6" className={classNames.title}>{`${t(TranslationKey.Box)} № ${
            box.humanFriendlyId
          }`}</Typography>

          <div className={classNames.titleSubWrapper}>
            <Field
              oneLine
              label={'Storekeeper: '}
              containerClasses={classNames.storekeeperField}
              inputComponent={
                <div className={classNames.userLinkWrapper}>
                  <UserLink
                    blackText
                    name={storekeeper ? storekeeper?.name : box.storekeeper?.name}
                    userId={storekeeper ? storekeeper?._id : box.storekeeper?._id}
                  />
                </div>
              }
            />

            <Typography>{`${t(TranslationKey.Batch)} № ${
              (batchHumanFriendlyId ? batchHumanFriendlyId : box.batch?.humanFriendlyId) ||
              t(TranslationKey['Not available'])
            }`}</Typography>
          </div>
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.blocksWrapper}>
          <div className={classNames.blockWrapper}>
            <Grid container className={classNames.deliveryInfoWrapper}>
              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  labelClasses={classNames.label}
                  label={t(TranslationKey.Destination)}
                  value={box.destination?.name || t(TranslationKey['Not available'])}
                  placeholder={t(TranslationKey['Not available'])}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  labelClasses={classNames.label}
                  label={t(TranslationKey.Tariff)}
                  value={getFullTariffTextForBoxOrOrder(box) || ''}
                  placeholder={'N/A'}
                />
              </Grid>
            </Grid>

            <div className={classNames.productsWrapper}>
              <CustomCarousel alignButtons="end">
                {box.items.map((item, index) => (
                  <div key={index} className={classNames.productWrapper}>
                    <div className={classNames.leftColumn}>
                      <div className={classNames.photoWrapper}>
                        <PhotoCarousel isAmazonPhoto files={item.product.images} />
                      </div>

                      <Typography className={classNames.amazonTitle}>{item.product.amazonTitle}</Typography>
                      <div className={classNames.copyAsin}>
                        <div className={classNames.asinWrapper}>
                          <Typography>{t(TranslationKey.ASIN)}</Typography>
                          {item.product.asin ? (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`https://www.amazon.com/dp/${item.product.asin}`}
                              className={classNames.normalizeLink}
                            >
                              <span className={classNames.linkSpan}>{shortAsin(item.product.asin)}</span>
                            </a>
                          ) : (
                            <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
                          )}
                        </div>
                        {item.product.asin ? <CopyValue text={item.product.asin} /> : null}
                      </div>
                    </div>

                    <div className={classNames.rightColumn}>
                      <Field
                        disabled
                        inputClasses={classNames.countField}
                        labelClasses={classNames.label}
                        label={t(TranslationKey['HS code'])}
                        value={item.product.hsCode || t(TranslationKey['Not available'])}
                        placeholder={'N/A'}
                      />
                      <Field
                        label={t(TranslationKey.BarCode)}
                        labelClasses={classNames.label}
                        inputComponent={
                          item.barCode ? (
                            <div className={classNames.barCode}>
                              <Typography className={classNames.linkWrapper}>
                                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                                  {t(TranslationKey.View)}
                                </Link>
                              </Typography>

                              <CopyValue text={item.barCode} />
                            </div>
                          ) : (
                            <Typography className={classNames.linkField}>
                              {t(TranslationKey['Not available'])}
                            </Typography>
                          )
                        }
                      />

                      {item.isBarCodeAlreadyAttachedByTheSupplier ? (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          labelClasses={classNames.label}
                          label={t(TranslationKey['BarCode is glued by supplier'])}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />}
                        />
                      ) : (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          labelClasses={classNames.label}
                          label={t(TranslationKey['BarCode is glued by storekeeper'])}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />}
                        />
                      )}
                      <Field
                        disabled
                        inputClasses={classNames.countField}
                        containerClasses={classNames.countContainer}
                        labelClasses={classNames.label}
                        label={t(TranslationKey.Quantity)}
                        value={(box.amount > 1 ? `${item.amount} * ${box.amount}` : item.amount) || 0}
                        placeholder={'N/A'}
                      />
                    </div>
                  </div>
                ))}
              </CustomCarousel>
            </div>
          </div>

          <div className={classNames.blockWrapper}>
            <div className={classNames.imgSizesWrapper}>
              <div className={classNames.imgWrapper}>
                <Typography className={classNames.label}>{t(TranslationKey['Box photos:'])}</Typography>
                <div className={classNames.imgBoxWrapper}>
                  <PhotoCarousel small files={box.images} />
                </div>
              </div>

              <div className={classNames.sizesWrapper}>
                <div className={classNames.demensionsWrapper}>
                  <div className={classNames.sizesSubWrapper}>
                    <Typography className={classNames.label}>{t(TranslationKey.Demensions) + ':'}</Typography>

                    <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                      <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                        {'In'}
                      </ToggleBtn>
                      <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                        {'Cm'}
                      </ToggleBtn>
                    </ToggleBtnGroup>
                  </div>
                  <Typography>
                    {t(TranslationKey.Length) + ': '}
                    {toFixed(box.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography>
                    {t(TranslationKey.Width) + ': '}
                    {toFixed(box.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography>
                    {t(TranslationKey.Height) + ': '}
                    {toFixed(box.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>

                  <Typography>
                    {t(TranslationKey.Weight) + ': '}
                    {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
                  </Typography>
                  <Typography>
                    {t(TranslationKey['Volume weight']) + ': '}
                    {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
                  </Typography>
                  <Typography
                    className={clsx({
                      [classNames.alertText]: calcFinalWeightForBox(box, volumeWeightCoefficient) < 12,
                    })}
                  >
                    {t(TranslationKey['Final weight']) + ': '}
                    {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
                  </Typography>

                  {calcFinalWeightForBox(box, volumeWeightCoefficient) < 12 ? (
                    // eslint-disable-next-line react/jsx-indent
                    <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
                  ) : null}
                </div>
              </div>

              {/* <div className={classNames.sizesWrapper}>
                <div className={classNames.demensionsWrapper}>
                  <div className={classNames.sizesSubWrapper}>
                    <div className={classNames.toggleSizesWrapper}>
                      <div className={classNames.toggleItemWrapper}>
                        {toggleDimensionsValue === dimensionsConfig.PRIMARY ? (
                          <span className={classNames.indicator}></span>
                        ) : null}

                        <Typography
                          className={clsx(classNames.sizesLabel, {
                            [classNames.selectedLabel]: toggleDimensionsValue === dimensionsConfig.PRIMARY,
                          })}
                          onClick={() => setToggleDimensionsValue(dimensionsConfig.PRIMARY)}
                        >
                          {t(TranslationKey['Primary dimensions'])}
                        </Typography>
                      </div>
                      <div className={classNames.toggleItemWrapper}>
                        {toggleDimensionsValue === dimensionsConfig.SHIPPING ? (
                          <span className={classNames.indicator}></span>
                        ) : null}

                        <Typography
                          className={clsx(classNames.sizesLabel, {
                            [classNames.selectedLabel]: toggleDimensionsValue === dimensionsConfig.SHIPPING,
                          })}
                          onClick={() => setToggleDimensionsValue(dimensionsConfig.SHIPPING)}
                        >
                          {t(TranslationKey['Shipping dimensions'])}
                        </Typography>
                      </div>
                    </div>

                    <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                      <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                        {'In'}
                      </ToggleBtn>
                      <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                        {'Cm'}
                      </ToggleBtn>
                    </ToggleBtnGroup>
                  </div>
                  <Typography>
                    {t(TranslationKey.Length) + ': '}
                    {toggleDimensionsValue === dimensionsConfig.PRIMARY
                      ? toFixed(box.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)
                      : toFixed(box.deliveryLength / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography>
                    {t(TranslationKey.Width) + ': '}
                    {toggleDimensionsValue === dimensionsConfig.PRIMARY
                      ? toFixed(box.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)
                      : toFixed(box.deliveryWidth / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography>
                    {t(TranslationKey.Height) + ': '}
                    {toggleDimensionsValue === dimensionsConfig.PRIMARY
                      ? toFixed(box.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)
                      : toFixed(box.deliveryHeight / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>

                  <Typography>
                    {t(TranslationKey.Weight) + ': '}
                    {toggleDimensionsValue === dimensionsConfig.PRIMARY
                      ? toFixedWithKg(box.weighGrossKgWarehouse, 2)
                      : toFixedWithKg(box.deliveryMass, 2)}
                  </Typography>
                  <Typography>
                    {t(TranslationKey['Volume weight']) + ': '}
                    {toggleDimensionsValue === dimensionsConfig.PRIMARY
                      ? toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)
                      : toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient, true), 2)}
                  </Typography>
                  <Typography
                    className={clsx({
                      [classNames.alertText]:
                        (toggleDimensionsValue === dimensionsConfig.PRIMARY
                          ? calcFinalWeightForBox(box, volumeWeightCoefficient)
                          : calcFinalWeightForBox(box, volumeWeightCoefficient, true)) < 12,
                    })}
                  >
                    {t(TranslationKey['Final weight']) + ': '}
                    {toggleDimensionsValue === dimensionsConfig.PRIMARY
                      ? toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)
                      : toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient, true), 2)}
                  </Typography>

                  {(toggleDimensionsValue === dimensionsConfig.PRIMARY
                    ? calcFinalWeightForBox(box, volumeWeightCoefficient)
                    : calcFinalWeightForBox(box, volumeWeightCoefficient, true)) < 12 ? (
                    // eslint-disable-next-line react/jsx-indent
                    <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
                  ) : null}
                </div>
              </div> */}
            </div>

            <div>
              <Field
                oneLine
                containerClasses={classNames.checkboxContainer}
                labelClasses={classNames.label}
                label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
              />
              <Field
                oneLine
                containerClasses={classNames.checkboxContainer}
                labelClasses={classNames.label}
                label={t(TranslationKey['The primary size suitable for shipment'])}
                inputComponent={<Checkbox disabled />}
              />

              <div className={classNames.labelsInfoWrapper}>
                <Field
                  label={t(TranslationKey['Shipping label'])}
                  labelClasses={classNames.label}
                  inputComponent={
                    box.shippingLabel ? (
                      <div className={classNames.barCode}>
                        <Typography className={classNames.linkWrapper}>
                          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                            {t(TranslationKey.View)}
                          </Link>
                        </Typography>

                        <CopyValue text={box.shippingLabel} />
                      </div>
                    ) : (
                      <Typography className={classNames.linkField}>{t(TranslationKey['Not available'])}</Typography>
                    )
                  }
                />

                <Field
                  label={t(TranslationKey['FBA Shipment'])}
                  labelClasses={classNames.label}
                  inputComponent={
                    <div>
                      <Typography className={classNames.linkField}>
                        {box.fbaShipment || t(TranslationKey['Not available'])}
                      </Typography>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={setOpenModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  },
)
