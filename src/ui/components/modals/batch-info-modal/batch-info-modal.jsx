import { Tooltip } from 'antd'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import { CiCircleQuestion } from 'react-icons/ci'

import { BatchWeightCalculationMethodTranslateKey } from '@constants/statuses/batch-weight-calculations-method'
import { TranslationKey } from '@constants/translations/translation-key'

import { OtherModel } from '@models/other-model'

import { ChangeInputCell, UserCell } from '@components/data-grid/data-grid-cells'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { Text } from '@components/shared/text'

import { ClientAwaitingBatchesViewModel } from '@views/client/client-batches-views/client-awaiting-batches-view/client-awaiting-batches-view.model'

import {
  calcActualBatchWeight,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
} from '@utils/calculation'
import { formatDateWithoutTime } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './batch-info-modal.style'

import { BoxModal } from '../box-modal'

import { batchInfoModalColumn } from './temp.columns'

export const BatchInfoModal = observer(
  ({ openModal, setOpenModal, batch, onSubmitChangeBoxFields, patchActualShippingCostBatch }) => {
    const { classes: styles, cx } = useStyles()

    const viewModel = useMemo(() => new ClientAwaitingBatchesViewModel(true), [])
    const [isFileDownloading, setIsFileDownloading] = useState(false)
    const [nameSearchValue, setNameSearchValue] = useState('')
    const [currentBatch, setCurrentBatch] = useState(undefined)

    useEffect(() => {
      setCurrentBatch(batch)
    }, [batch])

    const sourceBoxes =
      currentBatch?.boxes?.map(item => ({
        ...item,
        finalWeight: currentBatch.finalWeight,
        calculatedShippingCost: currentBatch?.calculatedShippingCost,
        actualShippingCost: currentBatch?.actualShippingCost,
        orderIdsItems: `${t(TranslationKey.Order)} №: ${item.items
          .reduce((acc, cur) => (acc += cur.order?.xid + ', '), '')
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
                  String(item.order.xid)?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
                  String(item.order.item)?.toLowerCase().includes(nameSearchValue.toLowerCase()),
              ) ||
              String(el.xid)?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
              String(el.fbaShipment)?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
              el.prepId?.toLowerCase().includes(nameSearchValue.toLowerCase()),
          ),
        )
      } else {
        setDataToRender(sourceBoxes)
      }
    }, [nameSearchValue, currentBatch])

    const uploadTemplateFile = async () => {
      setIsFileDownloading(true)
      await OtherModel.getReportBatchByHumanFriendlyId(currentBatch?.xid)
      setIsFileDownloading(false)
    }

    return (
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className={styles.form}>
          <div className={styles.titleWrapper}>
            <p className={styles.modalTitle}>{t(TranslationKey['Viewing the batch'])}</p>
            <div className={styles.userDataWrapper}>
              <div className={styles.userLinkWrapper}>
                <p className={styles.fieldLabel}>{t(TranslationKey['Int warehouse']) + ':'}</p>
                <UserCell name={currentBatch?.storekeeper?.name} id={currentBatch?.storekeeper?._id} />
              </div>

              <div className={styles.datesWrapper}>
                <div className={styles.dateContainer}>
                  <div className={styles.datesTitle}>
                    CLS
                    <Tooltip title={t(TranslationKey['CLS (batch closing date)'])}>
                      <CiCircleQuestion size={18} />
                    </Tooltip>
                  </div>
                  <p className={styles.infoField}>
                    {formatDateWithoutTime(currentBatch?.boxes?.[0].logicsTariff?.cls)}
                  </p>
                </div>

                <div className={styles.dateContainer}>
                  <div className={styles.datesTitle}>
                    ETD
                    <Tooltip title={t(TranslationKey['ETD (date of shipment)'])}>
                      <CiCircleQuestion size={18} />
                    </Tooltip>
                  </div>
                  <p className={styles.infoField}>
                    {formatDateWithoutTime(currentBatch?.boxes?.[0].logicsTariff?.etd)}
                  </p>
                </div>
                <div className={styles.dateContainer}>
                  <div className={styles.datesTitle}>
                    ETA
                    <Tooltip title={t(TranslationKey['ETA (arrival date)'])}>
                      <CiCircleQuestion size={18} />
                    </Tooltip>
                  </div>

                  <p className={styles.infoField}>
                    {formatDateWithoutTime(currentBatch?.boxes?.[0].logicsTariff?.eta)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <div className={styles.fieldsWrapper}>
              <div className={styles.rowContainer}>
                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Batch title'])}</p>
                  <Text strong rows={1} text={currentBatch?.title || t(TranslationKey.Missing)} />
                </div>

                <div className={styles.tariffWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey.Tariff)}</p>
                  <Text strong rows={1} text={getNewTariffTextForBoxOrOrder(currentBatch?.boxes?.[0])} />
                </div>

                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey.Destination)}</p>
                  <Text strong rows={1} text={currentBatch?.boxes?.[0].destination?.name} />
                </div>

                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Batch number'])}</p>
                  <Text strong rows={1} text={currentBatch?.xid || t(TranslationKey.Missing)} />
                </div>

                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{`${t(TranslationKey['Total price'])} (${t(
                    TranslationKey.China,
                  )})`}</p>
                  <Text strong rows={1} text={currentBatch?.totalPriceFromOrderSupplier || 0} />
                </div>

                <div>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Method of batch weight calculation'])}</p>
                  <Text
                    strong
                    rows={1}
                    text={`${t(BatchWeightCalculationMethodTranslateKey(currentBatch?.calculationMethod))} / ${
                      currentBatch?.volumeWeightDivide
                    }`}
                  />
                </div>
              </div>
              <div className={styles.rowContainer}>
                <Tooltip
                  title={`${t(TranslationKey.ASIN)}, ${t(TranslationKey.Title)}, ${t(TranslationKey.Order)}, ${t(
                    TranslationKey['Box ID'],
                  )}, FBA Shipment, Prep Id`}
                >
                  <CustomInputSearch
                    allowClear
                    wrapperClassName={styles.searchInput}
                    value={nameSearchValue}
                    size="large"
                    placeholder="Search"
                    onChange={e => setNameSearchValue(e.target.value)}
                  />
                </Tooltip>

                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Calculated shipping cost'])}</p>
                  <Text strong rows={1} text={toFixed(currentBatch?.calculatedShippingCost, 2) || 0} />
                </div>

                <Field
                  label={t(TranslationKey['Actual shipping cost'])}
                  classes={{ disabled: styles.disabled }}
                  containerClasses={cx(styles.sumField, styles.shippinCostContainer)}
                  inputClasses={cx(styles.infoField, styles.shippinCostContainer)}
                  labelClasses={cx(styles.subFieldLabel)}
                  inputComponent={
                    <ChangeInputCell
                      rowId={currentBatch?._id}
                      text={currentBatch?.actualShippingCost || '0'}
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
                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Final weight'])}</p>
                  <Text strong rows={1} text={toFixed(currentBatch?.finalWeight, 4) || 0} />
                </div>

                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Volume weight'])}</p>
                  <Text
                    strong
                    rows={1}
                    text={toFixed(
                      currentBatch?.boxes?.reduce(
                        (ac, cur) => (ac += calcVolumeWeightForBox(cur, currentBatch?.volumeWeightDivide) * cur.amount),
                        0,
                      ),
                      4,
                    )}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <p className={styles.subFieldLabel}>{t(TranslationKey['Gross weight'])}</p>
                  <Text strong rows={1} text={toFixed(calcActualBatchWeight(currentBatch?.boxes), 4)} />
                </div>
              </div>
            </div>
            <SlideshowGallery slidesToShow={1} files={currentBatch?.attachedDocuments} />
          </div>

          <CustomDataGrid
            disableRowSelectionOnClick
            sortingMode="client"
            paginationMode="client"
            columnVisibilityModel={viewModel.columnVisibilityModel}
            pageSizeOptions={[50, 100, 500]}
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
                    <p className={styles.boxCounterText}>{t(TranslationKey['Quantity of boxes in batch']) + ': '}</p>
                    <p className={styles.boxCounterText}>
                      {'x ' + currentBatch?.boxes?.reduce((ac, cur) => (ac += cur.amount), 0)}
                    </p>
                  </div>
                ),
              },
            }}
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

          <div className={styles.filesAndButtonWrapper}>
            <div className={styles.buttonsWrapper}>
              <CustomButton icon={<BsDownload size={16} />} onClick={uploadTemplateFile}>
                {t(TranslationKey['Download the batch file'])}
              </CustomButton>

              <CustomButton onClick={setOpenModal}>{t(TranslationKey.Close)}</CustomButton>
            </div>
          </div>

          <Modal
            openModal={viewModel.showBoxViewModal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          >
            <BoxModal
              boxId={viewModel.curBox}
              onUpdateData={viewModel.getCurrentData}
              onToggleModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
            />
          </Modal>
        </div>
        {isFileDownloading && <CircularProgressWithLabel />}
      </Modal>
    )
  },
)
