import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'
import SearchIcon from '@mui/icons-material/Search'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {Typography, Box, Tabs, InputAdornment} from '@material-ui/core'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

// import {TranslationKey} from '@constants/translations/translation-key'
import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {ITab} from '@components/i-tab/i-tab'
import {Modal} from '@components/modal'
import {AsinCheckerModal} from '@components/modals/asin-checker-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditAsinCheckerModal} from '@components/modals/edit-asin-checker-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

// import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
// import {t} from '@utils/translations'
import {SupervisorSettingsContentModel} from './supervisor-settings-content.model'
import {useClassNames} from './supervisor-settings-content.style'

const tabsValues = {
  ONLINE_ARBITRAGE_CHINA: 'ONLINE_ARBITRAGE_CHINA',
  DROPSHIPPING: 'DROPSHIPPING',
  PRIVATE_LABEL: 'PRIVATE_LABEL',
  WHOLE_SALE_USA: 'WHOLE_SALE_USA',
}

const TabPanel = ({children, value, index, ...other}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box paddingTop={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

export const SupervisorSettingsContent = observer(() => {
  const [tabIndex, setTabIndex] = React.useState(tabsValues.ONLINE_ARBITRAGE_CHINA)
  const tabItemStyles = twitterTabsStylesHook.useTabItem()
  const gpModel = useRef(new SupervisorSettingsContentModel({history}))
  const {
    showAsinCheckerModal,
    showEditAsinCheckerModal,
    showConfirmModal,
    onTriggerOpenModal,
    asinsToEdit,
    curPage,
    rowsPerPage,
    onChangeCurPage,
    onChangeRowsPerPage,
    filterModel,
    onChangeFilterModel,
    sortModel,
    onChangeSortingModel,
    densityModel,
    setDataGridState,
    columnsModel,
    requestStatus,
    onSubmitAsins,
    onEditAsins,
    getCurrentData,
    confirmModalSettings,
    nameSearchValue,
    onChangeNameSearchValue,
  } = gpModel.current

  useEffect(() => {
    gpModel.current.loadData(tabIndex)
  }, [tabIndex])

  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Tabs
        variant={'fullWidth'}
        classes={{
          root: classNames.row,
          indicator: classNames.indicator,
        }}
        value={tabIndex}
        onChange={(e, value) => {
          setTabIndex(value)
        }}
      >
        <ITab classes={tabItemStyles} value={tabsValues.ONLINE_ARBITRAGE_CHINA} label={'ONLINE ARBITRAGE CHINA'} />

        <ITab classes={tabItemStyles} label={'DROPSHIPPING'} value={tabsValues.DROPSHIPPING} />

        <ITab classes={tabItemStyles} label={'PRIVATE LABEL'} value={tabsValues.PRIVATE_LABEL} />

        <ITab classes={tabItemStyles} label={'WHOLE SALE USA'} value={tabsValues.WHOLE_SALE_USA} />
      </Tabs>

      <TabPanel value={tabIndex} index={tabsValues.ONLINE_ARBITRAGE_CHINA}>
        <div className={classNames.buttonWrapper}>
          <Field
            containerClasses={classNames.searchContainer}
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            }
            onChange={onChangeNameSearchValue}
          />
          <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
            {'ASIN checker'}
          </Button>
        </div>
        <div className={classNames.dataGridWrapper}>
          <DataGrid
            pagination
            useResizeContainer
            classes={{
              row: classNames.row,
              root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            page={curPage}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            components={{
              Toolbar: GridToolbar,
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPageSizeChange={onChangeRowsPerPage}
            onPageChange={onChangeCurPage}
            onStateChange={setDataGridState}
            onFilterModelChange={model => onChangeFilterModel(model)}
          />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.DROPSHIPPING}>
        <div className={classNames.buttonWrapper}>
          <Field
            containerClasses={classNames.searchContainer}
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            }
            onChange={onChangeNameSearchValue}
          />
          <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
            {'ASIN checker'}
          </Button>
        </div>
        <div className={classNames.dataGridWrapper}>
          <DataGrid
            pagination
            useResizeContainer
            classes={{
              row: classNames.row,
              root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            page={curPage}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            components={{
              Toolbar: GridToolbar,
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPageSizeChange={onChangeRowsPerPage}
            onPageChange={onChangeCurPage}
            onStateChange={setDataGridState}
            onFilterModelChange={model => onChangeFilterModel(model)}
          />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.PRIVATE_LABEL}>
        <div className={classNames.buttonWrapper}>
          <Field
            containerClasses={classNames.searchContainer}
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            }
            onChange={onChangeNameSearchValue}
          />
          <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
            {'ASIN checker'}
          </Button>
        </div>
        <div className={classNames.dataGridWrapper}>
          <DataGrid
            pagination
            useResizeContainer
            classes={{
              row: classNames.row,
              root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            page={curPage}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            components={{
              Toolbar: GridToolbar,
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPageSizeChange={onChangeRowsPerPage}
            onPageChange={onChangeCurPage}
            onStateChange={setDataGridState}
            onFilterModelChange={model => onChangeFilterModel(model)}
          />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.WHOLE_SALE_USA}>
        <div className={classNames.buttonWrapper}>
          <Field
            containerClasses={classNames.searchContainer}
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Reason'])}
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            }
            onChange={onChangeNameSearchValue}
          />
          <Button success className={classNames.button} onClick={() => onTriggerOpenModal('showAsinCheckerModal')}>
            {'ASIN checker'}
          </Button>
        </div>
        <div className={classNames.dataGridWrapper}>
          <DataGrid
            pagination
            useResizeContainer
            classes={{
              row: classNames.row,
              root: classNames.rootDataGrid,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={sortModel}
            filterModel={filterModel}
            page={curPage}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            getRowId={row => row._id}
            rowHeight={120}
            components={{
              Toolbar: GridToolbar,
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSortModelChange={onChangeSortingModel}
            onPageSizeChange={onChangeRowsPerPage}
            onPageChange={onChangeCurPage}
            onStateChange={setDataGridState}
            onFilterModelChange={model => onChangeFilterModel(model)}
          />
        </div>
      </TabPanel>
      <Modal openModal={showAsinCheckerModal} setOpenModal={() => onTriggerOpenModal('showAsinCheckerModal')}>
        <AsinCheckerModal
          strategy={tabIndex}
          onSubmit={onSubmitAsins}
          onClose={() => onTriggerOpenModal('showAsinCheckerModal')}
        />
      </Modal>
      <Modal openModal={showEditAsinCheckerModal} setOpenModal={() => onTriggerOpenModal('showEditAsinCheckerModal')}>
        <EditAsinCheckerModal
          asinsToEdit={asinsToEdit}
          onSubmit={onEditAsins}
          onClose={() => onTriggerOpenModal('showEditAsinCheckerModal')}
        />
      </Modal>
      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
    </React.Fragment>
  )
})
