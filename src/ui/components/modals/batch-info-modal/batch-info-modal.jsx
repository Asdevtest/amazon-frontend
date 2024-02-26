import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import {
  BatchWeightCalculationMethodTranslateKey,
  getBatchWeightCalculationMethodForBox,
} from '@constants/statuses/batch-weight-calculations-method'
import { TranslationKey } from '@constants/translations/translation-key'

import { OtherModel } from '@models/other-model'

import { ChangeInputCell, UserLinkCell } from '@components/data-grid/data-grid-cells'
import { BoxViewForm } from '@components/forms/box-view-form'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { SearchInput } from '@components/shared/search-input'
import { DownloadIcon } from '@components/shared/svg-icons'

import { ClientAwaitingBatchesViewModel } from '@views/client/client-batches-views/client-awaiting-batches-view/client-awaiting-batches-view.model'

import {
  calcPriceForBox,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
} from '@utils/calculation'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { formatDateWithoutTime } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder, getShortenStringIfLongerThanCount, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './batch-info-modal.style'

import { batchInfoModalColumn } from './batch-info-modal-column'

export const BatchInfoModal = observer(
  ({
    openModal,
    setOpenModal,
    batch,
    userInfo,
    onSubmitChangeBoxFields,
    onClickHsCode,
    patchActualShippingCostBatch,
    history,
    location,
  }) => {
    const [viewModel] = useState(
      () =>
        new ClientAwaitingBatchesViewModel({
          history,
          location,
        }),
    )
    const { classes: styles, cx } = useStyles()
    const [showPhotosModal, setShowPhotosModal] = useState(false)
    const [isFileDownloading, setIsFileDownloading] = useState(false)

    const [nameSearchValue, setNameSearchValue] = useState('')

    const [currentBatch, setCurrentBatch] = useState([])

    useEffect(() => {
      setCurrentBatch(batch)
    }, [batch])

    const sourceBoxes =
      currentBatch?.boxes?.map(item => ({
        ...item,
        orderIdsItems: `${t(TranslationKey.Order)} №: ${item.items
          .reduce((acc, cur) => (acc += cur.order?.id + ', '), '')
          .slice(0, -2)}  item №: ${item.items
          .reduce((acc, cur) => (acc += (cur.order?.item ? cur.order?.item : '-') + ', '), '')
          .slice(0, -2)}`,
      })) || []

    const [dataToRender, setDataToRender] = useState(sourceBoxes)

    const isActualGreaterTheVolume = checkActualBatchWeightGreaterVolumeBatchWeight(
      sourceBoxes,
      currentBatch?.volumeWeightDivide,
    )

    useEffect(() => {
      if (sourceBoxes && nameSearchValue) {
        setDataToRender(
          sourceBoxes.filter(
            el =>
              el.items.some(
                item =>
                  item.product.amazonTitle?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
                  item.product.asin?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
                  String(item.order.id)?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
                  String(item.order.item)?.toLowerCase().includes(nameSearchValue.toLowerCase()),
              ) || String(el.humanFriendlyId)?.toLowerCase().includes(nameSearchValue.toLowerCase()),
          ),
        )
      } else {
        setDataToRender(sourceBoxes)
      }
    }, [nameSearchValue, currentBatch])

    const [curImageIndex, setCurImageIndex] = useState(0)

    const uploadTemplateFile = async () => {
      setIsFileDownloading(true)
      await OtherModel.getReportBatchByHumanFriendlyId(currentBatch?.humanFriendlyId)
      setIsFileDownloading(false)
    }

    return (
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className={styles.form}>
          <div className={styles.titleWrapper}>
            <Typography className={styles.modalTitle} variant="h5">
              {t(TranslationKey['Viewing the batch'])}
            </Typography>

            <Field
              oneLine
              label={t(TranslationKey['Int warehouse']) + ': '}
              containerClasses={styles.storekeeperField}
              labelClasses={styles.fieldLabel}
              inputComponent={
                <div className={styles.userLinkWrapper}>
                  <UserLinkCell
                    blackText
                    name={currentBatch?.storekeeper?.name}
                    userId={currentBatch?.storekeeper?._id}
                    customStyles={{ fontWeight: 400, fontSize: 14, lineHeight: '19px' }}
                  />
                </div>
              }
            />
          </div>

          <div className={styles.infoWrapper}>
            <Field
              disabled
              containerClasses={cx(styles.sumField, styles.batchTitleField)}
              inputClasses={cx(styles.infoField, styles.batchTitleField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['Batch title'])}
              value={currentBatch?.title}
              placeholder={t(TranslationKey.Missing)}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.batchTitleField)}
              inputClasses={cx(styles.infoField, styles.batchTitleField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['Batch number'])}
              value={currentBatch?.humanFriendlyId}
              placeholder={t(TranslationKey.Missing)}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.batchTitleField)}
              inputClasses={cx(styles.infoField, styles.batchTitleField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey.Tariff)}
              value={getNewTariffTextForBoxOrOrder(batch?.boxes?.[0])}
              placeholder={t(TranslationKey.Missing)}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.destinationField)}
              inputClasses={cx(styles.infoField, styles.destinationField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey.Destination)}
              value={currentBatch?.boxes?.[0].destination?.name}
              placeholder={t(TranslationKey.Missing)}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.volumeWeightField)}
              inputClasses={cx(styles.infoField, styles.volumeWeightField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['Volume weight'])}
              value={toFixed(
                currentBatch?.boxes?.reduce(
                  (ac, cur) => (ac += calcVolumeWeightForBox(cur, currentBatch?.volumeWeightDivide) * cur.amount),
                  0,
                ),
                4,
              )}
              placeholder={'0'}
            />

            {/* <Field
              disabled
              classes={{disabled: styles.disabled}}
              containerClasses={cx(styles.sumField, styles.volumeWeightField)}
              inputClasses={cx(styles.infoField, styles.volumeWeightField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['Gross weight'])}
              value={toFixed(calcActualBatchWeight(batch.boxes), 4)}
              placeholder={'0'}
            /> */}

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.volumeWeightField)}
              inputClasses={cx(styles.infoField, styles.volumeWeightField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['Final weight'])}
              value={toFixed(currentBatch?.finalWeight, 4)}
              placeholder={'0'}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.methodField)}
              inputClasses={cx(styles.infoField, styles.methodField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['Method of batch weight calculation'])}
              value={t(BatchWeightCalculationMethodTranslateKey(currentBatch?.calculationMethod))}
            />
          </div>

          <div className={styles.headerSubWrapper}>
            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.batchTitleField)}
              inputClasses={cx(styles.infoField, styles.batchTitleField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['CLS (batch closing date)'])}
              value={formatDateWithoutTime(currentBatch?.boxes?.[0].logicsTariff?.cls)}
              placeholder={t(TranslationKey['dd.mm.yyyy'])}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.batchTitleField)}
              inputClasses={cx(styles.infoField, styles.batchTitleField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['ETD (date of shipment)'])}
              value={formatDateWithoutTime(currentBatch?.boxes?.[0].logicsTariff?.etd)}
              placeholder={t(TranslationKey['dd.mm.yyyy'])}
            />

            <Field
              disabled
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.batchTitleField)}
              inputClasses={cx(styles.infoField, styles.batchTitleField)}
              labelClasses={styles.subFieldLabel}
              label={t(TranslationKey['ETA (arrival date)'])}
              value={formatDateWithoutTime(currentBatch?.boxes?.[0].logicsTariff?.eta)}
              placeholder={t(TranslationKey['dd.mm.yyyy'])}
            />

            <div className={styles.closeFieldsWrapper}>
              <Field
                disabled
                classes={{ disabled: styles.disabled }}
                containerClasses={cx(styles.sumField, styles.dividerField)}
                inputClasses={[styles.infoField, styles.dividerField]}
                labelClasses={styles.subFieldLabel}
                label={t(TranslationKey['Total price'])}
                value={toFixed(
                  currentBatch?.boxes?.reduce((ac, cur) => (ac += calcPriceForBox(cur)), 0),
                  2,
                )}
                placeholder={'0'}
              />

              <Field
                disabled
                classes={{ disabled: styles.disabled }}
                containerClasses={cx(styles.sumField, styles.dividerField)}
                inputClasses={cx(styles.infoField, styles.dividerField)}
                label={t(TranslationKey.Divider)}
                labelClasses={styles.subFieldLabel}
                value={currentBatch?.volumeWeightDivide}
              />
            </div>

            <Field
              disabled
              label={t(TranslationKey['Calculated shipping cost'])}
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.shippinCostContainer)}
              inputClasses={cx(styles.infoField, styles.shippinCostContainer)}
              labelClasses={cx(styles.subFieldLabel)}
              value={toFixed(currentBatch?.calculatedShippingCost, 2) || 0}
            />

            <Field
              label={t(TranslationKey['Actual shipping cost'])}
              classes={{ disabled: styles.disabled }}
              containerClasses={cx(styles.sumField, styles.shippinCostContainer)}
              inputClasses={cx(styles.infoField, styles.shippinCostContainer)}
              labelClasses={cx(styles.subFieldLabel)}
              inputComponent={
                <ChangeInputCell
                  isInteger
                  rowId={currentBatch?._id}
                  text={currentBatch?.actualShippingCost}
                  onClickSubmit={(id, cost) => {
                    if (Number.isNaN(cost)) {
                      return
                    }

                    !!patchActualShippingCostBatch &&
                      patchActualShippingCostBatch(id, cost).then(() => {
                        setCurrentBatch(prevState => ({ ...prevState, actualShippingCost: cost || '0' }))
                      })
                  }}
                />
              }
            />

            <SearchInput
              inputClasses={styles.searchInput}
              value={nameSearchValue}
              placeholder={getShortenStringIfLongerThanCount(
                t(TranslationKey['Search by ASIN, Title, Order, item, ID Box']),
                29,
              )}
              onChange={e => setNameSearchValue(e.target.value)}
            />
          </div>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              disableRowSelectionOnClick
              localeText={getLocalizationByLanguageTag()}
              sortingMode="client"
              paginationMode="client"
              columnVisibilityModel={viewModel.columnVisibilityModel}
              pageSizeOptions={[50, 100]}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
                toolbar: {
                  columsBtnSettings: {
                    columnsModel: batchInfoModalColumn(
                      currentBatch?.volumeWeightDivide,
                      currentBatch?.calculationMethod,
                      isActualGreaterTheVolume,
                      currentBatch?.actualShippingCost,
                      currentBatch?.finalWeight,
                    ),
                    columnVisibilityModel: viewModel.columnVisibilityModel,
                    onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                  },
                  children: (
                    <div className={styles.boxCounterWrapper}>
                      <Typography className={styles.boxCounterText}>
                        {t(TranslationKey['Quantity of boxes in batch']) + ':'}
                      </Typography>
                      <Typography className={styles.boxCounterCount}>
                        {currentBatch?.boxes?.reduce((ac, cur) => (ac += cur.amount), 0)}
                      </Typography>
                    </div>
                  ),
                },
              }}
              getRowId={dataToRender => dataToRender._id}
              columns={batchInfoModalColumn(
                currentBatch?.volumeWeightDivide,
                currentBatch?.calculationMethod,
                isActualGreaterTheVolume,
                currentBatch?.actualShippingCost,
                currentBatch?.finalWeight,
                currentBatch?.status,
              )}
              rows={toJS(dataToRender)}
              getRowHeight={() => 'auto'}
              onRowDoubleClick={params => viewModel.setCurrentOpenedBox(params.row)}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            />
          </div>

          <div className={styles.filesAndButtonWrapper}>
            <div className={styles.filesSubWrapper}>
              <PhotoAndFilesSlider
                smallSlider
                column={window.innerWidth < 768}
                files={currentBatch?.attachedDocuments}
              />
            </div>
            <div className={styles.buttonsWrapper}>
              <Button className={styles.downloadButton} onClick={uploadTemplateFile}>
                {t(TranslationKey['Download the batch file'])}
                <DownloadIcon />
              </Button>

              <Button className={styles.actionButton} onClick={setOpenModal}>
                {t(TranslationKey.Close)}
              </Button>
            </div>
          </div>

          <Modal
            openModal={viewModel.showBoxViewModal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          >
            <BoxViewForm
              storekeeper={currentBatch?.storekeeper}
              userInfo={userInfo}
              box={viewModel.curBox}
              batchHumanFriendlyId={currentBatch?.humanFriendlyId}
              volumeWeightCoefficient={currentBatch?.volumeWeightDivide}
              calcFinalWeightForBoxFunction={getBatchWeightCalculationMethodForBox(
                currentBatch?.calculationMethod,
                isActualGreaterTheVolume,
              )}
              setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
              onSubmitChangeFields={data => onSubmitChangeBoxFields(data)}
              onClickHsCode={onClickHsCode}
            />
          </Modal>

          {showPhotosModal && (
            <ImageModal
              isOpenModal={showPhotosModal}
              files={currentBatch?.attachedDocuments}
              currentFileIndex={curImageIndex}
              onOpenModal={() => setShowPhotosModal(!showPhotosModal)}
              onCurrentFileIndex={index => setCurImageIndex(index)}
            />
          )}
        </div>
        {isFileDownloading && <CircularProgressWithLabel />}
      </Modal>
    )
  },
)
