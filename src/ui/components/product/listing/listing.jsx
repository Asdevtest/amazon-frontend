import React, {useEffect, useRef} from 'react'

import {Typography, Divider, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {AddCompetitorModal} from '@components/modals/add-competitor-modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {UserBalanceHistory} from '@components/screens/user-balance-history'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsClient, checkIsImageLink, checkIsSupervisor} from '@utils/checks'
import {t} from '@utils/translations'

import {Button} from '../../buttons/button'
import {ListingModel} from './listing.model'
import {useClassNames} from './listing.style'

export const Listing = observer(({productId, onClickBack}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const listingModel = useRef(new ListingModel({history, productId}))

  useEffect(() => {
    listingModel.current.loadData()
  }, [])

  const {
    tmpListingImages,
    listingProduct,
    payments,
    showImageModal,
    bigImagesOptions,
    userRole,
    progressValue,
    imagesFromBoxes,
    showSuccessModal,
    showProgress,
    showCompetitorModal,
    onTriggerOpenModal,
    onClickImg,
    onChangeField,
    onChangeArrayField,
    setTmpListingImages,
    onSaveSubmit,
    onCancel,
  } = listingModel.current

  const userCanEdit = checkIsSupervisor(UserRoleCodeMap[userRole]) || checkIsClient(UserRoleCodeMap[userRole])

  return (
    <div className={classNames.mainWrapper}>
      <Paper className={classNames.productBlockWrapper}>
        <Typography className={classNames.title}>{t(TranslationKey['Details about the product:'])}</Typography>

        <div className={classNames.productSubBlockWrapper}>
          <div className={classNames.sideBlockWrapper}>
            <Field
              multiline
              disabled={!userCanEdit}
              className={classNames.listingTitle}
              rows={4}
              inputProps={{maxLength: 1000}}
              label={t(TranslationKey['Listing title'])}
              placeholder={t(TranslationKey['Enter the title of the listing'])}
              value={listingProduct.listingName}
              onChange={e => onChangeField(e, 'listingName')}
            />

            {[1, 2, 3, 4, 5].map((el, index) => (
              <Field
                key={index}
                oneLine
                disabled={
                  (index === 0
                    ? index !== 0
                    : listingProduct.listingBulletPoints?.[index]
                    ? false
                    : !listingProduct.listingBulletPoints?.[index - 1]) || !userCanEdit
                }
                className={classNames.descriptionProduct}
                inputProps={{maxLength: 1000}}
                label={`Bullet Point #${el}: `}
                value={listingProduct.listingBulletPoints?.[index] || ''}
                onChange={e => onChangeArrayField(e, 'listingBulletPoints', index)}
              />
            ))}

            <Field
              multiline
              label={t(TranslationKey['Details about the product:'])}
              disabled={!userCanEdit}
              minRows={4}
              rowsMax={4}
              inputProps={{maxLength: 1000}}
              value={listingProduct.listingProductDetails}
              placeholder={t(TranslationKey['Enter a description'])}
              className={classNames.modalTextArea}
              onChange={e => onChangeField(e, 'listingProductDetails')}
            />
          </div>

          <Divider orientation="vertical" />

          <div className={classNames.sideBlockWrapper}>
            <Field
              multiline
              className={classNames.listingSearchTerms}
              disabled={!userCanEdit}
              inputProps={{maxLength: 1000}}
              label={t(TranslationKey['Search terms:'])}
              placeholder={t(TranslationKey['Enter search terms'])}
              value={listingProduct.listingSearchTerms}
              onChange={e => onChangeField(e, 'listingSearchTerms')}
            />

            {[1, 2, 3, 4, 5].map((el, index) => (
              <Field
                key={index}
                oneLine
                disabled={
                  (index === 0
                    ? index !== 0
                    : listingProduct.listingSubjectMatters?.[index]
                    ? false
                    : !listingProduct.listingSubjectMatters?.[index - 1]) || !userCanEdit
                }
                inputProps={{maxLength: 1000}}
                className={classNames.descriptionProduct}
                label={`Subject Matter #${el}: `}
                value={listingProduct.listingSubjectMatters?.[index] || ''}
                onChange={e => onChangeArrayField(e, 'listingSubjectMatters', index)}
              />
            ))}

            <div className={classNames.photosWrapper}>
              <div className={classNames.photosLeftSubWrapper}>
                <Typography className={classNames.subTitle}>
                  {t(TranslationKey['Photos of the product in boxes:'])}
                </Typography>

                {imagesFromBoxes.length > 0 ? (
                  <div className={classNames.carouselWrapper}>
                    <Carousel autoPlay={false} timeout={100} animation="fade">
                      {imagesFromBoxes
                        ?.filter(el => checkIsImageLink(el))
                        .map((el, index) => (
                          <div key={index}>
                            <img
                              alt=""
                              className={classNames.imgBox}
                              src={el}
                              onClick={() => onClickImg({images: imagesFromBoxes, imgIndex: index})}
                            />
                          </div>
                        ))}
                    </Carousel>
                  </div>
                ) : (
                  <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
                )}
              </div>

              <div>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Listing photos:'])}</Typography>

                {listingProduct.listingImages?.length > 0 ? (
                  <div className={classNames.carouselWrapper}>
                    <Carousel autoPlay={false} timeout={100} animation="fade">
                      {listingProduct.listingImages
                        ?.filter(el => checkIsImageLink(el))
                        .map((el, index) => (
                          <div key={index}>
                            <img
                              alt=""
                              className={classNames.imgBox}
                              src={el}
                              onClick={() => onClickImg({images: listingProduct.listingImages, imgIndex: index})}
                            />
                          </div>
                        ))}
                    </Carousel>
                  </div>
                ) : (
                  <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
                )}
              </div>
            </div>

            {userCanEdit && (
              <div>
                <div className={classNames.imageFileInputWrapper}>
                  <UploadFilesInput images={tmpListingImages} setImages={setTmpListingImages} maxNumber={50} />
                </div>
              </div>
            )}

            {userCanEdit ? (
              <div className={classNames.buttonsWrapper}>
                <Button
                  disableElevation
                  className={classNames.button}
                  color="primary"
                  variant="contained"
                  onClick={onSaveSubmit}
                >
                  {t(TranslationKey.Save)}
                </Button>

                <Button
                  disableElevation
                  className={classNames.button}
                  color="primary"
                  variant="contained"
                  onClick={onCancel}
                >
                  {t(TranslationKey.Cancel)}
                </Button>

                <Button
                  disableElevation
                  className={classNames.button}
                  color="primary"
                  variant="contained"
                  onClick={onClickBack}
                >
                  {t(TranslationKey.Back)}
                </Button>
              </div>
            ) : (
              <div className={classNames.buttonsWrapper}>
                <Button
                  disableElevation
                  className={classNames.button}
                  color="primary"
                  variant="contained"
                  onClick={onClickBack ? onClickBack : onCancel}
                >
                  {t(TranslationKey.Back)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Paper>

      <UserBalanceHistory historyData={payments} title={t(TranslationKey.Transactions)} />

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => onTriggerOpenModal('showImageModal')}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={t(TranslationKey['Data saved successfully'])}
        successBtnText={'Oк'}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />

      <AddCompetitorModal
        openModal={showCompetitorModal}
        setOpenModal={() => onTriggerOpenModal('showCompetitorModal')}
        currentCompetitors={listingProduct.listingSupplierCompetitors}
        onChangeField={onChangeField}
      />

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
})
