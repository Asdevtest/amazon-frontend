/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {
  /* Divider,  */
  Grid,
  Typography,
  Avatar,
} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/freelance-request-type'
import {loadingStatuses} from '@constants/loading-statuses'
import {MyRequestStatusTranslate} from '@constants/request-proposal-status'
import {colorByRequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar'
// import {MultilineRequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field'
import {MemoDataGrid} from '@components/memo-data-grid'
import {UserLink} from '@components/user-link'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './vacant-request-table.style'

export const VacantRequestTable = ({
  rowCount,
  curPage,
  sortModel,
  filterModel,
  rowsPerPage,
  currentData,
  columnVisibilityModel,
  requestStatus,
  columnsModel,
  getRowClassName,
  onChangeCurPage,
  onChangeSortingModel,
  onChangeFilterModel,
  onChangeRowsPerPage,
}) => {
  const {classes: classNames} = useClassNames()

  console.log('currentData', currentData)

  return (
    <div className={classNames.dataGridWrapper}>
      <MemoDataGrid
        disableVirtualization
        pagination
        useResizeContainer
        localeText={getLocalizationByLanguageTag()}
        classes={{
          row: classNames.row,
          root: classNames.root,
          footerContainer: classNames.footerContainer,
          footerCell: classNames.footerCell,
          toolbarContainer: classNames.toolbarContainer,

          iconSeparator: classNames.iconSeparator,
          columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
          columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
        }}
        rowCount={rowCount}
        sortModel={sortModel}
        filterModel={filterModel}
        page={curPage}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={currentData}
        rowHeight={75}
        components={{
          Toolbar: DataGridCustomToolbar,
          ColumnMenuIcon: FilterAltOutlinedIcon,
          ColumnMenu: DataGridCustomColumnMenuComponent,
        }}
        columnVisibilityModel={columnVisibilityModel}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
        getRowClassName={getRowClassName}
        onPageChange={onChangeCurPage}
        onSortModelChange={onChangeSortingModel}
        onPageSizeChange={onChangeRowsPerPage}
        onFilterModelChange={onChangeFilterModel}
        // onStateChange={setFirstRowId}
        // onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
      />
    </div>
  )
}
