import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { Divider, Paper, Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { UserBalanceHistory } from '@components/user/user-balance-history'

import { checkIsClient, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './listing.style'

import { ListingModel } from './listing.model'

export const Listing = observer(({ productId, onClickBack }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const listingModel = useRef(new ListingModel({ history, productId }))

  useEffect(() => {
    listingModel.current.loadData()
  }, [])

  const {
    tmpListingImages,
    listingProduct,
    payments,
    userRole,
    progressValue,
    imagesFromBoxes,
    showSuccessModal,
    showProgress,
    onTriggerOpenModal,
    onChangeField,
    onChangeArrayField,
    setTmpListingImages,
    onSaveSubmit,
    onCancel,
  } = listingModel.current

  const userCanEdit = checkIsSupervisor(UserRoleCodeMap[userRole]) || checkIsClient(UserRoleCodeMap[userRole])

  const emptyArray = [1, 2, 3, 4, 5]

  return (
    <div className={styles.mainWrapper}>
      <Paper className={styles.productBlockWrapper}>
        <Typography className={styles.title}>{t(TranslationKey['Details about the product:'])}</Typography>

        <div className={styles.productSubBlockWrapper}>
          <div className={styles.sideBlockWrapper}>
            <Field
              multiline
              disabled={!userCanEdit}
              className={styles.listingTitle}
              minRows={4}
              inputProps={{ maxLength: 1000 }}
              label={t(TranslationKey['Listing title'])}
              placeholder={t(TranslationKey['Enter the title of the listing'])}
              value={listingProduct.listingName}
              onChange={e => onChangeField(e, 'listingName')}
            />

            {emptyArray.map((el, index) => (
              <Field
                key={index}
                oneLine
                disabled={
                  (index === 0
                    ? index !== 0
                    : listingProduct.listingBulletPoints?.slice()[index]
                    ? false
                    : !listingProduct.listingBulletPoints?.slice()[index - 1]) || !userCanEdit
                }
                className={styles.descriptionProduct}
                inputProps={{ maxLength: 1000 }}
                labelClasses={styles.label}
                label={`Bullet Point #${el}: `}
                value={listingProduct.listingBulletPoints?.slice()[index] || ''}
                onChange={e => onChangeArrayField(e, 'listingBulletPoints', index)}
              />
            ))}

            <Field
              multiline
              label={t(TranslationKey['Details about the product:'])}
              disabled={!userCanEdit}
              minRows={4}
              // maxRows={4}
              inputProps={{ maxLength: 1000 }}
              value={listingProduct.listingProductDetails}
              placeholder={t(TranslationKey['Enter a description'])}
              className={styles.modalTextArea}
              onChange={e => onChangeField(e, 'listingProductDetails')}
            />
          </div>

          <Divider orientation="vertical" />

          <div className={styles.sideBlockWrapper}>
            <Field
              // multiline
              className={styles.listingSearchTerms}
              disabled={!userCanEdit}
              inputProps={{ maxLength: 1000 }}
              label={t(TranslationKey['Search terms:'])}
              placeholder={t(TranslationKey['Enter search terms'])}
              value={listingProduct.listingSearchTerms}
              onChange={e => onChangeField(e, 'listingSearchTerms')}
            />

            {emptyArray.map((el, index) => (
              <Field
                key={index}
                oneLine
                disabled={
                  (index === 0
                    ? index !== 0
                    : listingProduct.listingSubjectMatters?.slice()[index]
                    ? false
                    : !listingProduct.listingSubjectMatters?.slice()[index - 1]) || !userCanEdit
                }
                inputProps={{ maxLength: 1000 }}
                className={styles.descriptionSecondProduct}
                labelClasses={styles.secondLabel}
                label={`Subject Matter #${el}: `}
                value={listingProduct.listingSubjectMatters?.slice()[index] || ''}
                onChange={e => onChangeArrayField(e, 'listingSubjectMatters', index)}
              />
            ))}

            <div className={styles.photosWrapper}>
              <div className={styles.photosLeftSubWrapper}>
                <Typography className={styles.subTitle}>
                  {t(TranslationKey['Photos of the product in boxes:'])}
                </Typography>

                <div className={styles.carouselWrapper}>
                  <PhotoAndFilesSlider withoutFiles smallSlider files={imagesFromBoxes} />
                </div>
              </div>

              <div>
                <Typography className={styles.subTitle}>{t(TranslationKey['Listing photos:'])}</Typography>

                <div className={styles.carouselWrapper}>
                  <PhotoAndFilesSlider withoutFiles smallSlider files={listingProduct.listingImages} />
                </div>
              </div>
            </div>

            {userCanEdit && (
              <div>
                <div className={styles.imageFileInputWrapper}>
                  <UploadFilesInput images={tmpListingImages} setImages={setTmpListingImages} maxNumber={50} />
                </div>
              </div>
            )}

            {userCanEdit ? (
              <div className={styles.buttonsWrapper}>
                <Button
                  disableElevation
                  className={styles.button}
                  color="primary"
                  variant="contained"
                  onClick={onSaveSubmit}
                >
                  {t(TranslationKey.Save)}
                </Button>

                <Button
                  disableElevation
                  className={styles.button}
                  color="primary"
                  variant="contained"
                  onClick={onCancel}
                >
                  {t(TranslationKey.Cancel)}
                </Button>

                <Button
                  disableElevation
                  className={styles.button}
                  color="primary"
                  variant="contained"
                  onClick={onClickBack}
                >
                  {t(TranslationKey.Back)}
                </Button>
              </div>
            ) : (
              <div className={styles.buttonsWrapper}>
                <Button
                  disableElevation
                  className={styles.button}
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

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={t(TranslationKey['Data saved successfully'])}
        successBtnText={'Oк'}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
})
