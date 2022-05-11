import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {React, useState} from 'react'

import {Checkbox, Grid, Link, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl, getFullTariffTextForBoxOrOrder, toFixed, toFixedWithKg} from '@utils/text'

import {useClassNames} from './box-view-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').boxViewForm

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
          <Typography variant="h6">{`Коробка № ${box.humanFriendlyId}`}</Typography>

          <Field
            oneLine
            label={'Storekeeper: '}
            containerClasses={classNames.storekeeperField}
            inputComponent={
              <div className={classNames.userLinkWrapper}>
                <UserLinkCell
                  name={storekeeper ? storekeeper?.name : box.storekeeper?.name}
                  userId={storekeeper ? storekeeper?._id : box.storekeeper?._id}
                />
              </div>
            }
          />

          <Typography>{`Партия № ${
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
                  label={'Destination'}
                  value={box.destination?.name || ''}
                  placeholder={'N/A'}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  label={'Тариф'}
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
                            {item.product.images.map((el, index) => (
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
                          label={'Количество'}
                          value={(box.amount > 1 ? `${item.amount} * ${box.amount}` : item.amount) || 0}
                          placeholder={'N/A'}
                        />

                        <Field
                          disabled
                          inputClasses={classNames.countField}
                          label={'HS Code'}
                          value={item.product.hsCode}
                          placeholder={'N/A'}
                        />
                      </div>
                    </div>

                    <div className={classNames.productSubWrapper}>
                      <Field
                        label={'Баркод'}
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
                          label={textConsts.isBarCodeAlreadyAttachedByTheSupplier}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />}
                        />
                      ) : (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          label={textConsts.isBarCodeAttachedByTheStorekeeper}
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
                <Typography>{'Фотографии коробки'}</Typography>

                {box.images?.length > 0 ? (
                  <Carousel autoPlay={false} timeout={100} animation="fade" className={classNames.imgBoxWrapper}>
                    {box.images.map((el, index) => (
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
                  <Typography>{'Размеры коробки'}</Typography>

                  <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                    <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                      {'In'}
                    </ToggleButton>
                    <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                      {'Cm'}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <div className={classNames.demensionsWrapper}>
                  <Typography className={classNames.categoryTitle}>{textConsts.demensionsWarehouse}</Typography>
                  <Typography>
                    {textConsts.length}
                    {toFixed(box.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography>
                    {textConsts.width}
                    {toFixed(box.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography>
                    {textConsts.height}
                    {toFixed(box.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>

                  <Typography>
                    {textConsts.weight}
                    {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
                  </Typography>
                  <Typography>
                    {textConsts.volumeWeigh}
                    {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
                  </Typography>
                  <Typography>
                    {textConsts.finalWeight}
                    {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Field
                oneLine
                containerClasses={classNames.checkboxContainer}
                label={textConsts.shippingLabelIsGluedSupplier}
                inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
              />

              <div className={classNames.labelsInfoWrapper}>
                <Field
                  label={'Шиппинг Лейбл'}
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
                  label={'FBA Shipment'}
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
            {textConsts.closeBtn}
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
