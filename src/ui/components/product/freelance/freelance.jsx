/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { FreelanceModel } from './freelance.model'
import { useClassNames } from './freelance.style'

export const Freelance = observer(({ productId }) => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const freelanceModel = useRef(new FreelanceModel({ history, productId }))

  useEffect(() => {
    freelanceModel.current.loadData()
  }, [])

  const {
    nameSearchValue,
    selectedTaskType,
    requestStatus,
    getCurrentData,
    densityModel,
    columnsModel,
    onChangeNameSearchValue,
    onClickTaskType,
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
          onChange={onChangeNameSearchValue}
        />
      </div>
      <div className={classNames.mainWrapper}>
        <MemoDataGrid
          disableVirtualization
          pagination
          localeText={getLocalizationByLanguageTag()}
          classes={{
            row: classNames.row,
            root: classNames.root,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,

            columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
            columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
          }}
          rowsPerPageOptions={[15, 25, 50, 100]}
          rows={getCurrentData()}
          rowHeight={100}
          components={{
            Toolbar: DataGridCustomToolbar,
            ColumnMenuIcon: FilterAltOutlinedIcon,
          }}
          density={densityModel}
          columns={columnsModel}
          loading={requestStatus === loadingStatuses.isLoading}
        />
      </div>
    </div>
  )
})
