import React, {useState} from 'react'

import {Link, TableCell, TableRow, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl, toFixedWithKg} from '@utils/text'

import {BigImagesModal} from '../big-images-modal'
import {useClassNames} from './batch-info-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').batchInfoModal

const BATCH_INFO_HEAD_CELLS = [
  {title: 'Продукты в коробке'},
  {title: 'id коробки'},
  {title: 'Шиппинг-лейбл'},
  {title: 'Отправка подтверждена'},
  {title: 'Общий вес'},
  {title: 'Объемный вес'},
  {title: 'Финальный вес'},
  {title: 'Фотографии'},
]

const renderHeadRow = <TableHeadRow headCells={BATCH_INFO_HEAD_CELLS} />

const TableBodyBoxRow = ({item, handlers}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row}>
      <TableCell>
        {item.items.map(el => (
          <div key={el.product._id} className={classNames.descriptionWrapper}>
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
                <Typography className={classNames.boxTitle}>{el.product.id}</Typography>
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
        {item.shippingLabel ? (
          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.shippingLabel)}>
            <Typography className={classNames.shippinLabel}>{item.shippingLabel}</Typography>
          </Link>
        ) : (
          <Typography className={classNames.shippinLabel}>{'N/A'}</Typography>
        )}
      </TableCell>

      <TableCell>
        <Typography>{item.sendToBatchComplete ? 'Да' : 'Нет'}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithKg(item.weighGrossKgWarehouse, 2)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithKg(item.volumeWeightKgWarehouse, 2)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {toFixedWithKg(
            Math.max(
              parseFloat(item.volumeWeightKgWarehouse ? item.volumeWeightKgWarehouse : item.volumeWeightKgSupplier) ||
                0,
              parseFloat(item.weighGrossKgWarehouse ? item.weighGrossKgWarehouse : item.weighGrossKgSupplier) || 0,
            ),
            2,
          )}
        </Typography>
      </TableCell>

      <TableCell>
        <Button
          disableElevation
          disabled={item.images?.length < 1 || item.images === null}
          color="primary"
          variant="contained"
          onClick={() => handlers.openImages(item.images)}
        >
          {textConsts.photos}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export const BatchInfoModal = observer(({openModal, setOpenModal, batch}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const openImages = photos => {
    setShowImageModal(!showImageModal)
    setBigImagesOptions({images: photos, imgIndex: 0})
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.form}>
        <Typography className={classNames.modalTitle} variant="h3">
          {textConsts.mainTitle}
        </Typography>

        <Table
          rowsOnly
          data={batch.boxes}
          BodyRow={TableBodyBoxRow}
          renderHeadRow={renderHeadRow}
          rowsHandlers={{openImages}}
        />

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
    </Modal>
  )
})
