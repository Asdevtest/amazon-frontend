/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './freelance.style'

import { FreelanceModel } from './freelance.model'

export const Freelance = observer(({ productId, modal }) => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const freelanceModel = useRef(new FreelanceModel({ history, productId }))

  useEffect(() => {
    freelanceModel.current.loadData()
  }, [])

  const {
    curProposal,
    curRequest,
    userInfo,
    nameSearchValue,
    selectedTaskType,
    requestStatus,
    showRequestDesignerResultClientModal,
    showRequestStandartResultModal,
    densityModel,
    columnsModel,
    onHover,
    isSomeFilterOn,
    columnMenuSettings,
    columnVisibilityModel,
    rowCount,
    paginationModel,
    onChangePaginationModelChange,
    getCurrentData,
    onSearchSubmit,
    onClickTaskType,
    onTriggerOpenModal,
    onClickResetFilters,
    onColumnVisibilityModelChange,
    onChangeSortingModel,
  } = freelanceModel.current

  return (
    <div>
      <div className={classNames.tablePanelWrapper}>
        <div className={classNames.taskTypeWrapper}>
          {Object.keys(freelanceRequestTypeByCode).map((taskType, taskIndex) => (
            <Button
              key={taskIndex}
              variant="text"
              disabled={taskType === selectedTaskType}
              className={cx(classNames.button, {
                [classNames.selectedBoxesBtn]: Number(taskType) === Number(selectedTaskType),
              })}
              onClick={() => onClickTaskType(taskType)}
            >
              {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
            </Button>
          ))}
        </div>

        <SearchInput
          placeholder={t(TranslationKey['Search by Title, ID'])}
          inputClasses={classNames.searchInput}
          value={nameSearchValue}
          onSubmit={onSearchSubmit}
        />
      </div>
      <div className={cx(classNames.mainWrapper, { [classNames.modalWrapper]: modal })}>
        <MemoDataGrid
          disableVirtualization
          pagination
          localeText={getLocalizationByLanguageTag()}
          propsToRerender={{ onHover }}
          rowCount={rowCount}
          classes={{
            row: classNames.row,
            root: classNames.root,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          pageSizeOptions={[15, 25, 50, 100]}
          paginationModel={paginationModel}
          rows={getCurrentData()}
          rowHeight={100}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
            columnMenu: DataGridCustomColumnMenuComponent,
          }}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: columnMenuSettings,

            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters,
                isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel,
                columnVisibilityModel,
                onColumnVisibilityModelChange,
              },
            },
          }}
          components={{
            Toolbar: DataGridCustomToolbar,
            ColumnMenuIcon: FilterAltOutlinedIcon,
          }}
          sortingMode="server"
          paginationMode="server"
          density={densityModel}
          columns={columnsModel}
          loading={requestStatus === loadingStatuses.isLoading}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          onSortModelChange={onChangeSortingModel}
          onPaginationModelChange={onChangePaginationModelChange}
        />
      </div>

      <Modal
        openModal={showRequestDesignerResultClientModal}
        setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}
      >
        <RequestDesignerResultClientForm
          onlyRead
          userInfo={userInfo}
          request={{ request: curRequest }}
          proposal={curProposal}
          curResultMedia={curProposal?.proposal.media}
          setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}
        />
      </Modal>

      <Modal
        openModal={showRequestStandartResultModal}
        setOpenModal={() => onTriggerOpenModal('showRequestStandartResultModal')}
      >
        <RequestStandartResultForm
          request={{ request: curRequest }}
          proposal={curProposal}
          setOpenModal={() => onTriggerOpenModal('showRequestStandartResultModal')}
          // onClickSendAsResult={onClickSendAsResult}
        />
      </Modal>
    </div>
  )
})
