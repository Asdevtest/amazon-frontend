import React, {useState} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Modal} from '@components/modal'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {calcFinalWeightForBox, calcPriceForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithKg, toFixedWithDollarSign, toFixed, getFullTariffTextForBox} from '@utils/text'

import {useClassNames} from './batch-info-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').batchInfoModal

const BATCH_INFO_HEAD_CELLS = [
  {title: 'Коробки'},
  {title: 'ID'},
  {title: 'Клиент'},
  {title: 'Тариф'},
  {title: 'Склад выгрузки'},
  {title: 'Updated'},
  {title: 'Вес фин-й'},
  {title: 'Стоимость'},
]

const renderHeadRow = <TableHeadRow headCells={BATCH_INFO_HEAD_CELLS} />

const TableBodyBoxRow = ({item, handlers, ...restProps}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row} onDoubleClick={() => handlers.openBoxView(item)}>
      <TableCell>
        {item.items.map((el, itemIndex) => (
          <div key={el.product._id} className={classNames.descriptionWrapper}>
            {item.totalPrice - item.totalPriceChanged < 0 && itemIndex === 0 && (
              <span className={classNames.needPay}>{`Необходима доплата! (${toFixedWithDollarSign(
                item.totalPriceChanged - item.totalPrice,
                2,
              )})`}</span>
            )}
            <div className={classNames.imgBlock}>
              <img className={classNames.imgBox} src={getAmazonImageUrl(el.product.images[0])} />
              <div className={classNames.imgSubBlock}>
                <div className={classNames.countBlock}>
                  <Typography>{textConsts.countTypo}</Typography>
                  <Typography className={classNames.amount}>{el.amount}</Typography>

                  {item.amount > 1 && (
                    <Typography className={classNames.superboxTypo}>{`Superbox x ${item.amount}`}</Typography>
                  )}
                </div>

                <Typography className={classNames.boxTitle}>{el.product.asin}</Typography>
              </div>
            </div>
            <Typography className={classNames.productTitle}>{el.product.amazonTitle}</Typography>
          </div>
        ))}
      </TableCell>

      <TableCell>
        <Typography>{item.humanFriendlyId}</Typography>
      </TableCell>

      <TableCell>
        <UserLinkCell name={item.client.name} userId={item.client._id} />
      </TableCell>

      <TableCell>
        <Typography>{getFullTariffTextForBox(item)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.destination.name}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{formatNormDateTime(item.updatedAt)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithKg(calcFinalWeightForBox(item, restProps.volumeWeightCoefficient), 2)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithDollarSign(calcPriceForBox(item), 2)}</Typography>
      </TableCell>
    </TableRow>
  )
}

export const BatchInfoModal = observer(({openModal, setOpenModal, batch, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  const [showBoxViewModal, setShowBoxViewModal] = useState(false)

  const [curBox, setCurBox] = useState({})

  const openBoxView = box => {
    setShowBoxViewModal(!showBoxViewModal)
    setCurBox(box)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.form}>
        <Typography className={classNames.modalTitle} variant="h5">
          {textConsts.mainTitle}
        </Typography>

        <div className={classNames.infoWrapper}>
          <Field
            disabled
            containerClasses={classNames.infoField}
            label={'Номер партии'}
            value={batch?.humanFriendlyId}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={'Тариф'}
            value={getFullTariffTextForBox(batch.boxes?.[0]) || ''}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={'Destination'}
            value={batch.boxes?.[0].destination?.name}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={'Объемный вес'}
            value={toFixed(
              batch.boxes?.reduce((ac, cur) => (ac += calcVolumeWeightForBox(cur, volumeWeightCoefficient)), 0),
              4,
            )}
            placeholder={'0'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={'Общий финальный вес'}
            value={toFixed(
              batch.boxes?.reduce((ac, cur) => (ac += calcFinalWeightForBox(cur, volumeWeightCoefficient)), 0),
              4,
            )}
            placeholder={'0'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={'Общая финальная стоимость'}
            value={toFixed(
              batch.boxes?.reduce((ac, cur) => (ac += calcPriceForBox(cur)), 0),
              2,
            )}
            placeholder={'0'}
          />
        </div>

        <Table
          rowsOnly
          data={batch.boxes}
          BodyRow={TableBodyBoxRow}
          renderHeadRow={renderHeadRow}
          rowsHandlers={{openBoxView}}
          volumeWeightCoefficient={volumeWeightCoefficient}
        />

        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={setOpenModal}>
            {textConsts.closeBtn}
          </Button>
        </div>

        <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
          <BoxViewForm
            box={curBox}
            batchHumanFriendlyId={batch.humanFriendlyId}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
          />
        </Modal>
      </div>
    </Modal>
  )
})
