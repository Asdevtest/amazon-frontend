import {TableCell, TableRow, Typography} from '@mui/material'

import React, {useState, useEffect} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Modal} from '@components/modal'
import {SearchInput} from '@components/search-input'
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
  const {classes: classNames} = useClassNames()

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
        <UserLinkCell blackText name={item.client.name} userId={item.client._id} />
      </TableCell>

      <TableCell>
        <Typography>{getFullTariffTextForBoxOrOrder(item)}</Typography>
      </TableCell>

      <TableCell>
        <Typography className={classNames.textEllipsis}>{item.destination?.name}</Typography>
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
  const {classes: classNames} = useClassNames()

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

  const [nameSearchValue, setNameSearchValue] = useState('')

  const [dataToRender, setDataToRender] = useState(batch.boxes || [])

  useEffect(() => {
    if (batch?.boxes && nameSearchValue) {
      setDataToRender(
        batch?.boxes.filter(el =>
          el.items.some(
            item =>
              item.product.amazonTitle?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
              item.product.asin?.toLowerCase().includes(nameSearchValue.toLowerCase()),
          ),
        ),
      )
    } else {
      setDataToRender(batch.boxes || [])
    }
  }, [nameSearchValue, batch])

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
            label={t(TranslationKey['Int warehouse']) + ': '}
            containerClasses={classNames.storekeeperField}
            labelClasses={classNames.fieldLabel}
            inputComponent={
              <div className={classNames.userLinkWrapper}>
                <UserLinkCell blackText name={batch.storekeeper?.name} userId={batch.storekeeper?._id} />
              </div>
            }
          />
        </div>

        <div className={classNames.infoWrapper}>
          <Field
            disabled
            containerClasses={classNames.infoField}
            labelClasses={classNames.subFieldLabel}
            label={t(TranslationKey['Batch number'])}
            value={batch?.humanFriendlyId}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            labelClasses={classNames.subFieldLabel}
            label={t(TranslationKey.Tariff)}
            value={(batch.boxes && getFullTariffTextForBoxOrOrder(batch.boxes?.[0])) || ''}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            labelClasses={classNames.subFieldLabel}
            label={t(TranslationKey.Destination)}
            value={batch.boxes?.[0].destination?.name}
            placeholder={'N/A'}
          />

          <Field
            disabled
            containerClasses={classNames.sumField}
            labelClasses={classNames.subFieldLabel}
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
            labelClasses={classNames.subFieldLabel}
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
            labelClasses={classNames.subFieldLabel}
            label={t(TranslationKey['Total price'])}
            value={toFixed(
              batch.boxes?.reduce((ac, cur) => (ac += calcPriceForBox(cur)), 0),
              2,
            )}
            placeholder={'0'}
          />
        </div>

        <div className={classNames.searchWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Title'])}
            onChange={e => setNameSearchValue(e.target.value)}
          />
        </div>

        <Table
          rowsOnly
          data={dataToRender}
          BodyRow={TableBodyBoxRow}
          renderHeadRow={renderHeadRow}
          rowsHandlers={{openBoxView}}
          volumeWeightCoefficient={volumeWeightCoefficient}
        />
        <div className={classNames.filesSubWrapper}>
          <PhotoAndFilesCarousel
            small
            direction={window.innerWidth < 768 ? 'column' : 'row'}
            files={batch.attachedDocuments}
            width="400px"
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            color="primary"
            variant="contained"
            className={classNames.actionButton}
            onClick={setOpenModal}
          >
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
