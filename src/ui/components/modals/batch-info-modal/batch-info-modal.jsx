/* eslint-disable no-unused-vars */
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Typography} from '@mui/material'

import React, {useState, useEffect} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import {
  BatchWeightCalculationMethodTranslateKey,
  getBatchWeightCalculationMethodForBox,
} from '@constants/batch-weight-calculations-method'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {BatchesModel} from '@models/batches-model'
import {OtherModel} from '@models/other-model'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar'
import {Field} from '@components/field/field'
import {BoxViewForm} from '@components/forms/box-view-form'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {SearchInput} from '@components/search-input'

import {
  calcActualBatchWeight,
  calcPriceForBox,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
} from '@utils/calculation'
import {checkIsClient, checkIsImageLink} from '@utils/checks'
import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {formatDateWithoutTime} from '@utils/date-time'
import {toFixed, getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

import {BigImagesModal} from '../big-images-modal'
import {batchInfoModalColumn} from './batch-info-modal-column'
import {useClassNames} from './batch-info-modal.style'

export const BatchInfoModal = observer(
  ({openModal, setOpenModal, batch, volumeWeightCoefficient, userInfo, onSubmitChangeBoxFields, onClickHsCode}) => {
    const {classes: classNames} = useClassNames()

    const [showBoxViewModal, setShowBoxViewModal] = useState(false)

    const [nameSearchValue, setNameSearchValue] = useState('')

    const [dataToRender, setDataToRender] = useState(batch.boxes || [])

    const [receivedFiles, setReceivedFiles] = useState(null)

    const isActualGreaterTheVolume = checkActualBatchWeightGreaterVolumeBatchWeight(
      dataToRender,
      batch.volumeWeightDivide,
    )

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

    const uploadTemplateFile = async () => {
      await OtherModel.getReportBatchByHumanFriendlyId(batch.humanFriendlyId)
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
              label={t(TranslationKey['Batch title'])}
              value={batch?.title}
              placeholder={t(TranslationKey['Not available'])}
            />

            <Field
              disabled
              // containerClasses={classNames.infoField}
              containerClasses={classNames.sumField}
              inputClasses={classNames.shortInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey['Batch number'])}
              value={batch?.humanFriendlyId}
              placeholder={t(TranslationKey['Not available'])}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              inputClasses={classNames.tariffInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey.Tariff)}
              value={(batch.boxes && getFullTariffTextForBoxOrOrder(batch.boxes?.[0])) || ''}
              placeholder={t(TranslationKey['Not available'])}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              inputClasses={classNames.shortInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey.Destination)}
              value={batch.boxes?.[0].destination?.name}
              placeholder={t(TranslationKey['Not available'])}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              inputClasses={classNames.shortInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey['Gross weight'])}
              value={toFixed(calcActualBatchWeight(batch.boxes), 4)}
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              inputClasses={classNames.shortInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey['Volume weight'])}
              value={toFixed(
                batch.boxes?.reduce(
                  (ac, cur) => (ac += calcVolumeWeightForBox(cur, batch.volumeWeightDivide) * cur.amount),
                  0,
                ),
                4,
              )}
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              inputClasses={classNames.shortInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey['Final weight'])}
              value={toFixed(batch.finalWeight, 4)}
              placeholder={'0'}
            />

            <Field
              disabled
              containerClasses={classNames.sumField}
              inputClasses={classNames.methodInput}
              labelClasses={classNames.subFieldLabel}
              label={t(TranslationKey['Method of batch weight calculation'])}
              value={t(BatchWeightCalculationMethodTranslateKey(batch.calculationMethod))}
            />
          </div>

          <div className={classNames.headerSubWrapper}>
            <div className={classNames.datesWrapper}>
              <Field
                disabled
                containerClasses={classNames.sumField}
                labelClasses={classNames.subFieldLabel}
                label={t(TranslationKey['CLS (batch closing date)'])}
                value={formatDateWithoutTime(batch.boxes?.[0].logicsTariff?.cls)}
                placeholder={t(TranslationKey['dd.mm.yyyy'])}
              />

              <Field
                disabled
                containerClasses={classNames.sumField}
                labelClasses={classNames.subFieldLabel}
                label={t(TranslationKey['ETD (date of shipment)'])}
                value={formatDateWithoutTime(batch.boxes?.[0].logicsTariff?.etd)}
                placeholder={t(TranslationKey['dd.mm.yyyy'])}
              />

              <Field
                disabled
                containerClasses={classNames.sumField}
                labelClasses={classNames.subFieldLabel}
                label={t(TranslationKey['ETA (arrival date)'])}
                value={formatDateWithoutTime(batch.boxes?.[0].logicsTariff?.eta)}
                placeholder={t(TranslationKey['dd.mm.yyyy'])}
              />

              <Field
                disabled
                containerClasses={classNames.sumField}
                inputClasses={classNames.shortInput}
                labelClasses={classNames.subFieldLabel}
                label={t(TranslationKey['Total price'])}
                value={toFixed(
                  batch.boxes?.reduce((ac, cur) => (ac += calcPriceForBox(cur)), 0),
                  2,
                )}
                placeholder={'0'}
              />

              <Field
                disabled
                containerClasses={classNames.sumField}
                inputClasses={classNames.shortInput}
                labelClasses={classNames.subFieldLabel}
                label={t(TranslationKey.Divider)}
                value={batch.volumeWeightDivide}
              />
            </div>

            <SearchInput
              inputClasses={classNames.searchInput}
              value={nameSearchValue}
              placeholder={t(TranslationKey['Search by ASIN, Title'])}
              onChange={e => setNameSearchValue(e.target.value)}
            />
          </div>

          <div className={classNames.tableWrapper}>
            {/* <div style={{flexGrow: 1}}> */}
            <MemoDataGrid
              // hideFooter
              autoHeight
              localeText={getLocalizationByLanguageTag()}
              classes={{
                columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                row: classNames.row,
                // virtualScroller: classNames.virtualScroller,
              }}
              components={{
                Toolbar: DataGridCustomToolbar,
                Footer: () => (
                  <div className={classNames.boxCounterWrapper}>
                    <Typography className={classNames.boxCounterText}>
                      {t(TranslationKey['Quantity of boxes in batch']) + ':'}
                    </Typography>
                    <Typography className={classNames.boxCounterCount}>
                      {batch.boxes.reduce((ac, cur) => (ac += cur.amount), 0)}
                    </Typography>
                  </div>
                ),
              }}
              getRowId={dataToRender => dataToRender._id}
              columns={batchInfoModalColumn(
                batch.volumeWeightDivide,
                batch.calculationMethod,
                isActualGreaterTheVolume,
              )}
              rows={toJS(dataToRender)}
              getRowHeight={() => 'auto'}
              onRowDoubleClick={e => openBoxView(e.row)}
            />
            {/* </div> */}
          </div>

          <div className={classNames.filesSubWrapper}>
            <PhotoAndFilesCarousel
              small
              direction={window.innerWidth < 768 ? 'column' : 'row'}
              files={batch.attachedDocuments}
              width="400px"
            />
          </div>

          <div className={classNames.buttonsWrapper}>
            {!checkIsClient(UserRoleCodeMap[userInfo.role]) && (
              <Button className={classNames.downloadButton} onClick={uploadTemplateFile}>
                {t(TranslationKey['Download the batch file'])}
                <FileDownloadIcon />
              </Button>
            )}

            <Button className={classNames.actionButton} onClick={setOpenModal}>
              {t(TranslationKey.Close)}
            </Button>
          </div>

          <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
            <BoxViewForm
              storekeeper={batch?.storekeeper}
              userInfo={userInfo}
              box={curBox}
              batchHumanFriendlyId={batch.humanFriendlyId}
              volumeWeightCoefficient={batch.volumeWeightDivide}
              calcFinalWeightForBoxFunction={getBatchWeightCalculationMethodForBox(
                batch.calculationMethod,
                isActualGreaterTheVolume,
              )}
              setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
              onSubmitChangeFields={data => {
                onSubmitChangeBoxFields(data)
                setShowBoxViewModal(!showBoxViewModal)
              }}
              onClickHsCode={onClickHsCode}
            />
          </Modal>

          <BigImagesModal
            openModal={showPhotosModal}
            setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
            images={batch.attachedDocuments?.filter(el => checkIsImageLink(el)) || []}
          />
        </div>
      </Modal>
    )
  },
)
