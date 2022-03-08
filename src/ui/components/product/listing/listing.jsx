import React, {useEffect, useRef} from 'react'

import {Typography, Divider, Paper, Link, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom'

import {UserRoleCodeMap} from '@constants/user-roles'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {AddCompetitorModal} from '@components/modals/add-competitor-modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {UserBalanceHistory} from '@components/screens/user-balance-history'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsBuyer, checkIsClient, checkIsSupervisor} from '@utils/checks'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

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
    onRemoveCompetitor,
  } = listingModel.current

  const userCanEdit = checkIsSupervisor(UserRoleCodeMap[userRole]) || checkIsClient(UserRoleCodeMap[userRole])

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.productBlockWrapper}>
        <Paper className={classNames.sideBlockWrapper}>
          <Typography className={classNames.title}>{'Подробно о товаре:'}</Typography>

          <Field
            multiline
            disabled={!userCanEdit}
            className={classNames.listingTitle}
            rows={4}
            inputProps={{maxLength: 1000}}
            label={'Название листинга:'}
            placeholder="введите название листинга, строка"
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
            label={'Подробно о товаре:'}
            disabled={!userCanEdit}
            minRows={4}
            rowsMax={4}
            inputProps={{maxLength: 1000}}
            value={listingProduct.listingProductDetails}
            placeholder={'введите описание'}
            className={classNames.modalTextArea}
            onChange={e => onChangeField(e, 'listingProductDetails')}
          />

          <Field
            multiline
            className={classNames.listingSearchTerms}
            disabled={!userCanEdit}
            inputProps={{maxLength: 1000}}
            label={'Поисковые запросы:'}
            placeholder="введите поисковые запросы"
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
                {'Сохранить'}
              </Button>

              <Button
                disableElevation
                className={classNames.button}
                color="primary"
                variant="contained"
                onClick={onCancel}
              >
                {'Отменить'}
              </Button>

              <Button
                disableElevation
                className={classNames.button}
                color="primary"
                variant="contained"
                onClick={onClickBack}
              >
                {'Назад'}
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
                {'Назад'}
              </Button>
            </div>
          )}
        </Paper>

        <Divider orientation="vertical" />

        <Paper className={classNames.sideBlockWrapper}>
          <Typography className={classNames.title}>{'Ищем поставщика:'}</Typography>

          <Field
            multiline
            disabled={!userCanEdit}
            className={classNames.searchSupplierField}
            inputProps={{maxLength: 1000}}
            label={'Задание для поиска поставщика:'}
            placeholder={`-цена до 1000$;\n-доставка: США, Европа;\n-расчеты через юр. лицо`}
            value={listingProduct.listingTaskToFindSupplier}
            onChange={e => onChangeField(e, 'listingTaskToFindSupplier')}
          />

          <Field
            multiline
            disabled={!userCanEdit}
            className={classNames.searchSupplierField}
            inputProps={{maxLength: 1000}}
            label={'Обратить внимание:'}
            placeholder={`-цены на товары;\n-минимальное количество товара для закупки и отгрузки...`}
            value={listingProduct.listingSupplierImportantPoints}
            onChange={e => onChangeField(e, 'listingSupplierImportantPoints')}
          />

          <Field
            multiline
            disabled={!userCanEdit}
            className={classNames.searchSupplierField}
            inputProps={{maxLength: 1000}}
            label={'Дополнительная информация:'}
            placeholder={`дедлайн`}
            value={listingProduct.listingExtraInfo}
            onChange={e => onChangeField(e, 'listingExtraInfo')}
          />

          <Typography className={classNames.subTitle}>{'Конкуренты:'}</Typography>

          {listingProduct.listingSupplierCompetitors?.length > 0 ? (
            listingProduct.listingSupplierCompetitors.map((el, index) => (
              <div key={index} className={classNames.competitorMainWrapper}>
                <div className={classNames.competitorWrapper}>
                  <Typography>{'Ссылка:'}</Typography>
                  <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(el.link)}>
                    <Typography className={classNames.link}>{el.link}</Typography>
                  </Link>

                  <Field
                    multiline
                    disabled
                    label={'Комментарий:'}
                    minRows={4}
                    rowsMax={4}
                    value={el.comments}
                    className={classNames.modalTextArea}
                  />
                </div>

                {userCanEdit && (
                  <IconButton onClick={() => onRemoveCompetitor(index)}>
                    <DeleteIcon className={classNames.deleteBtn} />
                  </IconButton>
                )}
              </div>
            ))
          ) : (
            <div>
              <Typography>{'Нет конкурентов...'}</Typography>
            </div>
          )}
          {userCanEdit && (
            <Button
              disableElevation
              className={classNames.button}
              color="primary"
              variant="contained"
              onClick={() => onTriggerOpenModal('showCompetitorModal')}
            >
              {'Добавить конкурента'}
            </Button>
          )}

          <div>
            <Typography className={classNames.subTitle}>{'Фотографии продукта в коробках:'}</Typography>

            {imagesFromBoxes.length > 0 ? (
              <div className={classNames.carouselWrapper}>
                <Carousel autoPlay={false} timeout={100} animation="fade">
                  {imagesFromBoxes.map((el, index) => (
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
              <Typography>{'Фотографий пока нет...'}</Typography>
            )}
          </div>

          <div>
            <Typography className={classNames.subTitle}>{'Фотографии листинга:'}</Typography>

            {listingProduct.listingImages?.length > 0 ? (
              <div className={classNames.carouselWrapper}>
                <Carousel autoPlay={false} timeout={100} animation="fade">
                  {listingProduct.listingImages.map((el, index) => (
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
              <Typography>{'Фотографий пока нет...'}</Typography>
            )}
          </div>
        </Paper>
      </div>

      {!checkIsBuyer(UserRoleCodeMap[userRole]) && <UserBalanceHistory historyData={payments} title="Транзакции:" />}

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
        title={'Данные успешно сохранены'}
        successBtnText={'ок'}
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
