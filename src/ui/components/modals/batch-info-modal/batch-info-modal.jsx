import React, {useState} from 'react'

import {Link, TableCell, TableRow, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Modal} from '@components/modal'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {calcFinalWeightForBox, calcPriceForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {checkIsImageLink} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithKg, toFixedWithDollarSign, toFixed, getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

import {BigImagesModal} from '../big-images-modal'
import {useClassNames} from './batch-info-modal.style'

const TableBodyBoxRow = ({item, handlers, ...restProps}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row} onDoubleClick={() => handlers.openBoxView(item)}>
      <TableCell>
        {item.items.map((el, itemIndex) => (
          <div key={el.product._id} className={classNames.descriptionWrapper}>
            {item.totalPrice - item.totalPriceChanged < 0 && itemIndex === 0 && (
              <span className={classNames.needPay}>{`${t(
                TranslationKey['Extra payment required!'],
              )} (${toFixedWithDollarSign(item.totalPriceChanged - item.totalPrice, 2)})`}</span>
            )}
            <div className={classNames.imgBlock}>
              <img className={classNames.imgBox} src={getAmazonImageUrl(el.product.images[0])} />
              <div className={classNames.imgSubBlock}>
                <div className={classNames.countBlock}>
                  <Typography>{t(TranslationKey.Quantity)}</Typography>
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
        <Typography>{getFullTariffTextForBoxOrOrder(item)}</Typography>
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

  const BATCH_INFO_HEAD_CELLS = [
    {title: t(TranslationKey.Boxes)},
    {title: t(TranslationKey.ID)},
    {title: t(TranslationKey.Client)},
    {title: t(TranslationKey.Tariff)},
    {title: t(TranslationKey.Destination)},
    {title: t(TranslationKey.Updated)},
    {title: t(TranslationKey['Final weight'])},
    {title: t(TranslationKey['Total price'])},
  ]

  const renderHeadRow = <TableHeadRow headCells={BATCH_INFO_HEAD_CELLS} />

  const [showBoxViewModal, setShowBoxViewModal] = useState(false)

  const [curBox, setCurBox] = useState({})

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const openBoxView = box => {
    setShowBoxViewModal(!showBoxViewModal)
    setCurBox(box)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.form}>
        <div className={classNames.titleWrapper}>
          <Typography className={classNames.modalTitle} variant="h5">
            {t(TranslationKey['Viewing the batch'])}
          </Typography>

          <Field
            oneLine
            label={t(TranslationKey.Storekeeper) + ': '}
            containerClasses={classNames.storekeeperField}
            inputComponent={
              <div className={classNames.userLinkWrapper}>
                <UserLinkCell name={batch.storekeeper?.name} userId={batch.storekeeper?._id} />
              </div>
            }
          />
        </div>

        <div className={classNames.infoWrapper}>
          <Field
            disabled
            containerClasses={classNames.infoField}
            label={t(TranslationKey['Batch number'])}
            value={batch?.humanFriendlyId}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={t(TranslationKey.Tariff)}
            value={(batch.boxes && getFullTariffTextForBoxOrOrder(batch.boxes?.[0])) || ''}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={t(TranslationKey.Destination)}
            value={batch.boxes?.[0].destination?.name}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={t(TranslationKey['Volume weight'])}
            value={toFixed(
              batch.boxes?.reduce((ac, cur) => (ac += calcVolumeWeightForBox(cur, volumeWeightCoefficient)), 0),
              4,
            )}
            placeholder={'0'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={t(TranslationKey['Final weight'])}
            value={toFixed(
              batch.boxes?.reduce((ac, cur) => (ac += calcFinalWeightForBox(cur, volumeWeightCoefficient)), 0),
              4,
            )}
            placeholder={'0'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            label={t(TranslationKey['Total price'])}
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

        <div className={classNames.imageFileInputWrapper}>
          <Button
            disableElevation
            disabled={!batch.attachedDocuments?.filter(el => checkIsImageLink(el)).length}
            color="primary"
            className={classNames.imagesButton}
            variant="contained"
            onClick={() => setShowPhotosModal(!showPhotosModal)}
          >
            {t(TranslationKey['Available images'])}
          </Button>

          {batch.attachedDocuments?.filter(el => !checkIsImageLink(el)).length ? (
            <Field
              multiline
              label={t(TranslationKey.Files)}
              containerClasses={classNames.filesContainer}
              inputComponent={
                <div className={classNames.filesWrapper}>
                  {batch.attachedDocuments
                    ?.filter(el => !checkIsImageLink(el))
                    .map((file, index) => (
                      <Link key={index} target="_blank" href={file}>
                        <Typography className={classNames.linkText}>{file}</Typography>
                      </Link>
                    ))}
                </div>
              }
            />
          ) : null}
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={setOpenModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>

        <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
          <BoxViewForm
            storekeeper={batch?.storekeeper}
            box={curBox}
            batchHumanFriendlyId={batch.humanFriendlyId}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
          />
        </Modal>

        <BigImagesModal
          isAmazone
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={batch.attachedDocuments?.filter(el => checkIsImageLink(el)) || []}
        />
      </div>
    </Modal>
  )
})
