import { Button, Checkbox, Select, Space } from 'antd'
import { observer } from 'mobx-react'
import { FC, useCallback, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Launches } from '@components/shared/launches'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './report-modal.style'

import { getAsinOptions } from './report-modal.config'
import { ReportModalModel } from './report-modal.model'

interface ReportModalProps {
  product: IProduct
  onClose: () => void
  reportId?: string
  editMode?: boolean
  onUpdateTableData?: () => void
}

export const ReportModal: FC<ReportModalProps> = observer(props => {
  const { product, onClose, reportId, editMode, onUpdateTableData } = props

  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ReportModalModel({ product, reportId, editMode }))

  const handleSave = useCallback(() => {
    editMode ? viewModel.updateListingReport() : viewModel.createListingReport()
    onClose()
    onUpdateTableData?.()
  }, [])

  const modalTitle = `${editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(
    TranslationKey['report by the product'],
  )}`
  const launchTypePlaceholder = `＋ ${t(TranslationKey['Select launch type'])}`
  const asinOptions = getAsinOptions(product)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={cx(styles.flexRowContainer, styles.optionContainer)}>
          <p className={styles.title}>{modalTitle}</p>

          <div className={styles.flexRowContainer}>
            <Select
              showSearch
              disabled={!editMode}
              placeholder={t(TranslationKey['Select ASIN'])}
              className={styles.select}
              defaultValue={[product.asin]}
              options={asinOptions}
              optionRender={({ data }) => (
                <Space>
                  <img aria-label={data.value} src={data.image} alt={data.value} className={styles.optionImage} />
                  <div className={styles.optionContainer}>
                    <AsinOrSkuLink
                      withCopyValue
                      withAttributeTitle="asin"
                      link={data.value}
                      textStyles={styles.optionText}
                      iconStyles={styles.optionIcon}
                    />
                    <AsinOrSkuLink
                      withCopyValue
                      withAttributeTitle="sku"
                      link={data.sku}
                      textStyles={styles.optionText}
                      iconStyles={styles.optionIcon}
                    />
                  </div>
                </Space>
              )}
            />

            <Select
              showSearch
              disabled={viewModel.launchOptions.length === 0 || !editMode}
              placeholder={launchTypePlaceholder}
              options={viewModel.launchOptions}
              className={styles.select}
              value={viewModel.selectLaunchValue}
              onChange={viewModel.onSelectLaunch}
            />
          </div>
        </div>

        {viewModel.requests.length > 0 ? (
          <div className={styles.flexRowContainer}>
            {viewModel.requests.map(request => (
              <div key={request._id} className={styles.requestWrapper}>
                <div className={styles.requestConatainer}>
                  <p className={styles.requestText}>
                    <span className={styles.requestTextSecond}>{`${t(TranslationKey['Request type'])}: `}</span>
                    {request.spec.title}
                  </p>

                  <Button
                    danger
                    shape="circle"
                    size="small"
                    icon={
                      <CrossIcon className={styles.crossIcon} onClick={() => viewModel.onRemoveRequest(request._id)} />
                    }
                    className={styles.crossButton}
                  />
                </div>
                <div className={styles.requestConatainer}>
                  <p className={styles.requestText}>
                    <span className={styles.requestTextSecond}>{`${t(TranslationKey.ID)}: `}</span>
                    {request.humanFriendlyId}
                  </p>

                  <Launches launches={[request.launch]} />
                </div>
                <p className={styles.requestText}>
                  <span className={styles.requestTextSecond}>{`${t(TranslationKey.Status)}: `}</span>
                  {MyRequestStatusTranslate(request.status)}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.tableContainer}>
        <CustomDataGrid
          disableRowSelectionOnClick
          rows={viewModel.launches}
          rowCount={viewModel.launches.length}
          columns={viewModel.columnsModel}
          getRowHeight={() => 'auto'}
          columnHeaderHeight={35}
          getRowId={({ _id }: GridRowModel) => _id}
          slots={null}
          className={styles.dataGridRoot}
        />
      </div>

      <div className={styles.flexRowContainer}>
        <div className={styles.inputContainer}>
          <CustomInputNumber
            addonAfter="$"
            precision={2}
            label="New price"
            placeholder="Enter"
            maxLength={10}
            disabled={!editMode}
            value={viewModel.newProductPrice}
            onChange={viewModel.onChangeNewProductPrice}
          />
        </div>

        <div className={styles.textareaContainer}>
          <CustomTextarea
            rows={3}
            maxLength={1024}
            label="Comment"
            placeholder="Enter"
            disabled={!editMode}
            value={viewModel.description}
            onChange={viewModel.onChangeDescription}
          />
        </div>
      </div>

      <div className={cx(styles.flexRowContainer, styles.alignCenter)}>
        <Checkbox disabled className={styles.checkbox}>
          {t(TranslationKey['Add changes to the product'])}
        </Checkbox>

        <div className={styles.flexRowContainer}>
          <Button
            type="primary"
            disabled={viewModel.disabledSaveButton || !editMode}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onClick={handleSave}
          >
            {t(TranslationKey.Save)}
          </Button>
          <Button danger onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
})
