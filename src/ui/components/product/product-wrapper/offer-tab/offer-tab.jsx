import React, {useState} from 'react'

import {Typography, Box, Divider, Paper} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {useClassNames} from './offer-tab.style'

const imagesMock = [
  'https://m.media-amazon.com/images/I/616FDnks2gS._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/71VUtbQbobS._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/71+plvBk7bS._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/71Y0J977BTS._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/716IwgjNI+S._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/61RU7s+4nyS._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/710pqwAQRnS._AC_SL1500_.jpg',
]

const competitorsListMock = [
  'https://spb.pulscen.ru/products/multivarka_galaxy_gl_2641_belaya_900vt_5l_11_prog_antip_pokr_chashi_90810767',
  'https://spb.pulscen.ru/products/multivarka_cuckoo_cr_3521_107976080',
]

export const OfferTab = () => {
  const classNames = useClassNames()

  const [showImgModal, setShowImgModal] = useState(false)
  const [curImage, setCurImage] = useState('')

  const onClickImg = img => {
    setShowImgModal(!showImgModal)
    setCurImage(img)
  }

  return (
    <div className={classNames.mainWrapper}>
      <Paper className={classNames.sideBlockWrapper}>
        <Typography className={classNames.title}>{'Подробно о товаре:'}</Typography>

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Товар:'}
          value={'Мультиварка - ТУРБО'}
        />

        {
          <div className={classNames.photoWrapper}>
            <Typography className={classNames.categoryTitle}>{'Фотографии:'}</Typography>

            <Carousel autoPlay={false} timeout={100} animation="fade">
              {imagesMock.map((el, index) => (
                <div key={index}>
                  <img alt="" className={classNames.imgBox} src={el} onClick={e => onClickImg(e.target.src)} />
                </div>
              ))}
            </Carousel>

            <Box className={classNames.boxCode}>
              <Typography className={(classNames.modalText, classNames.typoCode)}>{'Добавить фотографии'}</Typography>
              <Input disabled className={classNames.input} type="file" />
            </Box>
          </div>
        }

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Продажные буллиты:'}
          value={`варка супов,\nтушение овощей и мяса,\nприготовление йогурта,\nработа с дрожжевым тестом,\nимеет таймер отложенного старта для выбора желаемого времени`}
        />

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Подробное описание:'}
          value={`Мультиварка представляет собой электроприбор, основными элементами которого являются:\nКорпус, чаще всего изготовленный из пластика или с металлическими вставками Чаша для приготовления пищи\nПанель управления со встроенным микропроцессором – отвечает за управление программами и режимами приготовления`}
        />

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Материал:'}
          value={'Железо'}
        />

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Размеры:'}
          value={'45*64*10'}
        />
      </Paper>

      <Divider orientation="vertical" />

      <Paper className={classNames.sideBlockWrapper}>
        <Typography className={classNames.title}>{'Ищем поставщика:'}</Typography>

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Задание для поиска постащика:'}
          value={`-цена до 1000$;\n-доставка: США, Европа;\n-расчеты через юр. лицо`}
        />

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Обратить внимание:'}
          value={`-цены на товары;\n-минимальное количество товара для закупки и отгрузки;\n-гарантийные условия — что будет, если товар окажется некачественным;\n-условия возврата;\n-условия оплаты. Желательно исключить расчеты наличными, чтобы не было проблем с налоговой.`}
        />

        <Field
          multiline
          className={classNames.descriptionProduct}
          rows={4}
          rowsMax={6}
          label={'Дополнительная информация:'}
          value={`дедлайн: 05.10.2021`}
        />

        <div className={classNames.competitorsWrapper}>
          <Typography className={classNames.label}>{'Конкуренты:'}</Typography>
          {competitorsListMock.map((el, index) => (
            <Typography key={index} className={classNames.competitorTypo}>
              {el}
            </Typography>
          ))}
        </div>
      </Paper>
      <Modal openModal={showImgModal} setOpenModal={setShowImgModal}>
        <div>
          <img alt="" className={classNames.bigImg} src={curImage} />
        </div>
      </Modal>
    </div>
  )
}
