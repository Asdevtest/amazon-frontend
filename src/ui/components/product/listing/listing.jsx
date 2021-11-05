import React, {useEffect, useRef} from 'react'

import {Typography, Divider, Paper, Link, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom'

import {UserRoleCodeMap} from '@constants/user-roles'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {ImageFileInput} from '@components/image-file-input'
import {AddCompetitorModal} from '@components/modals/add-competitor-modal'
import {ShowImageModal} from '@components/modals/show-image-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {UserBalanceHistory} from '@components/screens/user-balance-history'

import {checkIsBuyer, checkIsSupervisor} from '@utils/checks'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {Button} from '../../buttons/button'
import {ListingModel} from './listing.model'
import {useClassNames} from './listing.style'

export const Listing = observer(({product}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const listingModel = useRef(new ListingModel({history, product}))

  useEffect(() => {
    listingModel.current.loadData()
  }, [])

  const {
    tmpListingImages,
    listingProduct,
    payments,
    showImageModal,
    curImage,
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
    onSaveSubmith,
    onCancel,
    onRemoveCompetitor,
  } = listingModel.current

  const userIsSupervisor = checkIsSupervisor(UserRoleCodeMap[userRole])

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.productBlockWrapper}>
        <Paper className={classNames.sideBlockWrapper}>
          <Typography className={classNames.title}>{'Подробно о товаре:'}</Typography>

          <Field
            multiline
            disabled={!userIsSupervisor}
            className={classNames.listingTitle}
            rows={4}
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
                  : listingProduct.listingBulletPoints[index]
                  ? false
                  : !listingProduct.listingBulletPoints[index - 1]) || !userIsSupervisor
              }
              className={classNames.descriptionProduct}
              label={`Bullet Point #${el}: `}
              value={listingProduct.listingBulletPoints[index] || ''}
              onChange={e => onChangeArrayField(e, 'listingBulletPoints', index)}
            />
          ))}

          <div className={classNames.detailDescriptionWrapper}>
            <Typography className={classNames.subTitle}>{'Подробно о товаре:'}</Typography>
            <textarea
              className={classNames.detailDescription}
              disabled={!userIsSupervisor}
              placeholder="введите описание"
              value={listingProduct.listingProductDetails}
              onChange={e => onChangeField(e, 'listingProductDetails')}
            />
          </div>

          <Field
            multiline
            disabled={!userIsSupervisor}
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
                  : listingProduct.listingSubjectMatters[index]
                  ? false
                  : !listingProduct.listingSubjectMatters[index - 1]) || !userIsSupervisor
              }
              className={classNames.descriptionProduct}
              label={`Subject Matter #${el}: `}
              value={listingProduct.listingSubjectMatters[index] || ''}
              onChange={e => onChangeArrayField(e, 'listingSubjectMatters', index)}
            />
          ))}

          {userIsSupervisor && (
            <div>
              <Typography className={classNames.subTitle}>{'Добавить фотографии:'}</Typography>

              <div className={classNames.imageFileInputWrapper}>
                <ImageFileInput images={tmpListingImages} setImages={setTmpListingImages} maxNumber={50} />
              </div>
            </div>
          )}
        </Paper>

        <Divider orientation="vertical" />

        <Paper className={classNames.sideBlockWrapper}>
          <Typography className={classNames.title}>{'Ищем поставщика:'}</Typography>

          <Field
            multiline
            disabled={!userIsSupervisor}
            className={classNames.searchSupplierField}
            label={'Задание для поиска постащика:'}
            placeholder={`-цена до 1000$;\n-доставка: США, Европа;\n-расчеты через юр. лицо`}
            value={listingProduct.listingTaskToFindSupplier}
            onChange={e => onChangeField(e, 'listingTaskToFindSupplier')}
          />

          <Field
            multiline
            disabled={!userIsSupervisor}
            className={classNames.searchSupplierField}
            label={'Обратить внимание:'}
            placeholder={`-цены на товары;\n-минимальное количество товара для закупки и отгрузки...`}
            value={listingProduct.listingSupplierImportantPoints}
            onChange={e => onChangeField(e, 'listingSupplierImportantPoints')}
          />

          <Field
            multiline
            disabled={!userIsSupervisor}
            className={classNames.searchSupplierField}
            label={'Дополнительная информация:'}
            placeholder={`дедлайн`}
            value={listingProduct.listingExtraInfo}
            onChange={e => onChangeField(e, 'listingExtraInfo')}
          />

          <Typography className={classNames.subTitle}>{'Конкуренты:'}</Typography>

          {listingProduct.listingSupplierCompetitors.length > 0 ? (
            listingProduct.listingSupplierCompetitors.map((el, index) => (
              <div key={index} className={classNames.competitorMainWrapper}>
                <div className={classNames.competitorWrapper}>
                  <Typography>{'Ссылка:'}</Typography>
                  <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(el.link)}>
                    <Typography className={classNames.link}>{el.link}</Typography>
                  </Link>

                  <Typography>{'Комментарий:'}</Typography>
                  <Field multiline disabled className={classNames.searchSupplierField} value={el.comments} />
                </div>

                {userIsSupervisor && (
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
          {userIsSupervisor && (
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
                      <img alt="" className={classNames.imgBox} src={el} onClick={e => onClickImg(e.target.src)} />
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

            {listingProduct.listingImages.length > 0 ? (
              <div className={classNames.carouselWrapper}>
                <Carousel autoPlay={false} timeout={100} animation="fade">
                  {listingProduct.listingImages.map((el, index) => (
                    <div key={index}>
                      <img alt="" className={classNames.imgBox} src={el} onClick={e => onClickImg(e.target.src)} />
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
      {userIsSupervisor ? (
        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onSaveSubmith}
          >
            {'Сохранить'}
          </Button>

          <Button disableElevation className={classNames.button} color="primary" variant="contained" onClick={onCancel}>
            {'Отменить'}
          </Button>
        </div>
      ) : (
        <div className={classNames.buttonsWrapper}>
          <Button disableElevation className={classNames.button} color="primary" variant="contained" onClick={onCancel}>
            {'Назад'}
          </Button>
        </div>
      )}

      {!checkIsBuyer(UserRoleCodeMap[userRole]) && <UserBalanceHistory historyData={payments} title="Транзакции:" />}

      <ShowImageModal
        openModal={showImageModal}
        setOpenModal={() => onTriggerOpenModal('showImageModal')}
        image={curImage}
      />

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={'Данные успешно сохранены'}
        successBtnText={'ок'}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
          history.goBack()
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
