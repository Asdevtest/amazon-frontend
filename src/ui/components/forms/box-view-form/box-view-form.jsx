import {React, useState} from 'react'

import {Checkbox, Grid, Link, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
<<<<<<< HEAD
import {UserLink} from '@components/user-link'
=======
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
>>>>>>> 3fbbe501 (2716 2752  2746 2745 2754 2743 2629 2547 2755 2759 2760)

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {checkIsImageLink} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl, getFullTariffTextForBoxOrOrder, toFixed, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-view-form.style'

export const BoxViewForm = observer(
  ({box, setOpenModal, volumeWeightCoefficient, batchHumanFriendlyId, storekeeper}) => {
    const classNames = useClassNames()

    const [showImageModal, setShowImageModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)
    }

    return (
      <div className={classNames.formContainer}>
        <div className={classNames.titleWrapper}>
          <Typography variant="h6">{`${t(TranslationKey.Box)} № ${box.humanFriendlyId}`}</Typography>

          <Field
            oneLine
            label={'Storekeeper: '}
            containerClasses={classNames.storekeeperField}
            inputComponent={
              <div className={classNames.userLinkWrapper}>
<<<<<<< HEAD
                <UserLink
=======
                <UserLinkCell
                  blackText
>>>>>>> 3fbbe501 (2716 2752  2746 2745 2754 2743 2629 2547 2755 2759 2760)
                  name={storekeeper ? storekeeper?.name : box.storekeeper?.name}
                  userId={storekeeper ? storekeeper?._id : box.storekeeper?._id}
                />
              </div>
            }
          />

          <Typography>{`${t(TranslationKey.Batch)} № ${
            (batchHumanFriendlyId ? batchHumanFriendlyId : box.batch?.humanFriendlyId) || 'N/A'
          }`}</Typography>
        </div>

        <div className={classNames.blocksWrapper}>
          <div className={classNames.blockWrapper}>
            <Grid container spacing={2} className={classNames.deliveryInfoWrapper}>
              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  label={t(TranslationKey.Destination)}
                  value={box.destination?.name || ''}
                  placeholder={'N/A'}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  label={t(TranslationKey.Tariff)}
                  value={getFullTariffTextForBoxOrOrder(box) || ''}
                  placeholder={'N/A'}
                />
              </Grid>
            </Grid>

            <div className={classNames.productsWrapper}>
              <Carousel autoPlay={false} timeout={100} animation="fade" fullHeightHover={false}>
                {box.items.map((item, index) => (
                  <div key={index} className={classNames.productWrapper}>
                    <div className={classNames.productSubWrapper}>
                      {item.product.images.length > 0 ? (
                        <div className={classNames.carouselWrapper}>
                          <Carousel
                            autoPlay={false}
                            timeout={100}
                            animation="fade"
                            className={classNames.imgBoxWrapper}
                          >
                            {item.product.images
                              ?.filter(el => !checkIsImageLink(el))
                              .map((el, index) => (
                                <div key={index}>
                                  <img
                                    alt=""
                                    className={classNames.imgBox}
                                    src={getAmazonImageUrl(el)}
                                    onClick={() => {
                                      setShowImageModal(!showImageModal)
                                      setBigImagesOptions({images: item.product.images, imgIndex: index})
                                    }}
                                  />
                                </div>
                              ))}
                          </Carousel>
                        </div>
                      ) : (
                        <img alt="" className={classNames.noImgBox} src={'/assets/img/no-photo.jpg'} />
                      )}

                      <div>
                        <Typography className={classNames.amazonTitle}>{item.product.amazonTitle}</Typography>

                        <Field
                          oneLine
                          disabled
                          inputClasses={classNames.countField}
                          label={t(TranslationKey.Quantity)}
                          value={(box.amount > 1 ? `${item.amount} * ${box.amount}` : item.amount) || 0}
                          placeholder={'N/A'}
                        />

                        <Field
                          disabled
                          inputClasses={classNames.countField}
                          label={t(TranslationKey['HS code'])}
                          value={item.product.hsCode}
                          placeholder={'N/A'}
                        />
                      </div>
                    </div>

                    <div className={classNames.productSubWrapper}>
                      <Field
                        label={t(TranslationKey.BarCode)}
                        inputComponent={
                          <div>
                            {item.barCode ? (
                              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                                <Typography className={classNames.linkField}>{item.barCode}</Typography>
                              </Link>
                            ) : (
                              <Typography className={classNames.linkField}>{'N/A'}</Typography>
                            )}
                          </div>
                        }
                      />

                      {item.isBarCodeAlreadyAttachedByTheSupplier ? (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          label={t(TranslationKey['BarCode is glued by supplier'])}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />}
                        />
                      ) : (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          label={t(TranslationKey['BarCode is glued by storekeeper'])}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className={classNames.blockWrapper}>
            <div className={classNames.imgSizesWrapper}>
              <div className={classNames.imgWrapper}>
                <Typography>{t(TranslationKey['Box photos:'])}</Typography>

                {box.images?.length > 0 ? (
                  <Carousel autoPlay={false} timeout={100} animation="fade" className={classNames.imgBoxWrapper}>
                    {box.images
                      ?.filter(el => checkIsImageLink(el))
                      .map((el, index) => (
                        <div key={index}>
                          <img
                            alt=""
                            className={classNames.imgBox}
                            src={getAmazonImageUrl(el)}
                            onClick={() => {
                              setShowImageModal(!showImageModal)
                              setBigImagesOptions({images: box.images, imgIndex: index})
                            }}
                          />
                        </div>
                      ))}
                  </Carousel>
                ) : (
                  <img alt="" className={classNames.noImgBox} src={'/assets/img/no-photo.jpg'} />
                )}
              </div>

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

                <div className={classNames.demensionsWrapper}>
                  <Typography className={classNames.categoryTitle}>
                    {t(TranslationKey['Sizes from storekeeper:'])}
                  </Typography>
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
                  <Typography>
                    {t(TranslationKey['Final weight']) + ': '}
                    {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Field
                oneLine
                containerClasses={classNames.checkboxContainer}
                label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
              />

              <div className={classNames.labelsInfoWrapper}>
                <Field
                  label={t(TranslationKey['Shipping label'])}
                  inputComponent={
                    <div>
                      {box.shippingLabel ? (
                        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                          <Typography className={classNames.linkField}>{box.shippingLabel}</Typography>
                        </Link>
                      ) : (
                        <Typography className={classNames.linkField}>{'N/A'}</Typography>
                      )}
                    </div>
                  }
                />

                <Field
                  label={t(TranslationKey['FBA Shipment'])}
                  inputComponent={
                    <div>
                      <Typography className={classNames.linkField}>{box.fbaShipment || 'N/A'}</Typography>
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

        <BigImagesModal
          isAmazone
          openModal={showImageModal}
          setOpenModal={() => setShowImageModal(!showImageModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
        />
      </div>
    )
  },
)
