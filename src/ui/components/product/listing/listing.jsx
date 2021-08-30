/* eslint-disable no-unused-vars */
import React, {useEffect, useRef} from 'react'

import {Typography, Box, Divider, Paper} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {UserBalanceHistory} from '@components/screens/user-balance-history'

import {ListingModel} from './listing.model'
import {useClassNames} from './listing.style'

export const Listing = observer(({product}) => {
  const classNames = useClassNames()
  const listingModel = useRef(new ListingModel({product}))

  useEffect(() => {
    listingModel.current.loadData()
  }, [])

  const {payments, showImageModal, curImage, imagesFromBoxes, onTriggerOpenModal, onClickImg} = listingModel.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.productBlockWrapper}>
        <Paper className={classNames.sideBlockWrapper}>
          <Typography className={classNames.title}>{'Подробно о товаре:'}</Typography>

          <Field
            multiline
            className={classNames.listingTitle}
            rows={4}
            label={'Название листинга:'}
            placeholder="введите название листинга, строка"
          />

          {[1, 2, 3, 4, 5].map((el, index) => (
            <Field key={index} oneLine className={classNames.descriptionProduct} label={`Bullet Point #${el}: `} />
          ))}

          <div className={classNames.detailDescriptionWrapper}>
            <Typography className={classNames.subTitle}>{'Подробно о товаре:'}</Typography>
            <textarea className={classNames.detailDescription} placeholder="введите описание" />
          </div>

          <Field multiline label={'Поисковые запросы:'} placeholder="введите поисковые запросы" />

          {[1, 2, 3, 4, 5].map((el, index) => (
            <Field key={index} oneLine className={classNames.descriptionProduct} label={`Subject Matter #${el}: `} />
          ))}
        </Paper>

        <Divider orientation="vertical" />

        <Paper className={classNames.sideBlockWrapper}>
          <Typography className={classNames.title}>{'Ищем поставщика:'}</Typography>

          <Field
            multiline
            className={classNames.searchSupplierField}
            label={'Задание для поиска постащика:'}
            placeholder={`-цена до 1000$;\n-доставка: США, Европа;\n-расчеты через юр. лицо`}
          />

          <Field
            multiline
            className={classNames.searchSupplierField}
            label={'Обратить внимание:'}
            placeholder={`-цены на товары;\n-минимальное количество товара для закупки и отгрузки;\n-гарантийные условия — что будет, если товар окажется некачественным;\n-условия возврата;\n-условия оплаты. Желательно исключить расчеты наличными, чтобы не было проблем с налоговой.`}
          />

          <Field
            multiline
            className={classNames.searchSupplierField}
            label={'Дополнительная информация:'}
            placeholder={`дедлайн: 05.10.2021`}
          />

          <Field
            multiline
            className={classNames.searchSupplierField}
            label={'Конкуренты:'}
            placeholder={`дедлайн: 05.10.2021`}
          />

          <div className={classNames.photoWrapper}>
            <Typography className={classNames.subTitle}>{'Фотографии продукта в коробках:'}</Typography>

            <Carousel autoPlay={false} timeout={100} animation="fade">
              {imagesFromBoxes.map((el, index) => (
                <div key={index}>
                  <img alt="" className={classNames.imgBox} src={el} onClick={e => onClickImg(e.target.src)} />
                </div>
              ))}
            </Carousel>
          </div>

          <Typography className={classNames.subTitle}>{'Добавить фотографии:'}</Typography>
          <div className={classNames.filesInputList}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => (
              <li key={index} className={classNames.filesInputListItem}>
                <label className={classNames.inputFileWrapper}>
                  <AddAPhotoIcon fontSize="large" />
                  <span>{'Прикрепить файл'}</span>
                  <Input type="file" className={classNames.fileInput} />
                </label>
              </li>
            ))}
          </div>
        </Paper>
      </div>

      <UserBalanceHistory historyData={payments} title="Транзакции:" />

      <Modal openModal={showImageModal} setOpenModal={() => onTriggerOpenModal('showImageModal')}>
        <div>
          <img alt="" className={classNames.bigImg} src={curImage} />
        </div>
      </Modal>
    </div>
  )
})
